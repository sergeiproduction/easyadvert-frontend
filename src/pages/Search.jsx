import React from "react";
import { BlockSearch } from "../components/BlockSearch";
import { BlockFilter } from "../components/BlockFilter";

const Search = () => {
  return (
    <div className="containerColumns">
      <div className="leftColumn">
        <BlockSearch />
      </div>
      <div className="rightColumn">
        <BlockFilter />
      </div>
    </div>
  );
};

export default Search;