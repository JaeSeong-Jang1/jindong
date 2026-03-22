class LotteryBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--ball-color, #ffeb3b);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      </style>
      <span>${number}</span>
    `;
  }
}

customElements.define('lottery-ball', LotteryBall);


const generateButton = document.getElementById('generate-button');
const numbersContainer = document.getElementById('numbers-container');

function generateNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
}

function displayNumbers(numbers) {
  numbersContainer.innerHTML = '';
  for (const number of numbers) {
    const ball = document.createElement('lottery-ball');
    ball.setAttribute('number', number);
    numbersContainer.appendChild(ball);
  }
}

generateButton.addEventListener('click', () => {
  const numbers = generateNumbers();
  displayNumbers(numbers);
});
