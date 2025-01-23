import {useEffect, useState} from "react";


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button, TextField
} from '@mui/material';
import userService from "../services/userServic.jsx";
import userServic from "../services/userServic.jsx";


const UserList = () => {
    const [users, setUsers] = useState([]);

    //Search
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    useEffect(() => {
        loadUsers();

        const intervalId = setInterval(() => {
            loadUsers(); // refresh the user list every 5 seconds
        }, 100);

        return () => clearInterval(intervalId);
    },[]);

    const loadUsers = async () => {
        try {
            const response = await userService.getAll();
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (email) => {
        try {
            await userService.delete(email);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async (user) => {
        try {
            await userService.update(user);
            loadUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearch = async () => {
        try {
            let response;
            if(isNaN(searchTerm)) {
                response = await userServic.getByEmail(searchTerm);
            } else {
                response = await userServic.getById(searchTerm);
            }
            setSearchResult(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <TextField
                label="Search by ID or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            {searchResult && (
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
                                    <Button variant="contained" color="primary" onClick={() => handleUpdate(searchResult)}>
                                        Update
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(searchResult.email)}>
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
                                    </Button>
                                    {' '}
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
            </TableContainer>
        </div>
    );
}

export default UserList;