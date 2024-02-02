// export default function Hero(){
//     return(
//         <section className="">
//             <h1 className="text-4xl my-2 font-semibold">Welcome <br></br>To<br></br> Easy Order </h1>
//                 <p>
//                     Get Your Digital Menu Today
//                 </p>
            
//         </section>
//     );
// }

// Hero Section By Adnan
//hello
"use client";
import React, { useState } from 'react';
import './HeroSection.css';
import Image from "next/image"
// import backgroundImage from './/right-section.jpg'; // Update the image file name if needed

const Hero = () => {
const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurantName: '',
    role: '',
  });
  const [showContactForm, setShowContactForm] = useState(false);

  const openContactForm = () => {
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    // Reset the form after submission if needed
    setShowContactForm(false);
  };

  return (
    <div>
      <div className="hero-container">
        {/* First Half */}
        <div className="hero-first-half">
          <h1>Built for restaurants.</h1>
          <h1>Built for you.</h1>
          <p>99,000* restaurants like yours trust Toast with their technology. From POS to payroll, we take care of it all – so you can focus on what you do best.</p>
          <div className="hero-buttons">
            <button onClick={openContactForm}>Button 1</button>
            <button>Button 2</button>
          </div>
        </div>

        {/* Second Half */}
        <div className="hero-second-half">
          
          {/* Contact Form Popup */}
          {showContactForm && (
            <div className="contact-form-popup">
              <div className="close-button" onClick={closeContactForm}>
                &times;
              </div>
              <form onSubmit={handleSubmit}>
                {/* ... (your form inputs) */}
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>

{/* Wednersday and Thursday */}


        {/* Add the image with reduced height */}
        {/* <img src={backgroundImage} alt="Background" style={{ width: '50%', height: '80%', objectFit: 'contain' }} /> */}
        {/* style={{ width: '50%', height: '80%', objectFit: 'contain' }} */}
        <Image src={'/right-section.jpg'} alt="Background" width={50} height={80} />
      </div>

      {/* Updated content with the new headings and list */}
      <div className="centered-headings">
  <h3>Pricing</h3>
  <h1>The right plan for every restaurant</h1>

  {/* Horizontal list with check marks */}
  <ul className="check-list">
    <li>24/7 support</li>
    <li>Offline mode</li>
    <li>Flexible payment options</li>
    <li>Simple & fast set-up</li>
  </ul>
  <h1>hi there</h1>
  
  {/* Custom card styling */}
<div className="centered-container">
  <div className="custom-card-container">
    <h1 className="font-semibold text-xl my-3">
      Pricing
    </h1>
    <p className="text-gray-500 text-sm">Services List</p>
    <button className="mt-4 bg-red-500 text-white rounded-full px-8 py-2">Get A Quote</button>
  </div>
</div>
{/* Thursday and Friday */}
<div className='About-Us'><h1>About Us</h1></div>
<div className="additional-content">
    {/* Image Section */}
    <div className="image-section">
    {/* <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '80%', objectFit: 'contain' }} /> */}
    {/* style={{ width: '50%', height: '80%', objectFit: 'contain' } */}
    <Image src={'/right-section.jpg'} alt="Background" width={50} height={80} />
    </div>

    {/* Text Section */}
    <div className="text-section">
      <h5>Who are we</h5>
      <h2>We're one team</h2>
      <h3>There's no "I" in Scan Easy.</h3>
      <h3>The only way we'll succeed is by solving problems together and sharing lessons along the way. 
        As individuals, support and respect each other, and embrace our differences.</h3>
    </div>
  </div>

</div>


    </div>
  );
};

export default Hero;
