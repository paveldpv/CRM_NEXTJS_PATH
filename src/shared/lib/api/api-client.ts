import {
	getJWTToken,
	getRefreshToken,
	resetTokens,
	setJWTToken,
	setRefreshToken,
} from '@/shared/lib/authToken'
import { URL_REFRESH_TOKEN } from '../../../../config/urls'
import { TTokens } from '../../../../Server/Service/serviceSession/model/types/Type'
import { typicalError } from '../../model/types/enums'

let refreshPromise: Promise<void> | null = null

async function doRefresh(): Promise<void> {
	const oldRefreshToken = getRefreshToken()

	if (!oldRefreshToken) {
		resetTokens()
		throw new Error('No refresh token in local store')
	}

	if (refreshPromise) {
		return refreshPromise
	}

	refreshPromise = (async () => {
		const res = await fetch(URL_REFRESH_TOKEN, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refreshToken: oldRefreshToken }),
		})

		if (!res.ok) {
			resetTokens()
			throw new Error(`Refresh failed: ${res.status}`)
		}

		const data = (await res.json()) as TTokens
		const { jwt, refreshToken } = data || {}

		if (!jwt || !refreshToken) {
			resetTokens()
			throw new Error('Refresh response malformed')
		}

		setJWTToken(jwt)
		setRefreshToken(refreshToken)
	})()

	try {
		await refreshPromise
	} finally {
		refreshPromise = null
	}
}

type TApiOptions = RequestInit & {
	parseJson?: boolean
	suppressErrorRedirect?: boolean
	timeoutMs?: number
}

export class ApiClient {
	private baseURL: string

	constructor(baseURL: string) {
		this.baseURL = baseURL
	}
	private handleHttpError(status: number, suppressErrorRedirect: boolean) {
		if (suppressErrorRedirect) return
		if (status === 403 || status === 404 || status === 500) {
			this.goToPageError(status)
		}
	}

	private goToPageError(status: number) {
		switch (status) {
			case 403:
				window.location.assign(`/ERROR/${typicalError.error_permission}`)
				break
			case 500:
				window.location.assign(`/ERROR/${typicalError.error_sever}`)
				break

			default:
				window.location.assign(`/ERROR/${typicalError.error_DB}`)
				break
		}
	}
	private isPlainObjectBody(body: BodyInit | null | undefined): boolean {
		const isPlainObjectBody =
			body &&
			typeof body === 'object' &&
			!(body instanceof FormData) &&
			!(body instanceof URLSearchParams) &&
			!(body instanceof Blob) &&
			!(body instanceof ArrayBuffer)
		return !!isPlainObjectBody
	}

	private async doFetchWithTimeout(input: RequestInfo, init?: RequestInit, timeout?: number) {
		if (!timeout || timeout <= 0) {
			return fetch(input, init)
		}
		const controller = new AbortController()
		const timer = setTimeout(() => controller.abort(), timeout)
		try {
			return fetch(input, { ...init, signal: controller.signal })
		} finally {
			clearTimeout(timer)
		}
	}
	private async parseResult<T>(res: Response, parseJson = true) {
		if (!parseJson) {
			return res as unknown as T
		}

		const text = await res.text()
		if (text.length === 0) {
			return undefined as unknown as T
		}
		try {
			return JSON.parse(text) as T
		} catch {
			return text as unknown as T
		}
	}

	public async api<T = unknown>(url: string, options: TApiOptions = {}): Promise<T> {
		const { parseJson = true, suppressErrorRedirect = true, timeoutMs, ...payload } = options
		const headers = new Headers(payload.headers || {})

		const body = payload.body
		const isPlainObjectBody = this.isPlainObjectBody(body)

		if (isPlainObjectBody && !headers.has('Content-Type')) {
			headers.set('Content-Type', 'application/json')
		}

		const jwt = getJWTToken()
		if (jwt && !headers.has('Authorization')) {
			headers.set('Authorization', `Bearer ${jwt}`)
		}

		const finalBody = isPlainObjectBody && !(typeof body === 'string') ? JSON.stringify(body) : body

		const runFetch = () =>
			this.doFetchWithTimeout(this.baseURL + url, { ...payload, headers, body: finalBody }, timeoutMs)

		let res = await runFetch()

		if (res.status === 401) {
			try {
				await doRefresh()
			} catch (e) {
				if (!suppressErrorRedirect) {
					this.goToPageError(403)
				}
				throw e instanceof Error ? e : new Error('Unauthorized and refresh failed')
			}

			const newHeaders = new Headers(headers)
			const newJwt = getJWTToken()
			if (newJwt) {
				newHeaders.set('Authorization', `Bearer ${newJwt}`)
			} else {
				if (!suppressErrorRedirect) {
					this.goToPageError(403)
				}
				throw new Error('No JWT after refresh')
			}

			res = await this.doFetchWithTimeout(
				this.baseURL + url,
				{ ...payload, headers: newHeaders, body: finalBody },
				timeoutMs
			)

			if (!res.ok) {
				this.handleHttpError(res.status, suppressErrorRedirect)
			}

			return await this.parseResult(res, parseJson)
		} else {
			if (!res.ok) {
				this.handleHttpError(res.status, suppressErrorRedirect)
			}
			return await this.parseResult(res, parseJson)
		}
	}
}

//  const res = await apiClient.api<AddUserResponse>('user/addnewuser', {
//     method: 'POST',
//     body: { name: 'Alice', email: 'alice@example.com' }, // объект — будет сериализован в JSON
//     timeoutMs: 10000, // опционально
//   })
//   console.log(res.id, res.name)
