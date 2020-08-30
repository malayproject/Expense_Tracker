var elFormBtn;
var elDescIp;
var elAmtIp;
var elAmtDiv;
var elErrorMsg;
var entriesArr;
var elEntries;
var elBalance;
var elIncome;
var elExpense;
var elsTrash;
var elShowTrans;

var DOMInit = () => {
  elFormBtn = document.getElementById("addTransBtn");
  elAmtIp = document.getElementById("amtIp");
  elDescIp = document.getElementById("descIp");
  elAmtDiv = document.getElementById("newAmtDiv");
  elErrorMsg = document.getElementById("error-msg");
  elEntries = document.getElementById("entries");
  elBalance = document.getElementById("balance");
  elIncome = document.getElementById("income");
  elExpense = document.getElementById("expense");
  elShowTrans = document.getElementById("showTrans");
  entriesArr = [];
  elAmtIp.value = "";
  elDescIp.value = "";
};
class Transaction {
  constructor(description, amount) {
    this.description = description;
    this.amount = amount;
  }
  getDesc() {
    return this.description;
  }
  getAmt() {
    return this.amount;
  }
}
var showRecentTrans = () => {
  elEntries.innerHTML = "";
  let len = entriesArr.length;
  for (let i = len - 1; i >= 0 && i >= len - 5; i--) {
    newFunction(i);
  }
  setEventListeners(true);
  elShowTrans.textContent = "show all";
};
var editIncExpBal = () => {
  let inc = 0;
  let exp = 0;
  for (let element of entriesArr) {
    if (element.getAmt() < 0) {
      exp += element.getAmt();
    } else inc += element.getAmt();
  }
  elBalance.textContent = String(inc + exp);
  elExpense.textContent = String(exp * -1);
  elIncome.textContent = String(inc);
  if (inc + exp < 0) {
    elBalance.classList.remove("green");
    elBalance.classList.add("orangered");
  } else if (inc + exp == 0) {
    elBalance.classList.remove("green");
    elBalance.classList.remove("orangered");
  } else {
    elBalance.classList.add("green");
    elBalance.classList.remove("orangered");
  }
};
var removeTrans = (e) => {
  console.log("delete called");
  console.log(e.target.id);
  let transId = e.target.id.slice(9);
  console.log(transId);
  entriesArr.splice(transId, 1);
  showRecentTrans();
  editIncExpBal();
};
var setEventListeners = (isRecent) => {
  let start = 0;
  if (isRecent && entriesArr.length > 5) {
    start = entriesArr.length - 5;
  }
  for (let i = start; i < entriesArr.length; i++) {
    console.log(
      "adding event listener for ",
      `trashIcon${i}`,
      document.getElementById(`trashIcon${i}`)
    );
    document
      .getElementById(`trashIcon${i}`)
      .addEventListener("click", removeTrans);
  }
};
var showAllTrans = () => {
  elEntries.innerHTML = "";
  let len = entriesArr.length;
  for (let i = len - 1; i >= 0; i--) {
    newFunction(i);
  }
  setEventListeners(false);
  elShowTrans.textContent = "show recent";
};

var addTransaction = (e) => {
  e.preventDefault();
  console.log("event ", e);
  console.log("something");
  let desc = elDescIp.value;
  let amt = Number(elAmtIp.value);
  if (isNaN(amt) || amt == 0) {
    elAmtIp.classList.add("error");
    elErrorMsg.classList.add("visible");
  } else {
    elAmtIp.classList.remove("error");
    elErrorMsg.classList.remove("visible");
    let currEntry = new Transaction(desc, amt);
    entriesArr.push(currEntry);
    showRecentTrans();
    editIncExpBal();
    elDescIp.value = "";
    elAmtIp.value = "";
  }
};
var showTrashIcons = (e) => {
  elsTrash = document.querySelectorAll(".fa-trash");

  for (let element of elsTrash) {
    element.classList.add("mouse-visible");
  }
};
var hideTrashIcons = (e) => {
  elsTrash = document.querySelectorAll(".fa-trash");

  for (let element of elsTrash) {
    element.classList.remove("mouse-visible");
  }
};
var showTransactions = (e) => {
  console.log("show trans called");
  if (elShowTrans.textContent == "show recent") {
    showRecentTrans();
  } else {
    showAllTrans();
  }
};
var addInitialEventListeners = () => {
  elFormBtn.addEventListener("click", addTransaction);
  elEntries.addEventListener("mouseover", showTrashIcons);
  elEntries.addEventListener("mouseout", hideTrashIcons);
  elShowTrans.addEventListener("click", showTransactions);
};
var init = () => {
  DOMInit();
  addInitialEventListeners();
};

init();
function newFunction(i) {
  if (entriesArr[i].getAmt() < 0)
    elEntries.innerHTML += `<div class="entry" id="entry${i}"><i class="fa fa-trash entry-visible" id="trashIcon${i}"></i><div class="entryDesc">${entriesArr[
      i
    ].getDesc()}</div><div class="entryAmt negative"><i class="fa fa-rupee-sign tr"></i>${entriesArr[
      i
    ].getAmt()}</div></div>`;
  else {
    elEntries.innerHTML += `<div class="entry" id="entry${i}"><i class="fa fa-trash entry-visible" id="trashIcon${i}"></i><div class="entryDesc">${entriesArr[
      i
    ].getDesc()}</div><div class="entryAmt"><i class="fa fa-rupee-sign tr"></i>${entriesArr[
      i
    ].getAmt()}</div></div>`;
  }
}
