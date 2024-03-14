const user = prompt("Enter your name");

function scrollMessageBoxToBottom() {
  var messageBox = document.getElementsByClassName("messagebox")[0];
  messageBox.scrollTop = messageBox.scrollHeight;
}

// Get reference to the input box
const inputBox = document.getElementById("messageInput");
const mic = document.getElementById("mic");
const sendbtn = document.getElementById("sendbtn");

// Add event listener
inputBox.addEventListener("focus", function (event) {
  // This function will be called whenever the input value changes
  mic.classList.add("hidden");
  sendbtn.classList.remove("hidden");

  // You can perform any actions you need here
});

// Add event listener
inputBox.addEventListener("blur", function (event) {
  // This function will be called whenever the input blur
  if (inputBox.value === "") {
    mic.classList.remove("hidden");
    sendbtn.classList.add("hidden");
  }
  // You can perform any actions you need here
});

// // Add event listener
// inputBox.addEventListener("input", function (event) {
//   // This function will be called whenever the input blur

//   if (inputBox.value === "") {
//     sendbtn.classList.add("hidden");
//     mic.classList.remove("hidden");
//   }
//   // You can perform any actions you need here
// });

var socket = io();

var parentElement = document.querySelectorAll(".messagebox")[0];
var loadingElement = document.createElement("div");
loadingElement.classList.add("message-left");
loadingElement.classList.add("typing");
loadingElement.classList.add("ellipse");
loadingElement.innerHTML = `
            <p class="message-owner-tag">Bot</p>
            <p id="ellipsisAnimation"></p>
          `;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  var divElement = document.createElement("div");
  divElement.classList.add("message-right");
  divElement.innerHTML = `<p class="message-owner-tag">${user}</p>
            <p>${transcript}</p>`;
  // console.log(divElement);
  parentElement.appendChild(divElement);
  parentElement.appendChild(loadingElement);

  scrollMessageBoxToBottom();

  // console.log(parentElement);
  socket.emit("message", transcript);

  console.log("Speech Recognition Result:", transcript);
};

let isRecording = false;

document.getElementById("mic").addEventListener("click", function () {
  if (!isRecording) {
    // Start Speech Recognition
    recognition.start();
    isRecording = true;
    console.log("recording started");
  } else {
    // Stop Speech Recognition
    recognition.stop();
    isRecording = false;
    console.log("recording stop");
  }
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}
