import { TTabPanelProps } from './model/Types'

export default function CustomTabPanel({ children, value, index, ...props }: TTabPanelProps) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...props}
		>
			{value === index && <div>{children}</div>}
		</div>
	)
}
