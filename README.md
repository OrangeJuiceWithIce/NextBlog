# NextBlog
If you want to run this project locally, follow these steps:  
1.git clone  
2.install dependencies
```
npm install
```
3.create a.env file in the root directory of the project,add variables according to.env.example  
4.run prisma migration
```
npx prisma migrate dev
```
5.finally, run the project
```
npm run dev
```
## functions
- User authentication and authorization  
- CRUD operations for posts  

## to be completed
- search function for other users' posts and comments  
- subscribe to other users  