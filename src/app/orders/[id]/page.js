'use client'
import { useState, useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import AddressInputs from "../../components/layouts/AddressInputs";
import SectionHeaders from "../../components/layouts/SectionHeaders";
import CartProduct from "../../components/menu/CartProduct";
import PrintInvoice from "../../components/invoice/printinvoice";
import invoice from "../../components/invoice/invoicingpage";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
   
  const { id } = useParams();
  
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id='+id).then(res => {
        res.json().then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
      })
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  const printInvoice = () => {
    // You can implement printing logic here, for example:
    window.print();
  };

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && (
        <div>Loading order...</div>
      )}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:
              <span className="text-black font-bold inline-block w-8">${subtotal}</span>
              <br />
              Total:
              <span className="text-black font-bold inline-block w-8">
                ${subtotal }
              </span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs
                disabled={true}
                addressProps={order}
              />
            </div>
          </div>
        </div>
      )}
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={printInvoice}>
        Print Invoice
      </button>
    </section>
  );
}
