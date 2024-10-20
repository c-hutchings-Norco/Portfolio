console.log('IT\'S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Define pages array with correct URLs
let pages = [
  { url: '/', title: 'Home' },
  { url: '/projects/', title: 'Projects' },
  { url: '/contact/', title: 'Contact' },
  { url: '/cv.html', title: 'CV/Resume' },
  { url: 'https://github.com/c-hutchings-Norco', title: 'GitHub' }
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');

function createNavigation() {
  let nav = document.createElement('nav');
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Prepend '/Portfolio' to internal links
    if (url.startsWith('/') && !url.startsWith('/Portfolio')) {
      url = '/Portfolio' + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlighting current page and opening external links in new tab
    a.classList.toggle(
      'current',
      a.pathname === location.pathname
    );

    a.toggleAttribute('target', a.host !== location.host);
    if (a.hasAttribute('target')) a.setAttribute('target', '_blank');

    nav.append(a);
  }

  document.body.prepend(nav);
}

function createColorSchemeSwitcher() {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>`
  );
}

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  const select = document.querySelector('.color-scheme select');
  if (select) {
    select.value = colorScheme;
  }
  localStorage.colorScheme = colorScheme;
}

function setupColorSchemeSwitch() {
  const select = document.querySelector('.color-scheme select');
  
  if ("colorScheme" in localStorage) {
    setColorScheme(localStorage.colorScheme);
  }
  
  select.addEventListener('input', function (event) {
    setColorScheme(event.target.value);
  });
}

// Call the functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  createNavigation();
  createColorSchemeSwitcher();
  setupColorSchemeSwitch();
});