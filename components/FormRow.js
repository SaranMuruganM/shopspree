const FormRow = ({
  type,
  name,
  labelText,
  defaultValue = "",
  onChange,
  style,
  required
}) => {
  return (
    <div className="*:block space-y-2 grid">
      <label htmlFor={name} className="">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={` ${style} border border-gray-600 p-1 text-sm rounded focus:border-black focus:outline-none focus:border-1`}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;
