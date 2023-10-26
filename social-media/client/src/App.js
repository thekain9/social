// Import necessary dependencies and components from external libraries
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from 'theme';

function App() {
   // Use the useSelector hook to access the 'mode' property from the Redux state
  const mode = useSelector((state) => state.mode);

    // Create a Material-UI theme based on the selected mode using useMemo to optimize performance
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
