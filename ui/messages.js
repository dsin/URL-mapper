var messages = {
  msgs : [],
  append : function(str){
    this.msgs.push(str)
  },
  length : function(){
    return this.msgs.length
  },
  show : function(){
    var errors = this.msgs.join("<br/>")
    var htmlerror = document.getElementById('htmlerror')
    if (htmlerror)
      htmlerror.innerHTML = "<div class='warning'>"+
       errors+"</div>"
    return errors
  },
  clearHTMLerror : function(){
    var htmlerror = document.getElementById('htmlerror')
    htmlerror.innerHTML = ''
  },
  clear : function(){
    this.msgs = []    
  }
}
