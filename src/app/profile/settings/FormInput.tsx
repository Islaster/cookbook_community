"use client";

type FormInputProps = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
};

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}
