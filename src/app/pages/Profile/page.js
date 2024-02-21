'use client'
import { useSession } from "next-auth/react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import Image from "next/image"
import { useEffect, useState } from "react";
// import { info } from "console";
import Info from "../../components/layouts/Info";
import SuccessBox from "../../components/layouts/SuccessBox"
import toast from "react-hot-toast";
import { resolve } from "path";
import { rejects } from "assert";

export default function Profile(){
    const session = useSession();
    // console.log(session)
    const {status} = session
    const [Username,setUsername]= useState('')
    const[image,setImage] = useState('')
    
    useEffect(()=>{
        if(status === 'authenticated'){
            setUsername(session.data.user.name)
        }
        setImage(session.data.user.image)
    }, [session,status]);

    async function handleProfileUpdate(ev){
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve,reject)=>{
            const response = await fetch('/api/profile', {
                method:'PUT',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify({name:Username,image}),
            })
            if(response.ok){
                resolve()
            }
            else reject()
        });
        await toast.promise(savingPromise,{
            loading : 'Saving...',
            success : 'Profile Saved',
            error : 'Error'
        })
        
        

    }
    
    async function handleOnUpload(ev){
        // console.log('upload')
        const files = ev.target.files
        // console.log(files)
        if(files?.length === 1){
            console.log('upload2')
            const data = new FormData
            data.set('file',files[0])
            const uploadPromise = new Promise(async (resolve , reject)=>{
                const response = await fetch('/api/upload',{
                    method : 'POST',
                    headers : {'contetn-type':'multipart/form-data'},
                    body : data
                })
                if(response.ok){
                    const link = await response.json()
                    setImage(link)
                    resolve();
                }
            else{
                reject();
            }
               

            })
            toast.promise(uploadPromise,{
                loading : 'Uploading...',
                success : 'Upload Succefull',
                error : 'Error'
            })
            
            


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
                <div className="flex gap-2">
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
                        <input type="text" placeholder="Restaurant Name"/>
                        <input type="text" placeholder="Restaurant Address" />
                        <div className="flex">

                            <input type="text"  placeholder="City"/>
                            <input type="text" placeholder="Postal Code"/>
                        </div> 
                        <input type="text" placeholder="Country"/>


                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

        </section>
    );
}