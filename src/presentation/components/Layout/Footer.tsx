import React from "react";
import R5 from "@assets/images/grupor5.jpg";
import GithubLink from "@presentation/components/Common/GithubLink";
import { HeartIcon } from "@assets/icons/HeartIcon";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-gray-900 body-font">
      <div className="max-w-screen-xl px-5 py-4 mx-auto flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 sm:py-2 sm:mt-0 mt-4 flex items-center font-semibold">
            Crafted with <HeartIcon />
            <a
              className="mx-1"
              href="https://github.com/danjavia/bookstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              By @danjavia
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
