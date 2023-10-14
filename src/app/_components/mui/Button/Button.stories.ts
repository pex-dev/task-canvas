import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'ボタン',
  },
};

export const Contained: Story = {
  args: {
    variant: 'contained',
    children: 'ボタン',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'ボタン',
  },
};
