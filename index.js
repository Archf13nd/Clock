// This determines the radius of the clock //todo Make the clock size more responsive
const radius = 200;

// This finds the container in the DOM and adds radius and calculated font size to it
const container = document.getElementById("container");
container.style.cssText = `--radius: ${radius}px`;
container.style.fontSize = `${radius / 30}px`;

// Keeps track of the number of rotating circles added to container. Determines what id to give each dom element
let circleCount = 0;

//Object with methods returning rotation for clock hand
// Methods calulate rotation by diving 360 by number of steps (60 for seconds 12 for hours)
// To create a smooth movement instead of typical "steps", a fraction of the distance between each "step" is calculated and added on.
// 180 is subtracted to flip the clock over. This is to make it a lot easier to style with css and costs less code.
const handRotation = {
  second() {
    return (
      (360 / 60) * new Date().getSeconds() -
      180 +
      (new Date().getMilliseconds() / 1000) * 6
    );
  },
  minute() {
    return (
      (360 / 60) * new Date().getMinutes() - 180 + new Date().getSeconds() / 10
    );
  },
  hour() {
    return (
      (360 / 12) * new Date().getHours() -
      180 +
      (new Date().getMinutes() + 1) / 4
    );
  },
};

// Recursive function using requestAnimationFrame.
const rotateObject = (el, hand) => {
  const animate = () => {
    // Uses handRotation object by passing in hand type which will match with object method.
    const rotation = handRotation[hand]();
    el.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

// Function that creates Dom element which becomes one of the clock's hands. Takes in single argument which determines length of clock hand
const addCircle = (radius) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.zIndex = `${circleCount}`;
  circle.id = `circle--${circleCount}`;
  const sector = document.createElement("div");
  sector.classList.add("sector");
  const innerCircle = document.createElement("div");
  innerCircle.classList.add("inner-circle");
  circle.appendChild(sector);
  circle.appendChild(innerCircle);
  return circle;
};

const createSecondHand = (radius) => {
  const circle = addCircle(radius);
  circle.classList.add("second-hand");
  container.appendChild(circle);
  rotateObject(circle, "second");
};
const createMinuteHand = (radius) => {
  const circle = addCircle(radius);
  circle.classList.add("minute-hand");
  container.appendChild(circle);
  rotateObject(circle, "minute");
};
const createHourHand = (radius) => {
  const circle = addCircle(radius);
  circle.classList.add("hour-hand");
  container.appendChild(circle);
  rotateObject(circle, "hour");
};

createSecondHand(radius);
createMinuteHand(radius);
createHourHand(radius);
