import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";

export interface SearchOption {
  id: string | number;
  label: string;
  value: string;
  avatar?: string;
}

export interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  options?: SearchOption[];
  showDropdown?: boolean;
  className?: string;
  disabled?: boolean;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search here...",
  value = "",
  onChange,
  onSearch,
  options = [],
  showDropdown = false,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<SearchOption[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    if (showDropdown && options.length > 0) {
      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.value.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchValue, options, showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);

    if (showDropdown) {
      setIsOpen(newValue.length > 0);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(searchValue);
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: SearchOption) => {
    setSearchValue(option.label);
    onChange?.(option.label);
    onSearch?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full h-12 px-4 pl-12 pr-4
            border border-slate-300 rounded
            bg-white
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:border-blue-600
            transition-colors duration-200
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white hover:border-gray-400"
            }
          `}
        />

        {/* Magnifying glass icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#a)">
              <path
                d="M12.917 11.667h-.659l-.233-.225a5.417 5.417 0 0 0 1.233-4.45c-.391-2.317-2.325-4.167-4.658-4.45A5.42 5.42 0 0 0 2.542 8.6c.283 2.333 2.133 4.267 4.45 4.658a5.417 5.417 0 0 0 4.45-1.233l.225.233v.659l3.541 3.541a.88.88 0 0 0 1.242 0 .88.88 0 0 0 0-1.241l-3.533-3.55Zm-5 0a3.745 3.745 0 0 1-3.75-3.75 3.745 3.745 0 0 1 3.75-3.75 3.745 3.745 0 0 1 3.75 3.75 3.745 3.745 0 0 1-3.75 3.75Z"
                fill="#475569"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h20v20H0z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-20">
          {filteredOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                {option.avatar && (
                  <Avatar src={option.avatar} size="sm" alt="" />
                )}
                <span className="text-gray-900 font-medium">
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showDropdown &&
        isOpen &&
        searchValue.length > 0 &&
        filteredOptions.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="px-4 py-3 text-gray-400 text-sm">
              No results found
            </div>
          </div>
        )}
    </div>
  );
};

export default Search;
