'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/layouts/auth-layout';
import { Input, Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login authentication process and navigate to onboarding
    setTimeout(() => {
      setIsLoading(false);
      router.push('/onboarding');
    }, 600);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your Rolezen Resume Studio workspace"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Google OAuth Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full justify-center text-xs h-11 border-[#E2E8F0] font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              router.push('/onboarding');
            }, 600);
          }}
        >
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#E2E8F0] w-full" />
          <span className="bg-white px-3 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider absolute">
            Or with email
          </span>
        </div>

        {/* Email & Password Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="alex.vance@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 font-medium text-[#64748B] cursor-pointer">
            <input type="checkbox" className="rounded border-[#E2E8F0] text-[#16A34A] focus:ring-[#16A34A]" />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-[#16A34A] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full justify-center h-11 text-xs font-semibold"
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Sign In to Rolezen
        </Button>

        {/* Register Redirect Link */}
        <p className="text-center text-xs text-[#64748B] pt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-[#16A34A] hover:underline">
            Create free account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
