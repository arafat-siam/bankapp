const submitBtn = document.getElementById("submitLogin");
const userName = document.getElementById("userName");
const passWord = document.getElementById("password");
const form = document.getElementById("form");
const mainSection = document.getElementById("main");
const userNameError = document.getElementById("usernameError");
const passError = document.getElementById("passError");
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
const submit = document.getElementById("submit");
const depositAmount = document.getElementById("depositAmount");
const withdrawAmount = document.getElementById("withdrawAmount");
const totalAmount = document.getElementById("totalAmount");
const input = document.getElementById("input");
const btnArr = [depositBtn, withdrawBtn];
const error = document.getElementById("error");
const currentUser = { user: 1 };

const users = [
  { name: "Arafat", pass: 12345, amount: 1000 },
  { name: "Shorif", pass: 43215, amount: 5000 },
  { name: "Siam", pass: 56789, amount: 500 },
  { name: "Rezvi", pass: 3333, amount: 100 },
];

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const usernameVal = userName.value;
  const passwordVal = passWord.value;

  if (usernameVal === "" && passwordVal === "") {
    showError("Enter your username", userNameError);
    showError("Enter your password", passError);
  } else if (usernameVal === "") {
    showError("Enter your username", userNameError);
    passError.classList.add("hidden");
  } else if (passwordVal === "") {
    showError("Enter your password", passError);
    userNameError.classList.add("hidden");
  } else if (usernameVal && passwordVal) {
    for (let i = 0; i < users.length; i++) {
      if (usernameVal === users[i].name) {
        if (passwordVal == users[i].pass) {
          currentUser.user = users[i];
          totalAmount.innerHTML = currentUser.user.amount;
          mainSection.classList.remove("hidden");
          form.classList.add("hidden");
          break;
        } else {
          loadModal("Username and password not matched");
          userName.value = "";
          passWord.value = "";
        }
      }
    }
  }
});

btnAccess("arafat", users[0].name, users[0].pass);
btnAccess("shorif", users[1].name, users[1].pass);
btnAccess("siam", users[2].name, users[2].pass);

btnArr.forEach(function (value) {
  value.addEventListener("click", () => {
    value.id === "deposit"
      ? changeColor(value, withdrawBtn, "green", "red")
      : changeColor(value, depositBtn, "red", "green");

    error.classList.add("hidden");
  });
});

// Submit Section

submit.addEventListener("click", onSubmit);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    onSubmit();
  }
});

// Function Declaration Area

function btnAccess(idName, user, pass) {
  document.getElementById(idName).addEventListener("click", function (e) {
    e.preventDefault();
    userName.value = user;
    passWord.value = pass;
  });
}

function changeColor(item, rest, color, restColor) {
  item.classList.add("active");
  rest.classList.remove("active");
  item.classList.remove(`text-${color}-500`);
  item.classList.add(`bg-${color}-500`, `text-white`);
  rest.classList.remove("text-white", `bg-${restColor}-500`);
  rest.classList.add(`text-${restColor}-500`);
}

function historyAdd(color, sign, text, amount) {
  const history = document.createElement("div");
  history.classList.add(
    "history",
    "flex",
    "justify-between",
    "w-11/12",
    "bg-slate-100",
    "dark:bg-slate-600",
    "mx-auto",
    "rounded-md",
    "my-2",
    "px-3",
    "py-3",
    "items-center",
    "z-1"
  );

  history.innerHTML = `<div class="flex">
          <span class="text-lg text-${color}-500 font-semibold mx-1">${sign}</span>
          <h3 class="text-lg text-${color}-500 font-semibold">${text}</h3>
        </div>
        <p class="px-1 py-1 rounded-lg bg-${color}-500 text-white px-3 py-1">$${amount}</p>`;

  document.getElementById("history_box").prepend(history);
}

function afterSubmit() {
  [depositBtn, withdrawBtn].forEach((value) => {
    value.classList.remove("active");
    value.classList.remove(`text-white`, `bg-green-500`, "bg-red-500");
    depositBtn.classList.add("text-green-500");
    withdrawBtn.classList.add("text-red-500");
  });
}
function onSubmit() {
  let inputValue = +input.value;
  let prevDeposit = +depositAmount.innerText;
  let prevWithdraw = +withdrawAmount.innerText;
  let totalTaka = +totalAmount.innerText;
  let totalInTaka = totalTaka - inputValue;
  let status;

  for (let value of btnArr) {
    if (value.classList.contains("active")) {
      status = true;
      break;
    } else {
      status = false;
    }
  }

  btnArr.forEach(function (value) {
    if (status) {
      if (value.classList.contains("active")) {
        if (value.id === "deposit") {
          if (inputValue > 0) {
            depositAmount.innerText = inputValue + prevDeposit;
            totalAmount.innerText = inputValue + totalTaka;

            historyAdd("green", "+", "Deposit", inputValue);
            error.classList.add("hidden");
            input.value = "";
          } else {
            showError("Enter Deposit Amount", error);
          }
        } else {
          if (inputValue > 0) {
            if (totalInTaka >= 0) {
              withdrawAmount.innerText = prevWithdraw + inputValue;
              totalAmount.innerText = totalTaka - inputValue;
              historyAdd("red", "-", "Withdraw", inputValue);
              error.classList.add("hidden");
              input.value = "";
            } else {
              showError("You don't have enough money", error);
            }
          } else {
            showError("Enter Withdraw Amount", error);
          }
        }
      }
    } else {
      showError("Select your Transaction mode", error);
    }
  });

  afterSubmit();
}
