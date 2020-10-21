import React, {useEffect, useRef} from 'react';
import './index.style.scss';
import SearchSvg from '../../images/search';

type propTypes = {
  setSearch: any;
  searchValue: string;
  inputAction: any;
  placeholder: string;
  callback: () => any;
}

let autoComplete: google.maps.places.Autocomplete;

const SearchBar = (props: propTypes): JSX.Element => {
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const {
    inputAction,
    placeholder,
    setSearch,
    searchValue,
    callback,
  } = props;
 
  useEffect(() => {
    initMap()
  }, []);

  const handlePlaceSelect = () => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject;
    inputAction(query);
    setSearch(`${query.name}, ${query.formatted_address}`);
  }

  const initMap = () => {
    if (autoCompleteRef.current) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['establishment'] }
      );
      autoComplete.setFields(["geometry", "name", "place_id", "formatted_address", "address_components", "types"]);
      autoComplete.addListener("place_changed", async () => {
       await handlePlaceSelect()
      });
    }
  }

  return (
    <div className="container_search">
      <input
        id="searchQuery"
        ref={autoCompleteRef}
        className='searchInput'
        value={searchValue}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder} />
      <div className="search"></div>
    </div>
  );
}

export default SearchBar;