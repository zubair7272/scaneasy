'use client';
import SectionHeaders from "../components/layouts/SectionHeaders";
import UserTabs from "../components/layouts/Tabs";
import {useProfile} from "../components/UseProfile";
import {dbTimeForHuman} from "../libs/datetime";
import AcceptOrder from "../components/order/AcceptOrder"

import Link from "next/link";
import {useEffect, useState} from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const {loading, data:profile} = useProfile();
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
   const [orderTimers, setOrderTimers] = useState({});
  // const [orderStatus, setOrderStatus] = useState('pending');


  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    // Cleanup the timer when component unmounts or when orders change
    return () => {
      clearInterval(timer);
    };
  }, [timer, orders]);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }

  const startTimer = (orderId) => {
    // Clear previous timer for the same order if exists
    if (orderTimers[orderId]) {
      clearInterval(orderTimers[orderId]);
    }
    // Set a new timer for 10 minutes for the accepted order
    const endTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds
    const timerId = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;
      if (remainingTime <= 0) {
        clearInterval(orderTimers[orderId]); // Clear the timer when time is up
        delete orderTimers[orderId]; // Remove the timer ID from state
        fetchOrders(); // Refresh orders after the timer expires
      }
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id === orderId) {
          return { ...order, remainingTime }; // Update remaining time for the accepted order
        }
        return order;
      }));
    }, 1000); // Update every second
    // Store the timer ID in state for the accepted order
    setOrderTimers(prevTimers => ({ ...prevTimers, [orderId]: timerId }));
  };

  const handleAcceptOrder = async (id,status) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id:id,status:status})
      });

      if (response.ok) {
        // setOrderStatus('accepted');
        startTimer(id);
        console.log('Order status updated to "accepted"');
        fetchOrders();
      } else {
        console.error('Failed to update order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
   
  };

  const handleRejectOrder = async (id,status) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'rejected' }) // Assuming you're sending only the status
      });

      if (response.ok) {
        // setOrderStatus('rejected');
        console.log('Order status updated to "rejected"');
        fetchOrders();
      } else {
        console.error('Failed to update order status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-8">
        {loadingOrders && (
          <div>Loading orders...</div>
        )}
        {orders?.length > 0 && orders.map(order => (
          <div
            key={order._id}
            className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="grow flex flex-col md:flex-row items-center gap-6">
              <div>
                <div className={
                  (order.paid ? 'bg-green-500' : 'bg-red-400')
                  + ' p-2 rounded-md text-white w-24 text-center'
                }>
                  {order.paid ? 'Paid' : 'Not paid'}
                </div>
                <div>
                  {order.status === 'pending' && (
                    <>
                      <AcceptOrder text="Accept Order" onClick={() => {
                        handleAcceptOrder(order._id,'accepted')
                      }} />
                      <AcceptOrder text="Reject Order" onClick={() => {
                        handleAcceptOrder(order._id,'rejected') }} />
                    </>
                  
                  )}
                  {order.status === 'accepted' && (
                      <div className="mt-4">Time remaining: {formatTime(order.remainingTime)}</div>
                   )}
                  {order.status === 'rejected' && <p>Your Order is Rejected!</p>}
                </div>


              </div>
              <div className="grow">
                <div className="flex gap-2 items-center mb-1">
                  <div className="grow">{order.userEmail}<br></br>{order.phone}
                  </div>
                  <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                </div>
                <div className="text-gray-500 text-xs">
                  {order.cartProducts.map(p => p.namepor).join(', ')}
                </div>
              </div>
            </div>
            <div className="justify-end flex gap-2 items-center whitespace-nowrap">
              <Link href={"/orders/"+order._id} className="button">
                Show order
              </Link>
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}