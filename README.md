URL-mapper
==========

URL mapper is a google chrome extension to redirect URL using mapping rules

i.e. when we enter `http://yahoo.com`, we would like the browser to go to `http://google.com` instead


Installation
-------------------------

1. Go to Google Chrome,
2. Tools > Extensions

3. tick `Developer mode`
4. click `Load unpacked extension` button
   then navigate to the URL-mapper folder, then click open
5. click URL-mapper's Options
   This is where the mapper can be set.

   For example, if you want web browser to load `http://google.com` when you enter `http://yahoo.com`, you can configure like this:

   currentURL : `http://yahoo.com`

   redirectURL : `http://google.com`

   or another practical example:

   currentURL : `http://58.97.5.29/annouce/court.html`

   redirectURL : `http://mirrorrr.appspot.com/[prevURLwoHttp]`

redirectURL's Variable
-------------------------
<dl>
  <dt>[currentURL]</dt> <dd></dd>
  <dt>[beforeRedirectURL]</dt> <dd>If user enter URL that contains redirect inside that page, the [beforeRedirectURL] will be the URL before redirect.

  For example, the page http://a.com has redirect script inside his own page to http://b.com.

  When user enter http://a.com. The [currentURL] will be http://b.com and the [beforeRedirectURL] will be http://a.com
  </dd>

  <dt>[beforeRedirectURLwoHttp]</dt> <dd>i.e. if [beforeRedirectURL] is http://google.com, [beforeRedirectURLwoHttp] will be google.com.</dd>
</dl>
