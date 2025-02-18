import { db, userTable, eq } from "@/lib/drizzle";
import { authSignInSchema } from "@/lib/zod";
import { publicProcedure } from "../../procedures";
import { tRPCException } from "../../exception";
import {cookies} from 'next/headers';
import { compare } from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { generateAccessToken } from "../../utils";

export const authSignInMutation = publicProcedure
.input(authSignInSchema)
.mutation(async({input})=>{
  try{
    const {username, password}=input

    const {user} = await db.transaction(async tx=>{
        const users = await tx
        .select()
        .from (userTable)
        .where(eq(userTable.username, username))

        const user =users[0]
        if(!user){
            throw new TRPCError({
                code:'CONFLICT',
                message:`Нэвтрэх нэр эсвэл нууц үгээ шалгана уу`,
            })
        }
        return{
            user,
        }
    })
        const isPasswordEqual= await compare(password, user.password)
    
        if(!isPasswordEqual){
            throw new TRPCError({
                code:'CONFLICT',
                message:`Нэвтрэх нэр эсвэл нууц үгээ шалгана уу`,
            })
        }
        const accessToken = await generateAccessToken({
            userId: user.id
        })

        const cookie= await cookies()

        cookie.set('access_token ', accessToken, {
            httpOnly: true
        });

        return{
            user,
        };
        
  } catch (error) {
    console.error(error);
    throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Сервер дээр алдаа гарлаа. Дахин оролдож үзнэ үү.',
    });
}
});