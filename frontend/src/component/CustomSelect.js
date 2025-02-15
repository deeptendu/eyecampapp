import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const CustomSelect = ({ options, onChange }) => {
    const [customOptions, setCustomOptions] = useState(options);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (newValue) => {
        setSelectedOption(newValue);
        onChange(newValue); // Pass selected value to parent
    };

    const handleCreate = (inputValue) => {
        const newOption = { value: inputValue, label: inputValue };
        setCustomOptions((prev) => [...prev, newOption]);
        setSelectedOption(newOption); // Select the newly created option
        onChange(newOption); // Pass new option to parent
    };

    return (
        <CreatableSelect
            options={customOptions}
            value={selectedOption}
            onChange={handleChange}
            onCreateOption={handleCreate}
            placeholder="Search & select State"
            isSearchable
            className="w-100"
        />
    );
};

export default CustomSelect;
