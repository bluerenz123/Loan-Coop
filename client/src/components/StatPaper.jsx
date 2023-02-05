import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatPaper = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        sx={{
          background: `${colors.primary[400]} !important`,
          p: "20px 30px 15px",
          height: "100%",
        }}
        elevation={3}
      >
        {icon}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default StatPaper;
