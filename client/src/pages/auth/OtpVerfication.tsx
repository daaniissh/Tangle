import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/InputOtp"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


import SpinnerIcon from '@/components/loaders/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';
import { OTPResponse } from '@/types/api/auth';
import { useNavigate } from 'react-router-dom';
type OTP = {
  otpValue: string;
};
const OtpVerfication = () => {
  const [otpValue, setOtpValue] = useState<string>("")
  const [err, setErr] = useState<string>("")
  const Navigate = useNavigate()
  const APIURL = import.meta.env.VITE_API_URL;
  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ otpValue }: OTP) => {
      try {
        const res = await fetch(`${APIURL}/auth/otp`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ otpNumber: otpValue, error }),
          credentials: 'include',
        })


        const data: OTPResponse = await res.json();

        if (!res.ok || 'error' in data) {
          throw new Error(data.error || 'An unknown error occurred');
        }

        console.log('User created:', data.user);
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      // toast.success("Account created successfully")
      Navigate("/resetpassword")
    }
  })
  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (otpValue === "") {
      setErr("Please enter your OTP")
      setTimeout(() => {
        setErr("")
      }, 2000);
    }
    console.log(otpValue);
    mutate({ otpValue })
  };
  const REGEXP_ONLY_DIGITS_AND_CHARS = "^[0-9]+$"
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* <div className='flex justify-center text-1xl mb-6' ><img width="160" height="90" src="./Logo.png" alt="" /></div> */}
      <div className="sm:w-[400px] w-[340px] h-auto border-insta-border border-[1px] p-4 ">
        <p className=" text-insta-text mb-5 leading-[20px] dark:text-white text-center font-medium text-[14px] font-instagram">
          OTP has been sent to your registered email 
        </p>
        <div className='bg-insta-border w-full h-[0.5px] mb-4' ></div>

        <form onSubmit={(e) => handleOtp(e)} className="space-y-3 flex flex-col w-full justify-center items-center">


          <InputOTP maxLength={6} value={otpValue}
            onChange={(value) => setOtpValue(value)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup> <InputOTPSlot index={0} />  </InputOTPGroup>
            <InputOTPGroup> <InputOTPSlot index={1} />  </InputOTPGroup>
            <InputOTPGroup> <InputOTPSlot index={2} />  </InputOTPGroup>
            <InputOTPGroup> <InputOTPSlot index={3} />  </InputOTPGroup>
            <InputOTPGroup> <InputOTPSlot index={4} />  </InputOTPGroup>
            <InputOTPGroup> <InputOTPSlot index={5} />  </InputOTPGroup>

          </InputOTP>
          <p className='text-[13px] font-instagram font-medium text-red-500 dark:text-red-900' >{err}</p>



          <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">{isPending ? <SpinnerIcon /> : "Confirm"}</Button>
          <p className='!text-left font-instagram text-[12px] font-medium cursor-pointer text-insta-link' >Resend OTP</p>
        </form>

      </div>
      {/* <div className="flex justify-center items-center w-[340px] mt-3  h-[78px] border-insta-border border-[1px]">
        <p className='text-[15px] font-thin font-instagram' >Don't have account?<a href="" className='text-insta-link font-medium' > Sign Up</a></p>
      </div> */}

    </div>
  )
}

export default OtpVerfication