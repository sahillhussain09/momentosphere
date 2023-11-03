import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteYourPost } from '../../redux/actions/PostActions';
import { getMyPosts, loadUser } from '../../redux/actions/UserActions';
import { useSelector, useDispatch } from 'react-redux';

const options = [
    "Delete",
    "Edit"
];

const ITEM_HEIGHT = 48;

export default function LongMenu({
    setMenuOption,
    setOpen,
    postId
}) {
    // redux dispatches
    const postDeleteDispatch = useDispatch();
    const loadMyProfile = useDispatch();

    // material ui default code
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // this function handling menuOption state and postDelete dispatch  
    const handleClose = (option) => {

        setMenuOption(option)

        if (option === "Delete") {
            postDeleteDispatch(deleteYourPost(postId));
            loadMyProfile(loadUser());
        }
        if (option === "Edit") {
            setOpen(true)
        }

        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}