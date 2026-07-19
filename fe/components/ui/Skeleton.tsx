interface SkeletonProps {
  className?: string;
}

/** YouTube-style bone — shine sweeps via .skeleton in globals.css */
export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden />;
}
