'use client'
import SectionHeaders from "../components/layouts/SectionHeaders";
import UserTabs from "../components/layouts/Tabs";
import { useProfile } from "../components/UseProfile";
import { dbTimeForHuman } from "../libs/datetime";
import AcceptOrder from "../components/order/AcceptOrder";
import CircularCountdownTimer from "../components/countdown/CircularCountdownTimer";
import Link from "next/link";
import { useEffect, useState } from "react";

const localStorageKey = "orderEndTime";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();
  const [orderTimers, setOrderTimers] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const storedEndTime = localStorage.getItem(localStorageKey);
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const now = Date.now();
      const remainingTime = endTime - now;
      if (remainingTime > 0) {
        // If there's remaining time, start the timer
        const orderId = localStorage.getItem("orderId");
        startTimer(orderId, endTime);
      } else {
        // If the time has already passed, fetch new orders
        fetchOrders();
      }
    }
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/orders")
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }

  const startTimer = (orderId, endTime) => {
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = endTime - currentTime;
      if (remainingTime <= 0) {
        clearInterval(timerId);
        delete orderTimers[orderId];
        localStorage.removeItem(localStorageKey);
        fetchOrders();
      }
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, remainingTime };
          }
          return order;
        })
      );
    }, 1000);
    setOrderTimers((prevTimers) => ({ ...prevTimers, [orderId]: timerId }));
  };

  const handleAcceptOrder = async (id, status) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: status }),
      });

      if (response.ok) {
        const endTime = Date.now() + 10 * 60 * 1000; // 10 minutes in milliseconds
        localStorage.setItem(localStorageKey, endTime);
        localStorage.setItem("orderId", id);
        startTimer(id, endTime);
        console.log("Order status updated to 'accepted'");
        fetchOrders();
      } else {
        console.error("Failed to update order status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleRejectOrder = async (id, status) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: "rejected" }),
      });

      if (response.ok) {
        console.log("Order status updated to 'rejected'");
        fetchOrders();
      } else {
        console.error("Failed to update order status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleCompleteOrder = async (id) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: "completed" }),
      });

      if (response.ok) {
        console.log("Order status updated to 'completed'");
        fetchOrders();
      } else {
        console.error("Failed to update order status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const refreshOrders = () => {
    fetchOrders();
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profile.admin} />
      <div className="mt-4 flex justify-end">
        <button className="button" onClick={refreshOrders}>
          Refresh Orders
        </button>
      </div>
      <div className="mt-8">
        {loadingOrders && <div>Loading orders...</div>}
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
            >
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-400") +
                      " p-2 rounded-md text-white w-24 text-center"
                    }
                  >
                    {order.paid ? "Paid" : "Not paid"}
                  </div>
                  <div>
                    {order.status === "pending" && (
                      <>
                        <AcceptOrder
                          text="Accept Order"
                          onClick={() => {
                            handleAcceptOrder(order._id, "accepted");
                          }}
                        />
                        <AcceptOrder
                          text="Reject Order"
                          onClick={() => {
                            handleAcceptOrder(order._id, "rejected");
                          }}
                        />
                      </>
                    )}
                    {order.status === "accepted" && (
                      <div className="mt-4 flex items-center">
                        <div className="mr-4">
                          <CircularCountdownTimer duration={600} />
                        </div>
                        <div>
                          <h2>Ordered Products</h2>
                          <ul>
                            {order.cartProducts.map((product) => (
                              <li key={product._id}>{product.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {order.status === "completed" && (
                      <p>Your Order is Completed!</p>
                    )}
                    {order.status === "rejected" && (
                      <p>Your Order is Rejected!</p>
                    )}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">
                      {order.userEmail}
                      <br />
                      {order.phone}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {dbTimeForHuman(order.createdAt)}
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map((p) => p.namepor).join(", ")}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
                {order.status === "accepted" && (
                  <button
                    className="button bg-green-500"
                    onClick={() => handleCompleteOrder(order._id)}
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
