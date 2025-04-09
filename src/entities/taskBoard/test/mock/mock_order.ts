import { TOrders } from '../../model/Types'

export const mockOrders: TOrders[] = [
	{
		counterParty: {
			id: 'fds',
			data: [
				{
					description: 'fsdfgd',
				},
			],
		},
		data: {
			safeDeleted: false,
			id: 'order_001',

			numberOrder: 1001,
			// detail: [
			//   {
			//     id: 'detail_001',
			//     description: ['Описание товара 1', 'Дополнительная информация'],
			//     files: [
			//       {
			//         FullPath: '/uploads/files/file1.pdf',
			//         NameFile: 'file1.pdf',
			//         DateTimeUpdateFile: new Date('2023-12-05T08:00:00Z'),
			//         Errored: false,
			//         IDFile: 'file_id_001',
			//         SizeFile: 1024,
			//         fileFormat: 'pdf',
			//       },
			//       {
			//         FullPath: '/uploads/files/file2.jpg',
			//         NameFile: 'file2.jpg',
			//         DateTimeUpdateFile: new Date('2023-11-29T09:30:00Z'),
			//         Errored: true,
			//         IDFile: 'file_id_002',
			//         SizeFile: 2048,
			//         fileFormat: 'jpg',
			//       },
			//     ],
			//     payment: {
			//       type: type_payment.cash,
			//       price: 5000,
			//     },
			//   },
			//   {
			//     id: 'detail_002',
			//     description: ['Описание товара 2'],
			//     files: 'NOT_FOUND',
			//     payment: {
			//       type: type_payment.vat,
			//       price: 8000,
			//     },
			//   },
			//   {
			//     id: 'detail_022',
			//     description: ['Описание товара 14'],
			//     files: 'NOT_FOUND',
			//     payment: {
			//       type: type_payment.vat,
			//       price: 8000,
			//     },
			//   },
			//   {
			//     id: 'detail_042',
			//     description: ['Описание товара 243'],
			//     files: 'NOT_FOUND',
			//     payment: {
			//       type: type_payment.vat,
			//       price: 8000,
			//     },
			//   },
			// ],
		},
	},
]

export default mockOrders
