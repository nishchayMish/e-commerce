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
    <section className="min-h-dvh flex items-center justify-center bg-[#fafafa] px-4 py-12">
      <div className="w-full max-w-sm">
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
            <span className="eyebrow mb-2 block">Account Recovery</span>

            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Forgot Password?
            </h1>

            <p className="mt-1 text-[13px] text-gray-500">
              Enter your email and we&apos;ll send you an OTP to reset your password.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-gray-600">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
            />
          </div>

          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="mt-5 h-10 w-full cursor-pointer rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-900"
          >
            {
              loading
              ? "Sending OTP..."
              : "Send Reset Code"
            }

          </button>
        </div>

        <p className="mt-5 text-center text-[13px] text-gray-500">
          Remember your password?{" "}
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


export default ForgotPassword;
