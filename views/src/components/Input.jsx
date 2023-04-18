export default function Input({ value, handle, label, validasi }) {
  const name = label.replace(/\s+/g, '_').toLowerCase();
  console.log(name);
  return (
    <div>
      <label
        className="block mb-2 text-primary font-semibold text-lg"
        htmlFor={label.toLowerCase()}
      >
        {label}
      </label>
      <input
        className="w-full p-2 border-2 border-second focus:bg-four rounded-md"
        type="text"
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
