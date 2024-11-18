function calculateTimestamps(durationInMinutes, remainingStops) {
  const currentTime = new Date();
  const eta = new Date(currentTime.getTime() + durationInMinutes * 60000);
  const interval = durationInMinutes / remainingStops;

  const timestamps = [];
  for (let i = 0; i <= remainingStops; i++) {
    const time = new Date(currentTime.getTime() + i * interval * 60000);
    timestamps.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  return timestamps;
}

// Example usage
const duration = 23; // total duration in minutes
const stops = 5; // number of stops
console.log(calculateTimestamps(duration, stops));

export default calculateTimestamps
