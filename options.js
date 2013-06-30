function save() {
  var messages = URLmappingForm.validate()  
  if(messages.length()){
    messages.show()
    messages.clear()
    return
  }

  chrome.storage.sync.get('URLmapping', function(items){
    var URLmapping = items['URLmapping']
    if(!URLmapping)
      URLmapping = {}
    URLmapping[URLmappingForm.currentURL.value] = URLmappingForm.redirectURL.value
    chrome.storage.sync.set({'URLmapping': URLmapping}, function() {
      list()
      URLmappingForm.clear()
    });
  })
}

function getThis(){
  var e = window.event
  e = e.target || e.srcElement
  return e
}

function edit(){
  var currentURL = getThis().id.substring(5, getThis().id.length)
  chrome.storage.sync.get('URLmapping', function(items){
    // copy up
    URLmappingForm.currentURL.value = currentURL
    URLmappingForm.redirectURL.value = items['URLmapping'][currentURL]
  })
}

function remove(){
  var currentURL = getThis().id.substring(7, getThis().id.length)
  chrome.storage.sync.get('URLmapping', function(items){
    var URLmapping = items['URLmapping']
    delete URLmapping[currentURL]
    chrome.storage.sync.set({'URLmapping': URLmapping}, function() {})    
    list()
  })
}

function getEditButtonId(currentURL){
  return 'edit-'+escapeHtmlEntities(currentURL)
}

function getRemoveButtonId(currentURL){
  return 'remove-'+escapeHtmlEntities(currentURL)
}

function list(){
  chrome.storage.sync.get('URLmapping', function(items){
    var URLmapping = items['URLmapping']
    // addList
    var str = ''
    for (var k in URLmapping){
      var editButtonId = getEditButtonId(k)
      var removeButtonId = getRemoveButtonId(k)
       str += '<tr><td><input type="button" name="edit" value="edit" id="'+editButtonId+'"/><input type="button" name="delete" value="delete" id="'+removeButtonId+'"/></td><td>'+k+'</td><td>'+URLmapping[k]+'</td></tr>'
    }
    if(str){
      document.getElementById('tableArea').innerHTML = '<table>'+
  '<th></th>'+
  '<th>URL</th>'+
  '<th>redirectTo</th>'+str+
  '</table>'
    } else {
      document.getElementById('tableArea').innerHTML = ''
    }
    // addEventListener
    for (var k in URLmapping){
      var editButtonId = getEditButtonId(k)
      var removeButtonId = getRemoveButtonId(k)

      document.getElementById(editButtonId).onclick = edit
      document.getElementById(removeButtonId).onclick = remove
    }
  })
}

window.onload = function(){
  document.querySelector('#save').addEventListener('click', save)

  list();
}
