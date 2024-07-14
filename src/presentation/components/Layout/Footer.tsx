import React from "react";
import R5 from "@presentation/assets/images/grupor5.jpg";
import Logo from "@presentation/assets/images/logo.png";
import GithubIcon from "@presentation/components/Icons/GithubIcon";
import GithubLink from "@presentation/components/Common/GithubLink";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-gray-900 body-font">
      <div className="container px-5 py-4 mx-auto flex items-center justify-between">
        <div className="flex-1">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <img src={Logo} alt="BookingShow Logo" className="h-4 w-auto" />
          </a>
        </div>
        <div className="flex-1">
          <p className="text-sm text-center text-gray-400 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4 flex items-center">
            Crafted with{" "}
            <span className="text-red-600 mx-1">
              <svg
                className="w-6 h-6 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.004A6.5 6.5 0 0112 21c-1.14 0-2.22-.362-3.355-.09z" />
              </svg>
            </span>
            by{" "}
            <a
              className="mx-1"
              href="https://github.com/danjavia/bookstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              @danjavia
            </a>
            for{" "}
            <img
              className="rounded-full h-4 w-4 mx-2"
              src={R5}
              alt="Logo Grupo R5"
            />
            Group - 2024
          </p>
        </div>
        <div className="flex-1 text-right">
          <GithubLink />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
