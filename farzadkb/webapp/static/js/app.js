/**
 * This module declears the Application object 'App'
 */

'use strict'

function App() {
  this._progName = "Contacts WebApp v1.0";
  this._id = null;
  this._username = null;
  this._firstname = null;
  this._family = null;
  this._phone = null;
  this._email = null;
  this._current_row = null
  this._mode = null;
}

App.prototype.alertMessage = function(title, msg) {
  $('#alert_dialog #title').html(title);
  $('#alert_dialog #msg').html(msg);
  $('#alert_dialog').modal('show');
}

App.prototype.version = function() {
  console.log(this._progName);
}

// Call server.js /api/getinfo to get server info
App.prototype.getInfo = function() {
  return $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/api/getinfo'
  });
}

// Call server.js /api/unlock_wallet to unlock default wallet
App.prototype.unlockWallet = function() {
  return $.ajax({
    type: 'POST',
    dataType: 'json',
    url: '/api/unlock_wallet'
  });
}


App.prototype.loadContacts = function(username) {
  console.assert(username != null);
  return $.ajax({
    type: 'POST',
    data: {
      username: username
    },
    dataType: 'json',
    url: '/api/load_contacts'
  });
}
 

App.prototype.updateContact = function(id, firstname, family, phone, email) {
  return $.ajax({
    type: 'POST',
    data: {
      id: id,
      firstname: firstname,
      family: family,
      phone: phone,
      email: email
    },
    dataType: 'json',
    url: '/api/update_contact'
  });
}


App.prototype.addContact = function(username, firstname, family, phone, email) {
  return $.ajax({
    type: 'POST',
    data: {
      username: username,
      firstname: firstname,
      family: family,
      phone: phone,
      email: email
    },
    dataType: 'json',
    url: '/api/add_contact'
  });
}


App.prototype.deleteContact = function(id, username) {
  return $.ajax({
    type: 'POST',
    data: {
      id: id,
      username: username
    },
    dataType: 'json',
    url: '/api/delete_contact'
  });
}


App.prototype.renderContactsCb = function(resp) {
  self = this;
  console.log(resp)

  //$('#manage_contacts_portion').transition('swing down');
  
  const tableBody = $("#contactsList_cb .mylist").find("table tbody")

  $('#contactsList').dataTable().fnClearTable();
  $('#contactsList').dataTable().fnDestroy();      

  tableBody.empty()

  var markup = '';
  for (var i = 0; i < resp.length; ++i) {
    var c = resp[i];
    //markup += '<div class="item" data-value="' + c.username + '">' + c.cname + '</div>';
    markup = 
    `<tr>
      <td data-key="name">${c.cname}</td>
      <td data-key="family">${c.cfamily}</td>
      <td data-key="phone">${c.cphone}</td>
      <td data-key="email">${c.cemail}</td>
      <td>
        <a data-id="${c.ID}" data-action="update" class="update_contact positive ui button">Update</a>
        <a data-id="${c.ID}" data-action="delete" class="delete_contact negative ui button">Delete</a>
      </td>
      
    </tr>
    `;
    tableBody.append(markup);
  }
  
  $('#contactsList').DataTable();
  $('.update_contact').click(self.onBtnUpdateContactClicked.bind(self));
  $('.delete_contact').click(self.onBtnUpdateContactClicked.bind(self));
  
  $('#input_portion #btn_inputname_submit').prop('disabled', true);
  //$('#add_new_contact').transition('swing down');
}
App.prototype.onBtnUpdateContactClicked = function(evt) {
  var self = this;
  var $row = $(evt.target).parent().parent();
  var id = $(evt.target).data("id");

  self._mode = $(evt.target).data("action");
  
  var template = $('#add_update_modal_form').html();
  // Use lodash's template compiler
  var compiler = _.template(template);
  var markup = '';

  if (self._mode == "delete") {
      $(evt.target).addClass('loading');
      self.deleteContact(id,self._username).done(function(resp) {
      self.alertMessage('Success', 'Contact deleted successfully.');
      self.renderContactsCb(resp)
      $(evt.target).removeClass('loading');
    })
    return;
  }

  if (self._mode == "update") {
    var contactsList = $('#contactsList').DataTable();
    self._current_row = contactsList.row($(evt.target).parents('tr'));
  
    self._id = id;
    self._firstname = $row.find('[data-key="name"]').text();
    self._family = $row.find('[data-key="family"]').text();
    self._phone = $row.find('[data-key="phone"]').text();
    self._email = $row.find('[data-key="email"]').text();

    // Interpolate the values using template function
    markup += compiler({
      cname: self._firstname,
      cfamily: self._family,
      cphone: self._phone,
      cemail: self._email,
      cmode: "Update"
    });    
  } else {
    markup += compiler({
      cname: null,
      cfamily: null,
      cphone: null,
      cemail: null,     
      cmode: "Add"
    });
  }
  
  $('#add_update_modal').html(markup);  
  $('#add_update_modal').modal('show');
  $('#btn_add_updatecontact_submit').click(self.onBtnUpdateContactSubmit.bind(self));
}



App.prototype.onBtnUpdateContactSubmit = function(evt) {
  var self = this;
  evt.preventDefault(); 
  
  var $form = $(evt.target).parent();
  $form.addClass('loading');

  var firstname = $('#add_update_modal input[name="firstname"]').val();
  var family = $('#add_update_modal input[name="family"]').val();
  var phone = $('#add_update_modal input[name="phone"]').val();
  var email = $('#add_update_modal input[name="email"]').val();

  if (self._mode == "update" ) {
    this.updateContact(self._id, firstname, family, phone, email ).done(function(resp) {
      console.info('Update contact AJAX call result');
      self.alertMessage('Success', 'Contact updated successfully.');
      $(evt.target).removeClass('loading');
      
      var contactsList = $('#contactsList').DataTable();
      var rData = [
        firstname,
        family,
        phone,
        email,
        `<a data-id="${self._id}" data-action="update" class="update_contact positive ui button">Update</a>
         <a data-id="${self._id}" data-action="delete" class="delete_contact negative ui button">Delete</a>`
      ];
      contactsList
        .row( self._current_row )
        .data(rData)
        .draw();
  
      $('.update_contact').click(self.onBtnUpdateContactClicked.bind(self));
      $('.delete_contact').click(self.onBtnUpdateContactClicked.bind(self));
  
    }).fail(function(xhr, error, msg) {
      console.info('error');
      console.log(error, msg);    
      debugger;
    });
  } else if (self._mode == "add") {

    this.addContact(self._username, firstname, family, phone, email ).done(function(resp) {
      
      console.info('Add contact AJAX call result');
      self.alertMessage('Success', 'Contact added successfully.');
      self.renderContactsCb(resp);
      $(evt.target).removeClass('loading');
      //$('#manage_contacts_portion').transition('swing down');
  
    }).fail(function(xhr, error, msg) {
      console.info('error');
      console.log(error, msg);    
      debugger;
    });

  } else {
    //
  }

}

App.prototype.onBtnInputNameClicked = function(evt) {
  var self = this;
  evt.preventDefault();
  if (!$('#input_portion .form').form('is valid')) {
    $('#input_portion input[name="name"]').focus();
    this.alertMessage('Error', 'Please input your account name!');
    return;
  }
  var username = $('#input_portion input[name="name"]').val();
  username = username.trim();
  self._username = username;
  if (username.length > 0) {
    $(evt.target).addClass('loading');
    self.loadContacts(username).done(function(resp) {
      self.renderContactsCb(resp)
      $(evt.target).removeClass('loading');
      $('#manage_contacts_portion').transition('swing down');
    })
    .fail(function() {
      self.alertMessage('Error', 'Make sure your username is correct!');
      $(evt.target).removeClass('loading');
    });
  }
}



App.prototype.start = function() {
  var self = this;
  self.getInfo().then(function() {
    return self.unlockWallet();
  }).done(function() {
    console.log("Connected!")
    $('#input_portion').transition('swing down');

    // Form validation rules
    $('#input_portion .form').form({
      fields: {
        name: 'empty'
      }
    });

    // Define event handlers
    $('#btn_inputname_submit').click(self.onBtnInputNameClicked.bind(self));
    $('#add_new_contact').click(self.onBtnUpdateContactClicked.bind(self));
    
  }).fail(function() {
    $('#status_portion').transition('scale')
  });
}