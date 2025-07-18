import React from "react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Search, { type SearchOption } from "../src/components/Search";

const mockSearchOptions: SearchOption[] = [
  {
    id: 1,
    label: "John Doe",
    value: "john_doe",
    avatar: "https://example.com/avatar1.jpg"
  },
  {
    id: 2,
    label: "Jane Smith",
    value: "jane_smith",
    avatar: "https://example.com/avatar2.jpg"
  },
  {
    id: 3,
    label: "Mike Johnson",
    value: "mike_johnson"
  }
];

describe("Search Component", () => {
  const defaultProps = {
    placeholder: "Search here...",
    value: "",
    onChange: vi.fn(),
    onSearch: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders basic search input", () => {
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");
  });

  it("displays magnifying glass icon", () => {
    render(<Search {...defaultProps} />);
    
    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "test");
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("test");
  });

  it("calls onSearch when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "test");
    await user.keyboard("{Enter}");
    
    expect(defaultProps.onSearch).toHaveBeenCalledWith("test");
  });



  it("shows dropdown when showDropdown is true and user types", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "j");
    
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("filters dropdown options based on search input", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "jane");
    
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Mike Johnson")).not.toBeInTheDocument();
    });
  });

  it("shows 'No results found' when no options match", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "xyz");
    
    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  it("selects option when clicked in dropdown", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "j");
    
    await waitFor(() => {
      const option = screen.getByText("John Doe");
      fireEvent.click(option);
    });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("John Doe");
    expect(defaultProps.onSearch).toHaveBeenCalledWith("john_doe");
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "j");
    
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    
    // Click outside the search component
    fireEvent.mouseDown(document.body);
    
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  it("displays search button when onSearch is provided", () => {
    render(<Search {...defaultProps} />);
    
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
  });

  it("calls onSearch when search button is clicked", async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "test");
    
    const searchButton = screen.getByText("Search");
    await user.click(searchButton);
    
    expect(defaultProps.onSearch).toHaveBeenCalledWith("test");
  });

  it("applies disabled state correctly", () => {
    render(<Search {...defaultProps} disabled={true} />);
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    expect(searchInput).toBeDisabled();
    
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeDisabled();
  });

  it("applies custom className", () => {
    render(<Search {...defaultProps} className="custom-class" />);
    
    const searchContainer = screen.getByPlaceholderText("Search here...").closest("div")?.parentElement;
    expect(searchContainer).toHaveClass("custom-class");
  });

  it("displays avatars in dropdown options when available", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={mockSearchOptions}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "j");
    
    await waitFor(() => {
      const avatars = screen.getAllByAltText("");
      expect(avatars).toHaveLength(2);
      expect(avatars[0]).toHaveAttribute("src", "https://example.com/avatar1.jpg");
      expect(avatars[1]).toHaveAttribute("src", "https://example.com/avatar2.jpg");
    });
  });

  it("handles empty options array", async () => {
    const user = userEvent.setup();
    render(
      <Search
        {...defaultProps}
        options={[]}
        showDropdown={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText("Search here...");
    await user.type(searchInput, "test");
    
    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });
}); 