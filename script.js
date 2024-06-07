document.addEventListener('DOMContentLoaded', (event) => {
    const cells = document.querySelectorAll('td[contenteditable="true"]');
    
    // Load saved data from local storage
    cells.forEach(cell => {
        const time = cell.getAttribute('data-time');
        const savedData = localStorage.getItem(time);
        if (savedData) {
            cell.textContent = savedData;
        }
    });

    // Save data to local storage on input
    cells.forEach(cell => {
        cell.addEventListener('input', () => {
            const time = cell.getAttribute('data-time');
            localStorage.setItem(time, cell.textContent);
        });
    });
});
