var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");

var siteList = [];
if (localStorage.getItem("siteList") !== null) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite();
}

function addSite() {
  // URL Validation
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  if (!urlPattern.test(siteUrlInput.value)) {
    alert("Invalid URL. Please enter a valid URL.");
    return;
  }

  var website = {
    name: siteNameInput.value,
    url: siteUrlInput.value
  };
  siteList.push(website);

  displaySite();
  localStorage.setItem("siteList", JSON.stringify(siteList));

  clearForm();
}

function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function displaySite() {
  cartona = "";
  for (let i = 0; i < siteList.length; i++) {
    cartona += `
      <tr>
        <td>${i}</td>
        <td>${siteList[i].name}</td>
        <td>
          <button onclick="visitUrl(${i})" class="btn btn-visit bg-info" data-index=>
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
          <button onclick="deleteUrl(${i})" class="btn btn-delete bg-danger pe-2" data-index="0">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
      </tr>
      `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function deleteUrl(Index) {
  siteList.splice(Index, 1);

  displaySite();
  localStorage.setItem("siteList", JSON.stringify(siteList));
}

function visitUrl(index) {
  console.log(index);
  // Redirect to the URL
  window.open(siteList[index].url, '_blank'); 
}
