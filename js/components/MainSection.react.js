var React = require('react');

var EmailItem = require('./EmailItem.react');
var EmailActions = require('../actions/EmailActions');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var ModalItem = require('./ModalItem.react');


/**
 * Main Section of list emails
 */
var MainSection = React.createClass({


  getInitialState: function() {
    return {flag: false};
  },

  /**
   * Render view
   * @return {object}
   */
  render: function() {

    // This section should be hidden by default and shown when there are emails.
    if (Object.keys(this.props.allEmails).length < 1) {
      return null;
    }

    var allEmails = this.props.allEmails,
    emails = [],
    modals = [];

    for (var key in allEmails) {
      emails.push(<EmailItem key={allEmails[key].id} email={allEmails[key]} />);
      modals.push(<ModalItem key={allEmails[key].id} email={allEmails[key]} />);
    }

    var caret;
    caret = <i className="fa fa-caret-down"></i>;
    if(this.state.flag){
      caret = <i className="fa fa-caret-down"></i>;
    }else{
      caret = <i className="fa fa-caret-up"></i>;
    }

    return (
      <div>
      <article id="studentsList">
        <div id="tableBar">
          <ul>
            <li>
              <input type="checkbox" id="selectAll" name="selector" />
              <label htmlFor="selectAll"></label>
              <div className="check"></div>
            </li>
          </ul>
          <p id="nameTitle"><a onClick={this._orderBy}>Nom 
              {caret}
          </a></p>
          <p>Action</p>
        </div>
        <nav id="students" className="listUsers">
            <ul>
              <ReactCSSTransitionGroup transitionName="email">
                {emails}
              </ReactCSSTransitionGroup>
            </ul>
        </nav>
      </article>
      {modals}

    </div>
    );
  },

  _orderBy: function() {
    EmailActions.order(this.state.flag);
    this.state.flag = !this.state.flag;
  },

});

module.exports = MainSection;
