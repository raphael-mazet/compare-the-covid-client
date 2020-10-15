import React, {useEffect, useRef} from 'react';
import './index.style.scss';
import SearchSvg from '../../images/search';

type propTypes = {
  setSearch: any;
  searchValue: string;
  inputAction: any;
  placeholder: string;
}

let autoComplete: google.maps.places.Autocomplete;

const SearchBar = (props: propTypes): JSX.Element => {
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const {
    inputAction,
    placeholder,
    setSearch,
    searchValue
  } = props;
 
  useEffect(() => {
    initMap()
  }, []);

  const handlePlaceSelect = () => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject;
    inputAction(query);
    setSearch(query.name)
  }

  const initMap = () => {
    if (autoCompleteRef.current) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['establishment'] }
      );
      autoComplete.setFields(["geometry", "name", "place_id"]);
      autoComplete.addListener("place_changed", () =>
        handlePlaceSelect()
      );
    }
  }

  return (
    <div className='searchBar'>
      <input
        id="searchQuery"
        ref={autoCompleteRef}
        className='searchInput'
        value={searchValue}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder} />
      <SearchSvg height={'20px'} color={'#5D7A98'} />
    </div>
  );
}

export default SearchBar;