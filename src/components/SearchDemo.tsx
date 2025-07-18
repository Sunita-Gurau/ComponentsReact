import React, { useState } from "react";
import Search, { type SearchOption } from "./Search";
import Card from "./Card";

const SearchDemo: React.FC = () => {
  const [searchValue1, setSearchValue1] = useState("");
  const [searchValue2, setSearchValue2] = useState("");
  const [searchValue3, setSearchValue3] = useState("");

  // Sample search options for dropdown
  const searchOptions: SearchOption[] = [
    {
      id: 1,
      label: "John Doe",
      value: "john_doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      label: "Jane Smith",
      value: "jane_smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      label: "Mike Johnson",
      value: "mike_johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      label: "Sarah Wilson",
      value: "sarah_wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      label: "David Brown",
      value: "david_brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleSearch = (value: string) => {
    console.log("Search performed:", value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Component Demo</h1>
      
      {/* Basic Search */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Search</h2>
        <Search
          placeholder="Search here..."
          value={searchValue1}
          onChange={setSearchValue1}
          onSearch={handleSearch}
          className="max-w-md"
        />
        <p className="text-sm text-gray-600 mt-2">Current value: {searchValue1}</p>
      </Card>

      {/* Search with Dropdown */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search with Dropdown</h2>
        <Search
          placeholder="Search users..."
          value={searchValue2}
          onChange={setSearchValue2}
          onSearch={handleSearch}
          options={searchOptions}
          showDropdown={true}
          className="max-w-md"
        />
        <p className="text-sm text-gray-600 mt-2">Current value: {searchValue2}</p>
      </Card>

      {/* Search with Dropdown and Avatars in Options */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search with Dropdown and Avatars in Options</h2>
        <Search
          placeholder="Search users..."
          value={searchValue3}
          onChange={setSearchValue3}
          onSearch={handleSearch}
          options={searchOptions}
          showDropdown={true}
          className="max-w-md"
        />
        <p className="text-sm text-gray-600 mt-2">Current value: {searchValue3}</p>
      </Card>

      {/* Disabled Search */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Disabled Search</h2>
        <Search
          placeholder="Search here..."
          value=""
          disabled={true}
          className="max-w-md"
        />
        <p className="text-sm text-gray-600 mt-2">This search input is disabled</p>
      </Card>

    </div>
  );
};

export default SearchDemo; 