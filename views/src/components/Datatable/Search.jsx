import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("")

  const onInputChange = value => {
    setSearch(value)
    onSearch(value)
  }

  return (
    <input
      type="text"
      className="w-full p-2 border-2 border-second focus:bg-four rounded-md"
      style={{ width: "240px" }}
      placeholder="Search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
