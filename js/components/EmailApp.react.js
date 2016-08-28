var React = require('react');
var MainSection = require('./MainSection.react');
var Header = require('./Header.react');
var ModalItem = require('./ModalItem.react');
var EmailStore = require('../stores/EmailStore');



/**
 * Retrieve the current emails from EmailStore synchronize....
 * This function called on each state of change
 */
function getEmailState() {
  return {
    allEmails: EmailStore.getAll()
  };
}




/**
 * Email app
 */
var EmailApp = React.createClass({

  // FireBase
  urlJson:  './datas/emails.json',


	/**
	 * Initialize empty datas on load app
	 */
	getInitialState: function() {
    return {
      allEmails: []
    };
	},

  /**
   * Listen when component is mounted
   * Loading from XHR
   */
  componentDidMount: function() {
    this.serverRequest = $.get(this.urlJson, function (result) {
      this.setState({
        allEmails: result,
      });
      EmailStore.loadDatas(result); // fire datas receive on EmailStore model
    }.bind(this));

    EmailStore.addChangeListener(this._onChange);
  },



  /**
   * Listen when mount is unmounted, stop propagation of events
   */
  componentWillUnmount: function() {
    EmailStore.removeChangeListener(this._onChange);
  },


  /**
   * Event handler for 'change' events coming from the EmailStore
   * and MAJ views by state of emails
   */
  _onChange: function() {
    this.setState(getEmailState());
  },

	/**
   * Render view
   */
  render: function() {
    return (
      <div>
        <Header />
				<MainSection  allEmails={this.state.allEmails} />
        <ModalItem />
      </div>
    );
  },


});



module.exports = EmailApp;
