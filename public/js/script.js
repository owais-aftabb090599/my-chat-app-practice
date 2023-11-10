
const sender_id = document.getElementById("sender_id").value;
const socket = io("/user-namespace", {
  auth: {
    token: sender_id
  }
});


const usersListUl = document.getElementById("usersListUl");
const startHead = document.querySelector(".start-head");
const chatSection = document.querySelector(".chat-section");
usersListUl.addEventListener("click", () => {
  startHead.style.display = "none";
  chatSection.style.display = "block";
});

const allUsers = async () => {
  try {
    const responce = await fetch(`http://localhost:8000/api/all-users`);
    const data = await responce.json();
    return data;
  } catch (error) {
    return error;
  }
};

allUsers()
  .then((data) => {
    if (data.users.length > 0) {
      const users = data.users;
      let html = "";
      users.forEach((user) => {
        html += `
            <li class="list-group-item cursor-pointer d-flex justify-content-between align-items-center">
                ${user.name}
                <span class="status-online"></span>
            </li>`;
      });
      usersListUl.innerHTML = html;
    } else {
      console.log("No Data");
    }
  })
  .catch((error) => {
    console.log(error);
  });
