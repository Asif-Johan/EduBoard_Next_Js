import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.DOMAIN}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  console.log("📧 Attempting to send to:", to);
  console.log("🔗 Verification URL:", verifyUrl);

  try {
    const result = await resend.emails.send({
      from:"onboarding@resend.dev",
      to: "jjohan357@gmail.com",
      subject: 'Verify your email',
      html: `<p>Please click the link below to verify your email:</p><a href="${verifyUrl}">${verifyUrl}</a>
      your email is ${to}
      `,
    });

    console.log("✅ Resend response:", result);
  } catch (error) {
    console.error("❌ Resend error:", error);
  }
}
