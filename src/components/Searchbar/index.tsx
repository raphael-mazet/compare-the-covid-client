import React, {useEffect, useRef} from 'react';
import './index.style.scss';
import SearchSvg from '../../images/search';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const initMap = () => {
    if (autoCompleteRef.current) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['establishment'] }
      );
      autoComplete.setFields(["geometry", "name", "place_id", "formatted_address"]);
      autoComplete.addListener("place_changed", async () => {
        await handlePlaceSelect()
        callback();
      });
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