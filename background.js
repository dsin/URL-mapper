var before_navigate_url = "";

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  before_navigate_url = details.url;
});

chrome.webNavigation.onCompleted.addListener(function(details) {

  chrome.storage.sync.get('URLmapping', function(items){
    var URLmapping = items['URLmapping']
    var redirectURL = URLmapping[details.url]
    if(redirectURL){
      redirectURL.replace(/\[URL\]/g, details.url)
      redirectURL.replace(/\[prevURL\]/g, before_navigate_url)    
      redirectURL.replace(/\[prevURLwoHttp\]/g, before_navigate_url.indexOf('//')+2)
      chrome.tabs.update(details.tabId, {url: redirectURL});
    }
  }

  }
});
