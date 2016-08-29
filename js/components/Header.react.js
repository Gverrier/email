var React = require('react');
var EmailActions = require('../actions/EmailActions');




var Header = React.createClass({

  /**
   * Render view
   */
  render: function() {

    return (

			<article id="actionsButtons">
				<div className="actions">
					<button  onClick={this._onDestroyBatch} className="actionBtn"><i className="fa fa-trash-o"></i>Supprimer</button>
					<button onClick={this._onActiveBatch} className="actionBtn"><i className="fa fa-paper-plane-o"></i>Renvoyer l'invitation</button>
					<button className="actionBtn notallowedBtn"><i className="fa fa-plus"></i>Inviter des collègues</button>
					<button className="actionBtn" type="button" data-toggle="modal" data-target="#editnew"><i className="fa fa-plus"></i>Ajouter des élèves</button>
				</div>
			</article>
    );
  },



_onDestroyBatch: function() {
  EmailActions.destroyBatch();
},


_onActiveBatch: function() {
  EmailActions.activeBatch();
},


});

module.exports = Header;
