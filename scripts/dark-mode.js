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
  const DarkModeButton = function(lightIcon, darkIcon) {
    const button = (() => {
      const template = document.createElement('div');
      template.innerHTML = `
      <button class="dark-mode-button" aria-hidden="true" tabindex="-1">
        <img src="${lightIcon}">
        <img src="${darkIcon}">
      </button>
      `.trim();
      return template.firstChild;
    })();

    button.setState = function(dark) {
      if (dark) {
        this.children[0].style.display = 'none';
        this.children[1].style.display = 'inline-block';
      } else {
        this.children[0].style.display = 'inline-block';
        this.children[1].style.display = 'none';
      }
    };

    return button;
  };

  const body = document.getElementsByTagName('body')[0];

  body.isDarkMode = function() {
    return this.classList.contains('dark');
  };

  body.toggleDarkMode = function() {
    if (this.isDarkMode()) {
      this.classList.remove('dark');
      localStorage.setItem('dark-mode', false);
    } else {
      this.classList.add('dark');
      localStorage.setItem('dark-mode', true);
    }
  };

  body.addEventListener('keydown', ({ctrlKey, altKey, keyCode}) => {
    if (ctrlKey && altKey && keyCode == 68) {
      body.toggleDarkMode();
      button.setState(body.isDarkMode());
    }
  });

  const button =
      new DarkModeButton('/images/icons/moon.svg', '/images/icons/sun.svg');

  button.onclick = () => {
    body.toggleDarkMode();
    button.setState(body.isDarkMode());
  };

  if (localStorage.getItem('dark-mode') == 'true') {
    body.classList.add('dark');
  }
  button.setState(body.isDarkMode());
  document.getElementById('main-navigation').appendChild(button);
})();
