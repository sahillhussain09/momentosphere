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


// material ui transition 
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen }) {

    // load my profile and post upload redux dispatch 
    const loadMyProfile = useDispatch()
    const uploadDispatch = useDispatch();


    //    destructuring postupload data from redux reducer
    const { loading, data, error } = useSelector((state) => state.postUpload);


    const [uploadFile, setUploadFile] = useState(null);
    const [caption, setCaption] = useState('')
    const [postCreated, setPostCreated] = useState(false)


    // this useEffect for controlling postcreated state on post uploded data for returning contend in dialog box

    useEffect(() => {
        if (data && data.success) {
            setPostCreated(true)
        } else {
            setPostCreated(false)
        }
    }, [data])


    // this function handle somestates onclick cancel btn 

    const handleClose = () => {
        loadMyProfile(loadUser())
        setOpen(false);
        setUploadFile(null)
        setCaption("")

        // this timeout for removing post upload input contend by setPostCreated after 1500 milliseconds
        setTimeout(() => {
            setPostCreated(false)
        }, 500);
    };

    // file reader function for showing local image in Imagetag
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

    // here we calling postUpload api 
    const handleUpload = (e) => {
        let formdata = new FormData();

        if (uploadFile) {

            formdata.append("image", uploadFile);
            formdata.append("caption", caption);

            uploadDispatch(postUpload(formdata))
        }
    }

    // material ui style for components
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

                        </div> : <div className='upload-cont'> <Typography sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            letterSpacing: "1px"

                        }} variant='h4'>{data.success ? data.message : "Oops! something went wrong"}</Typography></div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button size='small' color='error' onClick={handleClose}>Cancel</Button>
                    {
                        !postCreated ? <Button size='small' variant="contained" color="success" onClick={handleUpload}>
                            {loading ? "uploading..." : "upload"}
                        </Button> : null
                    }
                </DialogActions>
            </Dialog>
        </form >
    );
}