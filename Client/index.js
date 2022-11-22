document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3001/get")
    .then((res) => res.json())
    .then(data + loadSessionData(["data"]));
});

function loadSessionData(data) {
  const table = document.querySelector("table tbody");
  console.log(data);

  let tableHtml = "";
  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data'>No Data</td></tr>";
  }
}
