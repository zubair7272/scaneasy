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
    </div>
  );
};

export default Hero;
