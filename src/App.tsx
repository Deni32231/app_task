import { Alert, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useSendCount } from './useSendCount';
import ServerCount from './ServerCount';

const boxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '20px',
  maxWidth: '300px',
  margin: '100px auto',
};

function App() {
  const [clientCount, setClientCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number>();
  const [serverCount, errorMessage, isLoading, sendCount] = useSendCount();

  function clickHandler() {
    if (timeoutId) clearTimeout(timeoutId);

    const updateCount = clientCount + 1;
    setClientCount(updateCount);

    const newTimeoutId = setTimeout(
      async () => await sendCount(updateCount),
      1000
    );

    setTimeoutId(newTimeoutId);
  }

  return (
    <Box sx={boxSx}>
      <Button disabled={isLoading} variant='contained' onClick={clickHandler}>
        Кликнуть
      </Button>
      <Alert severity='info'>Кликнули {clientCount} раз</Alert>

      <ServerCount
        serverCount={serverCount}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default App;
