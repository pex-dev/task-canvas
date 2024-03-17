import type { Meta, StoryObj } from '@storybook/react';

import TextFiled from '.';

const meta = {
  component: TextFiled,
  tags: ['autodocs'],
} satisfies Meta<typeof TextFiled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
