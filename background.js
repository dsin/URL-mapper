var before_navigate_url = undefined;

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  before_navigate_url = details.url;
});

function processWebNavigation(details){
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      var current_url = tabs[0].url;

      chrome.storage.sync.get('URLmapping', function(items){
        var URLmapping = items['URLmapping'],
            redirectURL = URLmapping[current_url];
        if(redirectURL){
          redirectURL = redirectURL.replace('[currentURL]', current_url);
          redirectURL = redirectURL.replace('[beforeRedirectURL]', before_navigate_url || current_url);
          redirectURL = redirectURL.replace('[beforeRedirectURLwoHttp]', before_navigate_url.substring(before_navigate_url.indexOf('//')+2));
          chrome.tabs.update(details.tabId, {url: redirectURL});
        }
      });
   }
  );
}

chrome.webNavigation.onErrorOccurred.addListener(processWebNavigation);
chrome.webNavigation.onCompleted.addListener(processWebNavigation);
