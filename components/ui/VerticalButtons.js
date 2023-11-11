import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const buttons = [
    <Button key="one" className='border-10' sx={{height: "50%", borderRadius: '0px', width: "70px", borderBottom: "0px", marginRight: '10px'}}>
        <KeyboardDoubleArrowUpIcon />
    </Button>,
    <Button key="three" sx={{height: "50%", borderRadius: '0px', borderBottomColor: 'transparent',  marginRight: '10px'}}>
        <KeyboardDoubleArrowDownIcon />
    </Button>,
]

export default function VerticalButtons() {
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
