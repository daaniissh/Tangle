import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import { SignUpSchema } from '@/schemas/SignupSchemas';

import Cirql from '@/logos/Cirql';
import { useMutation } from '@tanstack/react-query';
import { SignupResponse } from '@/types/api/auth';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const APIURL = import.meta.env.VITE_API_URL;
    const Navigate = useNavigate()
  
  console.log(APIURL)
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }: SignUpSchema) => {
      try {
        const res = await fetch(`${APIURL}/auth/signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, username, fullName, password, error }),
          credentials: 'include',


        })

        const data: SignupResponse = await res.json();

        if (!res.ok || 'error' in data) {
          throw new Error(data.error || 'An unknown error occurred');
        }

        console.log('User created:', data.user);
        return data
      } catch (error) {
        // toast.error(error.message)
        throw error
      }

    },
    onSuccess: () => {
      // toast.success("Account created successfully")
      Navigate("/")
    }
  })

  const onSubmit = (data: SignUpSchema) => {
    mutate(data)
    console.log("Form data:", data);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[340px] h-auto dark:border-stone-700 border-insta-border border-[1px] p-8 ">
        <div className='gap-4 flex justify-center flex-col items-center  mb-5' >
          <Cirql className="dark:fill-white fill-black" />
          <p className='text-center text-[13px] font-[500] dark:text-white text-insta-text leading-4 px-4 font-instagram'>Sign up to see photos and videos
            from your friends.</p>
        </div>
        <div className='bg-insta-border w-full h-[0.5px] mb-5' ></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField

              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='font-poppins font-[400] bg-insta-background  text-[12px]' placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />
            <FormField

              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='font-poppins font-[400] bg-insta-background  text-[12px]' placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />
            <FormField

              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='font-poppins font-[400] bg-insta-background  text-[12px]' placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className='font-poppins font-[400] bg-insta-background text-[12px]' type='Password' placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />
            <p className='text-insta-text font-poppins dark:text-white text-[12px] text-center mb-8 px-5' >People who use our service may have uploaded
              your contact information to instagram. Learn</p>
            <p className='text-insta-text dark:text-white font-poppins text-[12px] text-center mb-8 px-5' >By signing up, you agree to out Terms, Privacy
              Policy and Cookies Policy</p>
            <Button className=' w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">{isPending ? <SpinnerIcon /> : "Sign up"}</Button>
            {isError && <p className='text-red-500'>{error?.message}</p>}
          </form>
        </Form>
      </div>
      <div className="flex justify-center items-center w-[340px] mt-3 dark:border-stone-700 h-[78px] border-insta-border border-[1px]">
        <p className='text-[15px] font-thin font-instagram text-insta-text dark:text-gray-300' >Have an account?<a href="" className='text-insta-link font-medium' > Log In</a></p>
      </div>

    </div>
  )
}

export default SignUp