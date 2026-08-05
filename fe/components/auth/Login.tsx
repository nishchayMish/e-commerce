"use client";

import { useAuth } from "@/hooks/useAuth";
import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-600";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await http.post(endpoints.auth.login, formData);
    setUser(res.data.user);
    if (res.status === 200) {
      const redirect = searchParams.get("redirect");
      const safeRedirect =
        redirect && redirect.startsWith("/") && !redirect.startsWith("//")
          ? redirect
          : "/";
      router.push(safeRedirect);
      toast.success("Login successful");
    }

    setFormData({
      email: "",
      password: "",
    });
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
            <span className="eyebrow mb-2 block">Welcome back</span>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">
              Sign in
            </h1>
            <p className="mt-1 text-[13px] text-gray-500">
              Continue shopping curated essentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-[13px] font-medium text-gray-600"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] text-gray-500 transition hover:text-gray-900"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
                required
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer select-none items-center gap-2 text-[13px] text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-gray-900 outline-none focus:ring-4 focus:ring-gray-900/5"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="h-10 w-full cursor-pointer rounded-lg bg-gray-900 text-[13px] font-medium text-white transition hover:bg-gray-800 active:scale-[0.99] disabled:opacity-50"
            >
              Sign In
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">Or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-900 transition hover:border-gray-300 hover:bg-gray-50"
          >
            <Image
              width={16}
              height={16}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-4 w-4"
            />
            Continue with Google
          </button>
        </div>

        <p className="mt-5 text-center text-[13px] text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
