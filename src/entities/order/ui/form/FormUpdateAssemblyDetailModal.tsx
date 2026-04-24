'use client'
import { FetchPropertyDetail } from '@/shared/api/propertyDetail/fetchPropertyDetail'
import Fieldset from '@/shared/components/fieldSet/ui/Fieldset'
import { getNewProperties } from '@/shared/lib/utils/getNewPropertiesDeatil'
import { getPropertyStrings } from '@/shared/lib/utils/getPropertyToBaseOptionType'
import useGeo from '@/shared/model/hooks/useGeo'
import {
	PURPOSE_USE,
	TAssemblyDetailDTO,
	TBaseDetailDTO,
	TDetailDTO,
	TNewAssemblyDetailDTO,
	TPropertyDetailDTO,
} from '@/shared/model/types'
import CusButton from '@/shared/ui/button/ui/CusButton'
import CusConfigProvider from '@/shared/ui/CusConfigProvider/ui/CusConfigProvider'
import { Checkbox, Form, Input, InputNumber, Modal, ModalProps, Select, Tooltip } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { FieldArray, FieldArrayRenderProps, Formik } from 'formik'
import { useParams, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaImage, FaInfoCircle, FaMinus, FaPlus, FaPuzzlePiece, FaQuestion, FaQuestionCircle, FaSave } from 'react-icons/fa'

import { FetchDetail } from '@/shared/api'
import { TFormUpdateAssemblyDetail } from '../../model/Types'
import ListBaseDetailImAssembly from '../lists/ListBaseDetailImAssembly'
import FormDetailBasicFields from './basicFormDetail/FormDetailBasicFields'
import FormDetailProperties from './basicFormDetail/FormDetailProperties'
import FormDetailAttachments from './basicFormDetail/FormDetailAttachments'
import FormDetailAssembly from './basicFormDetail/FormDetailAssembly'



function FormUpdateAssemblyDetail({
	idOrder,
	redactAssemblyDetail,
	setLoader,
	numberOrder,
	setDetails,
	setModalDetail,
	setRedactDetail,
}: TFormUpdateAssemblyDetail) {
	
	const params = useParams()
	const INN = params!.INN as string
	const idEmployee = params!.idEmployee as string
	const { dataGeo } = useGeo(idEmployee, PURPOSE_USE.redact, 'Добавление сборной детали/редактирование сборной детали')
	const [propertyDetail, setPropertyDetail] = useState<BaseOptionType[]>([])
	const [currentProperty, setCurrentProperty] = useState<TPropertyDetailDTO[]>([])
	const [componentsBaseDetail, setComponentsBaseDetail] = useState<TBaseDetailDTO[]>([])
	const [loaderComponents, setLoaderComponents] = useState(false)
	const searchParams = useSearchParams()
	useEffect(() => {
		setLoader(true)
		;(async () => {
			const dataPropertyDetail = await FetchPropertyDetail.getProperties(INN)
			setPropertyDetail(getPropertyStrings(dataPropertyDetail))

			setCurrentProperty(dataPropertyDetail)
			setLoader(false)
		})()
	}, [INN])

	const initialValues: TNewAssemblyDetailDTO | TAssemblyDetailDTO = redactAssemblyDetail || {
		entitiesType: 'ASSEMBLY',
		order: idOrder,
		nameDetail: '',
		completed: false,
		amount: 1,
		completedAmount: 0,
		description: [''],
		price: {
			price: 0,
		},
		propertyDetail: [],
		components: [],
	}

	const handleSubmit = async (values: Partial<TNewAssemblyDetailDTO | TAssemblyDetailDTO>) => {
		setLoader(true)
		const newPropertyDetail = getNewProperties(values.propertyDetail || [], currentProperty)
		if (newPropertyDetail.length != 0) {
			await FetchPropertyDetail.addPropertyDetailList(INN, newPropertyDetail, dataGeo)
		}

		//submit
	}

	const completedAssemblyDetail = async () => {}

	const loadComponents = async () => {
		if (!redactAssemblyDetail || redactAssemblyDetail.components.length===0) {
			return
		}
		setLoaderComponents(true)
		const dataDetails = await FetchDetail.getBaseDetailsByIDs(INN,redactAssemblyDetail.components)
		setComponentsBaseDetail(dataDetails)
		setLoaderComponents(false)
	}
	const redactComponentDetail = (baseDetail: TBaseDetailDTO) => {
		setRedactDetail(baseDetail)
		setModalDetail(true)
	}

	const addBaseDetailFromAssembly = async() => {
		if (redactAssemblyDetail && '_id' in redactAssemblyDetail) {
			const params = new URLSearchParams(searchParams!.toString())
			params.set('idAssembly', redactAssemblyDetail._id) //!BUG
			setRedactDetail(null)
			setModalDetail(true)
		} else {
			return
		}
	}

return (
		<CusConfigProvider>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
				{({ values, setFieldValue }) => (
					<Form className="p-4">
						<Fieldset legend={numberOrder ? `Заказ №: ${numberOrder}` : <FaInfoCircle />} className="flex flex-col gap-4">
							<FormDetailBasicFields
								completedDetail={completedAssemblyDetail}
								values={values}
								setFieldValue={setFieldValue}
								redactDetail={!!redactAssemblyDetail}
							/>
							<FormDetailProperties
								values={values}
								setFieldValue={setFieldValue}
								propertyDetail={propertyDetail}
							/>
							<FormDetailAttachments />
							<FormDetailAssembly
								redactAssemblyDetail={redactAssemblyDetail!}
								loadComponents={loadComponents}
								loaderComponents={loaderComponents}
								addBaseDetailFromAssembly={addBaseDetailFromAssembly}
								componentsBaseDetail={componentsBaseDetail}
								redactComponentDetail={redactComponentDetail}
							/>
							<div className="flex justify-end mt-6">
								<CusButton type="submit" className="flex items-center gap-2">
									<FaSave /> Сохранить
								</CusButton>
							</div>
						</Fieldset>
					</Form>
				)}
			</Formik>
		</CusConfigProvider>
	)
}

export default function FormUpdateAssemblyDetailModal({ ...props }: TFormUpdateAssemblyDetail & ModalProps) {
	return (
		<Modal
			classNames={{ container: '!bg-transparent' }}
			open={props.open}
			onCancel={props.onCancel}
			footer={null}
			width={800}
			styles={{
				container: {
					backgroundColor: 'transparent',
				},
			}}
		>
			<FormUpdateAssemblyDetail {...props} />
		</Modal>
	)
}
