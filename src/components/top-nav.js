import React from 'react';

class TopNav extends React.Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Poll App</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavToggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="topNavToggler">
          <div className="navbar-nav mr-auto mt-2 mt-lg-0">
            <div className="nav-item">
              <div className="nav-link" onClick={this.props.changeAppStatus.bind(this)} data-id="home">All Polls</div>
            </div>
            <div className="nav-item">
              <div
                className="nav-link"
                data-id="creating"
                onClick={this.props.user ?
                  this.props.changeAppStatus.bind(this)
                :
                  this.props.createAccountModalToggle
                }
              >Create Poll</div>
            </div>
            <div className="nav-item">
              <div
                className="nav-link"
                data-id="myPolls"
                onClick={this.props.user ?
                  this.props.changeAppStatus.bind(this)
                :
                  this.props.createAccountModalToggle
                }
              >My Polls</div>
            </div>
            {this.props.user ?
              <div className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" id="topNavUserDropdown" data-toggle="dropdown">
                  {this.props.user.username}
                </div>
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={this.props.signUserOut}>Sign Out</div>
                </div>
              </div>
            :
              <form className="form-inline">
                <button type="button" className="btn btn-sm align-middle btn-primary mx-1 top-nav-sign-in-button" onClick={this.props.signInModalToggle}>
                  Sign In
                </button>
                <button type="button" className="btn btn-sm align-middle btn-primary mx-1 top-nav-create-account-button" onClick={this.props.createAccountModalToggle}>
                  Create Account
                </button>
              </form>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default TopNav;
