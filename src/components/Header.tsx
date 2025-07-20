'use client'

import { supabaseBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const Header = ({ user }: { user: any }) => {
  const router = useRouter()
  const supabase = supabaseBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">予約システム</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                ログアウト
              </button>
            </div>
          ) : (
            <span className="text-gray-600">ゲスト</span>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header