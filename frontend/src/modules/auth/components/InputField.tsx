// Creación de un subcomponente para el campo de entrada del formulario
import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  error?: FieldError;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, type, placeholder, error, ...register }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      />
      {error && <span className="text-sm text-red-500 mt-1">{error.message}</span>}
    </div>
  );
};

export default InputField;