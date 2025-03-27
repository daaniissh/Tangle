
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../../schemas/LoginSchemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import Cirql from '@/logos/cirql';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginResponse } from '@/types/api/auth';
import { Link } from 'react-router-dom';
import { QueryKey } from '@/types/QueryKey/key';

const Login = () => {
  const APIURL = import.meta.env.VITE_API_URL;


  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ password, username }: LoginSchema) => {
      try {
        const res = await fetch(`${APIURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include',
        })

        if (!res.ok) {
          // Handle HTTP errors (non-2xx status codes)
          const errorData = await res.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }

        // Parse the response JSON for the login data
        const data: LoginResponse = await res.json();

        console.log('User logged in:', data.user);
        return data;
      } catch (error) {
        // toast.error(error.message)
        throw error
      }

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] as QueryKey })

    }
  })


  const onSubmit = (data: LoginSchema) => {
    console.log("Form data:", data);
    mutate(data)
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[340px] h-auto  dark:border-stone-700 border-insta-border border-[1px] p-8 ">
        <div className='flex justify-center text-1xl mb-14' >     <Cirql className="dark:fill-white fill-black" /></div>
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
            <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">{isPending ? <SpinnerIcon /> : "Log in"}</Button>
            <Link to="/emailverification"> <p className='text-center mt-3 font-[400] font-instagram dark:text-insta-link  text-[13px] hover:text-insta-link cursor-pointer'>Forgot password</p></Link>
          </form>
        </Form>
      </div>
      <div className="flex justify-center  dark:border-stone-700 items-center w-[340px] mt-3  h-[78px] border-insta-border border-[1px]">
        <p className=' text-insta-text dark:text-gray-300 text-[15px] font-thin font-instagram' >Don't have account?<Link to="/signup" className='text-insta-link font-medium' > Sign Up</Link></p>
      </div>

    </div>
  )
}

export default Login