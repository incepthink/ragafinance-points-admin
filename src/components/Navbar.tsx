"use client";

import React, { useState } from "react";

const Navbar = () => {
  return (
    <>
      <div className="w-screen">
        <nav className="px-8 flex justify-between items-center w-full">
          <div className="w-28">
            <img
              src="/raga-logo.svg"
              alt="logo"
              className="object-cover w-full"
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
