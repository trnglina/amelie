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

  const ReadBar = function(article) {
    const bar = (() => {
      const template = document.createElement('div');
      template.innerHTML = `
        <aside class="read-bar">
          <button class="toggle-button" aria-hidden="true" tabindex="-1"></button>
          <div class="scroll-container"></div>
        </aside>`.trim();
      template.firstChild.style.display = 'none';
      return template.firstChild;
    })();

    bar.isExpanded = () => bar.classList.contains('expanded');

    bar.updatePosition = function() {
      if (bar.style.display == 'none') {
        bar.style.display = 'block';
      }

      if (window.innerWidth <
          article.clientWidth + 2 * basePadding + this.clientWidth) {
        this.toggleButton.disabled = false;
      } else {
        if (bar.isExpanded()) {
          bar.classList.remove('expanded');
        }
        this.toggleButton.disabled = true;
      }

      if (!bar.isExpanded()) {
        const left = article.clientWidth + 2 * basePadding + 'px';
        if (this.style.left != left) {
          this.style.left = left;
        }
      } else {
        this.style.left = '';
      }
    };

    bar.setExpanded = function(expanded) {
      if (expanded) {
        bar.classList.add('expanded');
        bar.updatePosition();
      } else {
        bar.classList.remove('expanded');
        bar.updatePosition();
      }
    };

    bar.toggle = function() {
      if (bar.isExpanded()) {
        bar.setExpanded(false);
      } else {
        bar.setExpanded(true);
      }
    };

    bar.toc = (() => {
      const root = document.createElement('ul');
      root.className = 'toc-list';
      for (let i = 0; i < article.children.length; i++) {
        const node = article.children[i];
        switch (node.nodeName) {
          case 'H2':
          case 'H3':
          case 'H4':
          case 'H5':
          case 'H6':
            const newNode = document.createElement('li');
            const newNodeContent = document.createElement('a');
            newNodeContent.className = node.nodeName;
            newNodeContent.innerHTML = node.innerHTML;
            newNodeContent.href = '#' + node.id;
            newNodeContent.onfocus = () => bar.setExpanded(true);
            newNodeContent.onblur = () => bar.setExpanded(false);
            newNode.appendChild(newNodeContent);
            root.appendChild(newNode);
            break;
        }
      }
      return root;
    })();

    bar.toggleButton = bar.getElementsByClassName('toggle-button')[0];
    bar.toggleButton.onclick = bar.toggle;

    bar.container = bar.getElementsByClassName('scroll-container')[0];
    bar.container.appendChild(bar.toc);

    return bar;
  };

  const body = document.getElementsByTagName('body')[0];
  const container = document.getElementsByTagName('main')[0];
  const article = container.getElementsByTagName('article')[0];
  const bar = new ReadBar(article);

  if (bar && bar.toc.children.length > 0) {
    window.addEventListener('resize', () => bar.updatePosition());
    window.addEventListener('load', () => bar.updatePosition());

    body.addEventListener('keydown', ({ctrlKey, altKey, keyCode}) => {
      if (ctrlKey && altKey && keyCode == 82) {
        bar.toggle();
        if (bar.isExpanded()) {
          bar.children[0].focus();
        }
      }
    });

    container.insertBefore(bar, article);
  }
})();
