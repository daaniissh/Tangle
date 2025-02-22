import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ResetResponse } from '@/types/api/auth';
const ResetPassword = () => {
  const APIURL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate()
  const passSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  type passSchema = z.infer<typeof passSchema>;
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async ({ password, confirmPassword }: passSchema) => {
      try {
        const res = await fetch(`${APIURL}/auth/resetpassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ confirmPassword, password }),
          credentials: 'include',
        })

        if (!res.ok) {
          // Handle HTTP errors (non-2xx status codes)
          const errorData = await res.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }

        // Parse the response JSON for the login data
        const data: ResetResponse = await res.json();

        console.log('User logged in:', data.user);
        return data;
      } catch (error) {
        // toast.error(error.message)
        throw error
      }

    },
    onSuccess: () => {
      Navigate("/")

    }
  })
  const form = useForm<passSchema>({
    resolver: zodResolver(passSchema),
  });

  // Form submit handler

  const onSubmit = (data: passSchema) => {
    console.log("Form data:", data);
    mutate(data)
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">

      <div className='flex justify-center text-1xl mb-6' ><img width="160" height="90" src="./Logo.png" alt="" /></div>
      <div className="sm:w-[400px] w-[340px] h-auto border-insta-border border-[1px] p-4 ">
        <h1 className='text-center text-2xl font-medium font-poppins text-insta-text p-5' >Reset Password</h1>
        <div className='bg-insta-border w-full h-[0.5px] mb-7' ></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField

              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' className='font-poppins font-[400] bg-insta-background  text-[12px]' placeholder="New password" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />
            <FormField

              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" className='font-poppins font-[400] bg-insta-background  text-[12px]' placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage className='text-[10px] font-instagram' />
                </FormItem>
              )}
            />

            <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">{isPending ? <SpinnerIcon /> : "Confirm"}</Button>
          </form>
        </Form>
      </div>
      {/* <div className="flex justify-center items-center w-[340px] mt-3  h-[78px] border-insta-border border-[1px]">
        <p className='text-[15px] font-thin font-instagram' >Don't have account?<a href="" className='text-insta-link font-medium' > Sign Up</a></p>
      </div> */}

    </div>
  )
}
export default ResetPassword
