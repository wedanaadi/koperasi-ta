import { NumericFormat } from "react-number-format";
import SelectComponent from "./Tailwind/Select";
import Datepicker from "react-tailwindcss-datepicker";

export const NumberFormat = ({ value }) => {
  return (
    <NumericFormat
      displayType="text"
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
    />
  );
};

export const InputFormat = ({ value, handle, label, validasi, flex=false, disabled=false }) => {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4 items-center'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <NumericFormat
        className={`w-full p-2 border-2 border-second focus:bg-four rounded-md ${disabled && 'bg-four rounded-md'}`}
        displayType="input"
        value={value[name]}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        onValueChange={handle}
        disabled={disabled}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
};

export const InputDecimal = ({ value, handle, label, validasi, flex=false, disabled=false, alias="" }) => {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4 items-center'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'sm:w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <NumericFormat
        className={`w-full p-2 border-2 border-second focus:bg-four rounded-md ${disabled && 'bg-four rounded-md'}`}
        displayType="input"
        value={value[name]}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        allowNegative={false}
        onValueChange={handle}
        placeholder={label}
        disabled={disabled}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
};

export function Input({
  value,
  handle,
  label,
  validasi,
  alias = "",
  type = "text",
  flex=false,
  disabled=false
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  // console.log(name);
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4 items-center'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <input
        className={`w-full p-2 border-2 border-second focus:bg-four rounded-md ${disabled && 'bg-four rounded-md'}`}
        type={type}
        name={name}
        value={value[name]}
        onChange={handle}
        placeholder={label}
        disabled={disabled}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
}

export function DateInput({
  value,
  handle,
  label,
  validasi,
  alias = "",
  flex=false,
  disabled=false
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  // console.log(name);
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4 items-center'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'sm:w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <Datepicker
        useRange={false}
        asSingle={true}
        value={value}
        onChange={handle}
        disabled={disabled}
        displayFormat={"DD/MM/YYYY"}
        containerClassName={`mt-0 ${flex && 'sm:w-full relative'}`}
        toggleClassName="hidden"
        inputClassName={`w-full relative rounded-md focus:ring-0 font-normal p-2 border-2 border-second focus:bg-four rounded-md ${disabled && 'bg-four rounded-md'}`}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
}

export function Textarea({
  value,
  handle,
  label,
  validasi,
  rows = 5,
  alias = "",
  flex=false,
  disabled=false,
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <textarea
        className={`w-full p-2 border-2 border-second focus:bg-four rounded-md ${disabled && 'bg-four rounded-md'}`}
        name={name}
        onChange={handle}
        placeholder={label}
        rows={rows}
        value={value[name]}
        disabled={disabled}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
}

export function Select({
  value,
  handle,
  label,
  validasi,
  options,
  alias = "",
  ccPosition="",
  flex=false
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className={`mb-6 ${flex && 'sm:flex whitespace-nowrap gap-x-4'} ${ccPosition==='absolute' && 'items-center'}`}>
      <label
        className={`block mb-2 text-primary font-semibold text-lg ${flex && 'sm:w-1/2'}`}
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <SelectComponent
        isSearchable
        placeHolder="Select..."
        options={options}
        editValue={value}
        onChange={handle}
        cssPotision={ccPosition}
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
}
