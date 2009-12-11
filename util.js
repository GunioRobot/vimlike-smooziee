function extend(obj, members) {
  for (var member in members) {
    obj[member] = members[member];
  }
  return obj;
}

Clipboard = {}; 
Clipboard.utilities = {}; 
Clipboard.utilities.createTextArea = function(value) { 
    var txt = document.createElement('textarea'); 
    txt.style.position = "absolute"; 
    txt.style.left = "-100%"; 
    if (value != null) 
        txt.value = value; 
    document.body.appendChild(txt); 
    return txt; 
}; 

Clipboard.copy = function(data) { 
    if (data == null) return; 
    var txt = Clipboard.utilities.createTextArea(data); 
    txt.select(); 
    document.execCommand('Copy'); 
    document.body.removeChild(txt); 
}; 

function filterURL(URL) {
  if(new RegExp('\.com|www\.|\.org|\.net|\.edu|\.biz|\.gov|[a-z][a-z]\\.[a-z][a-z]','im').test(URL)) {
    if (new RegExp('(https?)://[-\\w]+(\\.\\w[-\\w]*)+','im').test(URL) == false) {
      return "http://" + URL;
    }
    return URL;
  } else {
      return "http://www.google.com/search?q=" + URL;
  }
}

function openURL(title, defaultText, newTab) {
  CmdLine.query(title , defaultText, function(URL) {
    var port = chrome.extension.connect();
    port.postMessage({action: "open_url", url: filterURL(URL), newtab: newTab });
  });
}
