'use client';

import { createPost } from "@/app/action/post"

import styles from './CreatePostButton.module.css';

export default function CreatePostButton({userId}:{userId:number}) {
    return(
        <div onClick={()=>createPost(userId)} className={styles.button}>
            Create Post
        </div>
    )
}