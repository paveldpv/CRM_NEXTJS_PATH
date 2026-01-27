import { useEffect, useState } from 'react'
import { PURPOSE_USE, TNewDataGeoLocationDTO } from '../types'

export default function useGeo(idEmployee: string, process: PURPOSE_USE,description?:string, options?: any) {
	const [dataGeo, setDataGeo] = useState<TNewDataGeoLocationDTO>({
  user: idEmployee,
  process,
  safeDeleted: false})

	useEffect(() => {
		const successHandler = (e: { coords: GeolocationCoordinates; timestamp: number; toJSON: () => any }) => {
			const { longitude, latitude } = e.coords
			const geolocation: TNewDataGeoLocationDTO = {
				location: { longitude, latitude },
				user: idEmployee,
				process,
				safeDeleted: false,
				descriptionProcess:description
			}

			setDataGeo(geolocation)
		}

		const errorHandler = (e: {
			code: number
			message: string
			PERMISSION_DENIED: 1
			POSITION_UNAVAILABLE: 2
			TIMEOUT: 3
		}) => {
			const geolocation: TNewDataGeoLocationDTO = {
				user: idEmployee,
				process,
				safeDeleted: false,
				descriptionProcess:description
			}
			setDataGeo(geolocation)
			return geolocation
		}
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options)
		const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options)
		return () => navigator.geolocation.clearWatch(id)
	}, [options])

	return { dataGeo }
}
