import React, { useState, createContext, useContext, Fragment } from 'react';

import Alert, { AlertPropsType } from '@/_components/atoms/Alert';
import Box from '@/_components/mui/Box';

interface SnackValues {
  showSuccess: (message: string, ms?: number) => void;
  showInfo: (message: string, ms?: number) => void;
  showError: (message: string, ms?: number) => void;
}

export const SnackbarContext = createContext<SnackValues>({
  showSuccess: () => {},
  showInfo: () => {},
  showError: () => {},
});

type SnackState = {
  id: string;
  message: string;
  type: Extract<AlertPropsType['severity'], 'success' | 'info' | 'error'>;
};

export const SnackbarProvider = ({ children }: { children: JSX.Element }) => {
  const [snackState, setSnackState] = useState<SnackState[]>([]);

  const showSnackbar = (message: SnackState['message'], type: SnackState['type'], ms?: number) => {
    const id = window.self.crypto.randomUUID();

    setSnackState((state) => [
      ...state,
      {
        id,
        type,
        message,
      },
    ]);

    setTimeout(() => {
      setSnackState((state) => state.filter((v) => v.id !== id));
    }, ms || 3000);
  };

  const showSuccess = (message: string, ms?: number) => {
    showSnackbar(message, 'success', ms);
  };

  const showInfo = (message: string, ms?: number) => {
    showSnackbar(message, 'info', ms);
  };

  const showError = (message: string, ms?: number) => {
    showSnackbar(message, 'error', ms);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showError,
        showInfo,
        showSuccess,
      }}
    >
      <Box sx={{ position: 'absolute', zIndex: 200, top: 10, right: 10 }}>
        {snackState.map((v) => (
          <Fragment key={v.id}>
            <Alert
              severity={v.type}
              sx={{ mb: 1 }}
            >
              {v.message}
            </Alert>
          </Fragment>
        ))}
      </Box>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);