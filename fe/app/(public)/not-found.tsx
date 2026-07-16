import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
        Page not found
      </h1>
      <p className="text-sm text-gray-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
