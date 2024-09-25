const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");
const calculator = document.querySelector('.calculator');

keys.addEventListener("click", (e) => {
  // todo Kiểm tra user click đúng vào các tag button
  if (e.target.matches("button")) {
    // todo tiếp theo, ta có thể dùng data-action trong DOM để xác định kiểu key cần clicked
    const key = e.target;
    const action = key.dataset.action;

    if (action === "clear") {
      console.log("clear key");
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
      //todo chúng ta muốn cập nhật màn hình hiển thị thành phím đã nhấp. Trước khi thực hiện, chúng ta cần một cách để biết phím trước đó có phải là phím toán tử hay không.
      calculator.dataset.previousKeyType = 'operator';
      // *lưu giá trị đầu( giá trị trước khi cleared) và toán tử đã chọn
      calculator.dataset.firstValue = displayNum
      calculator.dataset.operator = action
    }
    const previousKeyType = calculator.dataset.previousKeyType
    if (!action) {
      if (displayNum === '0' || previousKeyType === 'operator') {
        display.textContent = digit
      } else {
        display.textContent =  + digit
      }
      
    }
    // todo thực hiện phép tính khi click enter
    if (action === 'calculate') {
      // *lấy giá trị thứ hai ( giá trị hiện tại )
      let secondValue = displayNum
      const operator = calculator.dataset.operator
      let firstValue = calculator.dataset.firstValue

  display.textContent = calculate(firstValue, operator, secondValue)

    }
  }

});


function calculate(firstValue, operator, secondValue) {
  let result = '';
  switch (operator) { 
    case 'add':
      result = parseFloat(firstValue) + parseFloat(secondValue);
      break;
      
    case'subtract':
      result = parseFloat(firstValue) - parseFloat(secondValue);
      break;
    case 'multiply':
      result = parseFloat(firstValue) * parseFloat(secondValue);
      break;
    case 'divide':
      if (parseFloat(secondValue) === 0) {
        result = 'Error'
      } else {
        result = parseFloat(firstValue) / parseFloat(secondValue);
      }
      break;
      
    // case 'exponentiation':
  
    default:
      result = parseFloat(secondValue);
      
  }
  // todo ta cần làm tròn các số có thập phân gần bằng 0 
  if (Math.abs(result - Math.round(result)) < 0.01) {
    // *Làm tròn nếu phần thập phân gần bằng 0
    return Math.round(result);
  }
  return parseFloat(result.toFixed(8));
}

