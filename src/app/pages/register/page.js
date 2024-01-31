"use client";
// import next from "next";
import Image from "next/image"
import { useState } from "react";
// import { json } from "stream/consumers";
export default function Register(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function handleFormSubmit(ev){
        ev.preventDefault()
        fetch('/api/register',{
            method: 'POST',
            body : JSON.stringify({email,password}),
            headers : {'Content-Type': 'application/json'}
        })
    }
    return(
        <section className="mt-9">

            <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
            <form action="" className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit">Register</button>
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
            </div>
            </form>
        </section>
    );
}