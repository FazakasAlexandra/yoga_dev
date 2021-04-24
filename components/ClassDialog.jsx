import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react/cjs/react.development';

export default function AlertDialog({ yogaClass, editMode, title, closeDialog, isOpen }) {
  const classData = useState({
    description: "",
    level: ""
  })

  return (
    <div>
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <hr style={{ width: "90%" }} />
        <DialogContent
          style={{ minWidth: '300px' }}
        >
          {editMode ?
            <div className="dialog-form">
              <TextField
                id="standard-basic"
                label="Level"
                defaultValue={yogaClass.classLevel}
              />

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={10}
                defaultValue={yogaClass.classDescription}
                variant="outlined"
              />
            </div>
            : content}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" autoFocus>
            Close
          </Button>
          {editMode ?
            <Button onClick={closeDialog} color="primary" autoFocus>
              Save
            </Button>
            : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
