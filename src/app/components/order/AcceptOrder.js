// components/OrderButton.js

import React from 'react';

const AcceptOrder = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

export default AcceptOrder;
