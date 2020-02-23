import React from 'react';
import "./index.css";

export const GameError = (props) => {
  return (
    <div className="error-container">
      <p>
        {props.message} <br/> Do you have the server running? For technical support send an email to <a href="mailto:r.solerginer@gmail.com">r.solerginer@gmail.com</a>
      </p>
    </div>
  )
}