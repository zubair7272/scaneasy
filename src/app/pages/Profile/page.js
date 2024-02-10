'use client'
import { useSession } from "next-auth/react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import Image from "next/image"
import { useEffect, useState } from "react";

export default function Profile(){
    const session = useSession();
    console.log(session)
    const {status} = session
    const [Username,setUsername]= useState('')
    if(status === 'loading'){
        return 'Loading...'
    }
    if(status === 'unauthenticated'){
        return redirect('/pages/login')
    }
    
    
    const userImage = session.data.user.image
    // useEffect(()=>{
    //     if(status === 'authenticated'){
    //         setUsername(session.data.user.name)
    //     }
    // }, [session,status]);
    async function handleProfileUpdate(ev){
        ev.preventDefault()
        const response = await fetch('/api/profile', {
            method:'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({name:Username}),
        })

    }
    return (
        <section>
            <h1 className="text-center text-red-500 text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-xs mx-auto" >
                <div className="flex gap-2 items-center">
                    <div>
                    
                        <div className="bg-gray-300 p-2 rounded-full">
                            <Image className="rounded-full" src={userImage} width={80} height={80} alt={'Profile Picture'} />
                        </div>
                            <button type="button">Edit</button> 

                    </div>
                    
                    <form className="grow" onSubmit={handleProfileUpdate}>
                        <input type="text" placeholder="Name" value={Username} onChange={ev => setUsername(ev.target.value)} />
                        <input type="text" value={session.data.user.email} disabled={true} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

        </section>
    );
}