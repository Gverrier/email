var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EmailConstants = require('../constants/EmailConstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _emails;



/**
 * Create a Email item.
 * @param  {email}  The datas of the Email
 */
function create(datas) {
  id = _emails.length + 1;
  _emails.push({
    id: id,
    confirmed: false,
    email: datas.email,
    nom: datas.nom,
    prenom: datas.prenom,
    avatar: datas.avatar,
  });
}

/**
 * Update a Email item.
 * @param  {string} id
 * @param {object} The datas of the email updated
 */
function update(id, update) {
  _.extend(_.findWhere(_emails, { id: id }), update);
}

/**
 * Get an email
 */
function getOne(id) {
  return  _.find(_emails,function(email){
    return email.id = id;
  });
}

/*
 * Delete a email
 */
function destroy(id) {
  _emails = _.without(_emails, _.findWhere(_emails, { id: id }));
}

/**
 * Delete batch emails
 */
function removeBatch(selected) {
  _emails = _.reject(_emails, function(elt){
    return selected.indexOf(elt.id) !== -1;
  });
}

/**
 * Confirm Batch email
 */
function confirmBatch(selected) {
  _.each(selected,function(id){
      confirm(id, true);
  });
}

/**
 * Confirm email
 */
function confirm(id, bool) {
  var a = _.findWhere(_emails,{id: id});
  a.confirmed = bool;
}


/**
 * Events
 * Emails store Event Emitter
 */
var EmailStore = assign({}, EventEmitter.prototype, {

    /**
     * Set emails
     */
    loadDatas: function(datas) {
      _emails = datas;
    },

    /**
     * Get emails
     */
    getAll: function() {
      return _emails;
    },


    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },


    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

});






/**
 *  Register callback to handle all updates
 */
AppDispatcher.register(function(action) {

  switch(action.actionType) {

    case EmailConstants.EMAIL_CREATE:
      if (action.email.email.trim() !== '') {
        create(action.email);
        EmailStore.emitChange();
      }
      break;

    case EmailConstants.EMAIL_CONFIRM_BATCH:
      confirmBatch(action.selected);
      EmailStore.emitChange();
      break;

    case EmailConstants.EMAIL_CONFIRM:
        confirm(action.id, true);
        EmailStore.emitChange();
      break;

    case EmailConstants.EMAIL_UNDO_CONFIRM:
        confirm(action.id, false);
        EmailStore.emitChange();
      break;

    case EmailConstants.EMAIL_DESTROY_BATCH:
      removeBatch(action.selected);
      EmailStore.emitChange();
      break;

    case EmailConstants.EMAIL_DESTROY:
      destroy(action.id);
      EmailStore.emitChange();
      break;

    case EmailConstants.EMAIL_UPDATE:
      update(action.id, action.email);
      EmailStore.emitChange();
      break;
    default:
  }
});



module.exports = EmailStore;
