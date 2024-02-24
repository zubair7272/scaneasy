'use client';
import UserTabs from "../../components/layouts/Tabs";
import {useProfile} from "../../components/UseProfile";
 export default function MenuItemsPage(){
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
         </section>
         );
}