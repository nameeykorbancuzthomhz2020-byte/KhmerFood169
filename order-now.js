const orderForm = document.querySelector("#order-form");
const fulfillmentInput = document.querySelector("#fulfillment");
const addressField = document.querySelector("#address-field");
const addressInput = document.querySelector("#delivery-address");
const orderResult = document.querySelector("#order-result");
const orderSummary = document.querySelector("#order-summary");

function updateAddressRequirement() {
  const isDelivery = fulfillmentInput.value === "delivery";
  addressField.hidden = !isDelivery;
  addressInput.required = isDelivery;
}

fulfillmentInput.addEventListener("change", updateAddressRequirement);
updateAddressRequirement();

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const food = formData.get("food");
  const quantity = formData.get("quantity");
  const fulfillment = formData.get("fulfillment");
  const destination = fulfillment === "delivery" ? "for delivery" : "for pickup";

  orderSummary.textContent = `${quantity} × ${food} ${destination}.`;
  orderResult.hidden = false;
  orderResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
