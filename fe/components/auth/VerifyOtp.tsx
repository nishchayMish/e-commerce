"use client";

import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const router = useRouter();

  const handleVerify = async () => {
    if (!userId) {
      toast.error("user id is required");
      return;
    }
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      const payload = {
        id: userId,
        otp,
      };
      await http.post(endpoints.auth.verifyUser, payload);
      router.push("/login");
      toast.success("user verified successfully");
    } catch (error) {
      console.log(error);
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
            <span className="eyebrow mb-2 block">Security check</span>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Enter OTP
            </h1>
            <p className="mt-1 text-[13px] text-gray-500">
              Enter the 6-digit code sent to your email.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-gray-600">
              OTP
            </label>
            <div className="relative flex items-center justify-between">
              <input
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="••••••"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                className="peer absolute inset-0 z-10 h-full w-full cursor-text bg-transparent opacity-0 outline-none"
              />
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  aria-hidden
                  className={`flex h-11 w-11 items-center justify-center rounded-lg border bg-white text-base font-medium text-gray-900 transition ${
                    otp.length === index
                      ? "border-gray-200 peer-focus:border-gray-900 peer-focus:ring-4 peer-focus:ring-gray-900/5"
                      : "border-gray-200"
                  }`}
                >
                  {otp[index] ?? ""}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
            className="mt-5 h-10 w-full cursor-pointer rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-900"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>

        <p className="mt-5 text-center text-[13px] text-gray-500">
          Didn&apos;t receive OTP?{" "}
          <button className="cursor-pointer font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900">
            Resend
          </button>
        </p>
      </div>
    </section>
  );
};

export default VerifyOtp;
