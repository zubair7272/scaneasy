'use client';
import { signOut, useSession } from "next-auth/react";
import Link  from "next/link";
// import Image from "next/image";
export default function Header() {
  const session = useSession();
  const status  = session.status
    return(
        <header className="my-6 flex items-center justify-between">
        
        <Link className="text-red-500 font-semibold text-2xl" href="">Easy Order</Link>

        <nav className="flex  items-center gap-8 text-gray-400 font-semibold">
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
        </nav>
        <nav className="flex  items-center gap-8 text-gray-400 font-semibold">
          {status === 'authenticated' && (
            <button onClick={()=> signOut()} className="bg-red-500 rounded-full text-white px-6 py-2">
              Logout
            </button>

          ) }
          {status === 'unauthenticated'&&(
            <>
              <Link href={'/pages/login'}>Login</Link>
              <Link href={'/pages/register'} className="bg-red-500 rounded-full text-white px-6 py-2">Register</Link>
            </>
          )}
        </nav>
        </header>
    );
}