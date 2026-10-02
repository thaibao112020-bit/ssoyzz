const feedbackForm = document.querySelector(".feedback-form");
const feedbackStatus = document.querySelector("#feedback-status");

feedbackForm.addEventListener("submit", (event) => {
	event.preventDefault();
	feedbackStatus.textContent = "Cảm ơn bạn đã gửi góp ý!";
	feedbackStatus.hidden = false;
});
