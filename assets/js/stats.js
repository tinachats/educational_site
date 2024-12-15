// Circle Progress Bar animation
let progressBars = document.querySelectorAll('.progress-value');
let progressFill = document.querySelector('.progress-fill');

progressBars.forEach(progressBar => {
    const minValue = parseInt(progressBar.getAttribute('aria-valuemin'));
    const valueNow = parseInt(progressBar.getAttribute('aria-valuenow'));
    const maxValue = parseInt(progressBar.getAttribute('aria-valuemax'));
    const circumference = progressFill.getTotalLength();
    const offset = circumference - (valueNow / 100) * circumference;
    let stepInterval = 2000 / valueNow;
    let percentage = 0;

    progressFill.style.strokeDasharray = `${circumference} ${circumference}`;
    progressFill.style.strokeDashoffset = circumference;
    
    setInterval(() => {
        if (percentage == valueNow) {
            clearInterval();
        } else {
            percentage += 1 ; 
            progressBar.innerHTML = `${percentage}%`;
            progressFill.style.strokeDashoffset = offset;
        }
    }, stepInterval);
});