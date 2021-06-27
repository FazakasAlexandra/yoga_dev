import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import db from '../db.js';

export default function ClassZoomLinkDialog({ isOpen, userData, yogaClass, closeDialog, updateSelectedClassLink }) {
    const [link, setZoomLink] = useState(yogaClass.link || '')
    
    const saveLink = () => {
        db.getJWT().then(({ jwtToken }) => {
             db.schedules.updateScheduledClassLink(yogaClass.schedules_weeks_id, link, jwtToken)
                .then((res) => {
                    updateSelectedClassLink(link)
                })
        })
    }

    return (
        <div className="zoom-link-dialog">
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Link for online class</DialogTitle>

                <hr style={{ width: "90%", marginTop: '0px' }} />

                <DialogContent style={{
                    minWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    {
                        userData.is_admin === 'true' ?
                            <>
                                <TextField
                                    value={link}
                                    variant='outlined'
                                    type='text'
                                    onChange={(e) => setZoomLink(e.target.value)}
                                />
                                <Button onClick={saveLink} color="primary" autoFocus>Save link</Button>
                            </>
                            :
                            yogaClass.link &&
                            <a style={{ color: 'blue' }} href={yogaClass.link}>
                                <i>{yogaClass.link}</i>
                            </a> || <span>No link provided</span>
                    }
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary" autoFocus>Close</Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}
