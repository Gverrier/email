var React = require('react');
var EmailActions = require('../actions/EmailActions');


/**
 * Email Item
 */
var ModalItem = React.createClass({

  /**
   * Init the modal
   */
  getInitialState: function() {
    var email = this.props.email;


    if(!email){
        email = {
          id: 'new',
          nom: null,
          prenom: null,
          email: null,
          avatar: null,
        };

      }

   return {email: email};
  },


  /**
   * Render view
   */
  render: function() {

    var avatar;

    return(
        <form  onSubmit={this._onSubmit}>
              <div className="modal fade" id={"edit"+ this.state.email.id}  tabIndex="-1" role="dialog" >
                    <div className="modal-dialog modal-lg" role="document">
                          <div className="modal-content">
                              <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel"> {this.state.email.nom} {this.state.email.prenom}</h4>
                              </div>
                              <div className="modal-body">
                                    <div className="row">
                                      <div className="col-xs-12 col-sm-12 col-md-6">
                                            <div className="form-group">
                                              <div className="row">
                                                  <div className="col-xs-12 col-sm-12 col-md-3">
                                                    <label>Nom :</label>
                                                  </div>
                                                  <div className="col-xs-12 col-sm-12 col-md-8">
                                                    <input defaultValue={this.state.email.nom}  ref='nom' type="text" className="form-control" required placeholder="Nom"/>
                                                  </div>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                  <div className="col-xs-12 col-sm-12 col-md-3">
                                                    <label>Prenom :</label>
                                                  </div>
                                                  <div className="col-xs-12 col-sm-12 col-md-8">
                                                    <input defaultValue={this.state.email.prenom} ref='prenom' type="text" className="form-control" required placeholder="Prénom" />
                                                  </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                  <div className="col-xs-12 col-sm-12 col-md-3">
                                                      <label>E-mail :</label>
                                                  </div>
                                                  <div className="col-xs-12 col-sm-12 col-md-8">
                                                      <input defaultValue={this.state.email.email}  ref='email' type="email" className="form-control" required placeholder="Email"/>
                                                  </div>
                                                </div>
                                            </div>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-6">
                                        <div className="form-group">
                                            <div className="row">
                                              <div className="col-xs-12 col-sm-12 col-md-3">
                                                  <label>Avatar :</label>
                                              </div>
                                              <div className="col-xs-12 col-sm-12 col-md-8">
                                                  <input defaultValue={this.state.email.avatar}  ref='avatar' type="url" className="form-control" required placeholder="http://monimage.jpg"/>
                                              </div>
                                              <div className="col-xs-12 col-sm-12 col-md-offset-4 col-md-8">
                                                  <img className="img-responsive" src={this.state.email.avatar} />
                                              </div>

                                            </div>
                                        </div>

                                      </div>
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="actionBtn cancelBtn" data-dismiss="modal"><i className="fa fa-times"></i> Annuler</button>
                                  <button onClick={this._onSubmit} type="button" data-dismiss="modal" className="actionBtn"><i className="fa fa-floppy-o"></i> Enregistrer</button>
                              </div>
                          </div>
                </div>
          </div>

        </form>

    );
  },


  _onSubmit: function(e) {
    var nomNode = this.refs.nom.getDOMNode();
    var prenomNode = this.refs.prenom.getDOMNode();
    var emailNode = this.refs.email.getDOMNode();
    var avatarNode = this.refs.avatar.getDOMNode();

    var nom = nomNode.value.trim();
    var prenom = prenomNode.value.trim();
    var mail = emailNode.value.trim();
    var avatar = avatarNode.value.trim();


    var datas = {
      nom: nom,
      prenom: prenom,
      email: mail,
      avatar: avatar,
    };

    if(this.state.email.id == "new"){
      EmailActions.create(datas);
    }else{
      EmailActions.update(this.state.email.id, datas);
    }

  },


});

module.exports = ModalItem;
