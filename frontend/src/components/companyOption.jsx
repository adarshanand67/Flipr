import { companies } from "../utils/companies";

export function CompanyOption({
  selectedCompany,
  handleChange,
  duration,
  handleDuration,
}) {
  const durationOptions = [
    { value: "1D", label: "1 Day" },
    { value: "1W", label: "1 Week" },
    { value: "1M", label: "1 Month" },
    { value: "3M", label: "3 Months" },
    { value: "6M", label: "6 Months" },
    { value: "1Y", label: "1 Year" },
    { value: "2Y", label: "2 Years" },
  ];

  return (
    <div className="flex justify-center gap-5">
      <div className="w-1/3">
        <select
          className="block appearance-none text-center w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          value={selectedCompany}
          onChange={handleChange}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <div className="w-1/3">
        <select
          className="appearance-none text-center w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          value={duration}
          onChange={handleDuration}
        >
          {durationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
