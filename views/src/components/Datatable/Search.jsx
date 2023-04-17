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
      className="field border-primary bg-four focus:bg-four focus:text-third"
      style={{ width: "240px" }}
      placeholder="Search"
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
