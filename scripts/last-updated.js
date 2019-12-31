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
        <span class="last-updated"><span class="marker">up. <time datetime="${date}">${date.replace(/-/g, '/').substring(2)}</time></span></span>`.trim();
    return template.firstChild;
  };

  const makeRequest = function(linkObject, callback) {
    const x = new XMLHttpRequest();
    x.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(linkObject, this);
      }
    };
    x.open('GET', linkObject.href, true);
    x.send();
  };

  const links = document.getElementsByClassName('update-date');
  for (let i = 0; i < links.length; i++) {
    makeRequest(links[i], function(linkObject, x) {
      const dummy = document.createElement('html');
      dummy.innerHTML = x.response;
      const metaElements = dummy.getElementsByTagName('meta');
      for (let j = 0; j < metaElements.length; j++) {
        if (metaElements[j].attributes['http-equiv'] && metaElements[j].attributes['http-equiv'].value == 'last-modified') {
          const date = metaElements[j].attributes['content'].value;
          const wrapper = new LastUpdatedIndicator(date);
          linkObject.parentNode.insertBefore(wrapper, linkObject.nextSibling);
          wrapper.insertBefore(linkObject, wrapper.firstChild);
          wrapper.title = `Last updated ${date.replace(/-/g, '/')}`;
        }
      }
    });
  }
})();
