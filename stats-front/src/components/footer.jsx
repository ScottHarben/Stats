import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Footer(){

  return(
    <div className="text-center footer">
      <div className="pt-3 text-muted">
        Created by Scott Harben
      </div>
      <div className="pt-2 pb-3">
        <Link to="/admin" className="small text-muted admin">
          Admin
        </Link>
      </div>
    </div>
  );
}