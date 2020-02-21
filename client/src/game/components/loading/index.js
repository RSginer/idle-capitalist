import React from 'react';

import "./index.css";

export const GameLoading = (props) => {
  return (
    <div className="loading-container">
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    <span className="loading-label">Loading...</span>
    </div>
  )
}