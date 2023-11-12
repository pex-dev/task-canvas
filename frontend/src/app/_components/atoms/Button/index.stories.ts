import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'ボタン',
  },
};

export const InputAddButton: Story = {
  args: {
    children: 'Add',
    sx: {
      minWidth: 'auto',
      paddingX: '12px',
    },
  },
};
