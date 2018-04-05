import React from 'react';

class VoteOnPoll extends React.Component {
  render() {
    if (this.props.appStatus.voteOnPoll && this.props.poll.answers) {
      var answers = this.props.poll.answers.map((answer, index) => {
        var id = `answerRadio${index}`;
        return(
          <div className="form-check mx-1 my-3" key={index}>
            <input className="form-check-input" type="radio" name="answerRadio" id={id} value={answer.answer}/>
            <label className="form-check-label" htmlFor={id}>
              {answer.answer}
            </label>
          </div>
        );
      });
      return(
        <div className="m-3">
          <h5 className="m-2">{this.props.poll.question}</h5>
          <form onSubmit={this.props.vote.bind(this)} className="mx-4">
            {answers}
            <button type="submit" className="btn btn-primary">Vote</button>
          </form>
        </div>
      );
    } else return null;
  }
}

export default VoteOnPoll;
