import { authOptions } from "../auth/[...nextauth]/route";
import {MenuItem} from "../../models/MenuItem";
import {Order} from "../../models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";

const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address, payByCash } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: !payByCash, // Mark the order as paid if not paying by cash
  });

  if (payByCash) {
    return Response.json({ orderId: orderDoc._id.toString() });
  }

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {

    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes
        .find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras
          .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'SAR',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    payment_intent_data: {
      metadata:{orderId:orderDoc._id.toString()},
    },
  
    
  });
  // console.log()
  return Response.json(stripeSession.url);
}