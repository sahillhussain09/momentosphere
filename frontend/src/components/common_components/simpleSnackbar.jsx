import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({
  simpleSnackOpen, setSimpleSnackOpen, btn, snackBarMessage
}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSimpleSnackOpen(false);
  };

  const action = (
    <React.Fragment>
       {
        btn &&  <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
       }
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
      {
        btn ? <Button onClick={handleClick}>Open simple snackbar</Button> : null
      }
      <Snackbar
        open={simpleSnackOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message= {snackBarMessage}
        action={action}
      />
    </div>
  );
}