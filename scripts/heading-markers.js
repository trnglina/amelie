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
  const repeat = function(char, times) {
    let acc = '';
    for (let i = 0; i < times; i++) {
      acc += char;
    }
    return acc;
  };

  const HeadingMarker = function(level) {
    const template = document.createElement('div');
    template.innerHTML = `
    <span class="heading-marker" aria-hidden="true">
      ${repeat('•', level)}
    </span>`.trim();
    return template.firstChild;
  };

  const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
  for (let i = 0; i < headings.length; i++) {
    if (headings[i].parentElement.tagName != 'FIGCAPTION') {
      headings[i].appendChild(new HeadingMarker(headings[i].nodeName[1]));
    }
  }
})();
