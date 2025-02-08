import { AppBar, Toolbar, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const CustomAppBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Adjusts for small screens

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
        height: isSmallScreen ? '60px' : '80px', // Adjust height for smaller screens
        backdropFilter: 'blur(8px)',
        paddingX: isSmallScreen ? 1 : 3, // Reduce horizontal padding on smaller screens
      }}
    >
      <Toolbar sx={{ minHeight: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isSmallScreen ? 'subtitle1' : 'h6'} // Smaller font size on small screens
              component="div"
              sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} // Prevent text from breaking
            >
              Handyman App Registration
            </Typography>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
