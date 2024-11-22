import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../../schemas/login_schema";
<<<<<<< HEAD
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
=======
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpinnerIcon from '@/components/Loader/loading_spinner';
>>>>>>> f58bf532e96780d60f90a57cac022b18d982480c
const Login = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Form submit handler

  const onSubmit = (data: LoginSchema) => {
    console.log("Form data:", data);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[340px] h-auto border-insta-border border-[1px] p-8 ">
        <div className='flex justify-center text-1xl mb-14' ><img width="160" height="90" src="./Logo.png" alt="" /></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
            <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">Log in</Button>
            <p className='text-center font-[400] font-instagram  text-[13px] hover:text-insta-link cursor-pointer' >Forgot password</p>
          </form>
        </Form>
      </div>
      <div className="flex justify-center items-center w-[340px] mt-3  h-[78px] border-insta-border border-[1px]">
        <p className=' text-insta-text text-[15px] font-thin font-instagram' >Don't have account?<a href="" className='text-insta-link font-medium' > Sign Up</a></p>
      </div>

    </div>
  )
}

export default Login