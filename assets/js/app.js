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

window.addEventListener('load', animateNumbers);

// Typing animation for a student request
const words = [
  'project', 'assignment', 'dissertation', 'homework',
  'idea', 'presentation', 'tuition', 'coursework', 'website',
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


