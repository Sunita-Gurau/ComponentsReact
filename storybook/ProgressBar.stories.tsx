import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '../src/components/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current progress value (0-100)',
    },
    total: {
      control: { type: 'number', min: 1 },
      description: 'Total value for progress calculation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    total: 100,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    total: 100,
  },
};

export const Full: Story = {
  args: {
    value: 100,
    total: 100,
  },
};

export const LowProgress: Story = {
  args: {
    value: 25,
    total: 100,
  },
};

export const HighProgress: Story = {
  args: {
    value: 75,
    total: 100,
  },
};

export const CustomTotal: Story = {
  args: {
    value: 7,
    total: 10,
  },
};

export const LargeValues: Story = {
  args: {
    value: 1500,
    total: 2000,
  },
};

export const NinetyPercent: Story = {
  args: {
    value: 90,
    total: 100,
  },
};

export const OneThird: Story = {
  args: {
    value: 33,
    total: 100,
  },
};

export const TwoThirds: Story = {
  args: {
    value: 67,
    total: 100,
  },
}; 