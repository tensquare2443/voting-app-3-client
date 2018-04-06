import React from 'react';
import axios from 'axios';

class MyPolls extends React.Component {
  updateMyPolls() {
    var _creator = this.props.user._id;
    axios.post("https://voting-app-3-server-161718.herokuapp.com/poll/my-polls", {_creator}).then((response) => {
      var myPolls = response.data;
      this.props.setMyPolls(myPolls);
    }).catch((e) => {
      console.log(e);
    });
  }
  showPollButtons = (e) => {
    var buttons = e.currentTarget.getElementsByClassName("poll-button-container")[0];
    buttons.style.visibility = "visible";
  };
  hidePollButtons = (e) => {
    var buttons = e.currentTarget.getElementsByClassName("poll-button-container")[0];
    buttons.style.visibility = "hidden";
  };

  componentDidMount() {
    this.updateMyPolls();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user._id !== this.props.user._id || prevProps.user.pollsCreated !== this.props.user.pollsCreated) {
      this.updateMyPolls();
    }
  }

  render() {
    const myPolls = this.props.myPolls.map((poll, index) => {
      var objectId = poll._id;
      var pollClass = `list-group-item list-group-item-action ${objectId} d-flex justify-content-between align-items-center`;
      var pollButtonClass = `btn btn-sm ${objectId} btn-secondary mx-1 poll-button`;
      var removePollButtonClass = pollButtonClass.replace("btn-secondary", "btn-danger");
      return(
        <div
          className={pollClass}
          style={{wordWrap: "break-word"}}
          key={index.toString()}
          data-id="poll"
          onMouseOver={this.showPollButtons.bind(this)}
          onMouseMove={this.showPollButtons.bind(this)}
          onMouseOut={this.hidePollButtons.bind(this)}
        >{poll.question}
          <div className="poll-button-container">
            <button
              className={removePollButtonClass}
              onClick={this.props.removePollFromList.bind(this)}
            >Remove</button>
            <button
              className={pollButtonClass}
              data-id="voteOnPoll"
              onClick={this.props.changeAppStatus.bind(this)}
            >Vote</button>
            <button
              className={pollButtonClass}
              data-id="poll"
              onClick={this.props.changeAppStatus.bind(this)}
            >Results</button>
          </div>
        </div>
      );
    });
    if (Array.isArray(this.props.myPolls) && this.props.myPolls.length === 0) {
      return(
        <div className="m-3">
          <h5 className="ml-2">My Polls</h5>
          <div className="d-flex align-items-center">
            <div className="m-2">You have no polls.</div>
            <button onClick={this.props.changeAppStatus} data-id="creating" className="btn btn-sm btn-primary m-2">Create a Poll</button>
          </div>
        </div>
      );
    } else {
      return(
        <div className="m-3">
          <h5 className="ml-2">My Polls</h5>
          <div className="list-group">
            {myPolls}
          </div>
        </div>
      );
    }
  }
}

export default MyPolls;
