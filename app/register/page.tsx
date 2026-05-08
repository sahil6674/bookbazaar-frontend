import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an Account"
      subtitle="Join thousands of students buying and selling books"
      bottomText="Already have an account?"
      bottomLinkText="Login here"
      bottomLinkHref="/login"
    >
      <RegisterForm />
    </AuthCard>
  );
}