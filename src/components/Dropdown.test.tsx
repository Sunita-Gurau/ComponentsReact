import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Dropdown from './Dropdown';
import { useState } from 'react';

type DropdownOption = {
  value: string;
  label: string;
  count?: number;
};

const mockOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', count: 5 },
];

const defaultProps = {
  options: mockOptions,
  value: mockOptions[0],
  onChange: vi.fn(),
  getLabel: (option: DropdownOption) => option.label,
  getValue: (option: DropdownOption) => option.value,
  getCount: (option: DropdownOption) => option.count,
};

const multiSelectProps = {
  options: mockOptions,
  value: [mockOptions[0], mockOptions[2]],
  onChange: vi.fn(),
  getLabel: (option: DropdownOption) => option.label,
  getValue: (option: DropdownOption) => option.value,
  getCount: (option: DropdownOption) => option.count,
  multiSelect: true,
  variant: 'simple',
};

// Helper wrapper for multiSelect stateful testing
function MultiSelectWrapper(props: any) {
  const [value, setValue] = useState<any[]>(props.value || []);
  return <Dropdown {...props} value={value} onChange={setValue} />;
}

// Helper to get the dropdown option button by name (only in open dropdown)
function getDropdownOptionButton(name: string) {
  const optionButtons = screen.getAllByRole('button', { name });
  return optionButtons.find(btn => btn.closest('[aria-hidden="false"]'));
}

describe('Dropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label', () => {
    render(<Dropdown {...defaultProps} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders without label', () => {
    render(<Dropdown {...defaultProps} />);
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('displays selected option', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Option 1');
  });

  it('displays placeholder when no option is selected', () => {
    render(<Dropdown {...defaultProps} value={undefined} placeholder="Select option" />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown {...defaultProps} onChange={onChange} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const option2 = screen.getByText('Option 2');
    await user.click(option2);
    
    expect(onChange).toHaveBeenCalledWith(mockOptions[1]);
  });

  it('closes dropdown when option is selected', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const option2 = screen.getByText('Option 2');
    await user.click(option2);
    
    // Check that the option button is not present
    const optionButtons = screen.queryAllByRole('button', { name: 'Option 2' });
    expect(optionButtons.length).toBe(0);
  });

  it('shows counts when showCounts is true', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} showCounts={true} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show counts when showCounts is false', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} showCounts={false} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('shows icon by default', () => {
    render(<Dropdown {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('does not show icon when showIcon is false', () => {
    render(<Dropdown {...defaultProps} showIcon={false} />);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Dropdown {...defaultProps} disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} disabled={true} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Check that the option button is not present
    const disabledOptionButtons = screen.queryAllByRole('button', { name: 'Option 2' });
    expect(disabledOptionButtons.length).toBe(0);
  });

  it('applies custom className', () => {
    render(<Dropdown {...defaultProps} className="custom-class" />);
    const container = screen.getByRole('button').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown {...defaultProps} />
      </div>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    
    const outside = screen.getByTestId('outside');
    await user.click(outside);
    
    // Check that the option button is not present
    const outsideOptionButtons = screen.queryAllByRole('button', { name: 'Option 2' });
    expect(outsideOptionButtons.length).toBe(0);
  });

  it('highlights selected option in dropdown', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...defaultProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    const options = screen.getAllByText('Option 1');
    // The first is the button, the second is the dropdown option
    expect(options[1].closest('button')).toHaveClass('bg-[#F1F5F9]');
  });
});

describe('Dropdown (multiSelect)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders selected options as chips with gray background', () => {
    render(<Dropdown {...multiSelectProps} />);
    // Should render two chips
    const chips = screen.getAllByText(/Option/).filter(el => el.className.includes('bg-gray-200'));
    expect(chips.length).toBe(2);
    expect(chips[0]).toHaveTextContent('Option 1');
    expect(chips[1]).toHaveTextContent('Option 3');
  });

  it('allows selecting and deselecting multiple options', async () => {
    const user = userEvent.setup();
    render(<MultiSelectWrapper {...multiSelectProps} value={[]} />);
    
    // Open dropdown and select Option 1
    let button = screen.getByTestId('dropdown-toggle');
    await user.click(button);
    
    // Find Option 1 in the dropdown and click it (get the one in the dropdown, not the chip)
    const option1Buttons = screen.getAllByText('Option 1');
    const option1DropdownButton = option1Buttons.find(el => el.closest('[aria-hidden="false"]'))?.closest('button');
    expect(option1DropdownButton).toBeInTheDocument();
    await user.click(option1DropdownButton!);
    
    // Option 1 chip should appear
    expect(screen.getAllByText('Option 1').some(el => el.className.includes('bg-gray-200'))).toBe(true);
    
    // Select Option 2 (dropdown should still be open in multi-select mode)
    const option2Buttons = screen.getAllByText('Option 2');
    const option2DropdownButton = option2Buttons.find(el => el.closest('[aria-hidden="false"]'))?.closest('button');
    expect(option2DropdownButton).toBeInTheDocument();
    await user.click(option2DropdownButton!);
    
    expect(screen.getAllByText('Option 2').some(el => el.className.includes('bg-gray-200'))).toBe(true);
    
    // Deselect Option 1 (dropdown should still be open)
    const option1ButtonsAgain = screen.getAllByText('Option 1');
    const option1DropdownButtonAgain = option1ButtonsAgain.find(el => el.closest('[aria-hidden="false"]'))?.closest('button');
    expect(option1DropdownButtonAgain).toBeInTheDocument();
    await user.click(option1DropdownButtonAgain!);
    
    // Option 1 chip should be gone, Option 2 chip should remain
    expect(screen.queryAllByText('Option 1').some(el => el.className.includes('bg-gray-200'))).toBe(false);
    expect(screen.getAllByText('Option 2').some(el => el.className.includes('bg-gray-200'))).toBe(true);
  });

  it('does not render checkboxes in the dropdown list', async () => {
    const user = userEvent.setup();
    render(<Dropdown {...multiSelectProps} />);
    const button = screen.getByRole('button');
    await user.click(button);
    // Should not find any checkbox
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});