import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";

import SpinnerIcon from '@/components/loaders/LoadingSpinner';
const OtpVerfication = () => {
  const [otpValue, setOtpValue] = useState<string>("")
  const [err, setErr] = useState<string>("")

  // const otpSChema = z.object({
  //   otp: z
  //     .string()
  //     .length(6, "OTP must be exactly 6 digits")
  //     .regex(/^[0-9]+$/, "OTP can only contain numeric digits"),
  // });

  // type otpSChema = z.infer<typeof otpSChema>;

  // const form = useForm<otpSChema>({
  //   resolver: zodResolver(otpSChema),
  // });

  // Form submit handler

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (otpValue === "") {
      setErr("Please enter your OTP")
      setTimeout(() => {
        setErr("")
      }, 2000);
    }
    console.log(otpValue);
  };
  const REGEXP_ONLY_DIGITS_AND_CHARS = "^[0-9]+$"
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className='flex justify-center text-1xl mb-6' ><img width="160" height="90" src="./Logo.png" alt="" /></div>
      <div className="sm:w-[400px] w-[340px] h-auto border-insta-border border-[1px] p-4 ">
        <p className=" text-insta-text mb-5 leading-[20px] text-center font-medium text-[14px] font-instagram">
          OTP has been sent to your registered email :
          <span className='text-stone-500' > debugmedia@gmail.com</span>
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



          <Button className='w-full h-[35px] font-poppins  hover:bg-insta-darkLink rounded-md bg-insta-link' type="submit">Send OTP</Button>
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