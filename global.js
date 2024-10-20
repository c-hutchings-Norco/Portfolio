console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// New code for automatic current page link
function setCurrentNavLink() {
    // Step 2.1: Get an array of all nav links
    const navLinks = $$("nav a");
  
    // Step 2.2: Find the link to the current page
    let currentLink = navLinks.find(
      a => a.host === location.host && a.pathname === location.pathname
    );
  
    // Step 2.3: Add the current class to the current page link
    if (currentLink) {
      currentLink.classList.add('current');
      currentLink.setAttribute('aria-current', 'page');
      
      // Set the body class based on the current page
      const pageName = currentLink.textContent.toLowerCase().replace(/\s+/g, '-');
      document.body.className = `${pageName}-page`;
    }
  }
  
  // Call the function when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', setCurrentNavLink);