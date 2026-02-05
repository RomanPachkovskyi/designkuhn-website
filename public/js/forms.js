"use sctrict";

const feedbackEllipse = document.getElementById("feedbackEllipse");
const feedbackGive = document.getElementById("feedbackGive");
const btnFeedback = document.getElementById("submitFormFeedback");
const ellipseContactSend = document.getElementById("ellipseContactSend");
const btnContact = document.getElementById("submitFormBtn");
const linkContact = document.getElementById("submitFormLink");
const spinnerBtnFeedback = document.getElementById("spinnerFeedback");
const spinnerContact = document.getElementById("spinnerContact");
const feedbackForm = document.getElementById("feedbackForm");
const contactForm = document.getElementById("contactForm");
const errorFeedback = document.getElementById("errorFeedback");
const alertContact = document.getElementById("alertContact");
const feedbackName = document.getElementById("feedbackName");
const feedbackLink = document.getElementById("feedbackLink");
const feedbackMessage = document.getElementById("feedbackMessage");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputTel = document.getElementById("inputTel");
const inputKomm = document.getElementById("inputKomm");

const counter = document.getElementById("counterFeedback");
const maxLength = feedbackMessage
  ? parseInt(feedbackMessage.getAttribute("maxlength"))
  : null;

const submitContactForm = async () => {
  contactForm.querySelectorAll(".alert").forEach((alertDiv) => {
    alertDiv.parentNode.removeChild(alertDiv);
  });

  contactForm.querySelectorAll("input, textarea").forEach((input) => {
    input.style.borderColor = "black";
  });

  spinnerContact.classList.remove("d-none");
  ellipseContactSend.classList.add("d-none");

  const formData = {
    inputName: inputName.value,
    inputEmail: inputEmail.value,
    inputTel: inputTel.value,
    inputKomm: inputKomm.value,
  };

  try {
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      data.errors.forEach((err) => {
        const currInput = document.getElementById(err.path);
        currInput.insertAdjacentHTML(
          "beforebegin",
          `<div class="alert alert-danger" role="alert">${err.msg}</div>`
        );
        currInput.style.borderColor = "red";
      });
    } else {
      inputName.value = "";
      inputEmail.value = "";
      inputTel.value = "";
      inputKomm.value = "";
      alertContact.innerHTML = data.success
        ? `<div class="alert alert-success" role="alert">${data.msg}</div>`
        : `<div class="alert alert-danger" role="alert">${data.msg}</div>`;
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    spinnerContact.classList.add("d-none");
    ellipseContactSend.classList.remove("d-none");
  }
};

btnContact.addEventListener("click", (event) => {
  event.preventDefault();

  submitContactForm();
});

linkContact.addEventListener("click", function (event) {
  event.preventDefault();

  window.location.href = "#contact-form";
  submitContactForm();
});

if (btnFeedback) {
  btnFeedback.addEventListener("click", async function (e) {
    e.preventDefault();

    feedbackForm.querySelectorAll(".alert").forEach((alertDiv) => {
      alertDiv.parentNode.removeChild(alertDiv);
    });

    feedbackForm.querySelectorAll("input, textarea").forEach((input) => {
      input.style.borderColor = "black";
    });

    btnFeedback.disabled = true;
    spinnerBtnFeedback.classList.remove("d-none");

    const formData = {
      feedbackName: feedbackName.value,
      feedbackLink: feedbackLink.value,
      feedbackMessage: feedbackMessage.value,
    };

    try {
      const response = await fetch("/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errorsFeedback) {
        data.errorsFeedback.forEach((err) => {
          const currInput = document.getElementById(err.path);
          currInput.insertAdjacentHTML(
            "beforebegin",
            `<div class="alert alert-danger" role="alert">${err.msg}</div>`
          );
          currInput.style.borderColor = "red";
        });
      } else {
        feedbackName.value = "";
        feedbackLink.value = "";
        feedbackMessage.value = "";
        errorFeedback.innerHTML = data.success
          ? `<div class="alert alert-success" role="alert">${data.msg}</div>`
          : `<div class="alert alert-danger" role="alert">${data.msg}</div>`;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      btnFeedback.disabled = false;
      spinnerBtnFeedback.classList.add("d-none");
      counter.textContent = `${maxLength}/${maxLength}`;
      counter.style.color = "black";
    }
  });
}

if (feedbackEllipse) {
  feedbackEllipse.addEventListener("click", function () {
    feedbackGive.click();
  });
}

function updateCounter() {
  let currentLength = feedbackMessage.value.length;
  let charactersLeft = maxLength - currentLength;
  counter.textContent = `${charactersLeft}/${maxLength}`;
  if (charactersLeft === 0) {
    counter.style.color = "red";
  } else {
    counter.style.color = "black";
  }
}
