'use client';

import { PostListItem } from "@/types/post";
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import DeletePostButton from './button/DeletePostButton';

import styles from './PostList.module.css';

export default function PostList({posts}:{posts:PostListItem[]}){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSelect = (postId: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('postId', postId.toString())
        router.replace(`${pathname}?${params.toString()}`)
    }

    return(
        <ul className={styles.container}>
            <p className={styles.title}>Your Posts</p>
            {posts.map(post=>(
                <li key={post.id} className={styles.listItem}>
                    <div onClick={() => handleSelect(post.id)}>
                        {post.title}
                    </div>
                    <div>
                        <DeletePostButton postId={post.id}></DeletePostButton>
                    </div>
                </li>
            ))}
        </ul>
    )
}