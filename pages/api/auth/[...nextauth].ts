/* If your [...nextauth].ts file is directly inside the 
pages/api folder without an auth folder, then the URL 
pattern would indeed be /api/*.

In this specific configuration, the [...nextauth].ts file 
would catch all API requests that match the pattern /api/auth/* and handle 
them through NextAuth.js.*/

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {compare} from 'bcrypt';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import prismadb from '../../../libs/prismadb'

import { PrismaAdapter } from "@next-auth/prisma-adapter";


export default NextAuth({
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
                credentials:{
                    email:{
                    label:'Email',
                    type:'text',
                    },
                    password:{
                        label: 'Password',
                        type:'password',
                    }
                },
            async authorize(credentials){
                console.log("in authorize function")
                if (!credentials?.email || !credentials?.password){
                    throw new Error('Email and password required')
                }
                const user = await prismadb.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword){
                    throw new Error('Email does not exist');
                }
                const isCorrectPassword = await compare(credentials.password, 
                    user.hashedPassword);

                    if (!isCorrectPassword){
                        throw new Error("incorrect password");
                    }
                    return user;
            }
        })
    ],
    pages:{
        signIn:'/Auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter : PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session}) {
            console.log(session)
            return session
          }
    }      
})

