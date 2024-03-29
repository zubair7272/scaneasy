"use client";
import Table from "../../components/invoice/Table";
import HeaderInvoice from "../../components/invoice/HeaderInvoice";
import FooterInvoice from "../../components/invoice/FooterInvoice";
import Notes from "../../components/invoice/Notes";
import Dates from "../../components/invoice/Dates";
import ClientDetails from "../../components/invoice/ClientDetails";
import MainDetails from "../../components/invoice/MainDetails";

export default function PrintInvocie(id){
        // console.log(order?.cartproducts)
        // const {phone} = order
        // const [order, setOrder] = useState();

        console.log(id)
        
      //   const handlePrint = () =>{
      //     window.print()
      // }
      return(
        <section>
          <button onClick={PrintInvocie} className="block print:hidden">Print Invoice</button>
        </section>
      );
}