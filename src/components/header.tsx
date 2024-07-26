import { Container, AppBar, Typography, Toolbar, Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 2, backgroundColor: "#277774" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Earnup Pokemon</Link>
          </Typography>
          <Button color="inherit">
            <Link href="/pokemon">Pokemon</Link>
          </Button>
          <Button color="inherit">
            <Link href="/users/new">Register</Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
