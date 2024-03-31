import { useEffect } from 'react';
import { pusherClient } from '../../lib/pusherClient';

export default function OrderUpdates() {
  useEffect(() => {
    const channel = pusherClient.subscribe('orders-channel');
    
    // Bind to the 'new-order' event on the channel
    channel.bind('new-order', function(data) {
      console.log('New order received:', data.orderId);
      // Handle the received order data (e.g., update UI)
    });

    // Clean up subscriptions when component unmounts
    return () => {
      channel.unbind(); // Unbind all event handlers
      pusherClient.unsubscribe('orders-channel');
    };
  }, []);

  return null; // Or render any necessary UI components
}
