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
"use client";
import React, { useState } from 'react';
import './HeroSection.css';
import backgroundImage from './/right-section.jpg'; // Update the image file name if needed


const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    restaurantName: '',
    role: '',
  });

  const [showContactForm, setShowContactForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for required fields before submission
    if (!formData.name || !formData.email || !formData.restaurantName || !formData.role) {
      alert('Please fill in all required fields.');
      return;
    }
    // Handle form submission logic here
    //Form Data
    console.log('Form Data:', formData);
    // Reset the form after submission if needed
    setFormData({
      name: '',
      email: '',
      restaurantName: '',
      role: '',
    });
    // Close the contact form
    setShowContactForm(false);
  };

  return (
    <div className="hero-container">
      {/* First Half */}
      <div className="hero-first-half">
        <h1 className='text-4xl'>Built for restaurants.</h1>
        <h1 className='text-4xl mb-3'>Built for you.</h1>
        <p>99,000* restaurants like yours trust Toast with their technology. 
          From POS to payroll, we take care of it all – so you can focus on what you do best.</p>
        <div className="hero-buttons">
          <button onClick={() => setShowContactForm(true)}>Get a Demo</button>
          <button>See Pricing</button>
        </div>
      </div>

      {/* Second Half */}
      <div className="hero-second-half">
        <h2>Contact Us</h2>
        {/* Contact Form Popup */}
        {showContactForm && (
          <div className="contact-form-popup">
            <div className="close-button" onClick={() => setShowContactForm(false)}>
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
        )}            
      </div>
                    //date : 2/2/24
                    {/* Add the image with reduced height */}
        <img src={backgroundImage} alt="Background" style={{ width: '50%', height: '80%', objectFit: 'contain' }} />
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
    </div>
            </>
  );
};

export default Hero;
