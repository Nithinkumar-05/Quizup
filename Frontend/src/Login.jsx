import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="p-8">
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Login
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Log In
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
