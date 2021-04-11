import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

// const custom_config = {
//   t
// }

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      author: "",
      image: "",
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleToEdit) {
      this.setState({
        title: nextProps.articleToEdit.title,
        body: nextProps.articleToEdit.body,
        author: nextProps.articleToEdit.author,
      });
    }
  }

  handleSubmit() {
    const { onSubmit, articleToEdit, onEdit } = this.props;
    const { title, body, author, image } = this.state;
    // console.log("yes ", image);
    var imagePath;
    if (image) {
      axios
        .post(
          "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/images",
          image
        )
        .then((res) => {
          // console.log('res', res);
          imagePath = res.data.url;
          console.log("imagePath", imagePath);
          if (!articleToEdit) {
            return axios
              .post(
                "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles",
                {
                  title,
                  body,
                  author,
                  image: imagePath,
                }
              )
              .then((res) => onSubmit(res.data))
              .then(() =>
                this.setState({ title: "", body: "", author: "", image: "" })
              );
          } else {
            // return axios.post('http://localhost:8080:/api/articles', {
            return axios
              .patch(
                `https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles/${articleToEdit._id}`,
                {
                  title,
                  body,
                  author,
                  image: imagePath,
                }
              )
              .then((res) => onEdit(res.data))
              .then(() =>
                this.setState({ title: "", body: "", author: "", image: "" })
              );
          }
        });
    } else {
      if (articleToEdit) {
        // console.log("update without image");
        return axios
          .patch(
            `https://api-dot-darenleong-webapp.et.r.appspot.com:/api/articles/${articleToEdit._id}`,
            {
              title,
              body,
              author,
            }
          )
          .then((res) => onEdit(res.data))
          .then(() =>
            this.setState({ title: "", body: "", author: "", image: "" })
          );
      }
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handlePostField(key, data) {
    this.setState({
      [key]: data,
    });
  }

  onFileChangeHandler(event) {
    if (event.target.files[0] && event.target.files[0].size <= 150000000) {
      // console.log("setState for file", event.target.files[0]);
      let formData = new FormData();

      formData.append("image", event.target.files[0]);
      // console.log("form-data", formData);
      this.setState({
        image: formData,
      });
    }
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, body, author, image } = this.state;

    return (
      <div className="col-lg-12 ">
        <input
          onChange={(ev) => this.handleChangeField("title", ev)}
          value={title}
          className="form-control my-3"
          placeholder="Article Title"
        />
        <input
          onChange={(ev) => this.handleChangeField("author", ev)}
          value={author}
          className="form-control my-3"
          placeholder="Article Author"
        />
        <CKEditor
          config={{
            simpleUpload: {
              // Upload the images to the server using the CKFinder QuickUpload command.
              uploadUrl:
                "https://api-dot-darenleong-webapp.et.r.appspot.com:/api/images/upload",
            },
          }}
          editor={ClassicEditor}
          data={body}
          onInit={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log( { event, editor, data } );
            this.handlePostField("body", data);
          }}
          onBlur={(event, editor) => {
            // console.log( 'Blur.', editor );
          }}
          onFocus={(event, editor) => {
            // console.log( 'Focus.', editor );
          }}
        />
        <input type="file" name="file" onChange={this.onFileChangeHandler} />

        <button
          onClick={this.handleSubmit}
          className="btn btn-primary float-right"
        >
          {articleToEdit ? "Update" : "Submit"}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch({ type: "SUBMIT_ARTICLE", data }),
  onEdit: (data) => dispatch({ type: "EDIT_ARTICLE", data }),
});

const mapStateToProps = (state) => ({
  articleToEdit: state.home.articleToEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
