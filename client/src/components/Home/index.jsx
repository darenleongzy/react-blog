import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
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
import axios from 'axios';
const drawerWidth = 540;

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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  drawerContainer: {
    overflow: 'auto',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// export default function ClippedDrawer() {
//   const classes = useStyles();
  
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             My Blog
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <Toolbar />
//         <div className={classes.drawerContainer}>
//           <List>
//             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//               <ListItem button key={text}>
//                 <Card/>
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Drawer>
//       <main className={classes.content}>
//         <Toolbar />
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
//           donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
//           Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//           facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//           tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//           consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
//           vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
//           hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
//           tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//           nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//           accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>
//                 <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
//           ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
//           facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
//           gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
//           donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
//           adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
//           Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
//           imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
//           arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
//           donec massa sapien faucibus et molestie ac.
//         </Typography>
//         <Typography paragraph>
//           Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//           facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//           tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//           consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
//           vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
//           hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
//           tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//           nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//           accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
//         </Typography>

//       </main>
//     </div>
//   );
// }

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/articles')
    .then(response => {
      console.log(response.data);
      this.setState({
        articles:response,
      });
    })
    .catch((error) => {
      console.log(error);
    }); 
  }

  render() {
    return (
      <div>
        <CssBaseline />
      
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
                  <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
      </div>
    )
  }
} 
