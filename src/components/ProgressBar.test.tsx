import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  afterEach(() => cleanup());

  it('renders without crashing', () => {
    const { container } = render(<ProgressBar value={50} total={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('calculates width as percent of value/total', () => {
    render(<ProgressBar value={25} total={100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('25%');
  });

  it('shows 0% width if total is 0', () => {
    render(<ProgressBar value={10} total={0} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('shows 100% width if value equals total', () => {
    render(<ProgressBar value={200} total={200} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('100%');
  });

  it('handles value greater than total by clamping to 100%', () => {
    render(<ProgressBar value={300} total={200} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('100%');
  });

  it('handles null value safely', () => {
    render(<ProgressBar value={null} total={100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles null total safely', () => {
    render(<ProgressBar value={50} total={null} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles undefined value safely', () => {
    render(<ProgressBar value={undefined} total={100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles undefined total safely', () => {
    render(<ProgressBar value={50} total={undefined} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles NaN value safely', () => {
    render(<ProgressBar value={NaN} total={100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles negative total safely', () => {
    render(<ProgressBar value={50} total={-100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });

  it('handles negative value safely', () => {
    render(<ProgressBar value={-50} total={100} />);
    const innerBar = screen.getByTestId('progress-bar-inner');
    expect(innerBar.style.width).toBe('0%');
  });
});
