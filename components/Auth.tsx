import Image from 'next/image'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import type { Database } from '@/types-db'

export default function Auth() {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  return (
    <div>
      {user
        ? (
        <button
            className=" button !bg-[#772ce8] !text-white group"
          aria-label="Cerrar sesión"
          onClick={() => {
            supabase.auth.signOut()
          }}
        >
          <Image
            alt="Twitch profile picture"
            src={user.user_metadata.picture}
            height="18"
            width="18"
            className="rounded-full inline-block"
          />{' '}
            {user.user_metadata.name}
            <span className="opacity-0 group-hover:opacity-100 pl-1">x</span>
        </button>
          )
        : (
        <button
          className="bg-[#772ce8] text-white button"
          onClick={() => {
            supabase.auth.signInWithOAuth({ provider: 'twitch' })
          }}
        >
          Iniciar sesión con Twitch
        </button>
          )}
    </div>
  )
}
