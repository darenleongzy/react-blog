import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import image_lizard from '../../images/thought-catalog-505eectW54k-unsplash.jpg';

const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 130,
  }
});

  export default function ImgMediaCard({article, word, ...other}) {
  const classes = useStyles();
  // const article = props.article;
  const intro = article.body.toString().substring(0,word);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}
          component="img"
          image={image_lizard}
          title="Lizard"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {intro}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}