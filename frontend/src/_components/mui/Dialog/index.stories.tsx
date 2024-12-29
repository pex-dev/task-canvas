import { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import Button from '@/_components/mui/Button';

import Dialog from '.';

const meta = {
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryFn<typeof meta>;

export const Primary: Story = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => handleOpen()}>Dialog</Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        こんにちは
      </Dialog>
    </>
  );
};
