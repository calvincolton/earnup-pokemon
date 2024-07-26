import { redirect } from "next/navigation";
import { Button, TextField } from "@mui/material";

import { db } from "@/db";

export default function UsersCreatePage() {
  async function createUser(formData: FormData) {
    "use server";

    // validate user input
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // create user record in database
    const user = await db.user.create({
      data: {
        name,
        email,
      },
    });

    console.log(user);

    redirect(`/users/${user.id}`);
  }

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
        label="Required"
        placeholder="Name"
        variant="outlined"
        sx={{ mb: 3 }}
      />
      <TextField
        required
        type="email"
        name="email"
        id="email"
        label="Required"
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
