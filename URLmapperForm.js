var URLmappingForm = {
  currentURL : document.getElementById('currentURL'),
  redirectURL : document.getElementById('redirectURL'),
  clear : function(){
    this.currentURL.value = ''
    this.redirectURL.value = ''
  },
  validate : function(){
    check_required('currentURL')
    check_required('redirectURL')
    return messages
  }
}

function check_required(id){
  var field = document.getElementById(id).value
  if (!field) {
    messages.append('Error: No value specified for '+id)
    return 0
  } else {
    return messages
  }
}
