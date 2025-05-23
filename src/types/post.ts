export type Post={
    id:number,
    title:string,
    content?:string,
    published:boolean,
    authorId:number,
}

export type PostListItem={
    id:number,
    title:string,
}