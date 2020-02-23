import React from 'react';
import "./index.css";

export const Dialog = (props) => {
  return (
    <div className="dialog-container" style={{ display: props.opened ? 'block' : 'none' }}>
      <div className="dialog-content">
        <div className="dialog-header">
          <span className="header-title">
            {props.title}
          </span>
        </div>
        <div className="dialog-body">
          <div className="body-content">
            {props.content}
          </div>
        </div>
        <div className="dialog-actions">
          <div className="actions">
            <button className="button" onClick={props.onActionClick}>{props.actionText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}