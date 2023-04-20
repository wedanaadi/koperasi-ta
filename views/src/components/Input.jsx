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

export const InputFormat = ({ value, handle, label, validasi }) => {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-primary font-semibold text-lg"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <NumericFormat
        className={`w-full p-2 border-2 border-second focus:bg-four rounded-md`}
        displayType="input"
        value={value[name]}
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        onValueChange={handle}
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
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  // console.log(name);
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-primary font-semibold text-lg"
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <input
        className="w-full p-2 border-2 border-second focus:bg-four rounded-md"
        type={type}
        name={name}
        value={value[name]}
        onChange={handle}
        placeholder={label}
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
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  // console.log(name);
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-primary font-semibold text-lg"
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <Datepicker
        useRange={false}
        asSingle={true}
        value={value}
        onChange={handle}
        displayFormat={"DD/MM/YYYY"}
        inputClassName="w-full rounded-md focus:ring-0 font-normal p-2 border-2 border-second focus:bg-four rounded-md"
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
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-primary font-semibold text-lg"
        htmlFor={label.toLowerCase()}
      >
        {alias !== "" ? alias : label}
      </label>
      <textarea
        className="w-full p-2 border-2 border-second focus:bg-four rounded-md"
        name={name}
        onChange={handle}
        placeholder={label}
        rows={rows}
        value={value[name]}
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
}) {
  const name = label.replace(/\s+/g, "_").toLowerCase();
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-primary font-semibold text-lg"
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
      />
      {validasi[`${name}`]?.map((msg, index) => (
        <span key={index} className="text-sm text-red-600 font-semibold">
          {msg}
        </span>
      ))}
    </div>
  );
}
