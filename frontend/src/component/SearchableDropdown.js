import React, { useEffect, useState } from "react";
import Select from "react-select";

const options = [
    { value: "", label: "Select Patient State" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CT", label: "Chhattisgarh" },
    { value: "GA", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JK", label: "Jammu and Kashmir" },
    { value: "GA", label: "Goa" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TG", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UT", label: "Uttarakhand" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "WB", label: "West Bengal" },
    { value: "AN", label: "Andaman and Nicobar Islands" },
    { value: "CH", label: "Chandigarh" },
    { value: "DN", label: "Dadra and Nagar Haveli" },
    { value: "DD", label: "Daman and Diu" },
    { value: "DL", label: "Delhi" },
    { value: "LD", label: "Lakshadweep" },
    { value: "PY", label: "Puducherry" }
];

const SearchableDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(()=>{props.stateOnChange(selectedOption)},[selectedOption,props]);

    return (
        <>
            <Select
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Search & select State"
                isSearchable
                className="w-100"
            />
            {selectedOption && <p className="mt-2">You selected: {selectedOption.label}</p>}
        </>

    );
}

export default SearchableDropdown;
