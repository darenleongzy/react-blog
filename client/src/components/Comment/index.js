import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      username: '',
      article: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(){
    const { onSubmit, commentToEdit, onEdit } = this.props;
    const { text, username } = this.state;
    const article = this.props.article;

    if(!commentToEdit) {
      return axios.post('https://api-dot-darenleong-webapp.et.r.appspot.com:/api/comments', {
        text,
        username,
        article,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ text: '', username: '', article: '' }))
        .then(() => this.props.parentCallback("hi"));
    } else {
      return axios.patch(`https://api-dot-darenleong-webapp.et.r.appspot.com:/api/comments/${commentToEdit._id}`, {
        text,
        username,
        article,
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ text: '', username: '', article: '' }))
        .then(() => this.props.parentCallback("hi"));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { commentToEdit } = this.props;
    const { text, username, article } = this.state;

    return (
      <Box p={1}>
          <Typography gutterBottom variant="h5" component="h2">
           Comments
          </Typography>
          <input
            onChange={(ev) => this.handleChangeField('username', ev)}
            value={username}
            className="form-control my-3"
            placeholder="Username"
          />
          <textarea
            onChange={(ev) => this.handleChangeField('text', ev)}
            className="form-control my-3"
            placeholder="Comment Body"
            value={text}
            rows="3"
          />

          <button onClick={this.handleSubmit} className="btn btn-primary float-right">{commentToEdit ? 'Update' : 'Submit'}</button>
      </Box>  
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_COMMENT', data }),
  onEdit: data => dispatch({ type: 'EDIT_COMMENT', data }),
});

const mapStateToProps = state => ({
 commentToEdit: state.home.commentToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);