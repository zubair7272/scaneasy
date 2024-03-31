'use client';
import {CartContext, cartProductPrice} from "../components/AppContext";
import Trash from "../components/icons/Trash";
import AddressInputs from "../components/layouts/AddressInputs";
import SectionHeaders from "../components/layouts/SectionHeaders";
import CartProduct from "../components/menu/CartProduct";
import {useProfile} from "../components/UseProfile";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const {cartProducts,removeCartProduct} = useContext(CartContext);
  const [address, setAddress] = useState({});
  const {data:profileData} = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.phone) {
      const {phone, restaurantname} = profileData;
      const addressFromProfile = {
        phone,
        restaurantname
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({...prevAddress, [propName]:value}));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products
    if (!address.phone) {
      toast.error('Please provide your phone number.');
      return;
    }
    const payByCash = ev.target.payByCash.checked;
    const payload = {
      address,
      cartProducts,
      payByCash // Add payByCash flag to payload
    };

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      }).then(async (response) => {
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.orderId) {
            // If paying by cash, show success toast with order ID
            // toast.success(`Order placed successfully. Order ID: ${responseData.orderId}`);
            // console.log(responseData.orderId);
          window.location.href = 'https://www.smartservesa.com/orders/' + responseData.orderId + '?clear-cart=1';
          } else {
            // If redirecting to payment, redirect to the returned URL
            window.location = responseData;
          }
          resolve();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    })
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  // if(profileData?.phone?.length==0){
  //   return (
  //     <section className="mt-8 text-center">
  //       <SectionHeaders mainHeader="cart" />
  //       <p className="mt-4">Enter your phone number</p>
  //     </section>
  //   );
  // }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              index={index}
              product={product}
              onRemove={removeCartProduct}
            />
            
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:<br />
              {/* Delivery:<br /> */}
              {/* Total: */}
            </div>
            <div className="font-semibold pl-2 text-right">
              SAR {subtotal}<br />
              {/* SAR5<br /> */}
              {/* SAR {subtotal + 5} */}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <div className="flex items-center">
              <input type="checkbox" id="payByCash" name="payByCash" />
              <label htmlFor="payByCash" className="ml-2">
                Pay by Cash
              </label>
            </div>
            <button type="submit">Pay SAR {subtotal}</button>
          </form>
        </div>
      </div>
    </section>
  );
}