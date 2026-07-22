"use client";

import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
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
    if(!userId){
      toast.error("user id is required")
      return;
    }
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      const payload = {
        id: userId,
        otp
      }
      await http.post(endpoints.auth.verifyUser, payload)
      router.push("/login");
      toast.success("user verified successfully")
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Enter OTP
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Enter the 6 digit OTP sent to your email
          </p>
        </div>


        <div>
          <label className="text-sm font-medium text-gray-700">
            OTP
          </label>

          <input
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            placeholder="123456"
            maxLength={6}
            className="
              mt-2
              w-full
              h-14
              rounded-xl
              border
              border-gray-300
              px-4
              text-center
              text-2xl
              tracking-[10px]
              outline-none
              focus:border-black
            "
          />
        </div>


        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="
            mt-6
            w-full
            h-12
            rounded-xl
            bg-black
            text-white
            font-medium
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>


        <div className="mt-6 text-center text-sm text-gray-500">
          Didn&apos;t receive OTP?
          <button
            className="
              ml-1
              font-medium
              text-black
              underline
            "
          >
            Resend
          </button>
        </div>

      </div>

    </div>
  );
};

export default VerifyOtp;