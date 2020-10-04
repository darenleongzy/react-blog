import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import history from '../History';

import { Home } from '../../components';

import { Archives } from '../../components';
import { Editor } from '../../components';
import { Submit } from '../../components';
import { Single } from '../../components';


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

const App = (props) => {
  const classes = useStyles();
  return (
  	<box>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          	<Typography variant="h6" style={{flex: 1}} onClick = { () => history.push('/')}>
            	SG Fin Free
          	</Typography>
        	<Button color="inherit"onClick={() => { history.push('/') }}>Home</Button>
        	<Button color="inherit">About</Button>
        	<Button color="inherit" onClick={() => { history.push('/archives') }}> Archives</Button>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Submit} />
      <Route exact path="/archives" component={Archives} />
      <Route exact path="/single" render={props => <Single article={props} /> } />


    </Switch>
    </box>
  )
}

export default withRouter(App);