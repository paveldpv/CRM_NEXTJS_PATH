'use client'
import { Modal, Progress } from 'antd'
import { memo, useCallback, useEffect, useState } from 'react'
import { useProcessLoader } from '../model/storeProcessLoader'

function ProgressLoader() {
	const [visible, setVisible, step, status, handlerCancel] = useProcessLoader((state) => [
		state.visible,
		state.setVisible,
		state.step,
		state.status,
		state.handlerCancel,
	])
	const [progress, setProgress] = useState(0)

	let arrStepProgress = () => {
		if (step <= 0) return [100]
		const stepProgress = 100 / step
		return new Array(step).fill(0).map((el, index) => Math.round(el + stepProgress * (index + 1)))
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0
				}
				const diff = Math.random() * 10
				return Math.min(oldProgress + diff, arrStepProgress()[0])
			})
		}, 400)

		return () => {
			clearInterval(timer)
			arrStepProgress().shift()
		}
	}, [])

	const clickCancelButton = useCallback(() => {
		setVisible(false)
		handlerCancel && handlerCancel()
	}, [setVisible, handlerCancel])

	return (
		<Modal open={visible} onCancel={clickCancelButton} footer={null} closable={false} className='progress-loader-modal'>
			<div className='p-6'>
				<div className='text-2xl underline mb-4'>{status}</div>
				<Progress
					percent={Math.round(progress)}
					strokeColor='#F47C28'					
					showInfo={true}
					strokeWidth={6}
				/>
				<div className='flex justify-end mt-6'>
					<button onClick={clickCancelButton} className='px-4 py-2 border border-gray-300 rounded hover:bg-gray-50'>
						Отмена
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default memo(ProgressLoader)
