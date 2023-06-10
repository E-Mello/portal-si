import React, { useEffect, useState } from "react";
import {
  RegisterOptions,
  type UseFormRegister,
  useForm,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options?: Option[];
  onSelect: (selectedValue: string) => void;
  selectClassName?: string;
  optionClassName?: string;
  defaultValue?: string;
  register?: UseFormRegister<any>;
  name?: string;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  onSelect,
  selectClassName = "",
  optionClassName = "",
  defaultValue = "",
  register,
  name = "", // Provide a default value for name
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const { setValue } = useForm();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  useEffect(() => {
    setValue(name, selectedOption);
  }, [name, selectedOption, setValue]);

  useEffect(() => {
    setValue(name, defaultValue);
  }, [name, defaultValue, setValue]);

  return (
    <select
      className={`rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectClassName}`}
      value={selectedOption}
      onChange={handleSelect}
      {...(register && name && register(name))}
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={optionClassName}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
