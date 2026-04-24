'use client'

import { FaImage } from 'react-icons/fa'
import CusButton from '@/shared/ui/button/ui/CusButton'

export default function FormDetailAttachments() {
	return (
		<div className="grid grid-cols-2 gap-4 mt-4">
			<div className="flex flex-col gap-1">
				<label className="text-xs font-bold">Эскиз</label>
				<CusButton
					type="button"
					className="flex items-center justify-center gap-2"
					onClick={() => alert('Открытие модалки добавления эскиза')}
				>
					<FaImage /> Добавить эскиз
				</CusButton>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-xs font-bold">Файлы</label>
				<div className="p-2 border border-dashed border-gray-300 rounded text-center text-gray-400 text-xs">
					Загрузка файлов (заглушка)
				</div>
			</div>
		</div>
	)
}