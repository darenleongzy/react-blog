import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";

import { Editor } from "../../components";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Submit extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios(
      "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles"
    ).then((res) => onLoad(res.data));
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios
      .delete(
        `https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles/${id}`
      )
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    const { articles } = this.props;

    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-12">
            <h1 className="text-center">New Post</h1>
          </div>

          <Editor />
        </div>
        <div className="row pt-5">
          <div className="col-lg-12">
            {articles.map((article) => {
              return (
                <div className="card my-3">
                  <div className="card-header">{article.title}</div>
                  <div className="card-body">
                    {ReactHtmlParser(article.body)}
                    <p className="mt-5 text-muted">
                      <b>{article.author}</b>{" "}
                      {moment(new Date(article.createdAt)).fromNow()}
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button
                        onClick={() => this.handleEdit(article)}
                        className="btn btn-primary mx-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => this.handleDelete(article._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.home.articles,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (data) => dispatch({ type: "HOME_PAGE_LOADED", data }),
  onDelete: (id) => dispatch({ type: "DELETE_ARTICLE", id }),
  setEdit: (article) => dispatch({ type: "SET_EDIT", article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
