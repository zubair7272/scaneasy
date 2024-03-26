// 'use client'
export default async function PrintInvoice({orderid}){
    // const ord = orderid.toString()
    // console.log(ord)
    console.log(orderid)
    const stripe = require('stripe')(process.env.STRIPE_SK);
    
    // const session = await stripe.payment_method
    // console.log(session)

    const payments = await stripe.paymentIntents.list({
        limit: 100, // Adjust the limit as needed
        metadata:{
          orderId : '66001dfba2727e483c1e1dfc'
        }
        
      })


    //   console.log(payments)
  
      // Extract relevant information from the payments
            const paymentDetails = payments.data.map(payment => ({
            id: payment.id,
            amount: payment.amount/100,
            currency: payment.currency,
            created: new Date(payment.created * 1000),
            orderid : payment.metadata?.orderId
          }));
        //   console.log(orderid)
            // console.log(paymentDetails)
            paymentDetails.forEach(payment => {
              if (payment.orderid) {
                  console.log(payment.orderid === orderid);
              }
          });
            // console.log(c)

            // console.log(paymentDetails.orderid === orderid)
          
      
  
      
    










    
    // const getOrderPaymentDetails = async (orderid) => {
    //       // Retrieve payment intent associated with the order ID
    //       const paymentIntent = await stripe.paymentIntents.list({
    //         limit: 10,
    //         // customer: orderid,
    //       });
    //       console.log(orderid)
    //     //   console.log(getOrderPaymentDetails)
    //     }
        // console.log(orderid)
        // console.log(getOrderPaymentDetails)
    return(
        <section>
            hekko
        </section>
    );
}