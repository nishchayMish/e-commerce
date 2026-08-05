import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 pb-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">
        404
      </p>
      <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-500 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
