import { Button, TextField } from "@mui/material";

import { createUser } from "@/actions";

export default function UsersCreatePage() {
  return (
    <form
      action={createUser}
      className="flex flex-col mt-10 mx-auto w-full md:w-1/2"
    >
      <TextField
        required
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <TextField
        required
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
}
