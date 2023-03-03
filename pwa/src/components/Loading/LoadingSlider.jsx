import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:100,md:500}}}/>
            </Stack>
          );
}
