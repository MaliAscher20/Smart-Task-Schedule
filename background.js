// Listen for alarms and send notifications when they trigger
chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon48.png',  // Path to your icon
      title: 'Task Reminder',
      message: `Reminder: Time to start the task ${alarm.name}`
    });
  });
  