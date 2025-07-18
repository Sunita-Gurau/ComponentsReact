
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../src/components/Card';
//describe is a function used to group related tests together.
describe('Card', () => {
  //it defines a single test case. 
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    //expect is used to create an assertion.
    //screen is an object provided by React Testing Library that gives you access to queries for finding elements in the rendered output.
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
}); 