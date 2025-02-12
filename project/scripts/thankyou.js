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
    
      // Menu toggle functionality for mobile
      menuToggleButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggleButton.classList.toggle('open');
      });
    
      // Fetch and display members data
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



    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        firstName: params.get('firstName'),
        lastName: params.get('lastName'),
        email: params.get('email'),
        phone: params.get('phone'),
        organization: params.get('organization'),
        timestamp: params.get('timestamp')
      };
    }

    function displaySubmittedData() {
      const formData = getQueryParams();

      document.getElementById('firstName').textContent = formData.firstName ;
      document.getElementById('lastName').textContent = formData.lastName;
      document.getElementById('email').textContent = formData.email;
      document.getElementById('phone').textContent = formData.phone;
      document.getElementById('organization').textContent = formData.organization;
      document.getElementById('timestamp').textContent = formData.timestamp ||'N/A'
    }

    document.addEventListener('DOMContentLoaded', displaySubmittedData);

