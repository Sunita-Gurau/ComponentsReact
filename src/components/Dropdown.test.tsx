import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Dropdown from './Dropdown';
import type { DropdownOption } from './Dropdown';

const mockOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', count: 5 },
];

const defaultProps = {
  options: mockOptions,
  value: 'option1',
  onChange: vi.fn(),
  getLabel: (option: DropdownOption) => option.label,
  getValue: (option: DropdownOption) => option.value,
  getCount: (option: DropdownOption) => option.count,
};

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
    render(<Dropdown {...defaultProps} value="" placeholder="Select option" />);
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
    
    expect(onChange).toHaveBeenCalledWith('option2');
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