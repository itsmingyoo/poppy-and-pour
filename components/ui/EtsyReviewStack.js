import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

export default function EtsyReviewStack() {
    return (
        <Box sx={{ width: '60%' }}>
            <Stack spacing={5}>
                {/* {map these out dynamically and use pagination once reviews are coming in from etsy} */}
                <Item sx={{ height: '100px', border: '1px solid black' }}>Etsy Review 1</Item>
                <Item sx={{ height: '100px', border: '1px solid black' }}>Etsy Review 2</Item>
                <Item sx={{ height: '100px', border: '1px solid black' }}>Etsy Review 3</Item>

                <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />

            </Stack>
        </Box>
    )
}
