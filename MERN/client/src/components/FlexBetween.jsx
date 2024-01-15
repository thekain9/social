// Import necessary libraries from Material-UI
import { Box } from "@mui/material";
import { styled } from '@mui/system';

// Define a styled component using the 'styled' function from Material-UI
const FlexBetween = styled(Box)({
    // Define CSS styles for the 'FlexBetween' component
    display: 'flex',               // Display the component as a flex container
    justifyContent: 'space-between', // Distribute space evenly between flex items along the main axis
    alignItems: 'center'            // Align flex items vertically along the cross-axis
})

// Export the 'FlexBetween' styled component
export default FlexBetween;
