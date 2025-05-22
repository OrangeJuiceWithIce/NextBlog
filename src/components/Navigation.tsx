'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from './Navigation.module.css'

export default function Navigation({ isAuth }: {isAuth:boolean}) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className={styles.navigation}>
      <ul>
        <li className={isActive('/') ? styles.active : ''}>
          <Link href="/">HomePage</Link>
        </li>
        {!isAuth ? (
          <>
            <li className={isActive('/auth/register') ? styles.active : ''}>
              <Link href="/auth/register">Register</Link>
            </li>
            <li className={isActive('/auth/login') ? styles.active : ''}>
              <Link href="/auth/login">Login</Link>
            </li>
          </>
        ) : (
          <li className={isActive('/dashboard') ? styles.active : ''}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}