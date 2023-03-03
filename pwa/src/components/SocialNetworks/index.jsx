import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import './css.css';
const App=()=>{
  return  <Box className="social-network">
            <Box className="item">
              <FacebookIcon className="cursor-pointer"/>
            </Box>
            <Box className="item">
              <InstagramIcon className="cursor-pointer"/>
            </Box>
            <Box className="item">
              <YouTubeIcon className="cursor-pointer" sx={{mr:3}}/>
            </Box>
          </Box>
}

export default App
