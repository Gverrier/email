
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EmailConstants = require('../constants/EmailConstants'); //with Constants Actions

var selected = [];


/**
 * Flux: All Actions centralized of User
 */
var EmailActions = {



  /**
   * Select email item
   */
  order: function(sens) {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_ORDER,
      sens : sens
    });
  },


  /**
   * Select email item
   */
  selected: function(id) {
    if(selected.indexOf(id) === -1){
      selected.push(id);
    }else{
      selected.splice(selected.indexOf(id),1);
    }
  },


  /**
   * Create an email
   * @param  {email} email
   * Create an email from object
   */
  create: function(email) {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_CREATE,
      email: email
    });
  },

  /**
   * Update an email text
   * @param  {string} id The ID of the Email item
   * @param  {object} email
   */
  update: function(id, email) {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_UPDATE,
      id: id,
      email: email
    });
  },



  /**
   * Active in batch of email
   */
  activeBatch: function() {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_CONFIRM_BATCH,
      selected: selected
    });
  },


/**
 * Toggle whether a single email is confirmed
 * @param  {object} email
 */
toggleConfirmed: function(email) {
  var actionType = email.confirmed ? EmailConstants.EMAIL_UNDO_CONFIRM : EmailConstants.EMAIL_CONFIRM;

  AppDispatcher.dispatch({
    actionType: actionType,
    id: email.id
  });
},


  /**
   * Remove an batch Batch
   * @param  {string} text
   */
  destroyBatch: function() {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_DESTROY_BATCH,
      selected: selected
    });
    selected = []; //empty all selected
  },




  /**
   * Remove an email
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: EmailConstants.EMAIL_DESTROY,
      id: id
    });
  },

};


module.exports = EmailActions;
