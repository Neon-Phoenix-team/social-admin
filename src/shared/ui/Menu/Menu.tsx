
import s from './Menu.module.scss'
import { MenuItem, MenuItemPropsType } from './MenuItem/MenuItem'

export const Menu = ({ items }: { items: MenuItemPropsType[] }) => {
  
  return (
    <aside className={s.aside}>
      <ul className={s.list}>
        {items.map((item, index) => {
          return (
            <MenuItem
              {...item}
              key={index}
              className={index === 4 ? s.extraSpace : ''}
            />
          )
        })}
      </ul>
    </aside>
  )
}
