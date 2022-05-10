var sum = function (acc, x) {
  return acc + x;
};
var updateSubTotal = function (ele) {
  var itemQuantity = Number(`${$(ele).find(".quantity input").val()}`);
  var itemPrice = Number(
    `${$(ele).children(".price").text()}`.replace(/[^0-9\\.]+/g, '')
  );

  var subTotal = itemQuantity * itemPrice;
  if (subTotal >= 0) {
    $(ele)
      .children(".subtotal")
      .html(`$${parseFloat(Math.round(subTotal * 100) / 100).toFixed(2)}`);
  }
  return subTotal;
};
var updateTotal = function () {
  var allSubTotals = [];

  $("tbody tr").each(function (i, ele) {
    var subTotal = updateSubTotal(ele);
    allSubTotals.push(subTotal || 0); // push result of subtotal function to array or a zero if NaN
  });

  if (allSubTotals.length == 0) {
    $("#totalCart").html(`$--.--`);
  } else {
    var totalCart = allSubTotals.reduce(sum);
    $("#totalCart").html(
      `$${parseFloat(Math.round(totalCart * 100) / 100).toFixed(2)}`
    );
  }
};

$(document).ready(function () {
  updateTotal();
  // Remove button
  $("body").on("click", ".remove", function (event) {
    $(this).closest("tr").remove();
    updateTotal();
  });

  //Update cart
  var timeout;
  $("body").on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 500);
  });

  //Add item
  $("#addItem").on("submit", function (event) {
    event.preventDefault();
    var item = $(this).children(".item").val();
    var price = $(this).children(".price").val();
    //Append item to page
    $("tbody").append(`<tr> 
  <td class="item">${item}</td>
  <td class="price">$${price}</td>
  <td class="quantity">
    <label>QTY</label><input type="number" min="0" value="1"/>
    <button class="btn btn-danger btn-sm remove">&#10005;</button>
  </td>
  <td class="subtotal"></td>
  </tr>`);
    
    updateTotal();
    $(this).children(".item").val("");
    $(this).children(".price").val("");
  });
});