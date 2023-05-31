import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";
export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //
  const ServiceKey = process.env.REACT_APP_SERVICE_KEY;
  const TemplateID = process.env.REACT_APP_TEMPLATE_ID;
  const PublicKey = process.env.REACT_APP_PUBLIC_KEY;
  const contact = useRef();
  //
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        `${ServiceKey}`,
        `${TemplateID}`,
        contact.current,
        `${PublicKey}`
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    // or e.target.reset()
  };
  //

  return (
    <form ref={contact} className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first-name">First Name:</label>
        <input
          className="field"
          name="name" //
          type="text"
          id="first-name"
          placeholder="Enter first name"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input
          className="field"
          placeholder="Enter last name"
          type="text"
          id="last-name"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          className="field"
          placeholder="YourEmail@email.com"
          type="email"
          id="email"
          name="user_email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          placeholder="Hi [Name],
        My name is [your name], and I'm writing about the [post title] ...."
          className="textarea"
          name="user_message"
          id="message"
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>
      </div>
      <button className="button" type="submit">
        Send Your Message
      </button>
    </form>
  );
}
