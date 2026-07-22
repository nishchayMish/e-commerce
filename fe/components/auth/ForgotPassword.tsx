"use client";

import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);

      // API call here
      // await resendOTP()
    } catch (error) {
      console.log(error);
    } finally {
      setResendLoading(false);
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
                aria-hidden
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              </svg>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Almost there
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              Verify Your Email
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              We sent a 6-digit code to your email address.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="••••••"
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50 px-4 text-center text-2xl font-semibold tracking-[0.4em] text-gray-900 outline-none transition-all duration-200 placeholder:tracking-[0.4em] placeholder:text-gray-300 hover:border-gray-300 focus:border-indigo-600 focus:bg-white"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="mt-6 w-full h-12 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-gray-900 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">Didn&apos;t receive the code?</p>
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="mt-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
