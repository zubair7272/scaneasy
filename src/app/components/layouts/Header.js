'use client';
import { signOut, useSession } from "next-auth/react";
import Link  from "next/link";
import Image from "next/image";
export default function Header() {
  const session = useSession();


  console.log(session)
  const status  = session?.status
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email
  if(userName && userName.includes(' ')){
    userName = userName.split(' ')[0]
  }
  if(userName && userName.includes('@')){
    userName = userName.split('@')[0]
  }
    return(
        <header className="my-6 flex items-center justify-between">
        
        <Link className="ml-5" href=""><Image src={'/Logo.jpg'} alt="Background" width={120} height={80} /></Link>

        <nav className="flex  items-center gap-8 text-gray-400 font-semibold">
          <Link href="">Home</Link>
          <Link href="">Menu</Link>
          <Link href="">About</Link>
          <Link href="">Contact</Link>
        </nav>
        <nav className="flex  items-center gap-8 text-gray-400 font-semibold">
          {status === 'authenticated' && (
            <>
            <Link href={'/pages/Profile'}>Hello,{userName}</Link>
            <button onClick={()=> signOut()} className="bg-red-500 rounded-full text-white px-6 py-2">
              Logout
            </button>
            </>

          ) }
          {status === 'unauthenticated'&&(
            <>
              <Link href={'/pages/login'}>Login</Link>
              <Link href={'/pages/register'} className="bg-red-500 rounded-full text-white px-6 py-2 mr-5">Register</Link>
            </>
          )}
        </nav>
        </header>
    );
}