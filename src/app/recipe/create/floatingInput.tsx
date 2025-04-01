type FloatingInputProps = {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};
export default function FloatingInput({
  name,
  value,
  onChange,
  label,
}: FloatingInputProps) {
  return (
    <div className="relative w-18">
      <input
        type="number"
        name={name}
        value={value}
        min="0"
        onChange={onChange}
        className="peer w-18 px-3 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-2 text-gray-500 text-sm transition-all scale-100 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}
