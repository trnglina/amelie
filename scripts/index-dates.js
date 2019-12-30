// To the extent possible under law, the author(s) have dedicated all copyright
// and related and neighbouring rights to this software and all related code
// files to the public domain worldwide. A copy of the CC0 Public Domain
// Dedication may be obtained at:
//
//     http://creativecommons.org/publicdomain/zero/1.0/
//
// Unless required by applicable law or agreed to in writing, this software is
// distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.

/* eslint-disable require-jsdoc */

(() => {
  const LastUpdatedIndicator = function(date) {
    const template = document.createElement('div');
    template.innerHTML = `
        <sup class="last-updated">(up. ${date.replace(/-/g, '/')})</sup>`.trim();
    return template.firstChild;
  };

  const makeRequest = function(linkObject, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(linkObject, this);
      }
    };
    xhttp.open('GET', linkObject.href, true);
    xhttp.send();
  };

  const links = document.getElementsByClassName('update-date');
  for (let i = 0; i < links.length; i++) {
    makeRequest(links[i], function(linkObject, xhttp) {
      const dummy = document.createElement('html');
      dummy.innerHTML = xhttp.response;
      const metaElements = dummy.getElementsByTagName('meta');
      for (let j = 0; j < metaElements.length; j++) {
        if (metaElements[j].attributes['http-equiv'] && metaElements[j].attributes['http-equiv'].value == 'last-modified') {
          linkObject.appendChild(new LastUpdatedIndicator(metaElements[j].attributes['content'].value));
        }
      }
    });
  }
})();
