"use client";

import { useState } from "react";

const VerifyEmail = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            We have sent a 6 digit OTP to your email address
          </p>
        </div>


        <div>
          <label className="text-sm font-medium text-gray-700">
            Enter OTP
          </label>

          <input
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="123456"
            className="
              mt-2
              w-full
              h-12
              rounded-lg
              border
              border-gray-300
              px-4
              text-center
              text-xl
              tracking-[8px]
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
            rounded-lg
            bg-black
            text-white
            font-medium
            disabled:opacity-50
          "
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>


        <div className="text-center mt-5">

          <p className="text-sm text-gray-500">
            Didn&apos;t receive OTP?
          </p>

          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="
              mt-2
              text-sm
              font-medium
              underline
              disabled:opacity-50
            "
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default VerifyEmail;