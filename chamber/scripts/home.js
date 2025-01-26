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
    
  
  
  
  const apiKey = '9f26309485957c2bd9641a631b5817c8';
  const city = 'HAITI'; // Chamber's location
  const units = 'imperial'; // Use 'metric' for Celsius
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  
  // Fetch Current Weather
  fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
          document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°F`;
          document.getElementById('weather-description').textContent = data.weather[0].description;
          document.getElementById('high-temp').textContent = `${Math.round(data.main.temp_max)}°F`;
          document.getElementById('low-temp').textContent = `${Math.round(data.main.temp_min)}°F`;
          document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  
          // Convert UNIX timestamp to readable time for sunrise and sunset
          const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
          const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
          document.getElementById('sunrise').textContent = sunrise;
          document.getElementById('sunset').textContent = sunset;
  
          // Weather Icon
          const iconCode = data.weather[0].icon;
          document.getElementById('weather-icon').src = `images/weather.svg`;
          document.getElementById('weather-icon').alt = data.weather[0].description;
      })
      .catch(error => console.error('Error fetching current weather:', error));
  
  // Fetch 3-Day Forecast (Today, Tomorrow, and Next Day)
  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          // Weather forecast for today, tomorrow, and the day after
          const forecastDays = [0, 8, 16]; // Corresponds to 3-hour interval forecasts for day 1, 2, and 3
  
          document.getElementById('day1-temp').textContent = `${Math.round(data.list[forecastDays[0]].main.temp)}°F`;
          document.getElementById('day2-temp').textContent = `${Math.round(data.list[forecastDays[1]].main.temp)}°F`;
          document.getElementById('day3-temp').textContent = `${Math.round(data.list[forecastDays[2]].main.temp)}°F`;
      })
      .catch(error => console.error('Error fetching forecast data:', error));
  
  
  
  document.addEventListener('DOMContentLoaded', async () => {
      // Fetch the JSON data
      const response = await fetch('data/members.json');
      const members = await response.json();
  
      // Filter for members with gold or silver membership (level 2 or 3)
      const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
  
      // Shuffle members to randomize selection
      qualifiedMembers.sort(() => Math.random() - 0.5);
  
      // Select the first 3 random members
      const selectedMembers = qualifiedMembers.slice(0, 3);
  
      // Get the members container
      const membersContainer = document.getElementById('members-container');
  
      // Create HTML for each member and display in the container
      selectedMembers.forEach(member => {
          const memberHTML = `
              <div class="member-spotlight">
                  <h3>${member.name}</h3>
                  <img src="images/${member.image}" alt="${member.name} logo">
                  <p><strong>Address:</strong>${member.address}</p>
                  <p><strong>Phone:</strong> ${member.phone}</p>
                  <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                  <p><strong>Membership Level:</strong> ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
              </div>
          `;
          membersContainer.innerHTML += memberHTML;
      });
  });
  
  // Discover JS start
  document.addEventListener("DOMContentLoaded", () => {
    const visitorMessage = document.getElementById("visitorMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
        visitorMessage.textContent = "Welcome!!! Let us know if you have any question.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  
        if (daysSinceLastVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitorMessage.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? "day" : "days"} ago.`;
        }
    }
  
    localStorage.setItem("lastVisit", now);
  
    const lazyImages = document.querySelectorAll(".lazy");
  
    const lazyLoad = (image) => {
        const src = image.getAttribute("data-src");
        if (!src) return;
        image.src = src;
        image.onload = () => {
            image.classList.remove("lazy");
        };
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
  
    lazyImages.forEach(image => {
        observer.observe(image);
    });
  });
  // Discover JS end