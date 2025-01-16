document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split("/").pop(); // Get current file name
    
    // Map each page to the corresponding navigation link element
    const links = {
      'index.html': document.getElementById('home'),
      'directory.html': document.getElementById('directory'),
      'join.html': document.getElementById('join'),
      'discover.html': document.getElementById('discover')
    };
  
    // Add the 'active' class to the current page's link
    if (links[currentPage]) {
      links[currentPage].classList.add('active');
    }
  });
  
  
  
  
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
    const membersContainer = document.getElementById('members-container');
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedSpan = document.getElementById('lastModified');
    const menuToggleButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
  
    // Menu toggle functionality for mobile
    menuToggleButton.addEventListener('click', () => {
      nav.classList.toggle('active'); // Add/remove 'active' class to show/hide the menu
      toggleMenuButtons(); // Call the toggle function for the buttons
    });
  
    function toggleMenuButtons() {
      menuToggleButton.classList.toggle('open'); // Add/remove 'open' class for menu button
    }
  
    // Set default view to grid on page load
    membersContainer.classList.add('grid-view');
  
    // Fetch and display members data
    async function fetchMembers() {
      try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const members = await response.json();
        displayMembers(members);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
    function displayMembers(members) {
      membersContainer.innerHTML = '';
      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
  
        memberCard.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}">
          <h2>${member.name}</h2>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        `;
  
        membersContainer.appendChild(memberCard);
      });
    }
  
    function getMembershipLevel(level) {
      switch (level) {
        case 1:
          return 'Member';
        case 2:
          return 'Silver';
        case 3:
          return 'Gold';
        default:
          return 'Unknown';
      }
    }
  
    // Event listeners for grid and list buttons
    gridButton.addEventListener('click', () => {
      membersContainer.classList.add('grid-view');
      membersContainer.classList.remove('list-view');
    });
  
    listButton.addEventListener('click', () => {
      membersContainer.classList.add('list-view');
      membersContainer.classList.remove('grid-view');
    });
  
    // Theme toggle functionality
    themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
  
      // Update the button icon based on the current theme
      const themeIcon = themeToggleButton.querySelector('img');
      if (document.body.classList.contains('dark-theme')) {
        themeIcon.src = 'images/light.png'; // Switch to light mode icon
      } else {
        themeIcon.src = 'images/moon.png'; // Switch to dark mode icon
      }
    });
  
    // Display the current year and last modified date in the footer
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
  
    // Fetch members data on page load
    fetchMembers();
  });
  