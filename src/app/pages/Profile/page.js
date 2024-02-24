'use client'
import { useSession } from "next-auth/react";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import Image from "next/image"
import { use, useEffect, useState } from "react";
// import { info } from "console";
import Info from "../../components/layouts/Info";
import SuccessBox from "../../components/layouts/SuccessBox"
import toast from "react-hot-toast";
import { resolve } from "path";
import { rejects } from "assert";
import { data } from "autoprefixer";
import Link from "next/link";
import UserTabs from "../../components/layouts/Tabs"

export default function Profile(){
    const session = useSession();

    // console.log(session)
    const {status} = session
    const [Username,setUsername]= useState('')
    const[image,setImage] = useState('')
    const [phone, setPhone] = useState('');
    const [RestaurantName, setRestaurantName] = useState('');
    const [RestaurantAddress, setRestaurantAddress ] = useState('');
    const [PostalCode, setPostalCode ] = useState('');
    const [City, setCity ] = useState('');
    const [Country, setCountry ] = useState('');
    const[isAdmin, setIsAdmin] = useState(false)
    const[profileFetched,setProfileFetched] = useState(false)
    

    useEffect(()=>{
        if(status === 'authenticated'){
            setUsername(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setRestaurantName(data.RestaurantName);
                    setRestaurantAddress(data.RestaurantAddress);
                    setPostalCode(data.PostalCode);
                    setCity(data.City);
                    setCountry(data.Country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true)
                })
            });

        }
        
    }, [session,status]);

    async function handleProfileUpdate(ev){
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve,reject)=>{
            const response = await fetch('/api/profile', {
                method:'PUT',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify({
                    name:Username,
                    image,
                    phone,
                    RestaurantAddress,
                    RestaurantName,
                    City,
                    Country,
                    PostalCode,
                }),
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
    if(status === 'loading' || !profileFetched){
        return 'Loading...'
    }
    else if(status === 'unauthenticated'){
        return redirect('/pages/login')
    }
    
    return (
        <section>
            <UserTabs isAdmin={isAdmin}/>
            
            <div className="max-w-xs mx-auto mt-8" >
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
                        <label>
                            First and last name
                        </label>
                        <input type="text" placeholder="Name" value={Username} onChange={ev => setUsername(ev.target.value)} />
                        <label>
                            email
                        </label>
                        <input 
                            type="text" 
                            value={session.data.user.email} 
                            disabled={true} 
                            placeholder={'email'}
                        /> 
                        <label>
                            Restaurant Name
                        </label>                   
                        <input 
                            type="text" placeholder="Restaurant Name"
                            value={RestaurantName} onChange={ev => setRestaurantName(ev.target.value)}
                        />
                        <label>
                            Phone Number
                        </label> 
                        <input 
                            type="tel" placeholder="Phone Number" 
                            value={phone} onChange={ev => setPhone(ev.target.value)}
                        />
                        <label>
                            Restaurant Address
                        </label> 
                        <input 
                            type="text" placeholder="Restaurant Address" 
                            value={RestaurantAddress} onChange={ev => setRestaurantAddress(ev.target.value)}
                        />

                        <div className="flex gap-2">
                            <div>
                                <label>
                                     City
                                </label> 
                            <input 
                                style={{'margin':'0'}}
                                type="text"  placeholder="City"
                                value={City} onChange={ev => setCity(ev.target.value)}
                            />
                            </div>
                            
                            <div>
                                <label>
                                    Postal Code
                                 </label> 
                            <input  
                                style={{'margin':'0'}}
                                type="text" placeholder="Postal Code"
                                value={PostalCode} onChange={ev => setPostalCode(ev.target.value)}
                            />
                            </div>
                            
                        </div> 
                        <label>
                            Country
                        </label> 
                        <input type="text" placeholder="Country"
                            value={Country} onChange={ev => setCountry(ev.target.value)}/>


                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>

        </section>
    );
}