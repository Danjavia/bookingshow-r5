import React from "react";
import GithubIcon from "@assets/icons/GithubIcon";

const GithubLink = () => {
  return (
    <a
      href="https://github.com/Danjavia/bookingshow-r5"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-gray-400 hover:text-white"
    >
      <GithubIcon />
    </a>
  );
};

export default GithubLink;
