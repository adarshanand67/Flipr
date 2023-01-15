import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const AboutCard = ({
  name,
  designation,
  description,
  image,
  linkedin,
  github,
}) => {
  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          className="h-36 w-36 rounded-full mx-auto"
          src={image}
          alt="Avatar"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-medium text-gray-800 mt-4 text-center">
            {name}
          </h2>
          <p className="text-gray-600 text-lg text-center">{designation}</p>
          <p className="text-gray-600 text-center">{description}</p>
          {/* Github linkedin links */}
          <div className="flex justify-center mt-4 gap-5">
            <button
              className="bg-blue-500 text-white rounded-full px-5 py-3 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => window.open(linkedin, "_blank")}
            >
              <BsLinkedin />
            </button>
            <button
              className="bg-gray-800 text-white rounded-full px-5 py-3 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => window.open(github, "_blank")}
            >
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
