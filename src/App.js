import React from 'react';
import './App.css';
import axios from 'axios';

import AllPolls from './components/all-polls';
import MyPolls from './components/my-polls';
import CreatePoll from './components/create-poll';
import SignInModal from './components/sign-in-modal';
import CreateAccountModal from './components/create-account-modal';
import TopNav from './components/top-nav';
import Poll from './components/poll';
import SignInSuccess from './components/sign-in-success';
import CreateAccountSuccess from './components/create-account-success';
import SignOutSuccess from './components/sign-out-success';
import VoteOnPoll from './components/vote-on-poll';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appStatus: {
        home: true,
        myPolls: false,
        creating: false,
        poll: false,
        voteOnPoll: false
      },
      newPollAnswers: [""],
      newPollQuestion: "",
      user: false,
      allPolls: [],
      myPolls: [],
      signInFromMyPolls: false,
      signInFromCreatePoll: false,
      poll: false,
      voted: false,
      signInModal: false,
      createAccountModal: false,
      signInModalForm: {email: '', password: ''},
      createAccountModalForm: {email: '', username: '', password: ''},
      signInValidation: {
        email: '',
        password: '',
        feedback: ''
      },
      createAccountValidation: {
        email: {
          state: '',
          feedback: ''
        },
        username: {
          state: '',
          feedback: ''
        },
        password: {
          state: '',
          feedback: ''
        }
      },
      signInSuccess: false,
      createAccountSuccess: false,
      signOutSuccess: false
    };
    this.changeAppStatus = this.changeAppStatus.bind(this);
    this.changeAnswers = this.changeAnswers.bind(this);
    this.submitNewPoll = this.submitNewPoll.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.createAccountSubmit = this.createAccountSubmit.bind(this);
  };

  vote = (e) => {
    e.preventDefault();
    var form = e.currentTarget;
    var inputs = form.getElementsByTagName("input");
    var labels = form.getElementsByTagName("label");
    var answer;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        answer = labels[i].innerText;
        break;
      }
    }
    var poll = this.state.poll;
    for (var j = 0; j < poll.answers.length; j++) {
      if (poll.answers[j].answer === answer) {
        poll.answers[j].votes++;
        break;
      }
    }
    var _id = poll._id;
    var answers = poll.answers;

    axios.post("http://localhost:3005/poll/vote", {_id, answers}).then((response) => {

      poll = response.data;
      var appStatus = {};

      Object.keys(this.state.appStatus).slice().forEach((status) => {
        if (status === "poll") {
          appStatus[status] = true;
        } else appStatus[status] = false;
      });

      this.setState({poll});
      this.setState({appStatus});
    }).catch((e) => console.log(e));
  };

  changeAnswers(e) {
    var action = e.currentTarget.getAttribute("class").split(" ");
    var newPollAnswers = this.state.newPollAnswers.slice();
    if (action[3] === "add-answer") {
      newPollAnswers.push("");
    } else if (action[3] === "remove-answer") {
      newPollAnswers.pop();
    } else {
      action = action[0] / 1;
      newPollAnswers[action] = e.currentTarget.value;
    }
    this.setState({newPollAnswers});
  }
  changeQuestion(e) {
    var newPollQuestion = e.currentTarget.value;
    this.setState({newPollQuestion});
  }

  removePollFromList = (e) => {
    var pollId = e.currentTarget.getAttribute("class").split(" ")[2];
    var userId = this.state.user._id;
    var pollsCreated = this.state.user.pollsCreated.filter((poll) => poll !== pollId);

    this.removePoll(pollId, userId, pollsCreated);
  };
  removePollFromResults = () => {
    var pollId = this.state.poll._id;
    var userId = this.state.user._id;
    var pollsCreated = this.state.user.pollsCreated.filter((poll) => poll !== pollId);

    this.removePoll(pollId, userId, pollsCreated);
  };
  removePoll = (pollId, userId, pollsCreated) => {
    axios.post("http://localhost:3005/poll/remove", {pollId, userId, pollsCreated}).then((response) => {
      var user = response.data[0];
      var polls = response.data[1];

      if (this.state.allPolls.length > 0) {
        this.setAllPolls(polls);
      } else if (this.state.myPolls.length > 0) {
        this.setMyPolls(polls);
      }

      this.setState({user});

      if (this.state.poll) {
        var appStatus = {};
        Object.keys(this.state.appStatus).slice().forEach((status) => {
          if (status === "home") {
            appStatus[status] = true;
          } else appStatus[status] = false;
        });
        this.setState({appStatus});
      }

      return;
    }).catch((e) => {
      return console.log(e);
    });
  };

  togglePoll = () => this.setState({poll: !this.state.poll});
  toggleCreateAccountSuccess = () => this.setState({createAccountSuccess: !this.state.createAccountSuccess});
  createAccountSuccess = () => {
    this.setState({createAccountSuccess: true});
    setTimeout(() => this.setState({createAccountSuccess: false}), 500);
  };
  toggleSignInSuccess = () => this.setState({signInSuccess: !this.state.signInSuccess});
  signInSuccess = () => {
    this.setState({signInSuccess: true});
    setTimeout(() => this.setState({signInSuccess: false}), 500);
  };
  toggleSignOutSuccess = () => this.setState({signOutSuccess: !this.state.signOutSuccess});
  signOutSuccess = () => {
    this.setState({signOutSuccess: true});
    setTimeout(() => this.setState({signOutSuccess: false}), 500);
  };
  signInToCreateAccount = () => {
    this.signInModalToggle();
    this.createAccountModalToggle();
  };
  createAccountToSignIn = () => {
    this.createAccountModalToggle();
    this.signInModalToggle();
  };
  createAccountFormEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.createAccountSubmit();
    }
  };
  signInFormEnterPress = (e) => {
    if (e.key === 'Enter') {
      this.signInSubmit();
    }
  };
  signInModalToggle = () => {
    var signInValidation = {email: '', password: '', feedback: ''};
    var signInModalForm = {email: '', password: ''};
    this.setState({signInValidation});
    this.setState({signInModalForm});
    this.setState({signInModal: !this.state.signInModal});
  };
  signInEmailChange = (e) => {
    var email = e.target.value;
    var password = this.state.signInModalForm.password
    var signInModalForm = {email, password};
    this.setState({signInModalForm});
  };
  signInPasswordChange = (e) => {
    var email = this.state.signInModalForm.email;
    var password = e.target.value;
    var signInModalForm = {email, password};
    this.setState({signInModalForm});
  };
  createAccountModalToggle = () => {
    var createAccountValidation = {
      email: {state: '', feedback: ''},
      username: {state: '', feedback: ''},
      password: {state: '', feedback: ''}
    };
    var createAccountModalForm = {email: '', username: '', password: ''};
    this.setState({createAccountModalForm});
    this.setState({createAccountValidation});
    this.setState({createAccountModal: !this.state.createAccountModal});
  };
  createAccountEmailChange = (e) => {
    var email = e.target.value;
    var username = this.state.createAccountModalForm.username;
    var password = this.state.createAccountModalForm.password;
    var createAccountModalForm = {email, username, password};
    this.setState({createAccountModalForm});
  };
  createAccountUsernameChange = (e) => {
    var email = this.state.createAccountModalForm.email;
    var username = e.target.value;
    var password = this.state.createAccountModalForm.password;
    var createAccountModalForm = {email, username, password};
    this.setState({createAccountModalForm});
  };
  createAccountPasswordChange = (e) => {
    var email = this.state.createAccountModalForm.email;
    var username = this.state.createAccountModalForm.username;
    var password = e.target.value;
    var createAccountModalForm = {email, username, password};
    this.setState({createAccountModalForm});
  };

  setMyPolls = (myPolls) => this.setState({myPolls});
  setAllPolls = (allPolls) => this.setState({allPolls});

  signUserOut = () => {
    var user = !this.state.user;
    var newAppState = "home";
    var appStatus = {};
    Object.keys(this.state.appStatus).slice().forEach((status) => {
      if (status === newAppState) {
        appStatus[status] = true;
      } else appStatus[status] = false;
    });

    this.setState({user});
    this.setState({appStatus});
    this.signOutSuccess();
  };

  signInSubmit() {
    var formValues = Object.assign({}, this.state.signInModalForm);

    axios.post("http://localhost:3005/user/login", formValues).then((response) => {

      if (!response.data.validated && response.data.errorMsg === "Invalid email or password.") {
        return this.setState({
          signInValidation: {
            email: ' is-invalid',
            password: ' is-invalid',
            feedback: response.data.errorMsg
          }
        });
      } else if (response.data.validated) {
        this.setState({
          signInValidation: {
            email: ' is-valid',
            password: ' is-valid',
            feedback: ''
          }
        });
        var username = response.data.username;
        var email = response.data.email;
        var _id = response.data._id;
        var pollsCreated = response.data.pollsCreated;
        this.setState({user: {username, email, _id, pollsCreated}});
        this.signInModalToggle();
        this.signInSuccess();

      }
    }).catch((e) => {
      console.log(e.data);
    });

  };

  createAccountSubmit() {
    var formValues = Object.assign({}, this.state.createAccountModalForm);
    var email = false;
    var username = false;
    var password = false;

    var preEmailReject = () => {
      return this.setState({
        createAccountValidation: {
          email: {state: ' is-invalid', feedback: 'Must be a valid email address'},
          username: {state: '', feedback: ''},
          password: {state: '', feedback: ''}
        }
      });
    };
    if (!formValues.email.includes("@")) {
      return preEmailReject();
    } else {
      if (!formValues.email.split("@")[0] || formValues.email.split("@")[0].length === 0) {
        return preEmailReject();
      } else if (!formValues.email.split("@")[1] || formValues.email.split("@")[1].length === 0) {
        return preEmailReject();
      }
    }

    if (formValues.username.length < 6 || formValues.username.length > 18) {
      username = {
        state: ' is-invalid',
        feedback: 'Username must be between 6 and 18 characters.'
      };
    } else if (formValues.username !== formValues.username.replace(/[\W]/g, "")) {
      username = {
        state: ' is-invalid',
        feedback: 'Username must contain only alphanumeric characters.'
      };
    }
    if (formValues.password.length < 6 || formValues.password.length > 18) {
      password = {
        state: ' is-invalid',
        feedback: 'Password must be between 6 and 18 characters.'
      };
    }

    axios.post("http://localhost:3005/user", formValues).then((response) => {
      if (response.data.code === 11000) {
        var field = response.data.errmsg.split("index: ")[1].split("_")[0];

        if (field === "email") {
          email = {
            state: ' is-invalid',
            feedback: 'Email already in use.'
          };
        } else if (field === "username") {
          username = {
            state: ' is-invalid',
            feedback: 'Username already in use.'
          };
        }

      }
      var validated;
      if (!email && !username && !password) {validated = true;}
      if (!email) {email = {state: ' is-valid', feedback: ''};}
      if (!username) {username = {state: ' is-valid', feedback: ''};}
      if (!password) {password = {state: ' is-valid', feedback: ''};}
      var createAccountValidation = {email, username, password};
      this.setState({createAccountValidation});

      if (validated) {
        email = username = password = {state: '', feedback: ''};
        createAccountValidation = {email, username, password};
        this.setState({createAccountValidation});
        this.createAccountModalToggle();
        this.setState({
          user: {
            username: response.data.username,
            email: response.data.email,
            _id: response.data._id
          }
        });
        this.createAccountSuccess();
      }

    }).catch((e) => console.log(e.data));
  };

  displayPoll = (pollId, state) => {
    axios.post('http://localhost:3005/poll/view', {pollId}).then((response) => {
      var poll = response.data;
      var newAppState = state;
      var appStatus = {};

      Object.keys(this.state.appStatus).slice().forEach((status) => {
        if (status === newAppState) {
          appStatus[status] = true;
        } else appStatus[status] = false;
      });
      this.setState({appStatus});
      this.setState({poll});
    }).catch((e) => {
      console.log(e);
    });

  };

  changeAppStatus(e) {
    var newAppState = e.currentTarget.dataset.id;

    if (newAppState === "poll" || newAppState === "voteOnPoll") {
      var pollId = e.currentTarget.classList[2];
      return this.displayPoll(pollId, newAppState);
    }

    var appStatus = {};

    Object.keys(this.state.appStatus).slice().forEach((status) => {
      if (status === newAppState) {
        appStatus[status] = true;
      } else appStatus[status] = false;
    });

    this.setState({appStatus});
  };

  submitNewPoll() {
    var question = this.state.newPollQuestion;
    var _creator = this.state.user._id;
    var answers = [];
    this.state.newPollAnswers.slice().forEach((answer) => {
      var votes = 0;
      answers.push({answer, votes});
    });

    axios.post('http://localhost:3005/poll', {question, answers, _creator}).then((response) => {
      var user = response.data[1];
      var username = user.username;
      var email = user.email;
      var _id = user._id;
      var pollsCreated = user.pollsCreated;
      this.setState({user: {username, email, _id, pollsCreated}});
      this.setState({newPollAnswers: [""]});
      this.setState({newPollQuestion: ""});
      return;
    }).catch(function(e) {
      console.log(e);
    });
  }

  render () {
    return(
      <div className="container">
        <TopNav
          user={this.state.user}
          changeAppStatus={this.changeAppStatus}
          signUserOut={this.signUserOut}
          signInFromMyPolls={this.signInFromMyPolls}
          signInFromCreatePoll={this.signInFromCreatePoll}
          signInModalToggle={this.signInModalToggle}
          createAccountModalToggle={this.createAccountModalToggle}
        />
        {this.state.appStatus.creating ?
          <CreatePoll
            newPollAnswers={this.state.newPollAnswers}
            newPollQuestion={this.state.newPollQuestion}
            changeAnswers={this.changeAnswers}
            changeQuestion={this.changeQuestion}
            submitNewPoll={this.submitNewPoll}
          />
        : null}
        {this.state.appStatus.home ?
          <div>
            <AllPolls
              changeAppStatus={this.changeAppStatus}
              setAllPolls={this.setAllPolls}
              allPolls={this.state.allPolls}
              user={this.state.user}
              removePollFromList={this.removePollFromList}
            />
          </div>
        : null}
        {this.state.appStatus.myPolls ?
          <div>
            <MyPolls
              changeAppStatus={this.changeAppStatus}
              setMyPolls={this.setMyPolls}
              myPolls={this.state.myPolls}
              user={this.state.user}
              removePollFromList={this.removePollFromList}
            />
          </div>
        : null}
        {this.state.poll ?
         <div>
           <Poll
             poll={this.state.poll}
             appStatus={this.state.appStatus}
             user={this.state.user}
             togglePoll={this.togglePoll}
             removePoll={this.removePoll}
             removePollFromResults={this.removePollFromResults}
           />
         </div>
        : null}
        {this.state.appStatus.voteOnPoll ?
          <div>
            <VoteOnPoll
              poll={this.state.poll}
              appStatus={this.state.appStatus}
              vote={this.vote}
            />
          </div>
        : null}
        {this.state.signInModal ?
          <div>
            <SignInModal
              signInModalForm={this.state.signInModalForm}
              signInValidation={this.state.signInValidation}
              signInEmailChange={this.signInEmailChange}
              signInPasswordChange={this.signInPasswordChange}
              signInSubmit={this.signInSubmit}
              signInModalToggle={this.signInModalToggle}
              signInFormEnterPress={this.signInFormEnterPress}
              signInToCreateAccount={this.signInToCreateAccount}
            />
          </div>
        : null}
        {this.state.createAccountModal ?
          <div>
            <CreateAccountModal
              createAccountModalForm={this.state.createAccountModalForm}
              createAccountValidation={this.state.createAccountValidation}
              createAccountEmailChange={this.createAccountEmailChange}
              createAccountUsernameChange={this.createAccountUsernameChange}
              createAccountPasswordChange={this.createAccountPasswordChange}
              createAccountSubmit={this.createAccountSubmit}
              createAccountModalToggle={this.createAccountModalToggle}
              createAccountFormEnterPress={this.createAccountFormEnterPress}
              createAccountToSignIn={this.createAccountToSignIn}
            />
          </div>
        : null}
        {this.state.signInSuccess ?
          <div><SignInSuccess toggleSignInSuccess={this.toggleSignInSuccess}/></div>
        : null}
        {this.state.createAccountSuccess ?
          <div><CreateAccountSuccess toggleCreateAccountSuccess={this.toggleCreateAccountSuccess}/></div>
        : null}
        {this.state.signOutSuccess ?
          <div><SignOutSuccess toggleSignOutSuccess={this.toggleSignOutSuccess}/></div>
        : null}
      </div>
    );
  }
};

export default App
