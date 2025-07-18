import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Search, { type SearchOption } from '../src/components/Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    value: {
      control: 'text',
      description: 'Current value of the search input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search input is disabled',
    },
    showDropdown: {
      control: 'boolean',
      description: 'Whether to show dropdown with search options',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: SearchOption[] = [
  {
    id: 1,
    label: 'John Doe',
    value: 'john_doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    label: 'Jane Smith',
    value: 'jane_smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    label: 'Mike Johnson',
    value: 'mike_johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 4,
    label: 'Sarah Wilson',
    value: 'sarah_wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 5,
    label: 'David Brown',
    value: 'david_brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  }
];

export const Default: Story = {
  args: {
    placeholder: 'Search here...',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search here...',
    value: 'Search term',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search for users, files, or anything...',
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search here...',
    value: '',
    disabled: true,
  },
};

export const WithDropdown: Story = {
  args: {
    placeholder: 'Search users...',
    value: '',
    options: sampleOptions,
    showDropdown: true,
  },
};

export const WithDropdownAndValue: Story = {
  args: {
    placeholder: 'Search users...',
    value: 'John',
    options: sampleOptions,
    showDropdown: true,
  },
};

export const WithManyOptions: Story = {
  args: {
    placeholder: 'Search from many options...',
    value: '',
    options: [
      ...sampleOptions,
      {
        id: 6,
        label: 'Emily Davis',
        value: 'emily_davis',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 7,
        label: 'Robert Wilson',
        value: 'robert_wilson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 8,
        label: 'Lisa Anderson',
        value: 'lisa_anderson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 9,
        label: 'Michael Taylor',
        value: 'michael_taylor',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 10,
        label: 'Jennifer Garcia',
        value: 'jennifer_garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    ],
    showDropdown: true,
  },
};

export const WithoutAvatars: Story = {
  args: {
    placeholder: 'Search items...',
    value: '',
    options: [
      { id: 1, label: 'React', value: 'react' },
      { id: 2, label: 'TypeScript', value: 'typescript' },
      { id: 3, label: 'JavaScript', value: 'javascript' },
      { id: 4, label: 'Node.js', value: 'nodejs' },
      { id: 5, label: 'Vue.js', value: 'vuejs' },
    ],
    showDropdown: true,
  },
};

export const WideSearch: Story = {
  args: {
    placeholder: 'Search here...',
    value: '',
    className: 'w-96',
  },
};

export const NarrowSearch: Story = {
  args: {
    placeholder: 'Search...',
    value: '',
    className: 'w-48',
  },
}; 