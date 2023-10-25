import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/UserActions';
import "../../styles/Upload.css"
import { postUpload } from '../../redux/actions/PostActions';
import { Typography } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen }) {

    const loadMyProfile = useDispatch()
    const uploadDispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.postUpload);


    const [uploadFile, setUploadFile] = useState(null);
    const [caption, setCaption] = useState('')
    const [postCreated, setPostCreated] = useState(data && data.success ? true : false)


    const handleClose = () => {
        loadMyProfile(loadUser())
        setOpen(false);
        setUploadFile(null)
        setCaption("")
        setPostCreated(false);
    };

    const handleFile = (event) => {
        let selectedFile = event.target.files[0];
        setUploadFile(selectedFile);
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadFile(e.target.result);
            }

            reader.readAsDataURL(selectedFile);
        } else {
            setUploadFile(null)
        }

    }

    const handleUpload = (e) => {
        let formdata = new FormData();

        if (uploadFile && caption) {

            formdata.append("image", uploadFile);
            formdata.append("caption", caption);

            // console.log("formData", formdata);

            uploadDispatch(postUpload(formdata))
        }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={"sm"}

            >
                <DialogContent>
                    {
                        !postCreated ? <div className='upload-cont'>
                            <div className='uploader-head'>
                                {
                                    uploadFile ? <img alt='Oops! something bad' src={uploadFile} /> : <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Choose file
                                        <VisuallyHiddenInput type="file" onChange={handleFile} />
                                    </Button>
                                }
                            </div>

                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '100%' },

                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="standard-basic" label="Write caption here..." value={caption} variant="standard" onChange={(e) => setCaption(e.target.value)} />
                            </Box>

                        </div> : <div className='upload-cont'> <Typography variant='h3'>{data && data.message}</Typography> </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button size='small' color='error' onClick={handleClose}>Cancel</Button>
                    {
                        <Button size='small' variant="contained" color="success" onClick={handleUpload}>
                            {loading ? "uploading..." : "upload"}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </form >
    );
}