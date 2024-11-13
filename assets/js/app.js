// Changing the course list every second on the hero page
const courseList = [
    'robotics', 'CAD', 'Math', 'Physics', 
    'Design', 'Python', 'PHP', 'Arduino', 
    'C++', 'JavaScript', 'SQL', 'Inventor',  
    'Science', 'Photoshop', 'ICT', 'AI'
];
const courseElement = document.getElementById('course');

let currentIndex = 0;

function changeCourse() {
    courseElement.textContent = courseList[currentIndex];
    currentIndex = (currentIndex + 1) % courseList.length;
}

setInterval(changeCourse, 1500); // Change course every 1 and half second
