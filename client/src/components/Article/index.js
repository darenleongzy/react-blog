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
import Comment from '../Comment';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const useStyles = makeStyles({
  paper: {
    // height: 1000,
    marginBottom:10,
  },
  container: {
    padding: 20,
    width: '80%',
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
  const article_id = article._id;
  const updated_date = moment(new Date(article.updatedAt)).format('MMMM Do YYYY');
    
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
  },[article._id,data]);
  // console.log("fetched comments: ",data);
  return (
    article._id ? 
      (
        <Paper elevation={3}  m={10}>
          <Container className={classes.container}>
            <Typography gutterBottom variant="h4" component="h4">
              {article.title}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="subtitle1">
              {article.author}
              <br/>
              {updated_date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { ReactHtmlParser(article.body)};
            </Typography>
            <Box pt={4}>
              <Divider variant="li" />
            </Box>
            <Box pt={4}>
              <Card className={classes.divider} p={2}>
                <Typography gutterBottom variant="h5" component="h2">
                  Comments
                </Typography>
                <Comment article={article._id}/>
              </Card>
              <Box pt={4} >
                <Box pt={2}>
                  <Divider variant="li" />
                </Box>
                {data.comments.map((comment) => {
                  return (
                    <Paper elevation={1} className={classes.paper}>
                    <Box p={2}>
                        <Typography variant="h6" className={classes.commentTitle} gutterBottom>
                          {comment.username}
                        </Typography>
                        <Typography   variant="subtitle1">
                          {moment(new Date(comment.updatedAt)).fromNow()}
                        </Typography>
                        <Typography  variant="subtitle1" color="textSecondary">
                           {comment.text.split('\n\n').map(function(item) {
                              return (
                                <span>
                                  {item}
                                  <br/>
                                </span>
                              )
                            })}
                        </Typography>
                    </Box>
                   </Paper>
                  )
                })}
              </Box>
            </Box> 
          </Container> 

        </Paper>
      ) : null 

  );
}