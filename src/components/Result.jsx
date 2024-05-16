import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import searchLogo from "../icons8-search-480.png";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Result = () => {
  const { getResults, results, searchTerm, isLoading } = useResultContext();
  const [showTemplate, setShowTemplate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== "") {
      getResults(`${searchTerm}`);
    } else {
      setShowTemplate(true);
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  switch (location.pathname) {
    case "/search":
      return (
        <>
          {showTemplate && (
            <div className="min-h-[60vh] flex justify-center items-center flex-col">
                <img src={searchLogo} alt="Image" className="w-60" />
                <p className="text-4xl text-[#9494b8] dark:text-sky-400/25 font-bold">Search for something</p>
            </div>
          )}
          <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
            {results?.results?.map(({ url, title, description }, index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={url} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {url.length > 30 ? url.substring(0, 30) : url}
                  </p>
                  <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">
                    {title}
                  </p>
                  <p>{description}</p>
                </a>
              </div>
            ))}
          </div>
        </>
      );
    default:
      return "Error...";
  }
};
