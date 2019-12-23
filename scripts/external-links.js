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
  const ExternalLinkIcon = function () {
    const template = document.createElement('div');
    template.innerHTML = `
    <img class="external-icon" aria-hidden="true" src="/images/icons/external.svg">`.trim();
    return template.firstChild;
  };

  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (window.location.hostname != link.hostname) {
      link.appendChild(new ExternalLinkIcon());
      link.title = 'This is an external link that will take you away from trnglina.org';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  }
})();
