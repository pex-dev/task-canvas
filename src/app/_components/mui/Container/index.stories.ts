import type { Meta, StoryObj } from '@storybook/react';

import Container from '.';

const meta = {
  component: Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sm: Story = {
  args: {
    maxWidth: 'sm',
  },
};
