import { Box, Button, Container, InputBase, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

function Users() {
  const [users, setUsers] = React.useState<any>([]);
  const [userName, setUserName] = React.useState("");

  const fetchUsers = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/users");
  };

  const newUsers = async (para:any) => {
    return await axios.post("https://jsonplaceholder.typicode.com/users", para);
  };

  React.useEffect(() => {
    fetchUsers()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

 
  

  const newUserName = (event: any) => {
    setUserName(event.target.value);    

  };
  const submitUserName = () => {
    alert("You're submitting new Username");
    //// RESPONSE --------------------------------
    // id
    // username 
    newUsers({ name: userName })
    .then((res) => {
      console.log(res.data);
      setUserName(res.data);
      //add new username to the array
      // setUsers((prev) => [...prev, res.data])
      // setUsers([...users, res.data]); 
      //You may express in all these ways
         setUsers((prev:any) => [...prev, res.data]);

    })
    .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        paddingTop: "40px",
        // backgroundColor:'#252929'
      }}
    >
      <Typography variant="h4" align="center" marginBottom={5}>
        List of {users.length} Users:
      </Typography>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: '20px' }}>
      <TextField sx={{marginRight:"10px"}} id="outlined-basic" onChange={newUserName} />
      
        
        <Button size="medium" onClick={submitUserName}
        sx={{color: 'black', backgroundColor: '#dce3e3'}}
        >Add User</Button>
      </div>
      {users?.map((user:any) => (
        
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "20vh",
              border: "1px solid black",
              borderRadius: "5px",
              mb: 1.5,
              bgcolor: "#dce3e3",
            }}
          >
            <Box>
              <Typography variant="body1" align="center">
                <b>{user.name}</b>, <i>username: {user.username}</i>,
              </Typography>

              <Typography variant="inherit" align="center">
                <b>E-mail:</b> {user?.email},
              </Typography>
              <Typography align="center">
                <b>Address: </b> {user?.address?.suite}, {user?.address?.street},{" "}
                {user?.address?.city}, {user?.address?.zipcode}
              </Typography>
              <Typography align="center">
                <b>Phone: </b> {user?.phone}, <b>Website: </b>
                {user?.website}{" "}
              </Typography>
            </Box>
            {setUserName}
          
          </Container>
        
      ))}
     
    </div>
  );
}

export default Users;
