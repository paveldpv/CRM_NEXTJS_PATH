'use client'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import CusSpin from '@/shared/ui/loaders/CusSpin'
import { useState } from 'react'
import { TFormDetails } from '../../model/Types'
import ListDetails from '../lists/ListDetails'
import { FaCubes } from 'react-icons/fa'

export default function FormDetails({}: TFormDetails) {
	const [details, setDetails] = useState()
	const [loader, setLoader] = useState(true)

	return (
		<Fieldset legend={<FaCubes />} className=' row-span-2'>
			{loader ? <CusSpin visible={loader} /> : <ListDetails />}
		</Fieldset>
	)
}
