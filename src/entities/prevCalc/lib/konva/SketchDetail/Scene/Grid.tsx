import Konva from 'konva'
import { memo, useMemo } from 'react'
import { Circle, Group, Line } from 'react-konva'

type TGrid = {
	widthScene: number
	heightScene: number
	cell: number

	pointRef?: Konva.Circle | any
}

function Grid({ widthScene, heightScene, cell, pointRef }: TGrid) {
	const configGrid = useMemo(() => {
		return {
			lineVert: new Array(Math.round(heightScene / cell)).fill(cell),
			lineHoriz: new Array(Math.round(widthScene / cell)).fill(cell),
		}
	}, [widthScene, heightScene])

	return (
		<Group>
			{pointRef && <Circle opacity={0.8} stroke={'#38a169'} radius={2} fill='#38a169' ref={pointRef} />}
			{configGrid.lineVert.map((line, index) => (
				<Group key={index}>
					<Line
						opacity={0.2}
						dash={[10, 10]}
						strokeWidth={1}
						points={[0, cell * index, widthScene, cell * index]}
						stroke={'#38a169'}
					/>
				</Group>
			))}
			{configGrid.lineHoriz.map((line, index) => (
				<Line
					opacity={0.2}
					dash={[10, 10]}
					strokeWidth={1}
					key={index}
					points={[cell * index, 0, cell * index, heightScene]}
					stroke={'green'}
				/>
			))}
		</Group>
	)
}
export default memo(Grid)
