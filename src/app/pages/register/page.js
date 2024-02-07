"use client";
//hello
// import next from "next";
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
// import { json } from "stream/consumers";
export default function Register(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [CreatingUser,setCreatingUser] = useState(false);
    const [UserCreated,setUserCreated] = useState(false);
    const [Error,setError] = useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault()
        setCreatingUser(true);
        setError(false);
        setUserCreated(false)
        const {ok} = await fetch('/api/register',{
            method: 'POST',
            body : JSON.stringify({email,password}),
            headers : {'Content-Type': 'application/json'}
        })
        if(ok){
            setUserCreated(true);
        }
        else{
            setError(true);
        }
        setCreatingUser(false);
        // setUserCreated(true);=   
    }
    return(
        <section className="mt-9">

            <h1 className="text-center text-red-500 text-4xl mb-4">Register</h1>
            {UserCreated &&(
                <div className="my-4 text-center">
                    User Created Succesfully!<br></br> You Can <Link href={'/login'}>Login Now &raquo;</Link>
                </div>
            )}
            {Error &&(
                <div className="my-4 text-center">
                    User Alredy Registered<br></br>Or Some Error Has Occured
                </div>
            )}
            <form action="" className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Email" value={email} disabled={CreatingUser} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password" value={password} disabled={CreatingUser} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={CreatingUser}>Register</button>
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
                    Already Registered?<br></br><Link href={'/pages/login'}>Login Here&raquo;</Link>
                </div>
            </div>
            </form>
        </section>
    );
}