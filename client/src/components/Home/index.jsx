import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Archives from "../Archives";
import Default from "../Default";
import history from "../History";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: "linear-gradient(25deg, #203A43 30%,#0F2027 90%)",
    // background: 'linear-gradient(45deg, #1f4037 30%,#237A57 90%)'
  },
}));

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <Default />;
}
