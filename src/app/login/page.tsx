'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabaseBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ja = {
  sign_in: {
    email_label: 'メールアドレス',
    password_label: 'パスワード',
    email_input_placeholder: 'メールアドレスを入力してください',
    password_input_placeholder: 'パスワードを入力してください',
    button_label: 'サインイン',
    social_provider_text: '{{provider}}でサインイン',
    link_text: 'アカウントをお持ちですか？サインイン',
  },
  sign_up: {
    email_label: 'メールアドレス',
    password_label: 'パスワード',
    email_input_placeholder: 'メールアドレスを入力してください',
    password_input_placeholder: 'パスワードを入力してください',
    button_label: 'サインアップ',
    social_provider_text: '{{provider}}でサインアップ',
    link_text: 'アカウントをお持ちではありませんか？サインアップ',
  },
  forgotten_password: {
    email_label: 'メールアドレス',
    email_input_placeholder: 'メールアドレスを入力してください',
    button_label: 'パスワードをリセット',
    link_text: 'パスワードを忘れましたか？',
  },
  update_password: {
    password_label: '新しいパスワード',
    password_input_placeholder: '新しいパスワードを入力してください',
    button_label: 'パスワードを更新',
  },
  magic_link: {
    email_input_placeholder: 'メールアドレスを入力してください',
    button_label: 'マジックリンクを送信',
    link_text: 'マジックリンクでサインイン',
  },
  verify_otp: {
    email_input_placeholder: 'メールアドレスを入力してください',
    phone_input_placeholder: '電話番号を入力してください',
    token_input_placeholder: 'OTPトークンを入力してください',
    button_label: '確認',
    link_text: 'OTPでサインイン',
  },
}

export default function Login() {
  const supabase = supabaseBrowserClient()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        router.push('/')
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']} // Example providers
          localization={{ variables: ja }}
          view="sign_in"
        />
      </div>
    </div>
  )
}