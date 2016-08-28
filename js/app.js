/**
 * Laucnh the app...
 */

var React = require('react');

// Main Component
var EmailApp = require('./components/EmailApp.react');


// Launch render app...
React.render(
  <EmailApp />,
  document.getElementById('mailapp')
);
