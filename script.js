const orderDialog = document.querySelector("#order-dialog");
const orderTitle = document.querySelector("#order-title");
const orderMessage = document.querySelector("#order-message");
const cancelOrderButton = document.querySelector("#cancel-order");
const confirmOrderButton = document.querySelector("#confirm-order");
const continueOrderButton = document.querySelector("#continue-order");
const finishOrderButton = document.querySelector("#finish-order");
const closeOrderButton = document.querySelector("#close-order");
const quantityField = document.querySelector("#quantity-field");
const orderQuantity = document.querySelector("#order-quantity");
let selectedItem = "";
const orderItems = [];

document.querySelectorAll(".drink-price").forEach((priceButton) => {
	priceButton.addEventListener("click", () => {
		selectedItem = priceButton.dataset.drink || priceButton.dataset.food;
		orderQuantity.value = "1";
		orderTitle.textContent = "Cafe Sói";
		orderMessage.textContent = `Bạn muốn đặt món ${selectedItem} với số lượng bao nhiêu?`;
		quantityField.hidden = false;
		cancelOrderButton.hidden = false;
		confirmOrderButton.hidden = false;
		continueOrderButton.hidden = true;
		finishOrderButton.hidden = true;
		closeOrderButton.hidden = true;
		orderDialog.showModal();
	});
});

confirmOrderButton.addEventListener("click", () => {
	if (!orderQuantity.reportValidity()) {
		return;
	}

	const quantity = Number(orderQuantity.value);
	if (!Number.isSafeInteger(quantity) || quantity < 1) {
		orderQuantity.setCustomValidity("Vui lòng nhập số lượng là số nguyên lớn hơn 0.");
		orderQuantity.reportValidity();
		orderQuantity.setCustomValidity("");
		return;
	}

	orderItems.push({ name: selectedItem, quantity });
	orderMessage.textContent = `Đã thêm ${quantity} ${selectedItem} vào đơn. Bạn có muốn tiếp tục đặt hàng thêm không?`;
	quantityField.hidden = true;
	cancelOrderButton.hidden = true;
	confirmOrderButton.hidden = true;
	continueOrderButton.hidden = false;
	finishOrderButton.hidden = false;
});

continueOrderButton.addEventListener("click", () => {
	orderDialog.close();
});

finishOrderButton.addEventListener("click", () => {
	const summary = orderItems
		.map((item) => `${item.name} x${item.quantity}`)
		.join(", ");
	orderMessage.textContent = `Đơn hàng của bạn: ${summary}. Cảm ơn bạn đã đặt hàng!`;
	cancelOrderButton.hidden = true;
	confirmOrderButton.hidden = true;
	continueOrderButton.hidden = true;
	finishOrderButton.hidden = true;
	closeOrderButton.hidden = false;
	orderItems.length = 0;
});
