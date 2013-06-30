var before_navigate_url = "";

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  before_navigate_url = details.url
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    
  chrome.storage.sync.get('URLmapping', function(items){

    var URLmapping = items['URLmapping']
    var redirectURL = URLmapping[details.url]
    if(redirectURL){
      redirectURL = redirectURL.replace('[URL]', details.url)
      redirectURL = redirectURL.replace('[prevURL]', before_navigate_url)    
      redirectURL = redirectURL.replace('[prevURLwoHttp]', before_navigate_url.substring(before_navigate_url.indexOf('//')+2))
      chrome.tabs.update(details.tabId, {url: redirectURL});
    }
  });

});
