import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
// GLOBAL
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Root() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          className="app"
          sx={{
            width: "100%",
            height: "100%",
            fontFamily: ["'Source Sans Pro'", "sans-serif"],
          }}
        >
          <Sidebar />
          <Box
            component="main"
            className="content"
            sx={{
              width: "100%",
              height: "100%",
              fontFamily: ["'Source Sans Pro'", "sans-serif"],
            }}
          >
            <Topbar />
            <Box
              overflow="auto"
              p="20px 20px 0"
              height="91vh"
              display="flex"
              flexDirection="column"
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Root;
