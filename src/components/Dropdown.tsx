import React, { useState, useRef, useEffect } from "react";

export interface DropdownProps<T> {
  label?: string;
  options: T[];
  value: any;
  onChange: (value: any) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => any;
  getCount?: (option: T) => number | undefined;
  placeholder?: string;
  showIcon?: boolean;
  showCounts?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: "simple" | "filter-with-icon" | "filter";
  searchable?: boolean;
  renderOption?: (option: T, selected: boolean) => React.ReactNode;
}

const DROPDOWN_HEIGHT = 240; 

function Dropdown<T>({
  label,
  options,
  value,
  onChange,
  getLabel,
  getValue,
  getCount,
  placeholder = "Select an option",
  showIcon = true,
  showCounts = false,
  className = "",
  disabled = false,
  variant = "simple",
  searchable = false,
  renderOption,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'down' | 'up'>('down');
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonWrapRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => getValue(option) === value);

  // Filtered options for search (only for simple variant and if searchable)
  const filteredOptions =
    variant === 'simple' && searchable
      ? options.filter(option => getLabel(option).toLowerCase().includes(search.toLowerCase()))
      : options;

  useEffect(() => {
    if (isOpen && buttonWrapRef.current) {
      const rect = buttonWrapRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove > DROPDOWN_HEIGHT) {
        setOpenDirection('up');
      } else {
        setOpenDirection('down');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: any) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearch(''); 
  };

  if (variant === "filter-with-icon" || variant === "filter") {
    return (
      <div className={`flex items-center gap-2 ${className}`} ref={dropdownRef}>
        {variant === "filter-with-icon" && (
          <svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#a)">
              <path
                d="M3.333 15h3.334a.836.836 0 0 0 .833-.833.836.836 0 0 0-.833-.834H3.333a.836.836 0 0 0-.833.834c0 .458.375.833.833.833ZM2.5 5.833c0 .459.375.834.833.834h13.334a.836.836 0 0 0 .833-.834.836.836 0 0 0-.833-.833H3.333a.836.836 0 0 0-.833.833Zm.833 5h8.334A.836.836 0 0 0 12.5 10a.836.836 0 0 0-.833-.833H3.333A.836.836 0 0 0 2.5 10c0 .458.375.833.833.833Z"
                fill="#64748B"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
              </clipPath>
            </defs>
          </svg>
        )}
        {label && (
          <span className="text-[16px] font-semibold text-[#64748B] font-karla leading-[1.4]">
            {label}
          </span>
        )}
        <div className="relative" ref={buttonWrapRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={`
              text-left
              rounded-[3px]
              bg-[#FDFDFD]
              h-[30px]
              px-4
              min-w-[150px]
              ${variant === "filter" ? "border border-[#DCDCDC]" : ""}
              ${
                disabled
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "hover:border-gray-300 cursor-pointer"
              }
              transition-colors duration-200
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#333] font-karla leading-[1.4]">
                {selectedOption ? getLabel(selectedOption) : placeholder}
              </span>
              {showIcon && (
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${openDirection === 'up' ? 'rotate-180' : ''}`}
                >
                  <path
                    d="m6.532 8.783 1.943 1.942a.747.747 0 0 0 1.057 0l1.943-1.942c.472-.473.135-1.283-.533-1.283H7.057c-.667 0-.997.81-.525 1.283Z"
                    fill="#475569"
                  />
                </svg>
              )}
            </div>
          </button>
          <div
            className={`
              absolute left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto min-w-[220px]
              transition-all duration-200 ease-in-out origin-top
              ${openDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'}
              ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
            `}
            aria-hidden={!isOpen}
          >
            {((searchable && filteredOptions.length === 0) || (!searchable && options.length === 0)) && (
              <div className="px-3 py-2 text-gray-400 text-sm">No results found</div>
            )}
            {(openDirection === 'up' ? [...(searchable ? filteredOptions : options)].slice().reverse() : (searchable ? filteredOptions : options)).map((option) => {
              const selected = getValue(option) === value;
              return (
                <button
                  key={getValue(option)}
                  type="button"
                  onClick={() => handleOptionClick(getValue(option))}
                  className={`
                    w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                    ${
                      selected
                        ? "bg-[#F1F5F9] text-[#0F172A] font-semibold font-manrope text-[14px] leading-[1.4]"
                        : "text-[#64748B] font-bold font-manrope text-[14px] leading-[1.4]"
                    }
                    transition-colors duration-150 border-b border-gray-100 last:border-b-0
                  `}
                  style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
                >
                  {renderOption
                    ? renderOption(option, selected)
                    : (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{getLabel(option)}</span>
                        {showCounts && getCount && getCount(option) !== undefined && (
                          <span className="text-sm text-gray-500 font-normal">
                            {getCount(option)}
                          </span>
                        )}
                      </div>
                    )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Simple dropdown (like Categories dropdown) - no icon before label
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <div className="flex items-center mb-2">
          <label className="text-gray-700 font-medium">{label}</label>
        </div>
      )}
      <div className="relative" ref={buttonWrapRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full text-left bg-white border border-gray-300 rounded-md
            px-3 py-2
            ${
              disabled
                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                : "hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
            }
            transition-colors duration-200
          `}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
              {selectedOption ? getLabel(selectedOption) : placeholder}
            </span>
            {showIcon && (
              <div className="rounded flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${openDirection === 'up' ? 'rotate-180' : ''}`}
                >
                  <path
                    d="m6.532 8.783 1.943 1.942a.747.747 0 0 0 1.057 0l1.943-1.942c.472-.473.135-1.283-.533-1.283H7.057c-.667 0-.997.81-.525 1.283Z"
                    fill="#475569"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
        <div
          className={`
            absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto
            transition-all duration-200 ease-in-out origin-top
            ${openDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'}
            ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
          `}
          aria-hidden={!isOpen}
        >
          {openDirection === 'down' && searchable && (
            <div className="p-2 border-b border-gray-200 bg-white sticky top-0 z-10">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Search..."
                autoFocus
              />
            </div>
          )}
          {((searchable && filteredOptions.length === 0) || (!searchable && options.length === 0)) && (
            <div className="px-3 py-2 text-gray-400 text-sm">No results found</div>
          )}
          {(openDirection === 'up' ? [...filteredOptions].slice().reverse() : filteredOptions).map((option) => (
            <button
              key={getValue(option)}
              type="button"
              onClick={() => handleOptionClick(getValue(option))}
              className={`
                w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                ${
                  getValue(option) === value
                    ? "bg-[#F1F5F9] text-[#0F172A] font-semibold font-manrope text-[14px] leading-[1.4]"
                    : "text-[#64748B] font-bold font-manrope text-[14px] leading-[1.4]"
                }
                transition-colors duration-150 border-b border-gray-100 last:border-b-0
              `}
              style={{ fontVariantNumeric: "lining-nums tabular-nums" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{getLabel(option)}</span>
                {showCounts && getCount && getCount(option) !== undefined && (
                  <span className="text-sm text-gray-500 ml-2">
                    {getCount(option)}
                  </span>
                )}
              </div>
            </button>
          ))}
          {openDirection === 'up' && searchable && (
            <div className="p-2 border-t border-gray-200 bg-white sticky bottom-0 z-10">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Search..."
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
