'use server';

import {prisma} from '@/lib/db';
import { revalidatePath } from 'next/cache';
import {z} from 'zod';

export async function createPost(userId:number) {
    try{
        const newPost = await prisma.post.create({
            data:{        
                title: 'Blank Post',
                content: 'write something here',
                published: true,
                authorId:userId,
            }
        })
        revalidatePath('/dashboard/postManagePage');
        return {
            success:true,
            error:null,
            message:"Post created successfully",
            data:newPost,
        };
    }catch(error){
        return{
            success:false,
            error:error,
            message:"Failed to create post",
            data:null,
        }
    }
}

//更新post
export async function updatePost(postId:number,prevState:{message:string},formData:FormData) {
    const schema=z.object({
        title:z.string().min(1).max(100),
        content:z.string().min(0).max(10000),
    })

    const parse=schema.safeParse({
        title:formData.get('title'),
        content:formData.get('content'),
    })

    if(!parse.success){
        return{
            success:false,
            error:parse.error,
            message:"Failed to parse form data",
            data:null,
        };
    }

    const data=parse.data;
    try{
        await prisma.post.update({
            where:{id:postId},
            data:data,
        })
        
        revalidatePath("/dashboard/postManagePage");
        return{message:"Post updated successfully"};
    }catch(error){
        return{
            success:false,
            error:error,
            message:"Failed to update post",
            data:null,
        };
    }
}

//删除post
export async function deletePost(postId:number){
    try{
        await prisma.post.delete({
            where:{id:postId},
        })

        revalidatePath("/dashboard/postManagePage");
        return{
            success:true,
            error:null,
            message:"Post deleted successfully",
            data:null,
        };
    }catch(error){
        return{
            success:false,
            error:error,
            message:"Failed to delete post",
            data:null,
        };
    }
}