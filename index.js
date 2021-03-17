// SIZE
const radius = 400;

const container = document.getElementById("container");
container.style.cssText = `--radius: ${radius}px`;
container.style.fontSize = `${radius / 30}px`;

const numbers = document.querySelectorAll("number");

let circleCount = 0;

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
      (360 / 24) * new Date().getHours() -
      180 +
      (new Date().getMinutes() + 1) / 4
    );
  },
};

const rotateObject = (el, hand) => {
  const animate = () => {
    const rotation = handRotation[hand]();
    el.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

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
