var React = require('react');
var classNames = require('classnames');
var EmailActions = require('../actions/EmailActions');



/**
 * Email Item
 */
var EmailItem = React.createClass({

  /**
   *  Render view
   */
  render: function() {
    var email = this.props.email;

    var status;
    var profil;

    if(email.confirmed){
      status = <p className="status"><i className="fa fa-briefcase"></i> <span>Elève</span></p>;
      profil =  `${email.nom} ${email.prenom}`;
      buttonStatus = <p ><i className="fa fa-check"></i><span>Activer</span></p>;
    }else{
      status = <p className="status"><span>En attente de confirmation</span></p>;
      profil =  email.email;
      buttonStatus = <p><i className="fa fa-paper-plane-o"></i><span>Réinviter</span></p>;
    }

    return (
      <li
        className={classNames({
                  'confirmed': email.confirmed
                })}
        key={email.id}>

        <div className="checkUser">
          <input   onChange={this._onSelected} type="checkbox" id={"select"+ email.id} className="selectedUser" name="selector" />
          <label htmlFor={"select"+ email.id}></label>
          <div className="check"></div>
        </div>
        <img className="avatar" src={email.avatar} width="36px" height="36px"/>
        <div className="profil">
            <p className="name"><span className="firstName">{profil}</span></p>
              {status}
        </div>

        <div className="btn-group">
          <button type="button" data-toggle="modal" data-target={"#edit"+ email.id} className="btn btnUser"><p><i className="fa fa-pencil"></i><span>Modifier</span></p></button>
          <button onClick={this._onDestroyClick} className="btn btnUser deleteUser"><p><i className="fa fa-trash-o"></i><span>Supprimer</span></p></button>
          <button onClick={this._onConfirmedClick} className="btn btnUser">{buttonStatus}</button>
        </div>
      </li>



    );
  },


  _onSelected: function() {
    EmailActions.selected(this.props.email.id);
  },

  _onDestroyClick: function() {
    EmailActions.destroy(this.props.email.id);
  },

  _onUpdateClick: function() {
    EmailActions.update(this.props.email);
  },

  _onConfirmedClick: function() {
    EmailActions.toggleConfirmed(this.props.email);
  },



});

module.exports = EmailItem;
