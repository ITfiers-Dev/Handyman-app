
import { AppBar, Toolbar, IconButton, Typography, Box, Menu,  } from '@mui/material';
// import { Menu } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomAppBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        height: '80px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar>
        {/* Left Section: Menu Icon and Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            // onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Handyman App Registration
            </Typography>
          </motion.div>
        </Box>

        {/* Right Section: Login/Sign Up and Profile Avatar */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button >  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Login
            </Typography></Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button >  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
              Sign Up
            </Typography></Button>
          </Link>
          <IconButton color="inherit" onClick={handleClick}>
            <Avatar
              alt="Profile Picture"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVCHywHxDFVk0j8PEgX8FELCQ8Vbiu2a49Xg&s"
            />
          </IconButton>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;