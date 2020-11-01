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
import { Article } from '../../components';

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
  let history = useHistory();

  const classes = useStyles();
  const  [data, setData] = useState({articles:[]});

  useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(
        'https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles'
      );
      setData(result.data);

    };
    fetchData();
  }, []);

  // console.log(title);
  const displayContent = (props) => {
    console.log("yo whats up ", props.index);
    console.log("data ", data);
    const index = props.index;


    if (data.articles[index]) {
      // setContent(data.articles[index]);
      history.push({
        pathname: '/single',
        state: { article: data.articles[index]},
      });        
    }
    else {
      console.log('cant find content');
    }
    // let article = content;
    
    // setSingleContent(true);
    // console.log(singleContent);
    // console.log(content);

  };

  
  return (
    <div>
      <CssBaseline />
      <Container className={classes.container}>
        <List>
          {data.articles.map((article, index) => (
            <div className={classes.card} key={index} >
            <CardActionArea  onClick={() => displayContent({index})} >
              <Card  article={article} word='500' key={index} valueId={index}/> 
            </CardActionArea>  
            </div>
          ))}
        </List>
  
      </Container>
    </div>
  );
}

