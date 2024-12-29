import { useState } from 'react';

import { Button } from '@mui/material';

import type { Meta, StoryFn } from '@storybook/react';

import EditPage, { EditPageProps } from '.';

const meta = {
  component: EditPage,
  tags: ['autodocs'],
} satisfies Meta<typeof EditPage>;

export default meta;

export const Default: StoryFn<typeof EditPage> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSave: EditPageProps['onSave'] = (id: string, value: string) => {
    console.log(`id: ${id}, value: ${value}`);
  };

  const handleDelete: EditPageProps['onDelete'] = (id: string) => {
    console.log(`id: ${id}`);
  };

  return (
    <>
      <Button onClick={() => handleOpenDialog()}>EditPage</Button>
      <EditPage
        id={'test-id'}
        open={open}
        initialValue="初期値"
        onClose={handleCloseDialog}
        onSave={handleSave}
        onDelete={handleDelete}
      ></EditPage>
    </>
  );
};
