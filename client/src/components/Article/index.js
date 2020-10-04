import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { useHistory } from "react-router-dom";
import Comment from '../Comment';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  paper: {
    // height: 1000,
    margin: 20,
    padding:20,
  },
  container: {
    padding: 20,
  },
   divider: {
    padding: 20,
    margin: 10,
  },
  commenTitle: {
    fontSize: 14,
  },
});

export default function Article(props) {
  const article = props.article;  
  // console.log("article ",article);

  const classes = useStyles();
  const content = article.body;
  let history = useHistory();
  const article_id = article._id;
    
  console.log("articleid ",article._id);
  const  [data, setData] = useState({comments:[]});

  useEffect(() => {
    const fetchData = async() => {
      console.log("in use effect", article_id);
      const result = await axios.get(
        `http://localhost:8000/api/comments/article/${article_id}` 
      );
        setData(result.data);
    };
    fetchData();
  },[article._id]);
  // console.log("fetched comments: ",data);
  return (
    article._id ? 
      (
        <Paper elevation={2}  m={10}>
        <CssBaseline/>
          <Container className={classes.container}>
            <Typography gutterBottom variant="h5" component="h2">
              {article.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="h5">
              {article.author}
              <br/>
              {article.updatedAt}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {content.split('\n\n').map(function(item) {
                  return (
                    <span>
                      <br/>
                      {item}
                      <br/>
                    </span>
                  )
                })}
            </Typography>
            <Box p={4}>
              <Divider variant="middle" />
              <Box className={classes.divider} p={2}>
                <Typography gutterBottom variant="h5" component="h2">
                  Comments
                </Typography>
                <Comment article={article._id}/>
              </Box>
              <Box pt={4} >
                <Box p={2}>
                  <Divider variant="middle" />
                </Box>
                {data.comments.map((comment) => {
                  return (
                    <Box pt={2}>
                    <Card  variant="outlined" className={classes.card}>
                      <CardContent>
                        <Typography variant="h5" className={classes.commentTitle} color="textSecondary" gutterBottom>
                          {comment.username}
                        </Typography>
                        <Typography  color="textSecondary" component="h1">
                          {moment(new Date(article.createdAt)).fromNow()}
                        </Typography>
                        <Typography  component="h1">
                           {comment.text.split('\n\n').map(function(item) {
                              return (
                                <span>
                                  {item}
                                  <br/>
                                </span>
                              )
                            })}
                        </Typography>
                      </CardContent>
                   </Card>
                   </Box>
                  )
                })}
              </Box>
            </Box> 
          </Container> 

        </Paper>
      ) : null 

  );
}