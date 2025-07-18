import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from '../src/components/Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be displayed inside the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>This is a basic card with some content.</div>,
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Card Title</h3>
        <p className="text-gray-600">
          This is a card with more complex content including a title and paragraph.
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Action Button
        </button>
      </div>
    ),
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: <div>Card with custom styling applied</div>,
    className: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
  },
};

export const WithFormElements: Story = {
  args: {
    children: (
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    ),
  },
};

export const WithList: Story = {
  args: {
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Todo List</h3>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>Learn React</span>
          </li>
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>Build Components</span>
          </li>
          <li className="flex items-center space-x-2">
            <input type="checkbox" className="rounded" />
            <span>Write Stories</span>
          </li>
        </ul>
      </div>
    ),
  },
}; 