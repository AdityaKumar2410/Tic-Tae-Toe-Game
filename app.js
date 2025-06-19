let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

//we need to create some variables to access the turns of the one of the two players

let turnO = true; //playerO , playerX
let count = 0; //to track draw condition
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; //we have numbered boxes as some numbers
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // console.log(`button${index} was clicked`);
    if (turnO) {
      //turnX
      box.innerText = "O";
      turnO = false;
    } else {
      //turnO
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    count=0;
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations!! ${winner} has won`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    let winnerfound = false;
  for (let pattern of winPatterns) {
    //to access each array of winning pattern main array
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val && pos2Val && pos3Val) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
        disableBoxes();
        winnerfound = true;
        break;
      }
      
    }
    if (!winnerfound && count === 9){
            msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
