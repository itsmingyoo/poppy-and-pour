import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function VerticalButtons({currentImageIndex, onChange, productDetails}) {
    const handleButtonClick = (direction) => {
        if (direction === 'down') {
            onChange(Math.max(currentImageIndex - 1, 0));
        } else {
            onChange(Math.min(currentImageIndex + 1, productDetails.photos.length - 1));
        }
    };


    const buttons = [
        <Button onClick={() => handleButtonClick('up')} key="one" className='border-10' sx={{height: "50%", borderRadius: '0px', width: "70px", borderBottom: "0px", marginRight: '10px'}}>
            <KeyboardDoubleArrowUpIcon />
        </Button>,
        <Button onClick={() => handleButtonClick('down')} key="three" sx={{height: "50%", borderRadius: '0px', borderBottomColor: 'transparent',  marginRight: '10px'}}>
            <KeyboardDoubleArrowDownIcon />
        </Button>,
    ]


    return (
        <Box
            sx={{
                display: 'flex', '& > *': {m: 0,}}}
        >
            {/* <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
            >
                {buttons}
            </ButtonGroup> */}
            <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
            >
                {buttons}
            </ButtonGroup>
            {/* <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="text"
            >
                {buttons}
            </ButtonGroup> */}
        </Box>
    )
}
