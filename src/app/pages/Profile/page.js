'use client'
import { useSession } from "next-auth/react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";

export default function Profile(){
    const session = useSession();
    console.log(session)
    const {status} = session
    if(status === 'loading'){
        return 'Loading...'
    }
    if(status === 'unauthenticated'){
        return redirect('/pages/login')
    }
    return (
        <section>
            <h1 className="text-center text-red-500 text-4xl mb-4">
                Profile
            </h1>
        </section>
    );
}