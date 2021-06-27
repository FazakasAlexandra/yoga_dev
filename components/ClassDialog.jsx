import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ yogaClass, closeDialog, isOpen }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{yogaClass.name}</DialogTitle>
        <hr style={{ width: "90%" }} />
        <DialogContent
          style={{ minWidth: '300px' }}
        >
          <p><b>Class level</b></p>
          <p>{yogaClass.level}</p>
          <p><b>Description</b></p>
          <p>{yogaClass.description}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
