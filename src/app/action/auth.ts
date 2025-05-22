"use server";

import {prisma} from "@/lib/db";
import {z} from "zod";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function createUser(prevState:{message:string},formData:FormData){
    const schema=z.object({
        name:z.string().min(2).max(50),
        email:z.string().email(),
        password:z.string().min(8).max(20)
    })

    const parse=schema.safeParse({
        name:formData.get("name"),
        email:formData.get("email"),
        password:formData.get("password"),
    })

    if(!parse.success){
        return {
            message:"Failed to parse register formdata",
        }
    }

    const data=parse.data;
    const existingUser=await prisma.user.findUnique({
        where:{email:data.email},
    });
    if(existingUser){
        return {
            message:"User already exists",
        }
    }

    await prisma.user.create({
        data:{
            email:data.email,
            password:await bcrypt.hash(data.password,10),
            name:data.name,
        }
    })

    redirect("/auth/login");
    // return {message:"User created successfully"};
}

export async function checkUser(prevState:{message:string},formData:FormData){
    const schema=z.object({
        email:z.string().email(),
        password:z.string().min(8).max(20),
    })

    const parse=schema.safeParse({
        email:formData.get("email"),
        password:formData.get("password"),
    })

    if(!parse.success){
        return {message:"Failed to parse login formdata"}
    }

    const data=parse.data;
    const user=await prisma.user.findUnique({
        where:{email:data.email},
    });
    if(!user){
        return {message:"User not found"}
    }

    const valid=await bcrypt.compare(data.password,user.password);
    if(!valid){
        return {message:"Invalid password"}
    }

    await createSession(user.id);
    redirect("/dashboard");
    // return {message:"Login successful"};
}

export async function logout(){
    await deleteSession();
    redirect("/auth/login");
}