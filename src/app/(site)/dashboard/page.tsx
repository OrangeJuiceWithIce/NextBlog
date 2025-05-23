import LogoutButton from '@/components/button/LogoutButton'
import Link from 'next/link'
import { verifySession } from '@/lib/session'
import {redirect} from 'next/navigation'
import {prisma} from '@/lib/db'
import { deleteSession } from '@/lib/session'
import { Suspense } from 'react'

import styles from './styles.module.css'
import { logout } from '@/app/action/auth'

async function UserInfo(){
    const result = await verifySession()
    if(!result.isAuth||!result.userId){
        redirect('/auth/login');
    }

    const user=await prisma.user.findUnique({
        where:{id:result.userId},
    });
    if(!user){
        redirect('/auth/login');
    }

    return <p>Welcome {user.name}!</p>
}

export default function Dashboard() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.greeting}>
                <Suspense fallback={<div>Loading...</div>}>
                    <UserInfo/>
                </Suspense>
            </div>
            <ul className={styles.menu}>
                <li><LogoutButton /></li>
                <li><Link href="/dashboard/profileManagePage">Manage Your Profile</Link></li>
                <li><Link href="/dashboard/postManagePage">Manage Your Post</Link></li>
                <li><Link href="/dashboard/subscriptionPage">Manage Your Subscription</Link></li>
            </ul>
        </div>
        <div className={styles.right}>
            还没想好写啥
        </div>
    </div>
  )
}