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
  
    
    menuToggleButton.addEventListener('click', () => {
      nav.classList.toggle('active'); 
      toggleMenuButtons(); 
    });
  
    function toggleMenuButtons() {
      menuToggleButton.classList.toggle('open'); 
    }
  
  
    membersContainer.classList.add('grid-view');
  
    
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
          <img src="images/${member.image}" alt="${member.name}"loading="lazy">
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
  
    
    gridButton.addEventListener('click', () => {
      membersContainer.classList.add('grid-view');
      membersContainer.classList.remove('list-view');
    });
  
    listButton.addEventListener('click', () => {
      membersContainer.classList.add('list-view');
      membersContainer.classList.remove('grid-view');
    });
  
    
    themeToggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
  
      
      const themeIcon = themeToggleButton.querySelector('img');
      if (document.body.classList.contains('dark-theme')) {
        themeIcon.src = 'images/light.png'; 
      } else {
        themeIcon.src = 'images/moon.png'; 
      }
    });
  
    
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
  
    
    fetchMembers();
  });
  