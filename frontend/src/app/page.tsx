import Box from '@/_components/mui/Box';
import Container from '@/_components/mui/Container';

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: '100vh',
        width: '100vw',
        paddingTop: '60px',
      }}
    >
      <Container maxWidth={'lg'}>
        <Box
          sx={{
            width: '100%',
            height: 300,
            backgroundColor: '#F8F9FA',
            boxShadow: 7,
            borderRadius: 1,
          }}
        >
          こんにちは
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
