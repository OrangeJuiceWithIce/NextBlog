'use client';

import { logout } from "@/app/action/auth";

import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  return (
    <div onClick={()=>logout()} className={styles.logoutButton}>
      Logout
    </div>
  )
}