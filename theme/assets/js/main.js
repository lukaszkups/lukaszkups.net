console.info('It works!');

// Update current year dates automatically 😎
const updateYears = () => {
  const nodes = document.querySelectorAll('.lk-update-year');
  const year = new Date().getFullYear();
  nodes.forEach((item) => {
    item.innerHTML = year;
  });
}
updateYears();

// Calculate how much time has passed since [data-since-year] value 👨‍💻
const calculateTimespan = () => {
  const nodes = document.querySelectorAll('.lk-calculate-timespan')
  const year = new Date().getFullYear();
  nodes.forEach((item) => {
    item.innerText = year - parseInt(year.getAttribute("data-since-year"));
  });
}
calculateTimespan();
