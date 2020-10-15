import React, {useState} from "react";
import Searchbar from '../../components/Searchbar';

const Login: React.FunctionComponent = (props: any) => {
  const [queryMaps, setQueryMaps] = useState<any | (() => any)>("");
  const [searchValue, setSearchValue] = useState<any | (() => any)>("");
  console.log(queryMaps)
  return (
    <>
      <h1> Login Page</h1>
      <h2> User form</h2>
      <Searchbar
        placeholder="Search a location"
        inputAction={setQueryMaps}
        searchValue={searchValue}
        setSearch={setSearchValue}
      />
    </>
  );
};

export default Login;
