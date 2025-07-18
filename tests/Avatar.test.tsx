import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '../src/components/Avatar';

describe('Avatar Component', () => {
  it('renders with image source', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Test Avatar"
      />
    );
    
    const img = screen.getByAltText('Test Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders fallback when no image source provided', () => {
    render(<Avatar fallback="JD" />);
    
    const fallback = screen.getByText('JD');
    expect(fallback).toBeInTheDocument();
  });

  it('renders fallback when image fails to load', () => {
    render(
      <Avatar
        src="https://invalid-url.com/image.jpg"
        fallback="JD"
        alt="Test Avatar"
      />
    );
    
    const img = screen.getByAltText('Test Avatar');
    fireEvent.error(img);
    
    const fallback = screen.getByText('JD');
    expect(fallback).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Avatar size="xs" fallback="JD" />);
    let avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('w-6', 'h-6');

    rerender(<Avatar size="lg" fallback="JD" />);
    avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('w-12', 'h-12');
  });

  it('applies correct shape classes', () => {
    const { rerender } = render(<Avatar shape="circle" fallback="JD" />);
    let avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('rounded-full');

    rerender(<Avatar shape="square" fallback="JD" />);
    avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('rounded-none');

    rerender(<Avatar shape="rounded" fallback="JD" />);
    avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('rounded-lg');
  });

  it('shows status indicator when showStatus is true', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Test Avatar"
        status="online"
        showStatus={true}
      />
    );
    
    const statusIndicator = screen.getByAltText('Test Avatar').parentElement?.parentElement?.querySelector('div:last-child');
    expect(statusIndicator).toHaveClass('bg-green-500');
  });

  it('does not show status indicator when showStatus is false', () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Test Avatar"
        status="online"
        showStatus={false}
      />
    );
    
    const statusIndicator = screen.getByAltText('Test Avatar').parentElement?.parentElement?.querySelector('div:last-child');
    expect(statusIndicator).not.toHaveClass('bg-green-500');
  });

  it('applies correct status colors', () => {
    const { rerender } = render(
      <Avatar status="online" showStatus={true} fallback="JD" />
    );
    let statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass('bg-green-500');

    rerender(<Avatar status="offline" showStatus={true} fallback="JD" />);
    statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass('bg-gray-400');

    rerender(<Avatar status="away" showStatus={true} fallback="JD" />);
    statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass('bg-yellow-500');

    rerender(<Avatar status="busy" showStatus={true} fallback="JD" />);
    statusIndicator = screen.getByTestId('status-indicator');
    expect(statusIndicator).toHaveClass('bg-red-500');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Avatar fallback="JD" onClick={handleClick} />);
    
    const avatar = screen.getByText('JD').parentElement;
    fireEvent.click(avatar!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies cursor pointer when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Avatar fallback="JD" onClick={handleClick} />);
    
    const avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('cursor-pointer');
  });

  it('does not apply cursor pointer when no onClick is provided', () => {
    render(<Avatar fallback="JD" />);
    
    const avatar = screen.getByText('JD').parentElement;
    expect(avatar).not.toHaveClass('cursor-pointer');
  });

  it('applies custom className', () => {
    render(<Avatar fallback="JD" className="custom-class" />);
    
    const avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('custom-class');
  });

  it('renders custom fallback component', () => {
    const CustomFallback = () => <div data-testid="custom-fallback">Custom</div>;
    
    render(<Avatar fallback={<CustomFallback />} />);
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });

  it('truncates fallback text to 2 characters', () => {
    render(<Avatar fallback="John Doe" />);
    
    const fallback = screen.getByText('JO');
    expect(fallback).toBeInTheDocument();
  });

  it('handles empty fallback text', () => {
    render(<Avatar fallback="" />);
    
    const fallback = screen.getAllByText('')[0];
    expect(fallback).toBeInTheDocument();
  });

  it('uses default alt text when not provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" />);
    
    const img = screen.getByAltText('Avatar');
    expect(img).toBeInTheDocument();
  });
}); 