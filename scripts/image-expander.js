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
  const basePadding = 40;
  const images = document.querySelectorAll('figure img');
  const container = document.getElementsByTagName('main')[0];

  for (let i = 0; i < images.length; i++) {
    images[i].style.cursor = 'pointer';

    images[i].onclick = function() {
      if (this.classList.contains('expanded')) {
        this.style.maxWidth = '100%';
        this.classList.remove('expanded');
      } else {
        const maxWidth =
            2 * basePadding + (window.innerWidth - container.clientWidth);
        this.style.maxWidth = `calc(100vw - ${maxWidth}px)`;
        this.classList.add('expanded');
      }
    };
  }
})();
