"use client";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    return (
        <section className="mt-8">
            <h1 className="text-center text-red-500 text-4xl mb-4">
                Login
            </h1>
            <form action="" className="block max-w-xs mx-auto">
                <input type="email" placeholder="Email" value={email}  onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password" value={password}  onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" >Login</button>
            <div className="my-4 text-center text-gray-600">
                Or Login
            </div>
            <div>
                <button className="flex gap-4 justify-center">
                    <Image src={'/Google.png'} width={32} height={32} />
                    <p className="mt-1">
                        Login With Google
                    </p>
                </button>
                <div className="text-center my-4  border-t pt-4">
                    Not  Registered?<br></br><Link href={'/pages/register'}>Register Here&raquo;</Link>
                </div>
            </div>
            </form>
            

        </section>
    );
}