"use client";

import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await http.post(endpoints.auth.forgotPassword,{
        email,
      });

      console.log("this is response->", res)

      toast.success("OTP sent to your email");

      router.push(`/reset-password?email=${email}`)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-1/4 w-[420px] h-[420px] bg-indigo-50 rounded-full opacity-80 blur-[90px]" />
        <div className="absolute -bottom-36 right-1/5 w-[380px] h-[380px] bg-indigo-100/50 rounded-full opacity-70 blur-[90px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
      </div>


      <div className="relative w-full max-w-[420px]">

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-block text-xl font-bold tracking-[0.28em] text-gray-900 hover:text-indigo-600 transition-colors"
          >
            AURUM
          </Link>
        </div>


        <div className="rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm p-8 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">


          <div className="mb-8 text-center sm:text-left">

            <div className="mx-auto sm:mx-0 mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100/80">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-indigo-600"
              >
                <path d="M12 2a10 10 0 1 0 10 10"/>
                <path d="M12 6v6l4 2"/>
              </svg>

            </div>


            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Account Recovery
            </span>


            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              Forgot Password?
            </h1>


            <p className="mt-3 text-sm text-gray-500">
              Enter your email and we&apos;ll send you an OTP to reset your password.
            </p>

          </div>



          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>


            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-600 focus:bg-white"
            />

          </div>



          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-gray-900 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
          >
            {
              loading
              ? "Sending OTP..."
              : "Send Reset Code"
            }

          </button>



          <div className="mt-7 text-center">

            <p className="text-sm text-gray-500">
              Remember your password?
            </p>


            <Link
              href="/login"
              className="mt-2 inline-block text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Back to Login
            </Link>

          </div>


        </div>

      </div>

    </section>
  );
};


export default ForgotPassword;