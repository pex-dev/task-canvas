import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TodoCheckbox: Story = {
  args: {
    sx: {
      '.MuiSvgIcon-root': {
        fontSize: '1.5rem',
      },
    },
  },
};
