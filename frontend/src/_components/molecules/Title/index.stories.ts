import type { Meta, StoryObj } from '@storybook/react';

import Title from '.';

const meta = {
  component: Title,
  tags: ['autodocs'],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://www.google.co.jp/',
  },
};
