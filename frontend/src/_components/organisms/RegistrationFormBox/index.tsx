import { ReactNode } from 'react';

import InfoIcon from '@mui/icons-material/Info';

import Box from '@/_components/mui/Box';
import Typography from '@/_components/mui/Typography';

export type RegistrationFormBoxPropsType = {
  description: string;
  children: ReactNode;
  errorMessage?: string;
};

const RegistrationFormBox = ({
  description,
  children,
  errorMessage = undefined,
}: RegistrationFormBoxPropsType) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray.background',
      width: '100vw',
      height: '100vh',
    }}
  >
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 500,
        },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'brand.white',
        p: {
          xs: 3,
          sm: 6,
        },
        boxShadow: '0px 0px 15px -5px #777777',
        borderRadius: '10px',
      }}
    >
      <Typography
        sx={{
          mb: 4,
          fontSize: {
            xs: 26,
            sm: 32,
          },
          textAlign: 'center',
          marginBottom: 1,
          fontWeight: 'bold',
        }}
        color="gray.text"
      >
        Task Canvas
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: 14,
          mb: !errorMessage ? 4 : 0,
          textAlign: 'center',
          opacity: 0.4,
        }}
        color="gray.text"
      >
        {description}
      </Typography>
      {errorMessage && (
        <Box
          sx={{
            mb: 4,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <InfoIcon sx={{ height: 18, width: 18, mr: 2, color: 'brand.error' }} />
          <Typography
            sx={{ fontSize: 14 }}
            color="brand.error"
            component="span"
          >
            {errorMessage}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  </Box>
);

export default RegistrationFormBox;
