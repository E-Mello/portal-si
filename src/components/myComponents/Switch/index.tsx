import React from "react";

export default function SwitchComponent({
  defaultValue,
  className = "",
  ...props
}: {
  defaultValue?: boolean;
  className?: string;
}) {
  const [checked, setChecked] = React.useState(defaultValue || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={`flex align-middle ${className}`}>
      <label className=" flex  h-6 w-10">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <span
          className={`absolute h-[2.1vh] w-10 transform cursor-pointer rounded-full transition-transform duration-300 ease-in-out ${
            checked ? "bg-green-500 delay-200" : "bg-red-500 delay-200"
          }`}
        >
          <span
            className={`absolute h-5 w-5 transform rounded-full border border-white bg-white transition-transform duration-300 ease-in-out ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          ></span>
        </span>
      </label>
      <label className="ml-2 text-sm text-gray-700">
        {checked ? "Sim" : "Não"}
      </label>
    </div>
  );
}
