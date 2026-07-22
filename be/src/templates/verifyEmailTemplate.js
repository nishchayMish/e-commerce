export const verifyEmailTemplate = (otp) => `
  <h2>Email Verification</h2>

  <p>Your OTP is:</p>

  <h1>${otp}</h1>

  <p>This OTP expires in 10 minutes.</p>
`;

export const ResetPasswordTemplate = (otp) => `
  <h2>Reset Password Email Verification</h2>

  <p>Your OTP is:</p>

  <h1>${otp}</h1>

  <p>This OTP expires in 10 minutes.</p>
`;