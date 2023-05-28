import React, { useState } from "react";
import "./contact.css";
export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first-name">First Name:</label>
        <input
          className="field"
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
