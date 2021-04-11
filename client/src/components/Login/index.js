import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: 275,
    alignItems: "center",
  },
  media: {},
});

export default function Login({ article, word, valueId, ...other }) {
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const { setAuthTokens } = useAuth();

  function postLogin() {
    axios
      .post(
        "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/authenticate",
        {
          username,
          password,
        }
      )
      .then((result) => {
        if (result.status === 200) {
          // setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }
  if (isLoggedIn) {
    return <Redirect to="/admin" />;
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Card className={classes.card}>
        <Typography> Login </Typography>
        <form>
          <input
            type="username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <Button onClick={postLogin}>Sign In</Button>
        </form>
      </Card>
    </Grid>
  );
}
