import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../src/components/Dropdown';

// Sample data for stories
const simpleOptions = [
  { id: 1, name: 'Option 1', count: 10 },
  { id: 2, name: 'Option 2', count: 5 },
  { id: 3, name: 'Option 3', count: 15 },
  { id: 4, name: 'Option 4', count: 8 },
  { id: 5, name: 'Option 5', count: 12 },
];

const userOptions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 5, name: 'David Brown', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the dropdown arrow icon',
    },
    showCounts: {
      control: 'boolean',
      description: 'Whether to show count badges for options',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    variant: {
      control: { type: 'select' },
      options: ['simple', 'filter-with-icon', 'filter'],
      description: 'Visual variant of the dropdown',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the dropdown has search functionality',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    placeholder: 'Select an option',
  },
};

export const WithSelectedValue: Story = {
  args: {
    options: simpleOptions,
    value: simpleOptions[1],
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose Option',
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    placeholder: 'Select an option',
  },
};

export const WithCounts: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    getCount: (option: any) => option.count,
    showCounts: true,
    placeholder: 'Select an option',
  },
};

export const Searchable: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    searchable: true,
    placeholder: 'Search and select...',
  },
};

export const MultiSelect: Story = {
  args: {
    options: simpleOptions,
    value: [],
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    multiSelect: true,
    variant: 'simple',
    placeholder: 'Select multiple options',
  },
};

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    disabled: true,
    placeholder: 'Select an option',
  },
};

export const FilterVariant: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    variant: 'filter',
    placeholder: 'Filter by option',
  },
};

export const FilterWithIconVariant: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    variant: 'filter-with-icon',
    label: 'Filter',
    placeholder: 'Filter by option',
  },
};

export const CustomOptionRenderer: Story = {
  args: {
    options: userOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    renderOption: (option: any, selected: boolean) => (
      <div className="flex items-center space-x-3">
        <img
          src={option.avatar}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-medium">{option.name}</div>
          <div className="text-sm text-gray-500">{option.email}</div>
        </div>
      </div>
    ),
    placeholder: 'Select a user',
  },
};

export const NoIcon: Story = {
  args: {
    options: simpleOptions,
    value: undefined,
    onChange: (value: any) => console.log('Selected:', value),
    getLabel: (option: any) => option.name,
    getValue: (option: any) => option.id,
    showIcon: false,
    placeholder: 'Select an option',
  },
}; 