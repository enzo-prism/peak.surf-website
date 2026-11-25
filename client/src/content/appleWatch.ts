// Content for /apple-watch-surf-tracking, also used in llms-full.txt.
// Describes the Apple Health flow that ships in the current App Store version.

export const appleWatchSteps = [
  {
    title: "Record the surf on Apple Watch",
    body: "Use a workout app on your Apple Watch that saves the session to Apple Health as a surfing workout with a GPS route. Peak reads the workout afterwards, so there is nothing extra to run in the water.",
  },
  {
    title: "Turn on Apple Health in Peak",
    body: "In Peak, open Settings and turn on Apple Health, or answer yes to “Surf with an Apple Watch?” during setup. iOS then asks which workout data Peak may read and write, and you can change that at any time in iPhone Settings.",
  },
  {
    title: "Log the surf from the Log tab",
    body: "When an unlogged Watch surf is waiting, the Log tab shows it under the main card. Tap Log this surf to open the editor with the workout's start and end times, the nearest spot you have pinned, route-based wave stats marked as estimates, and gear from your history.",
  },
  {
    title: "Rate it, check the numbers, and save",
    body: "Add a star rating and notes, correct any estimate that looks off, and save. The workout stays linked to the session, so Peak will not offer it again or write a duplicate to Apple Health.",
  },
];

export const appleWatchMetrics = [
  { label: "Wave count", detail: "How many waves you rode in the session." },
  { label: "Top speed", detail: "Your fastest wave, from the route's speed samples." },
  { label: "Longest ride", detail: "The longest single ride in the session." },
  { label: "Paddle distance", detail: "How far you paddled during the session." },
];

export const appleWatchPrinciples = [
  "Every figure is calculated on your iPhone. Nothing is uploaded, and there is no Peak server.",
  "Every figure is labelled as an estimate and can be edited.",
  "Your correction always wins, and a later import never overwrites it.",
  "Apple Health is entirely optional. Peak works the same as a manual surf log without it.",
];
