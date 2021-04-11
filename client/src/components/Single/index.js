import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import history from '../History';
import { Article } from '../../components';
import Paper from '@material-ui/core/Paper';

import Container from '@material-ui/core/Container';
import axios from 'axios';
import moment from 'moment';
import {
  useParams
} from "react-router-dom";

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
  const  [article, setArticle] = useState({});
  let { articleId } = useParams();
  console.log('articleId1', articleId);
  // const article = props.article.location.state.article;
  // console.log('article', typeof(article));
  if (typeof(props.article.location.state) === 'undefined') {
    console.log('article undefined, proceed to fetch');
    useEffect(() => {
      const fetchData = async() => {
        const result = await axios.get(
          'https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles'+'/'+articleId
        );
        console.log('hi', result);
        setArticle(result.data.article);

      };
      fetchData();
    }, []);
    console.log('finish fetch');
  }else {
    console.log('Article exists',article);
    useEffect(() => {
      setArticle(props.article.location.state.article);
    }, []);
  }
  return (
    <Container>
      <Paper  elevation={2}> 
        <Article article={article} />
      </Paper>

    </Container>
  );
}

