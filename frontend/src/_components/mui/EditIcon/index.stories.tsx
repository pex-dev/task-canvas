import type { Meta, StoryObj } from '@storybook/react';

import EditIcon from '.';

const meta = {
  component: EditIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof EditIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
