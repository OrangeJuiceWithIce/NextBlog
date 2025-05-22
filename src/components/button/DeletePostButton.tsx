'use client';

import { deletePost } from "@/app/action/post";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './DeletePostButton.module.css';

export default function DeletePostButton({ postId }: { postId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    
    try {
      const result = await deletePost(postId);
      if (!result.success) {
        alert(result.error);
      } else {
        router.replace('/dashboard/postManagePage')
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`${styles.button} ${isDeleting ? styles.loading : ''}`}
      aria-label="Delete post"
    >
      {!isDeleting && '×'}
    </button>
  )
}