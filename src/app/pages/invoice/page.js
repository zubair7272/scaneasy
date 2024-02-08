"use client";
import Table from "../../components/invoice/Table";
import HeaderInvoice from "../../components/invoice/HeaderInvoice";
import FooterInvoice from "../../components/invoice/FooterInvoice";
import Notes from "../../components/invoice/Notes";
import Dates from "../../components/invoice/Dates";
import ClientDetails from "../../components/invoice/ClientDetails";
import YourDetails from "../../components/invoice/YourDetails";


export default function invoice(){
    const handlePrint = () =>{
        window.print()
    }
    return(
        <>
            <main className="m-5 p-5 xl:max-w-4xl xl:mx-auto bg-white rounded shadow">
            
                <div>
                    <HeaderInvoice handlePrint={handlePrint} />

                    <YourDetails />
            
                    <ClientDetails />
            
                    <Dates />
            
                    <Table />

                    <Notes />
            
                    <FooterInvoice />

                </div>  
            </main>
        </>
    );
}