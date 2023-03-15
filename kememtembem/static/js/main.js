var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    // for (var key in data) {
    //     query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    // }
    query.push(encodeURIComponent('text') + '=' + encodeURIComponent(data))
    ajax.send(url, callback, 'POST', query.join('&'), async)
};

function typeMessage(type, event) {
  var message      = '';
  var messageArray = [];

  if (event != 'loading' && event != 'done') {
    return 'Process...';
  }

  if (event == 'done') {
    messageArray = ['Created!', 'Updated!', 'Deleted!', 'Processed!'];
  }

  if (event == 'loading') {
    messageArray = ['Inserting the data...', 'Updating the data...', 'Deleting the data...', 'Processing the data...'];
  }

  switch (type) {
    case 'create':
      message = messageArray[0];
      break;
    case 'update':
      message = messageArray[1];
      break;
    case 'delete':
      message = messageArray[2];
      break;
    default:
      message = messageArray[3];
      break;
  }

  return message;
}

function loading(flag) {
  var message;

  message = typeMessage(flag, 'loading');

  Swal.fire({
      title: 'Please wait!',
      html: message,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
  });
}

function done(flag, data_id = "", data_value = "", data_length = 0) {
  var message;
  var setTimer;
  
  switch (flag) {
    case 'create':
        setTimer = 5000;
        break;
    default:
        setTimer = 2000;
        break;
  }

  message = typeMessage(flag, 'done');

  Swal.fire({
    title: message,
    icon: 'success',
    showConfirmButton: false,
    timer: setTimer
  }).then(() => {
      Swal.close();
      if (flag == 'create') {
            get();
      } else if (flag == 'delete') {
          document.querySelector('[data-id="'+data_id+'"]').closest('.input-group').remove();
          if (data_length == 1) {
              document.querySelector('.wrapper').innerHTML = '<p class="text-center mt-4">No data available</p>';
          }
      } else if (flag == 'update') {
            document.querySelector('[data-id="'+data_id+'"]').closest('input').value = data_value;
      }
  });
}

function log(msg) {
    document.querySelectorAll('code')[0].innerHTML         = msg;
    document.querySelectorAll('.log')[0].style.display     = '';
}

function checkValidJson(jsonData) {
    try {
        JSON.parse(jsonData);
        return true;
    } catch(error) {
        return false;
    }
}

function get() {
    ajax.get('/get', '', function(response) {
        if(response) {
        var wrapper       = document.querySelector('.wrapper');
        wrapper.innerHTML = response;

        var btnUpdate = document.querySelectorAll('.update');
        var btnDelete = document.querySelectorAll('.delete');

        // update
        if (btnUpdate.length != 0) {
            for (var i = 0; i < btnUpdate.length; i++) {
                btnUpdate[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var inputGroup = (this).closest('.input-group');
                    var dataUpdate = inputGroup.querySelector('.todo-text').value;
                    var dataId = inputGroup.querySelector(".todo-text").dataset.id;
                    loading('update');
                    ajax.post('edit/'+dataId, dataUpdate, function(responseText) {
                        var validJson = checkValidJson(responseText);
                        if (validJson) {
                            if (responseText) {
                                log(responseText);
                                done('update', dataId, dataUpdate);
                            }
                        }
                        else {
                            Swal.fire({
                                title: 'Error',
                                message: responseText,
                                icon: 'error'
                            })
                        }
                    })
                })
            }
        }

        // delete
        if (btnDelete.length != 0) {
            for (var i = 0; i < btnDelete.length; i++) {
                btnDelete[i].addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var deleteId = this.dataset.target;
                loading('delete');
                ajax.post('delete/'+deleteId, '', function(responseText) {
                    var validJson = checkValidJson(responseText);
                    if (validJson) {
                        if (responseText) {
                            log(responseText);
                            done('delete', deleteId, '', document.querySelectorAll('.delete').length);
                        }
                    }
                    else {
                        Swal.fire({
                            title: 'Error',
                            message: responseText,
                            icon: 'error'
                        })
                    }
                })
                })
            }
        }

        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var btnCreate = document.querySelector('.btn-create');

    // create
    btnCreate.addEventListener('click', function(e) {
        var inputGroupCreate = (this).closest('.input-group');
        var dataCreate       = inputGroupCreate.querySelector('.create').value;
        loading('create');
        ajax.post('create', dataCreate, function(responseText) {
            if (responseText) {
                log(responseText); 
                done('create');
                document.querySelector('.btn-create').disabled = false;
                inputGroupCreate.querySelector('.create').value = '';
            }
        });
    })

    get();
});