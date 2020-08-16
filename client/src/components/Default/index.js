import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '../Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import DefaultAppBar from '../AppBar';
// import history from '../History';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Single from '../Single';

const drawerWidth = '30%';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    height: "100%",
  },
  card: {
    padding:20,

  }
}));


export default function Default() {
  const classes = useStyles();
  const  [data, setData] = useState({articles:[]});
  const [content, setContent] = useState({
    title:'',
    body: '',
    author: '',
    createdAt: '',
  });
  const [singleContent, setSingleContent] = useState(false);
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(
        'http://localhost:8000/api/articles'
      );
      setData(result.data);
      setContent(result.data.articles[0]);

    };
    fetchData();
  }, []);

  // console.log(title);
  const displayContent = (index) => {
    console.log(index);
    if (data.articles[index]) {
      setContent(data.articles[index]);        
    }
    else {
      console.log('not ready');
    }
    setSingleContent(true);
    console.log(singleContent);
    console.log(content);
  };

  
  const history = useHistory();
  return (
    <div>
      <CssBaseline />
      <Toolbar/>
      <Container className={classes.container}>
      {!singleContent
        ? (
        <List>
          {data.articles.map((article, index) => (
            <div className={classes.card} onClick={() => setContent(article)} key={index} >
            <CardActionArea  onClick={() => displayContent({index})} >
              <Card  article={article} word='500' key={index} valueId={index}/> 
            </CardActionArea>  
            </div>
          ))}
        </List>
        )
        :(
          <Container>
            <Button onClick={() => setSingleContent(false)}> Back </Button>
            <Single article={content} />
          </Container>
          )
        
      }
      </Container>
    </div>
  );
}

