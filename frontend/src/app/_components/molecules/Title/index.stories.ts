import type { Meta, StoryObj } from '@storybook/react';

import Typography from '.';

const meta = {
  component: Typography,
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
