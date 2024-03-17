'use client'
// import { useEffect} from "react";
// import {useSession} from "next-auth/react";
import Footer from "../../components/layouts/Footer";
import Header  from "../../components/layouts/Header";
import Menu from "../../components/menu/Menu";

// import Footer from "../components/layouts/Footer";
// import Items from "../components/layouts/Items";
// const session = useSession();
// const {status} = session.status;
// useEffect(()=>{
    // if(status==='unauthenticated'){
    //     router.push('/pages/login')
    // }
// },[])

export default function rests(){
    return(
        <>
            {/* <h1>This is Restaurants Home Page</h1> */}
            {/* <Header /> */}
            <Menu />
            {/* <Footer /> */}
        </>
    );
}