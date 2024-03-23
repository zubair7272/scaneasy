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
// const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     restaurantName: '',
//     role: '',
//   });
  // const [showContactForm, setShowContactForm] = useState(false);

  // const openContactForm = () => {
  //   setShowContactForm(true);
  // };

  // const closeContactForm = () => {
  //   setShowContactForm(false);
  // };

  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setFormData((prevData)=> ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   console.log('Form submitted');
  //   // Reset the form after submission if needed
  //   setFormData({
  //     name: '',
  //     email: '',
  //     restaurantName:'',
  //     role: '',
  //   });
  //   setShowContactForm(false);
  // };

  return (
    <div>
    <h1 className='mt-12 text-2xl font-bold'>Smart Serve SA - Revolutionizing Dining Experience in Saudi Arabia</h1>
    
      <div className="hero-container">
        {/* First Half */}
        
        <div className="hero-first-half">
          <h1 className='mt-8 text-xl font-bold'>Introduction:</h1>
          <p>Welcome to Smart Serve SA, the innovative SAAS solution that is transforming the restaurant industry 
            in Saudi Arabia. Our cutting-edge QR-based smart menu system streamlines the dining experience, 
            allowing customers to place orders directly from their mobile devices. Say goodbye to long wait 
            times and inefficient order-taking processes.
          </p>
          <h1 className='mt-4 text-xl font-bold'>Key Features:</h1>
          <ul className='list-disc'>
            <li>User-friendly QR-based menu system</li>
            <li>Real-time order updates for the kitchen</li>
            <li>Comprehensive analytics and reporting for the cashier</li>
            <li>ZATCA API integration for seamless taxation compliance</li>
          </ul>

          <h1 className='mt-4 text-xl font-bold'>Benefits:</h1>
          <ul className='list-disc'>
            <li>Reduce waitstaff costs and improve efficiency</li>
            <li>Enhance customer satisfaction with faster service</li>
            <li>Gain valuable insights into sales and customer preferences</li>
            <li>Stay compliant with taxation regulations</li>
          </ul>
          {/* <div className="hero-buttons">
            <button onClick={openContactForm}>Get A Quote</button>
            <a href="tel:+91 xxxx-xxx-xxx"> <button>Call Us</button></a>
          </div> */}
        </div>

        {/* Second Half */}
        {/* <div className="hero-second-half"> */}
          
          {/* Contact Form Popup */}
          {/* {showContactForm && (
            <div className="contact-form-popup">
              <div className="close-button" onClick={closeContactForm}>
                &times;
              </div>
              <form onSubmit={handleSubmit}>
              <label>
                  Name*:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email*:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Restaurant Name*:
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  What best describes you*:
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          )} */}
        {/* </div> */}
        <Image src={'/Hero-f.png'} alt="Background" width={350} height={80}/>
      </div>

      {/* Updated content with the new headings and list */}
      <div className="centered-headings">
  {/* <h3>Pricing</h3>
  <h1>The right plan for every restaurant</h1> */}

  {/* Horizontal list with check marks
  <ul className="check-list">
    <li>24/7 support</li>
    <li>Offline mode</li>
    <li>Flexible payment options</li>
    <li>Simple & fast set-up</li>
  </ul> */}
  <br></br>
  
  {/* Custom card styling */}
<div className="centered-container">
  <div className="custom-card-container">
    <h1 className="font-semibold text-xl my-3">
      Pricing
    </h1>
    <p className="text-gray-500 text-sm">Services List</p>
    {/* <button className="mt-4 bg-blue-700 text-white rounded-full px-8 py-2" onClick={openContactForm}>Get A Quote</button> */}
  </div>
</div>


{/* About Us */}
{/* <div className='About-Us'><h1><br></br><br></br>About Us</h1></div> */}

  <div className="hero-container">
        {/* First Half */}
        <div className="hero-first-half">
          <h1>Who are we <br></br>We&apos;re one team<br></br>There&apos;s no &quot;I&quot; in Scan Easy.</h1>

          <h3>The only way we&apos;ll succeed is by solving problems together and sharing lessons along the way. 
        As individuals, support and respect each other, and embrace our differences.</h3>
          
        </div>
      </div>

</div>


    </div>
  );
};

export default Hero;
