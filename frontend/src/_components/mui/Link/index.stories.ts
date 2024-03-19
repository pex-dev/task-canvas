import type { Meta, StoryObj } from '@storybook/react';

import Link from '.';

const meta = {
  component: Link,
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'リンク',
  },
};
