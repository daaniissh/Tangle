import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

<<<<<<< HEAD
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
=======
import SpinnerIcon from '@/components/Loader/loading_spinner';
>>>>>>> f58bf532e96780d60f90a57cac022b18d982480c
const ResetPassword = () => {

  const passSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  type passSchema = z.infer<typeof passSchema>;

  const form = useForm<passSchema>({
    resolver: zodResolver(passSchema),
  });

  // Form submit handler

  const onSubmit = (data: passSchema) => {
    console.log("Form data:", data);
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

            <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">Send OTP</Button>
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