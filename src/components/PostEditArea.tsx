'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './PostEditArea.module.css'
import { updatePost } from '@/app/action/post'
import { useActionState } from 'react'
import useSWR from 'swr'

const initialState={
    message:"",
}

export default function PostEditArea({ userId }: {userId:number}) {
  const searchParams = useSearchParams()
  const rawPostId = searchParams.get('postId')
  const postId = rawPostId ? parseInt(rawPostId, 10) : null
  const isValidePostId = postId !== null && !isNaN(postId)
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const updatePostWithId = updatePost.bind(null,isValidePostId?postId:0);
  const [state,formAction]=useActionState(updatePostWithId,initialState);
  
  const {data,error,isLoading}=useSWR(
    isValidePostId?
    `/api/post/${postId}`:null,
    async(url:string)=>{
        const res=await fetch(url);
        if(res.ok){
            return res.json();
        }else{
            throw new Error("Failed to fetch data");
        }
    },
    {
        onSuccess: (data) => {
          setTitle(data.title);
          setContent(data.content);
        },
    }
  )

  if (!rawPostId) return <div className={styles.placeholder}>请选择一篇文章进行编辑</div>
  if (!isValidePostId) return <div className={styles.error}>wrong post ID</div>


  return (
    <form action={formAction} className={styles.editForm}>
      {error && <div className={styles.error}>{error.message}</div>}
      {isLoading? (<div>isLoading...</div>):(
        <>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="文章标题"
                className={styles.titleInput}
                disabled={isLoading}
            />
            
            <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="文章内容"
                className={styles.contentInput}
                disabled={isLoading}
            />
            
            <button
                type="submit"
                className={styles.saveButton}
                disabled={isLoading}
            >
                保存
            </button>
        </>
      )}
    </form>
  )
}