'use client';
import Image from "next/image";
import UserTabs from "../../components/layouts/Tabs";
import {useProfile} from "../../components/UseProfile";
import EditableImage from "../../components/layouts/EditableImage"
import { useState } from "react";

 export default function MenuItemsPage(){
    const [image, setImage] = useState('');
    const {loading, data} = useProfile();
    if (loading){
        return 'Loading user info...';
    }

    if(!data.admin){
        return 'Not an admin.';
    }
    return(
        <section className="mt-8">
             <UserTabs isAdmin={true} />
             <form className="mt-8 max-w-md mx-auto">
                <div className="grid items-start gap-4" 
                style={{gridTemplateColumns : '.3fr .7fr'}}
                >
                    <div>
                    <EditableImage link={image} setLink={setImage}/>
                    </div>
                    <div className="grow">
                        <label>Item name</label>
                        <input type="text"/>
                        <label>Description</label>
                        <input type="text"/>
                        <label>Base Price</label>
                        <input type="text"/>
                        <button type="submit">Save</button>
                    </div>
                    {/* <div>
                        <button type="submit" className="mb-2">Create</button>
                    </div> */}
                </div>
             </form>
         </section>
         );
}