var URLmappingForm = (function () {
  function checkRequired(field, id){
    if (!field) {
      return {'status': 'error', 'errormessage': `Error: No value specified for ${id}`};
    } else {
      return {'status': 'ok'};
    }
  }

  function currentURL(currentURL){
    if(currentURL)
      $('#currentURL').val(currentURL);
    return $('#currentURL').val();
  }

  function redirectURL(redirectURL){
    if(redirectURL)
      $('#redirectURL').val(redirectURL);
    return $('#redirectURL').val();
  }

  function clear(){
    this.currentURL('');
    this.redirectURL('');
  }

  function validate(){
    var messages = [];

    var o = checkRequired(this.currentURL(), 'currentURL');
    if(o.status == 'error')
      messages.push(o.errormessage);

    var o = checkRequired(this.redirectURL(), 'redirectURL');
    if(o.status == 'error')
      messages.push(o.errormessage);

    if(messages.length){
        return {'status': 'error', 'messages': messages};
    } else {
        return {'status': 'ok'};
    }
  }
  return {
    currentURL: currentURL,
    redirectURL: redirectURL,
    clear: clear,
    validate: validate
  }
})();
