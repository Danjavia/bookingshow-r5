import GithubIcon from "@presentation/components/Icons/GithubIcon";
import React from "react";

const GithubLink = () => {
  return (
    <a
      href="https://github.com/danjavia/bookstore"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-gray-400 hover:text-white"
    >
      <GithubIcon />
    </a>
  );
};

export default GithubLink;
