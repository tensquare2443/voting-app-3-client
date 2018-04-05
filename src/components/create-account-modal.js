import React from 'react';

class CreateAccountModal extends React.Component {
  render() {
    var emailInputClass = `form-control email create-account-email-input${this.props.createAccountValidation.email.state}`;
    var usernameInputClass = `form-control username create-account-username-input${this.props.createAccountValidation.username.state}`;
    var passwordInputClass = `form-control password create-account-password-input${this.props.createAccountValidation.password.state}`;
    return(
      <div className="custom-modal create-account-custom-modal" id="createAccountModal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Create Account</h5>
              <button type="button" className="close create-account-custom-modal-close" onClick={this.props.createAccountModalToggle}>
                <span>&times;</span>
              </button>
            </div>
            <div className="custom-modal-body create-account-custom-modal-body">
            <form className="create-account-form">
              <div className="form-group">
                <label htmlFor="createAccountEmail1">Email address</label>
                <input
                  type="email"
                  className={emailInputClass}
                  id="createAccountEmail1"
                  placeholder="Enter email"
                  value={this.props.createAccountModalForm.email}
                  onChange={this.props.createAccountEmailChange}
                  onKeyPress={this.props.createAccountFormEnterPress.bind(this)}
                />
                <div className="invalid-feedback create-account-email-feedback">{this.props.createAccountValidation.email.feedback}</div>
              </div>
              <div className="form-group">
                <label htmlFor="createAccountUsername1">Username</label>
                <input
                  type="text"
                  className={usernameInputClass}
                  id="createAccountUsername1"
                  placeholder="Enter username"
                  value={this.props.createAccountModalForm.username}
                  onChange={this.props.createAccountUsernameChange}
                  onKeyPress={this.props.createAccountFormEnterPress.bind(this)}
                />
                <div className="invalid-feedback create-account-username-feedback">{this.props.createAccountValidation.username.feedback}</div>
              </div>
              <div className="form-group">
                <label htmlFor="createAccountPassword1">Password</label>
                <input
                  type="password"
                  className={passwordInputClass}
                  id="createAccountPassword1"
                  placeholder="Password"
                  value={this.props.createAccountModalForm.password}
                  onChange={this.props.createAccountPasswordChange}
                  onKeyPress={this.props.createAccountFormEnterPress.bind(this)}
                />
                <div className="invalid-feedback create-account-password-feedback">{this.props.createAccountValidation.password.feedback}</div>
              </div>
              <div className="d-flex flex-wrap">
                <div className="d-flex align-items-center">
                  <button type="button" className="btn btn-sm btn-primary mx-1" onClick={this.props.createAccountSubmit.bind(this)}>Create</button>
                </div>
                <div className="d-flex">
                  <div className="create-account-submit-check" style={{display: "none"}}>
                    <svg className="ml-1" fill="#1AAC1D" height="36" viewBox="0 0 24 24" width="36">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="create-account-submit-msg" style={{display: "none"}}>
                    <div className="mx-1">Account Created.</div>
                  </div>
                </div>
              </div>
            </form>
            </div>
            <div className="custom-modal-footer">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.props.createAccountToSignIn}>Sign In Instead</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.props.createAccountModalToggle}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccountModal;
