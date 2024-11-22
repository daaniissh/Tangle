import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../../schemas/LoginSchema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

import SpinnerIcon from '@/components/loaders/LoadingSpinner';
const EmailSend = () => {

  const emailSchema = z.object({
    email: z.string().email("Invalid email address")
  });

  type emailSchema = z.infer<typeof emailSchema>;

  const form = useForm<emailSchema>({
    resolver: zodResolver(emailSchema),
  });

  // Form submit handler

  const onSubmit = (data: emailSchema) => {
    console.log("Form data:", data);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className='flex justify-center text-1xl mb-6' ><img width="160" height="90" src="./Logo.png" alt="" /></div>
      <div className="sm:w-[400px] w-[340px] h-auto border-insta-border border-[1px] p-4 ">
      <p className="mb-5 leading-[20px] text-center font-medium text-[14px] text-gray-500 font-instagram">
    Enter your email address to receive a One-Time Password (OTP) for secure access. Please check your inbox after submitting the form.
  </p>
  <div className='bg-insta-border w-full h-[0.5px] mb-7' ></div>
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

export default EmailSend