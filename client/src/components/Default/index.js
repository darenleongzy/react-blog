import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "../Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import DefaultAppBar from "../AppBar";
import Box from "@material-ui/core/CardActionArea";

// import history from '../History';
import axios from "axios";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { Article } from "../../components";

const drawerWidth = "30%";

const useStyles = makeStyles((theme) => ({
  container: {
    MaxWidth: "95%",
    height: "100%",
  },
  box: {
    padding: 10,
  },
}));

export default function Default() {
  let history = useHistory();

  const classes = useStyles();
  const [data, setData] = useState({ articles: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const displayContent = (props) => {
    const index = props.index;

    if (data.articles[index]) {
      let urlTitle = data.articles[index].urlTitle;
      history.push({
        pathname: "/article/" + urlTitle + "/" + data.articles[index]._id,
        state: { article: data.articles[index] },
      });
    } else {
      // console.log('cant find content');
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container className={classes.container}>
        <List>
          {data.articles.map((article, index) => (
            <CardActionArea
              onClick={() => displayContent({ index })}
              className={classes.box}
              key={index}
            >
              <Card
                article={article}
                word="1000"
                key={index}
                valueId={index}
                onClick={() => displayContent({ index })}
              />
            </CardActionArea>
          ))}
        </List>
      </Container>
    </div>
  );
}
