import React from 'react';
import PollChart from './poll-chart';

class Poll extends React.Component {
  render() {
    if (this.props.appStatus.poll && this.props.poll) {
      if (this.props.user && this.props.poll._creator === this.props.user._id) {
        var removePoll = true;
      } else removePoll = false;
      return(
        <div className="m-3">
          <h5 className="m-2">{this.props.poll.question}</h5>
          <PollChart poll={this.props.poll} appStatus={this.props.appStatus} togglePoll={this.props.togglePoll}/>
          {removePoll ?
            <div className="d-flex justify-content-end m-3">
              <button type="button" className="btn btn-sm btn-danger" onClick={this.props.removePollFromResults}>Remove Poll</button>
            </div>
          : null}
        </div>
      );
    } else return null;
  }
}

export default Poll;
