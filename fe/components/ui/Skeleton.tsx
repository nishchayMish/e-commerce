interface SkeletonProps {
  className?: string;
}

/** Neutral loading bone — shine sweeps via .skeleton in globals.css */
export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden />;
}
