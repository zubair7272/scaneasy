// components/OrderButton.js

import React from 'react';

const AcceptOrder = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className='mt-2 p-2 ml-0 text-xs rounded-md'>{text}</button>
  );
};

export default AcceptOrder;
