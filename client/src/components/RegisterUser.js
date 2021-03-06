import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const RegisterUser = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState({ username: '', password: '' })

  const handleChange = event => {
    setUsers(
      {
        ...users,
        [event.target.name]: event.target.value
      }
    );
  };

  const login = event => {
    event.preventDefault();
    console.log('users', users)
    axios
      .post("http://localhost:5000/auth/register", users, { withCredentials: true })
      .then(result => {
        console.log(result.data)
        localStorage.setItem("token", result.data.token)
        props.history.push("/");
      })
      .catch(error => {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })

  };

  return (

    <div className="login-form" login={login}>
      <h2>Register Now</h2>

      <form onSubmit={login} className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="filled-required"
          name="username"
          label="Username"
          inputStyle={{ textAlign: 'center' }}
          hintStyle={{ textAlign: 'center' }}
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="filled"
          value={users.username}
          onChange={handleChange}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          inputStyle={{ textAlign: 'center' }}
          hintStyle={{ textAlign: 'center' }}
          className={classes.textField}
          type="password"
          name="password"
          margin="normal"
          variant="filled"
          value={users.password}
          onChange={handleChange}
        />

        <Button variant="contained"
          type="submit"
          color="primary"
          className={classes.button}>
          Sign Up
       </Button>
      </form>
    </div>
  );
}

export default RegisterUser;