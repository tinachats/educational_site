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

setInterval(changeCourse, 1500); // Change course every 1 and half second

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
