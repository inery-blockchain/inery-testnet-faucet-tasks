const submitBtn = document.getElementById("submitBtn");
const dataInput = document.getElementById("dataInput");
const status = document.getElementById("status");

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  const data = dataInput.value;

  // code to send data to Inery Blockchain using its API goes here
  // ...

  status.innerHTML = "Data submitted successfully to Inery Blockchain";
});
