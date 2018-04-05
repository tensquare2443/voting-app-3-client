import React from 'react';
import axios from 'axios';

class AllPolls extends React.Component {

  componentDidMount() {
    axios.get("http://localhost:3005/poll/all-polls").then((response) => {
      var allPolls = response.data;
      this.props.setAllPolls(allPolls);
    }).catch((e) => {
      console.log(JSON.stringify(e));
    });
  }

  // componentDidUpdate(prevProps) {
  // if (prevProps.allPolls !== this.props.polls) then update
  // }

  showPollButtons = (e) => {
    var buttonContainer = e.currentTarget.getElementsByClassName("poll-button-container")[0];
    buttonContainer.style.visibility = "visible";
  };
  hidePollButtons = (e) => {
    var buttonContainer = e.currentTarget.getElementsByClassName("poll-button-container")[0];
    buttonContainer.style.visibility = "hidden";
  };

  render() {
    const allPolls = this.props.allPolls.map((poll, index) => {
      var objectId = poll._id;
      if (this.props.user && this.props.user.pollsCreated && this.props.user.pollsCreated.includes(objectId)) {
        var remove = true;
      }
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
        >
          {poll.question}
          <div className="poll-button-container">
            {remove ?
              <button
                className={removePollButtonClass}
                onClick={this.props.removePollFromList.bind(this)}
              >Remove</button>
            : null}
            <button
              className={pollButtonClass}
              data-id="voteOnPoll"
              onClick={this.props.changeAppStatus.bind(this)}
            >
            Vote
            </button>
            <button
              className={pollButtonClass}
              data-id="poll"
              onClick={this.props.changeAppStatus.bind(this)}
            >
            Results
            </button>
          </div>
        </div>
      );
    });
    return(
      <div className="m-3">
        <h5 className="ml-2">All Polls</h5>
        <div className="list-group">
          {allPolls}
        </div>
      </div>
    );
  }
}

export default AllPolls;
