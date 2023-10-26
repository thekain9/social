//Colour and font to be used as reference for styling. 
export const colorTokens = {
  grey: {
    0: "#F7F7F7",     // Lightest
    100: "#D3D3D3",
    200: "#9E9E9E",
    300: "#363636",   // Darkest
  },
  primary: {
    50: "#A6BF49",
    100: "#F2CA52",
    200: "#F29057",
    300: "#F26052",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
           // palette values for dark mode
           primary: {
            dark: colorTokens.primary[200],
            main: colorTokens.primary[100],
            light: colorTokens.primary[50],
          },
          neutral: {
            dark: colorTokens.grey[300],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[100],
            medium: colorTokens.grey[200], // adjusted to match available greys
            light: colorTokens.grey[0],
          },
          background: {
            default: '#000000', // Making the background black in dark mode
            alt: '#000000', // You can adjust this as well if you want a different alternate color
          },
        }
      : {
          // palette values for light mode
          primary: {
            dark: colorTokens.primary[300],
            main: colorTokens.primary[100],
            light: colorTokens.primary[50],
          },
          neutral: {
            dark: colorTokens.grey[300],
            main: colorTokens.grey[200],
            mediumMain: colorTokens.grey[100],
            medium: colorTokens.grey[200], 
            light: colorTokens.grey[0],
          },
          background: {
            default: colorTokens.primary[300],
            alt: colorTokens.primary[300],
          },
        }),
    },
      typography: {
        fontFamily: ["Gabarito', sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 50,
        },
        h2: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 40,
        },
        h3: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 32,
        },
        h4: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 24,
        },
        h5: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 20,
        },
        h6: {
          fontFamily: ["Gabarito', sans-serif"].join(","),
          fontSize: 16,
        },
      },
    };
  };

  