
type TContextMenu ={	
	itemsMenu:TItemMenu[]}
   & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type TItemMenu = {
	title:string|React.ReactNode
	onClickFunc:(e?:any)=>void
}
