var goi = goi || {};

goi.isValidID = function(id) {
  var re = /^[0-9A-Fa-f]{40}$/g;
  return re.test(id);
};

goi.alertInvalidID = function(id, objName) {
  var errorMsg = $('#error-msg');

  // Hide edit form.
  goi.hideGoiEdit(objName);

  errorMsg.html('Invalid Git Object ID: ' + id + '<br>(40-character hexadecimal)');
  errorMsg.addClass('displayed');
  window.setTimeout(function() {
    errorMsg.fadeOut(1000, function() {
      errorMsg.removeClass('displayed');
      errorMsg.css('display', '');
      errorMsg.css('opacity', '');
      goi.displayGoiEdit(objName);
    });
  }, 1000);
};

goi.alertIDSet = function(objName) {
  var infoMsg = $('#info-msg');
  infoMsg.text('Git Object ID set for: ' + objName);
  infoMsg.addClass('displayed');
  window.setTimeout(function() {
    infoMsg.fadeOut(1000, function() {
      infoMsg.removeClass('displayed');
      infoMsg.css('display', '');
      infoMsg.css('opacity', '');
    });
  }, 1000);
};

goi.displayGoiEdit = function(objName, clear=false) {
  var editForm = $('#' + objName + '-edit');
  editForm.addClass('goi-edit-displayed');
  var input = editForm.find('input');
  input.focus();
  if (clear) input.val('');
};

goi.hideGoiEdit = function(objName) {
  $('#' + objName + '-edit').removeClass('goi-edit-displayed');
};

goi.editGoi = function(id, objName) {
  if (!goi.isValidID(id)) {
    goi.alertInvalidID(id, objName);
    return;
  }
  goi.gitObjs[objName].id = id;
  $('span.' + objName).text(id);
  $('span.' + objName + '-short').text(id.substring(0, 7));

  goi.hideGoiEdit(objName);
  goi.alertIDSet(objName);
};

$(document).ready(function() {
  goi.gitObjs = [];
  var objNames =
      ['first-commit', 'second-commit', 'third-commit',
       'to-lose-commit', 'detached-commit',
       'first-tree', 'second-tree', 'folder-A-tree', 'folder-B-tree', 'file-B-blob'];

  // Create commit representational objects and their event handlers.
  for (var i = 0; i < objNames.length; i++) {
    var objName = objNames[i];

    // Create the Git objects representation.
    goi.gitObjs[objName] = {
      id: $('span.' + objName + ':first').text()
    };

    // Display edit form when a Git Object ID is clicked.
    var objElem = $('span.' + objName + ', span.' + objName + '-short');
    objElem.click((function(objName) {
      return function() {
        // Start with field cleared.
        goi.displayGoiEdit(objName, true);
      };
    })(objName));

    // Attach event handler for input field.
    var input = $('#' + objName + '-edit input');
    input.on('keyup', (function(objName) {
      return function(e) {
        if (e.keyCode == 27) {
          goi.hideGoiEdit(objName);
        }
        if (e.keyCode != 13) return;
        goi.editGoi(this.value, objName);
      };
    })(objName));
  }
});
