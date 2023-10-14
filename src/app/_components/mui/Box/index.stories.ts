import type { Meta, StoryObj } from '@storybook/react';

import Box from '.';

const meta = {
  component: Box,
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sx: {
      width: 300,
      height: 300,
      backgroundColor: '#F8F9FA',
      boxShadow: 7,
      borderRadius: 1,
    },
  },
};
