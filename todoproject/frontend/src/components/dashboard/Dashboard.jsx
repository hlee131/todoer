import React, { Fragment } from "react";

import Nav from "./Nav.jsx";
import Form from "./Form.jsx";
import Items from "./Items.jsx";

export default function Dashboard() {
  return (
    <div className="w-screen">
      {/* Navbar */}
      <Nav />
      {/* Items and form, position: right */}
      <div className="bg-gray-100 w-3/4 float-right h-screen">
        <Items />
        <Form />
      </div>
    </div>
  );
}
