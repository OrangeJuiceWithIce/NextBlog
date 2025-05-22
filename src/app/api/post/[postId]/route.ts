import {prisma} from '@/lib/db'
export async function GET(
    request:Request,
    {params}:{params:Promise<{postId:string}>}
){
    const {postId}=await params;
    const intPostId = parseInt(postId, 10);

    const post=await prisma.post.findUnique({
        where:{id:intPostId},
        select:{
            title:true,
            content:true,
            authorId:true,
        },
    });

    if(!post){
        return new Response('Post not found',{status:404});
    }

    return Response.json(post);
}