console.log('IT\'S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Define pages array
let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'cv.html', title: 'CV/Resume' },
  { url: 'https://github.com/c-hutchings-Norco', title: 'GitHub' }
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');

function createNavigation() {
  let nav = document.createElement('nav');
  
  for (let p of pages) {
    let url = p.url;
    let title = p.title;

    // Adjust URL if not on home page and URL is not absolute
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlighting current page and opening external links in new tab
    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );

    a.toggleAttribute('target', a.host !== location.host);
    if (a.hasAttribute('target')) a.setAttribute('target', '_blank');

    nav.append(a);
  }

  document.body.prepend(nav);
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createNavigation);