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
import { Article } from '../../components';

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
    padding: theme.spacing(1),
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
    _id: '',
  });
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get(
        'https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles'
      );
      setData(result.data);
      setContent(result.data.articles[0]);

    };
    fetchData();
  }, []);

  // console.log(title);
  const handleContent = (index) => {
    if (data.articles[index]) {
      setContent(data.articles[index]);        
    }
  };
  
  return (
    <div className={classes.root}>
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
                <Card article={article} word='240' valueId={index}/>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
      <Article article={content} />
      </main>
    </div>
  );
}

