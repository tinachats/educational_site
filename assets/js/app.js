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

// Business Hours
function checkBusinessHours() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const openingHours = [
    { day: 0, open: 13, close: 16 }, // Sunday
    { day: 1, open: 18, close: 22 }, // Monday
    { day: 2, open: 14.5, close: 21 }, // Tuesday
    { day: 3, open: 18, close: 22 }, // Wednesday
    { day: 4, open: 14.5, close: 21 }, // Thursday
    { day: 5, open: 14.5, close: 18 }, // Friday
    { day: 6, open: 8.5, close: 15 }, // Saturday
  ];

  const currentDayHours = openingHours[dayOfWeek];
  const isOpen = hours >= currentDayHours.open && hours < currentDayHours.close;

  const statusElement = document.getElementById('business-status');
  const additionalHoursElement = document.getElementById('closing-time');

  if (isOpen) {
    statusElement.textContent = 'Open';
    statusElement.style.color = 'green';
    additionalHoursElement.style.display = 'none';
  } else {
    statusElement.textContent = 'Closed';
    statusElement.style.color = 'red';
    additionalHoursElement.style.display = 'block';

    // Calculate next opening time
    let nextOpenDay = dayOfWeek + 1;
    while (true) {
      const nextDayHours = openingHours[nextOpenDay % 7];
      if (hours < nextDayHours.open) {
        break;
      }
      nextOpenDay++;
    }

    const nextOpenTime = new Date();
    nextOpenTime.setDate(currentDate.getDate() + (nextOpenDay - dayOfWeek));
    nextOpenTime.setHours(nextDayHours.open);
    nextOpenTime.setMinutes(0);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedNextOpenTime = new Intl.DateTimeFormat('en-US', options).format(nextOpenTime);

    additionalHoursElement.textContent = formattedNextOpenTime;
  }
}



