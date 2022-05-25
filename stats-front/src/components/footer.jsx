import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Footer(){

  return(
    <div className="text-center footer">
      <div className="pt-3 text-muted">
        Play The Fade
      </div>
      <div className="pt-2 text-muted small">
        <span className="me-1">Created by Scott Harben</span> &#8226; 
        <Link to="/admin" className="small text-muted admin ms-1">
          Admin
        </Link>
      </div>
    </div>
  );
}