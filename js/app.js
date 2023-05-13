window.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card"),
    input = document.querySelector(".form__input"),
    btn = document.querySelector(".form__btn"),
    repos = document.querySelector(".repos-wrapper");

  const URL = "https://api.github.com/users/";

  const getUser = async (username) => {
    const response = await fetch(URL + username);
    const data = await response.json();

    const responseRepos = await fetch(URL + username + "/repos");
    const dataRepos = await responseRepos.json();

    if (response.status === 200) {
      renderUserInfo(data);

      dataRepos.forEach((item) => {
        const elem = document.createElement("a");
        elem.classList.add("elem");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";

        card.classList.add("border");
        document.querySelector(".repos").style.display = "flex";
        repos.appendChild(elem);
      });

    } else if (response.status === 404) {
      onError();
      alert("User not found");
    } else {
      onError();
      alert("Something went wrong, try again later...");
    }
  };

  function renderUserInfo(data) {
    const {
      avatar_url,
      bio,
      company,
      email,
      followers,
      html_url,
      id,
      location,
      name,
      type,
    } = data;

    let cardInfo = `
      <div class="card-img flex-jc-aic">
        <img class="card-img__item" src="${avatar_url}" alt="${name} avatar" />
      </div>

      <div class="card-info info">
        <div class="info__name">${name}</div>
        <div class="info__bio">
          ${bio ? bio : "Here can be user bio..."}
        </div>

      <div class="info-additional additional flex-jsb-aic">
        <div class="additional__company">
          <span>Company</span>: ${company ? company : "No user company"}
        </div>
        <div class="additional__location"><span>Location</span>: ${
          location ? location : "No user location"
        }</div>
        <div class="additional__id"><span>User id</span>: ${id}</div>
        <div class="additional__type"><span>Type</span>: ${type}</div>
        <div class="additional__followers"><span>Followers</span>: ${followers}</div>
        <div class="additional__email"><span>Email</span>: ${
          email ? email : "No user email"
        }</div>
      </div>

      <div class="info-buttons">
        <a class="info-buttons" href="${html_url}" target="_blank"
          ><button class="info-buttons__btn btn">GitHub Profile</button></a>
      </div>
    `;

    card.innerHTML = cardInfo;
  }

  btn.addEventListener("click", () => {
    if (input.value !== "" && input.value.trim() !== "") {
      getUser(input.value.trim());
      input.value = "";
      repos.innerHTML = "";
    } else {
      alert("Type something...");
      input.value = "";
      onError();
    }
  });

  function onError() {
    card.innerHTML = `<h2 class="card__noUser">No user info yet...</h2>`;
    document.querySelector(".repos").style.display = "none";
    card.classList.remove("border");
  }
});
