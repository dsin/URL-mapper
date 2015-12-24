var URLmappingForm = {
  currentURL : function(currentURL){
    if(currentURL)
        document.getElementById('currentURL').value = currentURL;
    return document.getElementById('currentURL').value;
  },
  redirectURL : function(redirectURL){
    if(redirectURL)
        document.getElementById('redirectURL').value = redirectURL;
    return document.getElementById('redirectURL').value;
  },
  clear : function(){
    this.currentURL('');
    this.redirectURL('');
  },
  validate : function(){
    var messages = [];

    var o = check_required(this.currentURL(), 'currentURL');
    if(o.status == 'error')
        messages.push(o.errormessage);

    var o = check_required(this.redirectURL(), 'redirectURL');
    if(o.status == 'error')
        messages.push(o.errormessage);

    if(messages.length){
        return {'status': 'error', 'messages': messages};
    } else {
        return {'status': 'ok'};
    }
  }
}

check_required = function(field, id){
  if (!field) {
    return {'status': 'error', 'errormessage': 'Error: No value specified for '+id};
  } else {
    return {'status': 'ok'};
  }
}
