
import s from './Menu.module.scss'
import { MenuItem, MenuItemPropsType } from './MenuItem/MenuItem'
import { usePathname} from 'next/navigation'

export const Menu = ({ items }: { items: MenuItemPropsType[] }) => {

  const pathname = usePathname()
  const shouldHide = pathname.includes('/information')


  return (
    !shouldHide && (
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
)
}
