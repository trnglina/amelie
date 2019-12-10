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

anime({
  targets: '.animated-char',
  translateY: (el, i) => anime.random(-50, 50) - (anime.random(-50, 50) * i),
  rotate: () => anime.random(-360, 360),
  scale: () => anime.random(0.8, 1.1),
  direction: 'alternate',
  loop: true,
  delay: anime.stagger(anime.random(0, 200), {start: 500}),
  endDelay: 500,
});
