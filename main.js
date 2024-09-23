const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  // todo Kiểm tra user click đúng vào các tag button
  if (e.target.matches("button")) {
    // todo tiếp theo, ta có thể dùng data-action trong DOM để xác định kiểu key cần clicked
    const key = e.target;
    const action = key.dataset.action;

    if (action === "clear") {
      console.log("clear key");
    }
    if (action === "calculate") {
      console.log("calculate key");
    }

    // !chúng ta cần chú ý 2 điều:
    // ? số đã được click
    // ?số đang hiển thị

    const digit = key.textContent;
    const displayNum = display.textContent;
    // todo nếu máy tính hiển thị 0, ta muốn nó thay đổi display theo num user click key
    if (!action) {
      // *tránh lặp chuỗi 0
      if (displayNum === "0") {
        display.textContent = digit;
      } else {
        display.textContent = displayNum + digit;
      }
      // todo thêm dấu thập phân
    }
    if (action === "decimal") {
      if (!displayNum.includes(",")) display.textContent = displayNum + ",";
    }
    // todo khi user click toán tử nào , ta phải biểu diễn cho họ biết họ dang dùng toán tử nào */
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-keydown")
    );
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-keydown");
    }
  }
});

