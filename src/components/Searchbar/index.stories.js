import React, {useState} from "react";
import Searchbar from "./index.tsx";


export default {
  title: "Components/Searchbar",
  component: Searchbar,
};

export const Normal = () => {
  const [queryMaps, setQueryMaps] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <Searchbar
    placeholder="Search a location"
    inputAction={setQueryMaps}
    searchValue={searchValue}
    setSearch={setSearchValue}
    />
  )
};