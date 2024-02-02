import React from 'react';
import './SaveTheFrogs.css'; // Create a CSS file for your styles

const SaveTheFrogs = () => {
  return (
    <div className="container">
      <h1 className="title">Save the Frogs!</h1>
      <p className="paragraph">
        Welcome to our Save the Frogs campaign. Your support can make a difference in preserving
        the habitats of these amazing creatures.
      </p>
      <div className="image-container">
     
      </div>
      <div className="donation-info">
        <p>
          Help us in our mission to save the frogs! Consider making a donation to support our
          efforts.
        </p>
        <a href="https://your-donation-website.com" target="_blank" rel="noopener noreferrer">
          Donate Now
        </a>
      </div>
    </div>
  );
};

export default SaveTheFrogs;
