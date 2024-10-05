import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import './EnquiryForm.css'; // Ensure your CSS file is included
import videoSrc from '../../../assets/videos/scooterv.mp4'; // Import video
import { client } from '../../Client/Client';

const EnquiryForm = () => {
  // State for managing form fields and messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false); 
  const [errors, setErrors] = useState({}); 

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    setSuccessMessage(false); // Reset success message

    // Validate fields
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,15}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const subjectRegex = /^[a-zA-Z\s]{1,20}$/;
    const messageRegex = /^.{1,50}$/;

    if (!nameRegex.test(name)) {
      newErrors.name = 'Name should only contain letters.';
    }
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (!subjectRegex.test(subject)) {
      newErrors.subject = 'Subject must be between 1 and 20 characters.';
    }
    if (!messageRegex.test(message)) {
      newErrors.message = 'Message must be between 1 and 50 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if there are any
      return; // Stop submission if there are errors
    }

    // Create an object with form data
    const enquiryData = { name, email, phone, subject, message };

    try {
      // Post data to the backend using client (axios instance)
      const response = await client.post('/enquiryUser/enquiries', enquiryData);

      if (response.status === 201) {
        setSuccessMessage(true);   
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        console.error('Error submitting form:', response.data.error || response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    setSuccessMessage(false);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value === "" || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setSubject(value);
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9\s]*$/.test(value)) {
      setMessage(value);
    }
  };

  return (
    <>
      {successMessage && (
        <Alert
          severity="success"
          onClose={handleClose}
          style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}
        >
          Form submitted successfully!
        </Alert>
      )}
      <div className="contact-form-section">
        <div className="contact-form-container">
          <video className="video-background" autoPlay loop muted>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="contact-form">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <p>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                {errors.name && <div className="error">{errors.name}</div>}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </p>
              <p>
                <input
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  id="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                  required
                />
                {errors.subject && <div className="error">{errors.subject}</div>}
              </p>
              <p>
                <textarea
                  name="message"
                  id="message"
                  cols={30}
                  rows={10}
                  placeholder="Message"
                  value={message}
                  onChange={handleMessageChange}
                  required
                />
                {errors.message && <div className="error">{errors.message}</div>}
              </p>
              <p>
                <input type="submit" value="Submit" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryForm;
