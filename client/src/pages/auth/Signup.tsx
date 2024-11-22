import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpinnerIcon from '@/components/Loader/loading_spinner';
import { SignUpSchema } from '@/schemas/signup_schema';
const SignUp = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  // Form submit handler

  const onSubmit = (data: SignUpSchema) => {
    console.log("Form data:", data);
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[340px] h-auto border-insta-border border-[1px] p-8 ">
        <div className='gap-4 flex justify-center flex-col items-center  mb-5' ><img width="160" height="90" src="./Logo.png" alt="" />
        <p  className='text-center text-[13px] font-[500] text-insta-text leading-4 px-4 font-instagram'>Sign up to see photos and videos 
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
                  <FormMessage  className='text-[10px] font-instagram' />
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
                  <FormMessage  className='text-[10px] font-instagram' />
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
                  <FormMessage  className='text-[10px] font-instagram' />
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
            <p className='text-insta-text font-poppins text-[12px] text-center mb-8 px-5' >People who use our service may have uploaded
            your contact information to instagram. Learn</p>
            <p className='text-insta-text font-poppins text-[12px] text-center mb-8 px-5' >By signing up, you agree to out Terms, Privacy
            Policy and Cookies Policy</p>
            <Button className=' w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">Sign Up</Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-center items-center w-[340px] mt-3  h-[78px] border-insta-border border-[1px]">
        <p className='text-[15px] font-thin font-instagram text-insta-text' >Have an account?<a href="" className='text-insta-link font-medium' > Log In</a></p>
      </div>

    </div>
  )
}

export default SignUp