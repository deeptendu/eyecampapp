import React, { useEffect, useState } from "react";
import Select from "react-select";

const SearchableDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{props.onSelect(selectedOption)},[selectedOption]);

    return (
        <>
            <Select
                options={props.options}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Search & select State"
                isSearchable
                className="w-100"
            />
            {/* {selectedOption && <p className="mt-2">You selected: {selectedOption.label}</p>} */}
        </>

    );
}

export default SearchableDropdown;
