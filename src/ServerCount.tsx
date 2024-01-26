import { Alert, Box, CircularProgress } from '@mui/material';

type ServerCountProps = {
  isLoading: boolean;
  serverCount?: number;
  errorMessage?: string;
};

export default function ServerCount({
  isLoading,
  serverCount,
  errorMessage,
}: ServerCountProps) {
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        serverCount && (
          <Alert severity={errorMessage ? 'error' : 'warning'}>
            {errorMessage || `По версии сервера: ${serverCount} раз`}
          </Alert>
        )
      )}
    </>
  );
}
