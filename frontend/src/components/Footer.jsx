import React from 'react'
import { Box, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Footer = () => {
    return (
        <Box component="footer" sx={{bgcolor: '#9b89b0', color: 'white', py: 2, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Typography>© 2024 ᴘʏᴘ sᴇᴠᴇʀᴏ. Todos los derechos reservados.</Typography>
            <a href="https://www.instagram.com/ppsevero/">
                <InstagramIcon sx={{ color: '#4f2854', fontSize: 30 }} />
            </a>
            <a href="https://maps.app.goo.gl/JfRdKodVXCfyiiWK9">
                <FmdGoodIcon sx={{ color: '#4f2854', fontSize: 30 }}/>
            </a>
        </Box>
    )
}

export default Footer
