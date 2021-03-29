import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import image1 from '../../images/image1.jpg'
// import image2 from '../../images/image2.jpg'
// import image3 from '../../images/image3.jpg'
// import image4 from '../../images/image4.jpg'
// import image5 from '../../images/image5.jpg'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

var path = require('path');
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
  content: {
    height: "30vh",
  },
  media: {
    height: "30vh",
  }
});

export default function ImgMediaCard({article, word, valueId, ...other}) {
  const classes = useStyles();
  // const article = props.article;
  // const intro = article.body.toString().substring(0,word);
  const intro = article.body.toString();

// image={valueId % 2 === 0 ? image2 : image1}
  console.log("look here", article);
  let image = article.image;
  // console.log("image", image) 
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media}
          component="img"
          src={image}
        />
        <CardContent textOverflow="hidden" className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {ReactHtmlParser(intro)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}