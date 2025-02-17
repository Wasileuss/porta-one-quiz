function findLongestSequence(numbers) {
  let longestSeq = [];

  numbers.forEach(start => {
      let used = new Set();
      let seq = [start];
      used.add(start);

      while (true) {
          let lastTwo = seq[seq.length - 1].slice(-2);
          let candidates = numbers.filter(num => num.startsWith(lastTwo) && !used.has(num));

          if (candidates.length === 0) break;
          let nextNum = candidates.reduce((a, b) => (a.length > b.length ? a : b));
          seq.push(nextNum);
          used.add(nextNum);
      }

      if (seq.join('').length > longestSeq.join('').length) {
          longestSeq = seq;
      }
  });

  return longestSeq;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("numberInput");
  const resultDiv = document.getElementById("result");
  const lengthDiv = document.getElementById("length");
  const submitButton = document.getElementById("submit");
  const clearButton = document.getElementById("clear");

  submitButton.addEventListener("click", function () {
      let numbers = inputField.value.split(/\s+/).map(num => num.trim()).filter(num => num.length > 0);
      if (numbers.length === 0) {
          resultDiv.textContent = "Будь ласка, введіть числа!";
          return;
      }
      
      let longestSequence = findLongestSequence(numbers);
      let longestString = longestSequence[0];

      for (let i = 1; i < longestSequence.length; i++) {
          longestString += longestSequence[i].slice(2);
      }

      resultDiv.style.wordBreak = "break-all";
      resultDiv.textContent = longestString;
      lengthDiv.textContent = longestString.length;
  });

  clearButton.addEventListener("click", function () {
      inputField.value = "";
      resultDiv.textContent = "";
  });
});
