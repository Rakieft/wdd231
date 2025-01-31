document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
  
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggleMenuButtons(); 
    });
  
    function toggleMenuButtons() {
        menuToggle.classList.toggle('close');
    }
  });
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const currentPage = window.location.pathname.split("/").pop();
      const links = {
        'index.html': document.getElementById('home'),
        'directory.html': document.getElementById('directory'),
        'join.html': document.getElementById('join'),
        'discover.html': document.getElementById('discover')
      };
    
      if (links[currentPage]) {
        links[currentPage].classList.add('active');
      }
    
  
   
      const themeToggleButton = document.getElementById('theme-toggle');
      const currentYearSpan = document.getElementById('currentyear');
      const lastModifiedSpan = document.getElementById('lastModified');
      const menuToggleButton = document.querySelector('.menu-toggle');
      const nav = document.querySelector('nav');
    
      // Menu toggle 
      menuToggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggleButton.classList.toggle('open');
      });
    
      // Fetch and display
      async function fetchMembers() {
        try {
          const response = await fetch('data/members.json');
          if (!response.ok) throw new Error('Network response was not ok');
          const members = await response.json();
          displayMembers(members);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    
    
      themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const themeIcon = themeToggleButton.querySelector('img');
        themeIcon.src = document.body.classList.contains('dark-theme') ? 'images/light.png' : 'images/moon.png';
      });
    
      currentYearSpan.textContent = new Date().getFullYear();
      lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    
      fetchMembers();
    });



// Select modal buttons and modals
const modalButtons = document.querySelectorAll('.modalButton');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.closeButton');

// Open the correct modal when a button is clicked
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'flex';
    });
});

// Close the modal when the close button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Close the modal when clicking outside the modal content
window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

  
  