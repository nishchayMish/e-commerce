"use client";

import { useAuth } from "@/hooks/useAuth";
import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const inputClass =
  "w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

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
      router.push("/");
      toast.success("Login successful");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 w-[480px] h-[480px] bg-indigo-50 rounded-full opacity-80 blur-[90px]" />
        <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] bg-indigo-100/60 rounded-full opacity-70 blur-[90px]" />
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
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Welcome back
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Continue shopping curated essentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
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
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
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
              <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600/20"
                />
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-indigo-600 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Or
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <Image
              width={20}
              height={20}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
