import { useState } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

export function BasicRatingReadOnly({rating}) {
// if you want to display a review rating, prop it in
// this is also being used in the rating header under product details

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 }, marginTop: '10px'
            }}
        >
            <Rating name="read-only" size='large' value={rating ? rating : 5} readOnly />
        </Box>
    )
}


export function BasicRatingRate() {
    const [value, setValue] = useState(0)

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography component="legend">Controlled</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
            />
            <Typography component="legend">Read only</Typography>
            <Rating name="read-only" value={value} readOnly />
            <Typography component="legend">Disabled</Typography>
            <Rating name="disabled" value={value} disabled />
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} />
        </Box>
    )
}
