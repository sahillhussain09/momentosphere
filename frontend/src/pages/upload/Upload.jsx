import React, { useState, useEffect } from 'react'
import LeftMenu from '../../components/navbars/LeftMenu'
import { loadUser } from '../../redux/actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'
import "../../styles/Upload.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Uploder from "./Uploder"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Upload() {

    const loadMyProfile = useDispatch();
    const [uploadFile, setUploadFile] = useState(null);
    const [postUploader, setPostUploader] = useState(false);


    useEffect(() => {
        loadMyProfile(loadUser())
    }, [])

    const handleFile = (event) => {
        let selectedFile = event.target.files[0];
        setUploadFile(selectedFile);
        console.log(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadFile(e.target.result);
            }

            setPostUploader(true)

            reader.readAsDataURL(selectedFile);
        } else {
            setUploadFile(null)
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
        <div className='postupload-container'>
            <div className='uploadleft-menu'>
                <LeftMenu />
            </div>
            <div className='post-upload'>
                {
                    postUploader ? (
                        <img src={uploadFile} alt='post' />
                    ) : <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Choose file
                        <VisuallyHiddenInput type="file" onChange={handleFile} />
                    </Button>
                }
            </div>
            <Uploder />
        </div>
    )
}

export default Upload