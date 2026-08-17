'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/layouts/auth-layout';
import { Input, Button, Badge } from '@/components/ui';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your account email to receive a password reset link"
    >
      {submitted ? (
        <div className="text-center space-y-4 py-4">
          <div className="h-12 w-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">Reset Link Sent</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            We sent a password reset link to <strong className="text-[#0F172A]">{email}</strong>. Please check your inbox.
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Account Email Address"
            type="email"
            placeholder="alex.vance@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full justify-center h-11 text-xs font-semibold"
          >
            Send Reset Instructions
          </Button>

          <p className="text-center text-xs text-[#64748B] pt-4">
            Remembered your password?{' '}
            <Link href="/login" className="font-bold text-[#16A34A] hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
