import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import history from '../History';
import { Article } from '../../components';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: 'linear-gradient(25deg, #203A43 30%,#0F2027 90%)' 
    // background: 'linear-gradient(45deg, #1f4037 30%,#237A57 90%)' 
  },
}));


export default function Single(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const content = props.article.location.state.article;  
  // console.log("article111 ",content);
  
  return (
    <Card>
      <Article article={content} />
    </Card>
  );
}

