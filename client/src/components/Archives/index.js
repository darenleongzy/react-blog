import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Card from '../Card';
import DefaultAppBar from '../AppBar';
import axios from 'axios';
import Button from '@material-ui/core/Button';


const drawerWidth = '30%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    paddingLeft:15,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function Archives() {
  const classes = useStyles();
  const  [data, setData] = useState({articles:[]});
  const [content, setContent] = useState({
    title:'',
    body: '',
    author: '',
    createdAt: '',
  });
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
  const handleContent = (index) => {
    console.log(index);
    if (data.articles[index]) {
      setContent(data.articles[index]);        
    }
    else {
      console.log('not ready');
    }
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {data.articles.map((article, index) => (
              <div onClick={() => setContent(article)} key={article._id}>
                <Card article={article} word='240' key={article._id}/>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography component={'span'} gutterBottom variant="h5" component="h2">
          {content.title}
        </Typography>
        <Divider/>
        <Typography paragraph>
        {content.body.split('\n\n').map(function(item) {
            return (
              <span>
                {item}
                <br/>
              </span>
            )
          })}
        </Typography>
      </main>
    </div>
  );
}
