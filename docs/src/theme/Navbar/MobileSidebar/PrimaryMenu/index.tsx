import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';

type NavbarItemConfig = {
  label?: string;
  to?: string;
  href?: string;
};

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const {pathname} = useLocation();
  const items = (useThemeConfig().navbar.items as NavbarItemConfig[]).filter(
    (item) => item.label && (item.to || item.href),
  );

  return (
    <ul className="menu__list navbar-sidebar__menu-list">
      {items.map((item, index) => (
        <li key={index} className="menu__list-item navbar-sidebar__menu-item">
          {item.to ? (
            <Link
              className={`menu__link navbar-sidebar__menu-link${
                pathname === item.to ? ' menu__link--active' : ''
              }`}
              to={item.to}
              onClick={() => mobileSidebar.toggle()}>
              {item.label}
            </Link>
          ) : (
            <a
              className="menu__link navbar-sidebar__menu-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => mobileSidebar.toggle()}>
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
