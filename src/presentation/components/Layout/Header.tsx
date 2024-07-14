import React from "react";

const Header = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Google Books Search</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/bookstore">Bookstore</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
