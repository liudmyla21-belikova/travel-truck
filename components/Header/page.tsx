'use client';

import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Link from 'next/link';
import Container from '../Container/page';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <Link href="/">
            <svg width="136" height="16">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </Link>
          <nav>
            <ul className={css.navigation}>
              <li>
                <Link href="/" className={pathname === '/' ? css.active : css.navigationItem}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={pathname === '/catalog' ? css.active : css.navigationItem}
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
