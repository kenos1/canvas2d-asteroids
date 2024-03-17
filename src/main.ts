import $ from "./dom";
import { Colors } from "./sprites";
import { Asteroids } from "./scenes/asteroids";

// @ts-expect-error TS being silly
const canvas: HTMLCanvasElement = $("#game-canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// @ts-expect-error TS being silly
const canvas2d: CanvasRenderingContext2D = canvas.getContext("2d");

const game = new Asteroids(canvas2d);
game.startGame();

game.background = Colors.background;

game.initialCameraLocation = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

game.scale = (canvas.width * canvas.height) / (1920 * 1080);

let lastTimestamp = Date.now();
const gameLoop: FrameRequestCallback = (timeStamp) => {
  const delta = (timeStamp - lastTimestamp) / 1000;
  lastTimestamp = timeStamp;

  game.act(delta);
  game.render();

  window.requestAnimationFrame(gameLoop);
};

try {
  window.requestAnimationFrame(gameLoop);
} catch (error) {
  console.error(error);
}

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game.initialCameraLocation = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  game.scale = (canvas.width * canvas.height) / (1920 * 1080);
};
