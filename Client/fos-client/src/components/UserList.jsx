import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Box,
} from "@mui/material";
import userService from "../services/userService.jsx";
import userServic from "../services/userService.jsx";

const UserList = () => {
  const [users, setUsers] = useState([]);

  //Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  //Update
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    loadUsers();

    const intervalId = setInterval(() => {
      loadUsers(); // refresh the user list every 5 seconds
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Update
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatedUserData({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "", // blank for security reasons
    });
    setUpdateDialogOpen(true);
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await userService.update(updatedUserData);
      setUpdateDialogOpen(false);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await userService.delete(email);
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleUpdate = async (user) => {
  //   try {
  //     await userService.update(user);
  //     loadUsers();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSearch = async () => {
    // make it so that search is not showing empty list without no filters
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }
    try {
      let response;
      if (isNaN(searchTerm)) {
        response = await userService.getByEmail(searchTerm);
      } else {
        response = await userService.getById(searchTerm);
      }
      setSearchResult(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResult(null);
  };

  return (
    <div>
      {/* <TextField
        label="Search by ID or Email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleClearSearch}>
        Clear Search
      </Button> */}
      {/* {searchResult && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={searchResult.id}>
                <TableCell>{searchResult.id}</TableCell>
                <TableCell>{searchResult.name}</TableCell>
                <TableCell>{searchResult.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(searchResult)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(searchResult.email)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(user.email)}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(user)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
          maxWidth: "600px",
        }}
      >
        <TextField
          fullWidth
          label="Search by ID or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="medium"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            height: 56,
            minWidth: "100px",
            whiteSpace: "nowrap",
          }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearSearch}
          sx={{
            height: 56,
            minWidth: "100px",
            whiteSpace: "nowrap",
          }}
        >
          Clear
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult ? (
              <TableRow key={searchResult.id}>
                <TableCell>{searchResult.id}</TableCell>
                <TableCell>{searchResult.name}</TableCell>
                <TableCell>{searchResult.email}</TableCell>
                <TableCell>
                  {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(searchResult)}
                  >
                    Update
                  </Button> */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(searchResult.email)}
                  >
                    Delete
                  </Button>
                  {""}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(searchResult)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </Button>{" "}
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(user)}
                    >
                      Update
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateClick(user)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update the Button onClick in your table */}
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => handleUpdateClick(user)}
      >
        Update
      </Button> */}

      {/* Add this Dialog component */}
      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={updatedUserData.name}
            onChange={handleUpdateInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={updatedUserData.email}
            onChange={handleUpdateInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            name="password"
            type="password"
            value={updatedUserData.password}
            onChange={handleUpdateInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateSubmit}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
