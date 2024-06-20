// script.js

document.addEventListener('DOMContentLoaded', () => {
  const arrayContainer = document.getElementById('array-container');
  const sortBtn = document.getElementById('sort-btn');
  const stopBtn = document.getElementById('stop-btn');

  let array = [];
  let isSorting = false;
  const size = 10;  // Size of the array
  const delay = 500;  // Delay in milliseconds

  function generateArray() {
      array = [];
      for (let i = 0; i < size; i++) {
          array.push(Math.floor(Math.random() * 100) + 1);
      }
      renderArray();
  }

  function renderArray() {
      arrayContainer.innerHTML = '';
      array.forEach(value => {
          const bar = document.createElement('div');
          bar.classList.add('bar');
          bar.style.height = `${value * 3}px`;
          bar.innerText = value;
          arrayContainer.appendChild(bar);
      });
  }

  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  function setColor(index, color) {
      const bars = document.querySelectorAll('.bar');
      bars[index].style.backgroundColor = color;
  }

  async function swap(i, j) {
      const bars = document.querySelectorAll('.bar');
      const tempHeight = bars[i].style.height;
      const tempValue = bars[i].innerText;
      bars[i].style.height = bars[j].style.height;
      bars[i].innerText = bars[j].innerText;
      bars[j].style.height = tempHeight;
      bars[j].innerText = tempValue;

      // Swap the elements in the array
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  async function bubbleSort() {
      isSorting = true;
      sortBtn.disabled = true;
      const COMPARE = 'yellow';
      const UNSORTED = '#3498db';
      const SORTED = '#2ecc71';

      for (let i = 0; i < size - 1; i++) {
          for (let j = 0; j < size - i - 1; j++) {
              if (!isSorting) {
                  sortBtn.disabled = false;
                  return;
              }

              setColor(j, COMPARE);
              setColor(j + 1, COMPARE);
              await sleep(delay);

              if (array[j] > array[j + 1]) {
                  await swap(j, j + 1);
                  await sleep(delay);
              }

              setColor(j, UNSORTED);
              setColor(j + 1, UNSORTED);
          }

          setColor(size - i - 1, SORTED);
      }

      setColor(0, SORTED);
      isSorting = false;
      sortBtn.innerText = 'Restart';
      sortBtn.disabled = false;
  }

  sortBtn.addEventListener('click', () => {
      if (!isSorting) {
          if (sortBtn.innerText === 'Restart') {
              generateArray();
              sortBtn.innerText = 'Start Sorting';
          }
          bubbleSort();
      }
  });

  stopBtn.addEventListener('click', () => {
      isSorting = false;
  });

  generateArray();
});
