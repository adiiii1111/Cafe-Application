import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E8C8D9",  // pastel dusty pink
    },
    secondary: {
      main: "#CFA66A", // soft gold
    },
    background: {
      default: "#F5F2EA", // soft beige with leafy overlay
      paper: "rgba(255,255,255,0.88)", // soft translucent paper
    },
    text: {
      primary: "#5B4632", // warm brown
      secondary: "#8C6E54",
    },
    accent: {
      mint: "#CBDFC8", // pastel mint green
      leaf: "#D7E8D1", // pale leafy green
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Playfair Display', serif",
    h1: {
      fontWeight: 700,
      fontFamily: "'Playfair Display', serif",
      color: "#5B4632",
    },
    h2: {
      fontWeight: 600,
      fontFamily: "'Playfair Display', serif",
      color: "#5B4632",
    },
    body1: {
      color: "#8C6E54",
      lineHeight: 1.75,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f6ebcdff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: "10px 24px",
          backgroundColor: "#E8C8D9",
          ":hover": {
            backgroundColor: "#D8B5C8",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(251, 237, 237, 0.85)",
          borderRadius: 22,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          ":hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(234, 206, 219, 0.8)", // pastel pink translucent
          backdropFilter: "blur(12px)",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
