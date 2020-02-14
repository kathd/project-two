const navMenu = document.getElementById('js-navbar-toggle');

function smallNav() {
  const links = document.querySelector(".main-nav");
  if (links.style.display === "flex") {
    links.style.display = "none";
  } else {
    links.style.display = "flex";
  }
}

navMenu.onclick = smallNav;