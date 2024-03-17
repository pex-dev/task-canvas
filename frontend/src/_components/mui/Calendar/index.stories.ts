import type { Meta, StoryObj } from '@storybook/react';

import CalendarMonth from '.';

const meta = {
  component: CalendarMonth,
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarMonth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
