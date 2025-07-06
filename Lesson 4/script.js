let balance = 0;

function addTransaction(type) {
  const desc = document.getElementById("description").value;
  const amt = parseFloat(document.getElementById("amount").value);
  const list = document.getElementById("transaction-list");

  if (!desc || isNaN(amt) || amt <= 0) return alert("Enter valid details.");

  const li = document.createElement("li");
  li.classList.add(type);
  li.textContent = `${desc} - ৳ ${amt.toFixed(2)}`;
  list.prepend(li);

  balance += type === "income" ? amt : -amt;
  document.getElementById("balance").textContent = `৳ ${balance.toFixed(2)}`;

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

let interestInterval = null;

function startInterest() {
  if (interestInterval) return; // prevent multiple intervals

  interestInterval = setInterval(() => {
    const interest = balance * 0.10;
    balance += interest;

    const list = document.getElementById("transaction-list");
    const li = document.createElement("li");
    li.classList.add("income");
    li.textContent = `Interest +10% - ৳ ${interest.toFixed(2)}`;
    list.prepend(li);

    document.getElementById("balance").textContent = `৳ ${balance.toFixed(2)}`;
  }, 1000); // every 1 second
}

function stopInterest() {
  clearInterval(interestInterval);
  interestInterval = null;
}

function transferToBank() {
  if (balance <= 0) {
    alert("Insufficient balance to transfer.");
    return;
  }

  const transferAmount = balance;

  const list = document.getElementById("transaction-list");
  const li = document.createElement("li");
  li.classList.add("expense");
  li.textContent = `Transferred to Bank - ৳ ${transferAmount.toFixed(2)}`;
  list.prepend(li);

  balance = 0;
  document.getElementById("balance").textContent = `৳ ${balance.toFixed(2)}`;

  // Store transfer data and redirect
  localStorage.setItem("transferredAmount", transferAmount.toFixed(2));
  window.location.href = "wallet.html";
}

