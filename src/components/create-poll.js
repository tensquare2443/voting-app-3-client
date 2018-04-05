import React from 'react';

class CreatePoll extends React.Component {
  render() {
    const answers = this.props.newPollAnswers.map((answer, index) => {
      var answerId = `answerInput${index.toString()}`;
      var answerClass = `${index.toString()} form-control`;
      return (
        <div key={index} className="form-group m-2">
          <label htmlFor={answerId}>Answer</label>
          <input
          name="option"
            type="text"
            placeholder="Type answer here"
            className={answerClass}
            id={answerId}
            onChange={this.props.changeAnswers.bind(this)}
            value={answer}
          />
        </div>
      );
    });
    var remove = this.props.newPollAnswers.length > 1;
    var submit = false;
    const filteredAnswers = this.props.newPollAnswers.filter((answer) => answer.length > 0);
    if (this.props.newPollQuestion.length > 0 && filteredAnswers.length > 1) {
      submit = true;
    }
    return(
      <div className="m-3">
        <h5 className="ml-2">New Poll</h5>
        <div className="form-group m-2">
          <label htmlFor="questionInput">Question</label>
          <input
            name="option"
            type="text"
            placeholder="Type question here"
            className="form-control"
            id="questionInput"
            onChange={this.props.changeQuestion.bind(this)}
            value={this.props.newPollQuestion}
          />
        </div>
        {answers}
        <button className="btn btn-sm btn-primary add-answer mx-2" onClick={this.props.changeAnswers.bind(this)}>Add Answer</button>
        {remove ?
          <button className="btn btn-sm btn-danger remove-answer mx-2" onClick={this.props.changeAnswers.bind(this)}>
            Remove Answer
          </button>
        : null}
        {submit ?
          <button className="btn btn-sm btn-success mx-2" onClick={this.props.submitNewPoll}>
            Submit Poll
          </button>
        : null}
      </div>
    );
  }
}

export default CreatePoll;
