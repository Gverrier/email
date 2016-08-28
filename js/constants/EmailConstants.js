var keyMirror = require('keymirror');

/**
 * All actions constants
 * @param  {[type]} {                                  EMAIL_SELECTED: null [description]
 * @param  {[type]} EMAIL_CREATE:        null          [description]
 * @param  {[type]} EMAIL_CONFIRM:       null          [description]
 * @param  {[type]} EMAIL_CONFIRM_BATCH: null          [description]
 * @param  {[type]} EMAIL_UNDO_CONFIRM:  null          [description]
 * @param  {[type]} EMAIL_DESTROY:       null          [description]
 * @param  {[type]} EMAIL_DESTROY_BATCH: null          [description]
 * @param  {[type]} EMAIL_UPDATE:        null}         [description]
 * @return {[type]}                      [description]
 */
module.exports = keyMirror({
  EMAIL_SELECTED: null,
  EMAIL_CREATE: null,
  EMAIL_CONFIRM: null,
  EMAIL_CONFIRM_BATCH: null,
  EMAIL_UNDO_CONFIRM: null,
  EMAIL_DESTROY: null,
  EMAIL_DESTROY_BATCH: null,
  EMAIL_UPDATE: null
});
