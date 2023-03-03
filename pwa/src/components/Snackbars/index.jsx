import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const vertical='bottom'
const horizontal='right'
export default function SimpleSnackbar({open, setOpen}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {open.color?<>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={(open)?true:false}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {open.message}
          </Alert>
        </Snackbar>
        </>:<>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={(open)?true:false}
          autoHideDuration={6000}
          onClose={handleClose}
          message={open.message}
          action={action}
        />
      </>}
    </div>
  );
}
