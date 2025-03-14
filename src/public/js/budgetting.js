document.addEventListener("DOMContentLoaded", function () {
  // Xử lý nút quay lại
  document.querySelector(".back-btn").addEventListener("click", function () {
    window.history.back();
  });


  // Cập nhật tiến độ quỹ
  function updateProgress(amount, goal) {
    let percentage = (amount / goal) * 100;
    let progressBar = document.querySelector(".progress");
    progressBar.style.width = percentage + "%";
  }

  // Gọi hàm cập nhật tiến độ ban đầu
  updateProgress(200000, 3000000);

  // Xử lý sự kiện khi chọn các loại quỹ gợi ý
  document.querySelectorAll(".fund-option").forEach((option) => {
    option.addEventListener("click", function () {
      let type = this.innerText;
      alert("Bạn đã chọn: " + type);
    });
  });

  // Xử lý mở hộp thoại tạo quỹ
  const addFundBtn = document.querySelector(".add-fund-btn");
  const fundPopup = document.querySelector(".fund-popup");
  const overlay = document.querySelector(".overlay");
  const confirmBtn = document.querySelector(".confirm-btn");
  const body = document.body;

  addFundBtn.addEventListener("click", function () {
    overlay.classList.add("show"); // Hiện nền mờ
    fundPopup.classList.add("show"); // Hiện hộp thoại
    body.style.overflow = "hidden"; // Ngăn cuộn trang
  });

  // Khi bấm "Xác nhận" hoặc bấm ra ngoài hộp thoại
  overlay.addEventListener("click", closePopup);
  confirmBtn.addEventListener("click", closePopup);

  // Hàm đóng hộp thoại
  function closePopup() {
    fundPopup.classList.remove("show");
    overlay.classList.remove("show");
    body.style.overflow = "auto";
  }
});

document.querySelectorAll(".fund-option1").forEach((option) => {
  option.addEventListener("click", function () {
    // Bỏ chọn tất cả các mục khác
    document.querySelectorAll(".fund-option1").forEach((opt) => {
      opt.classList.remove("selected");
    });

    // Thêm class "selected" vào mục được chọn
    this.classList.add("selected");
  });
});

function addFunds() {
  alert("Tính năng Góp quỹ đang được phát triển!");
}

function confirmTransaction() {
  let amount = document.getElementById("amount").value;
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value;

  if (!amount || !date || !description) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  alert(
    `Đã thêm giao dịch:\nSố tiền: ${amount}đ\nNgày: ${date}\nMô tả: ${description}`
  );
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("description").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".deleteBud").forEach((button) => {
    button.addEventListener("click", function () {
      let budgetId = this.getAttribute("data-id");
      if (confirm("Bạn có chắc muốn xóa quỹ này không?")) {
        fetch("/delete-budget", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ budgetId: budgetId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("Xóa quỹ thành công!");
              location.reload(); // Tải lại trang sau khi xóa
            } else {
              alert("Lỗi khi xóa quỹ!");
            }
          })
          .catch((error) => {
            console.error("Lỗi:", error);
          });
      }
    });
  });
});

document.querySelectorAll(".fund-amount").forEach((el) => {
  el.textContent = Number(el.textContent).toLocaleString("vi-VN") + " VND";
});

document.querySelectorAll(".balance").forEach((el) => {
  el.textContent = Number(el.textContent).toLocaleString("vi-VN") + " VND";
});