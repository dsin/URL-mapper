var optionsPage = {
     save : function() {
      var messages = URLmappingForm.validate();  
      if(messages.length){
        messages.show();
        messages.clear();
        return
      }

      chrome.storage.sync.get('URLmapping', function(items){
        var URLmapping = items['URLmapping'];
        if(!URLmapping)
          URLmapping = {};
        URLmapping[URLmappingForm.currentURL()] = URLmappingForm.redirectURL();
        chrome.storage.sync.set({'URLmapping': URLmapping}, function() {
          optionsPage.list();
          URLmappingForm.clear();
        });
      });
    },

    getThisId : function(){
      var e = window.event;
      e = e.target || e.srcElement;
      return e.id;
    },

    edit : function(){
      var currentURL = optionsPage.getThisId().substring(5, optionsPage.getThisId().length);
      chrome.storage.sync.get('URLmapping', function(items){
        var URLmapping = items['URLmapping'];
        // copy up
        URLmappingForm.currentURL(currentURL);
        URLmappingForm.redirectURL(URLmapping[currentURL]);
      })
    },

    remove : function(){
      var currentURL = optionsPage.getThisId().substring(7, optionsPage.getThisId().length);
      chrome.storage.sync.get('URLmapping', function(items){
        var URLmapping = items['URLmapping'];
        delete URLmapping[currentURL];
        chrome.storage.sync.set({'URLmapping': URLmapping}, function() {});  
        optionsPage.list();
      })
    },

    getEditButtonId: function(currentURL){
      return 'edit-'+escapeHtmlEntities(currentURL)
    },

    getRemoveButtonId : function(currentURL){
      return 'remove-'+escapeHtmlEntities(currentURL)
    },

 

    generateTable : function(URLmapping){
        var str = '';
        for (var k in URLmapping){
          var editButtonId = optionsPage.getEditButtonId(k);
          var removeButtonId = optionsPage.getRemoveButtonId(k);
           str += '<tr>'+
                      '<td><input type="button" name="edit" value="edit" id="'+editButtonId+'"/>'+
                           '<input type="button" name="delete" value="delete" id="'+removeButtonId+'"/></td>'+
                      '<td>'+k+'</td>'+
                      '<td>'+URLmapping[k]+'</td>'+
                      '</tr>';
        }
        if(str){
            str = '<table>'+
                  '<th></th>'+
                  '<th>URL</th>'+
                  '<th>redirectTo</th>'+str+
                  '</table>';
        }
        return str;
    },
   list : function(){
      chrome.storage.sync.get('URLmapping', function(items){
        var URLmapping = items['URLmapping']
        // generate HTML
        document.getElementById('tableArea').innerHTML = optionsPage.generateTable(URLmapping);
        // addEventListener
        for (var k in URLmapping){
          var editButtonId = optionsPage.getEditButtonId(k)
          var removeButtonId = optionsPage.getRemoveButtonId(k)

          document.getElementById(editButtonId).onclick = optionsPage.edit;
          document.getElementById(removeButtonId).onclick = optionsPage.remove;
        }
      })
    }
}

window.onload = function(){
  document.querySelector('#save').addEventListener('click', optionsPage.save);

  optionsPage.list();
}
