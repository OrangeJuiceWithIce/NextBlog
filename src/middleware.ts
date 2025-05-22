import {NextRequest,NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import { decrypt } from '@/lib/session';

const publicRoutes=['/']

export default async function middleware(req:NextRequest){
    const path=req.nextUrl.pathname;
    
    const isAuthRoute=path.startsWith('/auth');
    const isPublicRoute=publicRoutes.includes(path);
    const isProtectedRoute=!isPublicRoute&&!isAuthRoute;

    const cookie=(await cookies()).get("session")?.value;
    const session=await decrypt(cookie);

    if(isProtectedRoute&&!session?.userId){
        return NextResponse.redirect(new URL('/auth/login',req.nextUrl))
    }

    if(isAuthRoute&&session?.userId){
        return NextResponse.redirect(new URL('/dashboard',req.nextUrl));
    }

    return NextResponse.next();
}

export const config={
    matcher:['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}