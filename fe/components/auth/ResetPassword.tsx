"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

const ResetPassword = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleResetPassword = async () => {
    if (!otp || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

        await http.post(endpoints.auth.resetPassword,{
            email,
            otp,
            password
        })

        router.push("/login")

      toast.success("Password reset successfully");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">


      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-28 left-1/4 w-[420px] h-[420px] bg-indigo-50 rounded-full opacity-80 blur-[90px]" />

        <div className="absolute -bottom-36 right-1/5 w-[380px] h-[380px] bg-indigo-100/50 rounded-full opacity-70 blur-[90px]" />

        <div className="grid-bg absolute inset-0 opacity-40" />

      </div>



      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-8 text-center">

          <Link
            href="/"
            className="inline-block text-xl font-bold tracking-[0.28em] text-gray-900 hover:text-indigo-600 transition-colors"
          >
            AURUM
          </Link>

        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white/90 backdrop-blur-sm p-8 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">



          <div className="mb-8">


            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5 text-indigo-600"
              >
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <rect width="18" height="12" x="3" y="11" rx="2" />
              </svg>

            </div>



            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Secure Account
            </span>


            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Reset Password
            </h1>


            <p className="mt-3 text-sm text-gray-500">
              Enter the OTP sent to your email and create a new password.
            </p>


          </div>





          {/* OTP */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Verification Code
            </label>


            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="000000"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-center text-2xl tracking-[0.5em] font-semibold text-gray-900 outline-none transition focus:bg-white focus:border-indigo-600 placeholder:text-gray-300"
            />

          </div>





          {/* Password */}
          <div className="mb-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>


            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:border-indigo-600 placeholder:text-gray-400"
            />

          </div>





          {/* Confirm Password */}
          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>


            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:border-indigo-600 placeholder:text-gray-400"
            />

          </div>





          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >

            {
              loading
              ? "Resetting..."
              : "Reset Password"
            }

          </button>





          <div className="mt-7 text-center">

            <Link
              href="/login"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Back to Login
            </Link>

          </div>



        </div>


      </div>


    </section>
  );
};


export default ResetPassword;