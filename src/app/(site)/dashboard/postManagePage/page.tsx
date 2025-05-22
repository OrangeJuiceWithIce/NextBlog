import { verifySession } from "@/lib/session";
import {redirect} from "next/navigation"
import {prisma} from "@/lib/db";
import CreatePostButton from "@/components/button/CreatePostButton";
import { Suspense } from "react";
import PostList from "@/components/PostList";

import styles from "./styles.module.css";
import PostEditArea from "@/components/PostEditArea";

export default async function PostManagePage() {
    const result=await verifySession();
    if(!result.isAuth||!result.userId){
        redirect("/auth/login");
    }

    const posts=await prisma.post.findMany({
        where:{authorId:result.userId},
        select:{
            id:true,
            title:true,
        }
    })

    return(
        <>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1 className={styles.title}>Post Manage</h1>
                    <CreatePostButton userId={result.userId}/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PostList posts={posts}/>
                    </Suspense>
                </div>
                <div className={styles.right}>
                    <PostEditArea userId={result.userId}/>
                </div>
            </div>
        </>
    )
}