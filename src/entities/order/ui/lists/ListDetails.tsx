'use client'
import { TListDetails } from '../../model/Types'
import AssemblyDetail from '../simple/AssemblyDeatil/AssemblyDetail'
import Detail from '../simple/Detail'
import HeaderLIstDetails from '../simple/HeaderLIstDetails'

export default function ListDetails({
	setRedactDetail,
	setDetails,
	permission,
	setModalDetail,
	details,
	setModalAssemblyDetail,
	setRedactAssemblyDetail,
	setLoader,
}: TListDetails) {
	return (
		<div>
			{details.length === 0 ? (
				<p className=' text-xs m-2  underline'>Нет деталей в заказе</p>
			) : (
				<div>
					<HeaderLIstDetails />
					{details.map((detail) => {
						if (detail.entitiesType === 'ASSEMBLY') {
							return (
								<AssemblyDetail
								setLoader={setLoader}
									key={detail._id}
									setDetails={setDetails}
									detail={detail}
									setRedactAssemblyDetail={setRedactAssemblyDetail}
									setModalAssemblyDetail={setModalAssemblyDetail}
									setRedactDetail={setRedactDetail}
									setModalDetail={setModalDetail}
									permission={permission}
								/>
							)
						} else {
							return (
								<Detail
									setLoader={setLoader}
									key={detail._id}
									setDetails={setDetails}
									detail={detail}
									setRedactDetail={setRedactDetail}
									setModalDetail={setModalDetail}
									permission={permission}
								/>
							)
						}
					})}
				</div>
			)}
		</div>
	)
}
