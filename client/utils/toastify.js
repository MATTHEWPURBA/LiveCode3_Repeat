import Toastify from "toastify-js";

export default function showToast(message = "Error Default Client") {
  Toastify({
    text: message,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "red",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
