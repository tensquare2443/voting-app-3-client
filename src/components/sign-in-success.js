import React from 'react';

class SignInSuccess extends React.Component {
  render() {
    return(
      <div className="custom-modal" tabIndex="-1" role="dialog">
        <div className="custom-modal-dialog" role="document">
          <div className="custom-modal-content">
          <div className="custom-modal-header">
            <button type="button" className="close" onClick={this.props.toggleSignInSuccess}>
              <span>&times;</span>
            </button>
          </div>
            <div className="custom-modal-body d-flex justify-content-center">
              <svg fill="#19A71B" height="256" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid" width="256" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="custom-modal-footer d-flex justify-content-center">
              <h3>Signed In</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInSuccess;
