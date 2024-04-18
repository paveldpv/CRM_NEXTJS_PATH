import style from './staticLoader.module.css'
export default function StaticLoader() {
  return (
    <span className={`${style.Loader}`}>Загружаем</span>
  )
}