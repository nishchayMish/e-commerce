import VerifyOtp from "@/components/auth/VerifyOtp"
import { Suspense } from "react";
const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  )
}

export default page