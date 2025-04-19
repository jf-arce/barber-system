// Creación de un subcomponente para el campo de selección del formulario
import React from "react";
import { FieldError } from "react-hook-form";

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  error?: FieldError;
};

const SelectField: React.FC<SelectFieldProps> = ({ id, label, options, error, ...register }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        {...register}
        className="mt-1 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-[1px] focus:ring-primary focus:border-primary"
      >
        <option value="" disabled>
          --seleccionar--
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500 mt-1">{error.message}</span>}
    </div>
  );
};

export default SelectField;