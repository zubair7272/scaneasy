'use client'
import { useSession } from "next-auth/react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import Image from "next/image"
import { useEffect, useState } from "react";
// import { info } from "console";

export default function Profile(){
    const session = useSession();
    // console.log(session)
    const {status} = session
    const [Username,setUsername]= useState('')
    const[saved,setsaved] = useState(false)
    const[isSaving,setisSaving] = useState(false)
    const[image,setImage] = useState('')
    const[isUploading,setIsUploading] = useState(false)
    
    useEffect(()=>{
        if(status === 'authenticated'){
            setUsername(session.data.user.name)
        }
        setImage(session.data.user.image)
    }, [session,status]);

    async function handleProfileUpdate(ev){
        ev.preventDefault()
        setsaved(false)
        setisSaving(true)
        const response = await fetch('/api/profile', {
            method:'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({name:Username,image}),
        })
        setisSaving(false)
        if(response.ok){
            setsaved(true)
        }

    }
    
    async function handleOnUpload(ev){
        // console.log('upload')
        const files = ev.target.files
        // console.log(files)
        if(files?.length === 1){
            console.log('upload2')
            const data = new FormData
            data.set('file',files[0])
            setIsUploading(true)
            const response = await fetch('/api/upload',{
                method : 'POST',
                headers : {'contetn-type':'multipart/form-data'},
                body : data
            })
            const link = await response.json()
            setImage(link)
            setIsUploading(false)


        }

    }
    if(status === 'loading'){
        return 'Loading...'
    }
    else if(status === 'unauthenticated'){
        return redirect('/pages/login')
    }
    
    return (
        <section>
            <h1 className="text-center text-red-500 text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-xs mx-auto" >
                {isSaving && (
                    <Info>Saving...</Info>
                )}
                 {isUploading && (
                    <Info>Uploading...</Info>
                )}
                {saved && (
                    <SuccessBox>Profile Saved!</SuccessBox>
                )}
                <div className="flex gap-2 items-center">
                    <div>
                    
                        <div className="bg-gray-300 p-2 rounded-full mb-1">
                            {image &&(
                                <Image className="rounded-full" src={image} width={80} height={80} alt={'Profile Picture'} />

                            )}
                        </div>
                        <label>

                            <input type="file" className="hidden"  onChange={handleOnUpload}/>
                            <span className=" block border border-gray-300 rounded-lg text-center cursor-pointer">
                                Edit
                            </span>
                        </label>
                            {/* <button type="button">Edit</button>  */}
                            

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