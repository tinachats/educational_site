// Changing the course list every 1 and half second on the hero page
const courseList = [
    'robotics', 'CAD', 'Math', 'Physics', 
    'Design', 'Python', 'PHP', 'Arduino', 
    'C++', 'JavaScript', 'SQL', 'Inventor',  
    'Science', 'Photoshop', 'ICT', 'AI', 'IT', 
    'Matlab', 'TinkerCAD', 'Proteus', 'GIT', 'MS Excel'
];
const courseElement = document.getElementById('course');

let currentIndex = 0;

function changeCourse() {
    courseElement.textContent = courseList[currentIndex];
    currentIndex = (currentIndex + 1) % courseList.length;
}

// Animate numbers when they get into the viewport
function animateNumbers() {
    const animatedNumbers = document.querySelectorAll('.animated-number');
  
    animatedNumbers.forEach(animatedNumber => {
      const number = parseInt(animatedNumber.textContent);
  
      const animateNumber = () => {
        const increment = number / 100;
        let currentNumber = 0;
  
        const intervalId = setInterval(() => {
          currentNumber += increment;
          animatedNumber.textContent = Math.floor(currentNumber);
  
          if (currentNumber >= number) {
            clearInterval(intervalId);
          }
        }, 50);
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateNumber();
            observer.unobserve(entry.target);
          }
        });
      });
  
      observer.observe(animatedNumber);
    });
}

// Typing animation for a student request
const words = [
  'project', 'assignment', 'dissertation', 'homework',
  'idea', 'presentation', 'extra lessons', 'coursework', 'website',
  'code', 'robotics project', 'design', 'simulation', 'circuit',
  'Arduino project', 'Raspberry Pi project', 'technical drawing'
];

const typingText = document.getElementById('typing-text');
let wordIndex = 0;
let charIndex = 0;

function type() {
  const word = words[wordIndex];

  typingText.textContent = `${word.slice(0, charIndex + 1)}|`;

  charIndex++;

  if (charIndex > word.length) {
    charIndex = 0;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, 250); // Adjust the delay as needed
}

// Set Business Hours
const hours = {
    0: { open: '13:00', close: '16:00' }, // Sunday
    1: { open: '18:00', close: '22:00' }, // Monday
    2: { open: '18:00', close: '22:00' }, // Tuesday
    3: { open: '18:00', close: '22:00' }, // Wednesday
    4: { open: '18:00', close: '22:00' }, // Thursday
    5: { open: '14:30', close: '21:00' }, // Friday
    6: { open: '08:30', close: '15:00' }  // Saturday
};

// Declare days of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const statusElements = document.querySelectorAll('.business-status');
const nextBusinessEvents = document.querySelectorAll('.next-business-status');
const dropdownContent = document.getElementById('business-hours');
const now = new Date();
const today = now.getDay();
const currentTime = now.getHours() * 60 + now.getMinutes();
const year = now.getFullYear();
document.getElementById('year').innerHTML = year;

function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

function checkBusinessStatus() {
    const todayHours = hours[today];
    const openTime = formatTime(todayHours.open);
    const closeTime = formatTime(todayHours.close);

    if (currentTime >= openTime && currentTime <= closeTime) {
      statusElements.forEach(statusElement => {
        statusElement.innerHTML = `Open.`;
        statusElement.classList.toggle('text-success');
      });

      nextBusinessEvents.forEach(nextBusinessStatus => {
        nextBusinessStatus.innerHTML = `Closes ${todayHours.close}`;
      });
    } else {
      let nextOpenDay = (today + 1) % 7;
      while (!hours[nextOpenDay]) {
          nextOpenDay = (nextOpenDay + 1) % 7;
      }
      const nextOpenTime = hours[nextOpenDay].open;
      statusElements.forEach(statusElement => {
        statusElement.innerHTML = `Closed.`;
        statusElement.classList.toggle('text-danger');
      });

      nextBusinessEvents.forEach(nextBusinessStatus => {
        nextBusinessStatus.innerHTML = `Opens ${daysOfWeek[nextOpenDay]} at ${nextOpenTime}`;
      });
    }
}

function populateDropdown() {
    daysOfWeek.forEach((day, index) => {
        if (hours[index]) {
          const hour = hours[index];
          const linkElement = document.createElement('li');
          linkElement.className = 'dropdown-item';
          const anchorTag = document.createElement('a');
          anchorTag.innerHTML = `${day}: ${hour.open} - ${hour.close}`;
          linkElement.appendChild(anchorTag);
          dropdownContent.appendChild(linkElement);
        }
    });
}

// Ripple animation
function rippleAnimation() {
  const epiCenter = document.querySelector('.inner-ripple');
  epiCenter.style.setProperty('--before-animation', 'ripple 2s linear infinite');
  epiCenter.style.setProperty('--after-animation', 'ripple 2s 1s linear infinite');
}

const gear = document.getElementById('terminal-gear'); 
const cursor = document.getElementById('terminal-cursor');

function animateGearAndCursor() { 
  gear.style.animation = 'rotate 5s linear infinite'; 
  setInterval(() => { 
    cursor.style.animation = 'blink 0.5s 3'; 
  
  }, 5000);
}

// Scroll-to-Top button
document.addEventListener('DOMContentLoaded', function() {
  const btnScrollTop = document.getElementById('btn-scroll-top');
  const ScrollUpIcon = document.querySelector('.bi-arrow-up');
  const rootElement = document.documentElement;

  function handleScroll() {
      const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
      const scrollFraction = rootElement.scrollTop / scrollTotal;
      const scrollDegrees = scrollFraction * 360;

      // Define a gradient of the border
      const gradient = `conic-gradient(from -45deg at 50% 50%,
        purple ${scrollDegrees}deg, 
        transparent ${scrollDegrees}deg)
      `;

      // Update the border
      btnScrollTop.style.setProperty('--border-gradient', gradient);

      // If near the bottom, change the color of the scroll up icon
      if (scrollDegrees >= 320) {
        ScrollUpIcon.style.color = '#8c007c';
      } else {
        ScrollUpIcon.style.color = '#c1c1c1';
      }

      if (rootElement.scrollTop > rootElement.clientHeight) {
          // Show button
          btnScrollTop.classList.add('show');
      } else {
          // Hide button
          btnScrollTop.classList.remove('show');
      }
  }

  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  btnScrollTop.addEventListener('click', scrollToTop);
  document.addEventListener('scroll', handleScroll);

  // Change the theme 
  const toggleTheme = document.getElementById('theme-change'); 
  const body = document.body; 

  // Load saved theme from localStorage if exists 
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) { 
    body.classList.add(savedTheme); 
    toggleTheme.checked = savedTheme === 'dark-mode'; 
  } 
  
  toggleTheme.addEventListener('change', () => { 
    body.classList.toggle('dark-mode');

    // Save the current theme to localStorage 
    if (body.classList.contains('dark-mode')) { 
      localStorage.setItem('theme', 'dark-mode'); 
    } else { 
      localStorage.removeItem('theme'); 
    } 
  });

  // Start the simulation
  setTimeout(() => {
    rippleAnimation();
  }, 3000);
});






