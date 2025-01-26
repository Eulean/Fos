import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import userService from "../services/userService.jsx";

const UserForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.create(user);
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create User
      </Button>
    </Box>
  );
};

export default UserForm;
