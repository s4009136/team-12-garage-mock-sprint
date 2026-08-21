'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, signInWithEmail, signInWithGoogle } = useAuth()
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) return <FullPageSpinner />

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoginError(null)
      await signInWithEmail(data.email, data.password)
      toast.success('Signed in successfully')
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        toast.error('Please verify your email before signing in.')
        setLoginError("Please verify your email before signing in.")
      } else {
        toast.error('Invalid email or password')
        setLoginError("Incorrect Email or Password. Try again.")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.replace('/dashboard')
    } catch {
      toast.error('Google sign-in failed. Please try again.')
    }
  }

  return (
    <div className="mx-auto flex flex-1 w-full max-w-4xl items-center justify-center gap-24">
      <div className="flex flex-col items-center">
        <p className="text-sm">(Insert Logo)</p>
        <div className="mt-4 w-72 aspect-4/3 bg-zinc-200">

        </div>

        <p className="mt-4 text-sm">(Insert Company Name)</p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-6 text-left">
          <h1 className="text-3xl font-bold tracking-tight italic">Welcome Back</h1>
          <h1 className="text-1xl font-bold tracking-tight">Sign in</h1>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-1xl font-bold">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-md border border-zinc-300 bg-input-background px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-500 focus:outline-none aria-invalid:border-red-500 dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-1xl font-bold">
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={`w-full rounded-md border bg-input-background px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none ${
                          errors.password
                            ? 'border-red-500 placeholder:text-red-500'
                            : 'border-zinc-300 placeholder:text-zinc-400'
                        }`}
              placeholder={errors.password ? "Required Field" : "••••••••"}
              {...register('password')}
            />
          </div>
          
            <div className="flex justify-between">
              <div className="flex gap-2">
                <input type="checkbox" id = "rememberme">
                </input>
                
                <label htmlFor="rememberme" className="text-1-xl font-normal">
                  Remember Me?
                </label>
              </div>
              <Link
                href="/auth/signup"
                className="font-bold"
              >
                Forgot Password?
              </Link>
            </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-zinc-900 hover:underline dark:text-white"
          >
            Sign Up
          </Link>
        </p>

        {loginError && (
          <p className="text-center text-m text-red-500" role="alert">
            {loginError}
          </p>
        )}
      </div>
    </div>
  )
}
