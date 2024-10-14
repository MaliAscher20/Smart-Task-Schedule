const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const availableTimeInput = document.getElementById('available-time');
const calculateButton = document.getElementById('calculate');
const scheduleOutput = document.getElementById('schedule-output');

let tasks = [];  // Array to store tasks

// Add new task when form is submitted
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevents page reload

  // Get task details from form inputs
  const task = e.target.task.value;
  const time = parseInt(e.target.time.value);
  const reminderTime = parseInt(e.target.reminder.value);

  // Create a new task object and add it to the tasks array
  const newTask = { task, time, completed: false };
  tasks.push(newTask);

  // Create a new list item for the task
  const listItem = document.createElement('li');
  listItem.textContent = `${task} - ${time} minutes`;

  // Create "mark as done" button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Mark as Done';
  deleteButton.style.marginLeft = '10px';
  deleteButton.addEventListener('click', () => {
    // Mark task as done and remove from the list
    tasks = tasks.filter(t => t !== newTask);
    taskList.removeChild(listItem);
  });

  // Add the button to the list and display the task
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  // Set a reminder using Chrome alarms
  const now = new Date().getTime();
  const alarmTime = now + (reminderTime * 60 * 1000);  // Convert minutes to milliseconds
  chrome.alarms.create(task, { when: alarmTime });

  // Reset the form after submission
  e.target.reset();
});

// Calculate and display the schedule
calculateButton.addEventListener('click', () => {
  const availableTime = parseInt(availableTimeInput.value);
  let remainingTime = availableTime;
  let schedule = [];

  // Loop through tasks and calculate available time for each
  tasks.forEach(task => {
    if (!task.completed) {
      if (remainingTime >= task.time) {
        schedule.push(`${task.task}: ${task.time} minutes`);
        remainingTime -= task.time;
      } else {
        schedule.push(`${task.task}: Only ${remainingTime} minutes available`);
        remainingTime = 0;
      }
    }
  });

  // Display the calculated schedule
  scheduleOutput.innerHTML = schedule.join('<br>');
});
