const modal = document.getElementById("modal_section");
const cross = document.getElementById("cross");
const message = document.getElementById("message");

modal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

cross.addEventListener("click", function () {
  modal.classList.add("hidden");
});

function loadModal(msg) {
  modal.classList.remove("hidden");
  message.innerHTML = msg;
}

//
function showError(msg, element) {
  element.classList.remove("hidden");
  element.innerHTML = msg;
  element.classList.add("block");
}
