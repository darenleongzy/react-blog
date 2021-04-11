import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Comment from '../Comment';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from 'axios';

const useStyles = makeStyles({
  paper: {
    // height: 1000,
    marginBottom:10,
  },
  container: {
    padding: 20,
    maxWidth: '100%',
  },
   divider: {
    padding: 20,
    margin: 10,
  },
  commenTitle: {
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '30%',
    marginBottom:40,
  },
  content: {
    width: '100%',
    height: 'auto',
    overwrite: "hidden",    
  }
});

export default function Article(props) {
  const article = props.article;  
  const classes = useStyles();
  const content = article.body;
  const article_id = article._id;
  const updated_date = moment(new Date(article.updatedAt)).format('MMMM Do YYYY');

    
  const  [data, setData] = useState({comments:[]});
  const [refreshKey, setRefreshKey] = useState(false);

  const callbackFunction = (childData) => {
    setRefreshKey(!refreshKey);
  }

  useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(
        `https://api-dot-darenleong-webapp.et.r.appspot.com:/api/comments/article/${article_id}` 
      );
        setData(result.data);
    };
    if (typeof(article_id) !== 'undefined') {
      fetchData();
    }
  },[refreshKey, article_id]);
  let image = article.image;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    article._id ? 
      (
        <Paper elevation={1}  m={10} >
          <Container className={classes.container}>
          <img src={image} className={classes.image} />
            <Typography gutterBottom variant="h4" component="span">
              {article.title}
            </Typography>
            <Box mb={4}>
            <Typography gutterBottom variant="subtitle1" component="span" >
              {article.author}
              <br/>
              {updated_date}
            </Typography>
            </Box>
            <Typography variant="body2" className={classes.content} component="span">
              { ReactHtmlParser(article.body) } 
            </Typography>
            <Box pt={1}>
      <Divider />
    </Box>

    <Box pt={1} >

      <Card className={classes.divider} m={4}>

        <Comment article={article._id} parentCallback={callbackFunction}/>
      </Card>

    </Box>


        {data.comments.map((comment, index) => {
          return (
            <Box pt={1} m={3} key={index}>
            <Paper elevation={3} p={2} className={classes.paper}>
              <Box p={3}>
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
             </Box>
          )
        })}

          </Container> 

        </Paper>
      ) : null 

  );
}