import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import PropTypes from "prop-types";
import history from "../History";
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: "linear-gradient(25deg, #203A43 30%,#0F2027 90%)",
    height: "7vh",
    // background: 'linear-gradient(45deg, #1f4037 30%,#237A57 90%)'
  },
  button: {
    size: "large",
  },
}));

export default function DefaultAppBar(props) {
  const classes = useStyles();
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Box style={{ flex: 1 }}>
              <img
                src="https://storage.googleapis.com/blog_image_store/dalezy_logo.png"
                onClick={() => history.push("/")}
                className={classes.logo}
              />
            </Box>
            <Box>
              <Button
                className={classes.button}
                color="inherit"
                onClick={() => {
                  history.push("/");
                }}
              >
                Home
              </Button>
              <Button
                className={classes.button}
                color="inherit"
                onClick={() => {
                  history.push("/about");
                }}
              >
                About
              </Button>
              {/* <Button className={classes.button} color="inherit" onClick={() => { history.push('/archives') }}> Archives</Button> */}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
