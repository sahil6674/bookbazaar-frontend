import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back!"
      subtitle="Login to buy, sell, and manage your listings"
      bottomText="Don't have an account?"
      bottomLinkText="Register here"
      bottomLinkHref="/register"
    >
      <LoginForm />
    </AuthCard>
  );
}