import React from 'react';
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  paper: {
    height: 1000,
  },
  container: {
    padding: 20,
  }
});

export default function Single({article}) {
  const classes = useStyles();
  console.log(article);
  const content = article.body
  const history = useHistory();
  return (
      <Paper elevation={2}  className={classes.paper}>
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
        </Container>  
      </Paper>
  );
}