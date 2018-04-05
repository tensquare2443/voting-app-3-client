import React from 'react';

class SignInModal extends React.Component {
  render() {
    var emailInputClass = `form-control email sign-in-email-input${this.props.signInValidation.email}`;
    var passwordInputClass = `form-control password sign-in-password-input${this.props.signInValidation.password}`;
    return(
      <div className="custom-modal sign-in-custom-modal" id="signInModal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
            <div className="custom-modal-header">
              <h5 className="custom-modal-title">Sign In</h5>
              <button type="button" className="close sign-in-custom-modal-close" onClick={this.props.signInModalToggle}>
                <span>&times;</span>
              </button>
            </div>
            <div className="custom-modal-body sign-in-custom-modal-body">
              <form className="sign-in-form">
                <div className="form-group">
                  <label htmlFor="signInEmail1">Email address</label>
                  <input
                    type="text"
                    className={emailInputClass}
                    id="signInEmail1"
                    placeholder="Enter email"
                    value={this.props.signInModalForm.email}
                    onChange={this.props.signInEmailChange}
                    onKeyPress={this.props.signInFormEnterPress}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="signInPassword1">Password</label>
                  <input
                  type="password"
                  className={passwordInputClass}
                  id="signInPassword1"
                  placeholder="Password"
                  value={this.props.signInModalForm.password}
                  onChange={this.props.signInPasswordChange}
                  onKeyPress={this.props.signInFormEnterPress}
                  />
                  <div className="invalid-feedback sign-in-password-feedback">{this.props.signInValidation.feedback}</div>
                </div>
                <div className="d-flex flex-wrap">
                  <div className="d-flex align-items-center">
                    <button type="button" className="btn btn-sm btn-primary mx-1" onClick={this.props.signInSubmit.bind(this)}>Sign In</button>
                  </div>
                  <div className="d-flex">
                    <div className="sign-in-submit-check" style={{display: "none"}}>
                      <svg className="ml-1" fill="#1AAC1D" height="36" viewBox="0 0 24 24" width="36">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="sign-in-submit-msg" style={{display: "none"}}>
                      <div className="mx-1">Signed In.</div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="custom-modal-footer">
              <button type="button" className="btn btn-sm btn-primary" onClick={this.props.signInToCreateAccount}>Create Account Instead</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.props.signInModalToggle}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInModal;
