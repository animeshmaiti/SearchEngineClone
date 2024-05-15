import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Result = () => {
  const { getResults, results, searchTerm, isLoading } = useResultContext();
  const [showTemplate, setShowTemplate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== "") {
      getResults(`Nike`);
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
            <div>
              <h1>Search for something</h1>
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
