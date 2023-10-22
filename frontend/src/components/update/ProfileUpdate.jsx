import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { updateProfile, loadUser } from '../../redux/actions/UserActions';


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

const CustomInputStyle = {
    marginTop: "17px"
}

export default function AlertDialog({ open, setOpen }) {

    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [bio, setBio] = useState("");

    const profileUpdateDisptach = useDispatch();
    const loadMyProfileDispatch = useDispatch();

    const { loading, error } = useSelector(state => state.updateProfile);
    const profileUpdatedData = useSelector((state) => state.updateProfile.data);


    const handleImageUpload = (event) => {
        let file = event.target.files[0];

        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                setProfilePic(e.target.result);
                // console.log(e.target.result);
            }

            fileReader.readAsDataURL(file);

        } else {
            setProfilePic(null);
            alert("please choose file")
        }
    }


    const handleClose = async () => {
        if (profilePic || name || socialLink || bio) {
            await profileUpdatedData.success && loadMyProfileDispatch(loadUser());
        } {
            setProfilePic(null);
            setName("");
            setSocialLink("");
            setBio("");
            setOpen(false);
        }

    };

    const handleUpdate = () => {

        const formUpdateData = new FormData();

        if (profilePic || name || socialLink || bio) {
            profilePic !== null && formUpdateData.append("profile", profilePic);
            formUpdateData.append("name", name);
            formUpdateData.append("url", socialLink);
            formUpdateData.append("bio", bio);


            profileUpdateDisptach(updateProfile(formUpdateData));
        } else {
            return false
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Box sx={{
                        padding: "10px 1px",
                        width: "300px"
                    }}>

                        {
                            error ? <Typography variant='h6' textAlign={'center'}>
                                Something Went Wrong, please try again.
                            </Typography> :

                                <div>
                                    <Box sx={{
                                        height: "200px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",


                                    }}>

                                        {
                                            profilePic ? <div className='update-profilePic'>
                                                <img src={profilePic} alt='Profile Picture' />
                                            </div> : <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                New Profile Picture
                                                <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                                            </Button>

                                        }
                                    </Box>

                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column"

                                    }}>
                                        <TextField name='name' sx={CustomInputStyle} id="outlined-basic" size='small' label="name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                                        <TextField name='socialLink' sx={CustomInputStyle} id="outlined-basic" size='small' label="social links" variant="outlined" onChange={(e) => setSocialLink(e.target.value)} />
                                        <TextField
                                            name='bio' sx={CustomInputStyle}
                                            id="outlined-textarea"
                                            label="bio"
                                            multiline
                                            size='small'
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </Box>
                                </div>

                        }
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose} variant="outlined" size='small'>Cancel</Button>
                    <Button color="success" onClick={handleUpdate} variant="contained" size='small'> {loading ? "updating..." : "update"}</Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}