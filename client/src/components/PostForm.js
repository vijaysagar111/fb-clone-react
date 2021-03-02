import React from "react";
import axios from "axios";
import { Avatar, Input } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postMessage: "",
      images: "",
    };
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePostMessage(event) {
    this.setState({
      postMessage: event.target.value,
    });
  }
  handleImage(event) {
    this.setState({
      images: event.target.files[0],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let _this = this;
    let formdata = new FormData();
    formdata.append("postMessage", this.state.postMessage);
    formdata.append("userId", this.props.user._id);
    formdata.append("proImage", this.state.images);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/post`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    })
      .then(function (response) {
        _this.props.formHasBeenSubmittedAndSavedInDatabase(); //provided by the Timeline through props
        _this.setState({ postMessage: "" });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    //  console.log('postform', this.props.user);
    return (
      <div className="messageSender">
        <div className="messageSender__top">
          <form  onSubmit={this.handleSubmit}>
              <label htmlFor="exampleFormControlTextarea1">
                Post a message
              </label>
              <input
                type="text"
                className="form-control messageSender__input"
                placeholder="What's on your mind?"
                onChange={this.handlePostMessage}
                value={this.state.postMessage}
                id="exampleFormControlTextarea1"
              />
            
            <input
              type="file"
              name="proImage"
              onChange={(e) => this.handleImage(e)}
              className="messageSender__fileSelector"
            />
            
            <button type="submit" className="btn btn-primary">
              Post Message
            </button>
          </form>
        </div>
        <div className="messageSender__bottom">
          <div className="messageSender__option">
            <VideocamIcon style={{ color: "red" }} />
            <h3>Live Video</h3>
          </div>
          <div className="messageSender__option">
            <PhotoLibraryIcon style={{ color: "green" }} />
            <h3>Photo/Video</h3>
          </div>
          <div className="messageSender__option">
            <InsertEmoticonIcon style={{ color: "orange" }} />
            <h3>Feeling/Activity</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
