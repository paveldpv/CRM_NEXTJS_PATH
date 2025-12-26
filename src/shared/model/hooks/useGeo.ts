import { ObjectId } from 'mongoose'
import { useEffect, useState } from 'react'
import { PURPOSE_USE, TGeoLocation } from '../types/subtypes/TGeoLocation'

export default function useGeo(idEmployee: ObjectId, process: PURPOSE_USE, options?: any) {
	const [dataGeo, setDataGeo] = useState<Omit<TGeoLocation, 'date'>>({ idEmployee, process })

	useEffect(() => {
		const successHandler = (e: {
			coords: GeolocationCoordinates
			timestamp: number
			toJSON: () => any
		}) => {
			const { longitude, latitude } = e.coords
			const geolocation: Omit<TGeoLocation, 'date'> = {
				location: { longitude, latitude },
				idEmployee,
				process,
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
			const geolocation: Omit<TGeoLocation, 'date'> = {
				idEmployee,
				process,
			}
			return geolocation
		}
		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options)
		const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options)
		return () => navigator.geolocation.clearWatch(id)
	}, [options])

	return { dataGeo }
}
