"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-600";

const inputClass =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

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
    <section className="min-h-dvh flex items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-block text-base font-semibold tracking-[0.18em] text-gray-900 transition hover:text-gray-600"
          >
            AURUM
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
          <div className="mb-6">
            <span className="eyebrow mb-2 block">Secure Account</span>

            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Reset Password
            </h1>

            <p className="mt-1 text-[13px] text-gray-500">
              Enter the OTP sent to your email and create a new password.
            </p>
          </div>

          {/* OTP */}
          <div className="mb-4">
            <label className={labelClass}>
              Verification Code
            </label>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              placeholder="000000"
              className="w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-center text-base font-medium tracking-[0.4em] text-gray-900 outline-none transition placeholder:font-normal placeholder:text-gray-300 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className={labelClass}>
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter new password"
              className={inputClass}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={inputClass}
            />
          </div>

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="mt-5 h-10 w-full cursor-pointer rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-900"
          >

            {
              loading
              ? "Resetting..."
              : "Reset Password"
            }

          </button>
        </div>

        <p className="mt-5 text-center text-[13px] text-gray-500">
          <Link
            href="/login"
            className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};


export default ResetPassword;
