// document.addEventListener('DOMContentLoaded', function() {
//     const currentPage = window.location.pathname.replace(/^\/+/, '');

//     if (document.querySelector(".cancel")) {
//         document.querySelector(".cancel").addEventListener("click", function () {
//             window.location.href = "/view-reminders";
//         });
//     }
    
//     if (currentPage === "view-reminders/create-reminder") {
//         setupCreateReminderPage();
//     }
//     if (currentPage === "view-reminders/edit-reminder") {
//         setupEditReminderPage();
//     }
//     if (currentPage === "view-reminders") {
//         setupViewRemindersPage();
//     }
// });

// function setupCreateReminderPage() {
//     document.querySelector(".btn-save").addEventListener("click", function () {
//         let name = document.getElementById("reminder-name").value.trim();
//         let amount = document.getElementById("reminder-amount").value.trim();
//         let dueDate = document.getElementById("reminder-date").value;
//         let frequency = document.getElementById("reminder-frequency").value;
//         let method = document.getElementById("reminder-method").value;
//         let notification = document.getElementById("reminder-notification").value;

//         if (name === "" || amount === "" || dueDate === "") {
//             alert("Vui lòng điền đầy đủ thông tin!");
//             return;
//         }

//         let newReminder = {
//             name,
//             amount,
//             dueDate: formatDate(dueDate),
//             frequency,
//             paymentMethod: method,
//             notification,
//             completed: false
//         };

//         let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//         reminders.push(newReminder);
//         localStorage.setItem("reminders", JSON.stringify(reminders));

//         window.location.href = window.location.origin + "/view-reminders";
//     });
// }


// function setupEditReminderPage() {
//     let editReminderIndex = -1;
//     let originalReminder = null;
//     originalReminder = JSON.parse(localStorage.getItem("editReminder"));
//     if (localStorage.getItem("editReminderIndex")) {
//         editReminderIndex = parseInt(localStorage.getItem("editReminderIndex"));
//     }
//     if (originalReminder) {
//         document.getElementById("name").value = originalReminder.name || "";
//         document.getElementById("amount").value = originalReminder.amount || "";
//         let dueDate = originalReminder.dueDate || "";
//         if (dueDate.includes('/')) {
//             const parts = dueDate.split('/');
//             if (parts.length === 3) {
//                 dueDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
//             }
//         }
//         document.getElementById("dueDate").value = dueDate;
//         if (originalReminder.frequency) {
//             document.getElementById("frequency").value = originalReminder.frequency;
//         }
//         if (originalReminder.paymentMethod) {
//             document.getElementById("paymentMethod").value = originalReminder.paymentMethod;
//         }
//         if (originalReminder.notification) {
//             document.getElementById("notification").value = originalReminder.notification;
//         }
//     }
//     if (document.querySelector(".btn-save")) {
//         document.querySelector(".btn-save").addEventListener("click", function() {
//             saveEditedReminder(originalReminder, editReminderIndex);
//         });
//     }
// }

// function setupViewRemindersPage() {
//     let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//     let reminderList = document.getElementById("reminderList");
//     document.getElementById("upcoming-tab").addEventListener("click", function () {
//         renderReminders("upcoming");
//         setActiveTab("upcoming-tab");
//     });
//     document.getElementById("overdue-tab").addEventListener("click", function () {
//         renderReminders("overdue");
//         setActiveTab("overdue-tab");
//     });

//     document.getElementById("completed-tab").addEventListener("click", function () {
//         renderReminders("completed");
//         setActiveTab("completed-tab");
//     });
//     renderReminders();
// }

// function renderReminders(filter = "upcoming") {
//     const reminderList = document.getElementById("reminderList");
//     const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    
//     reminderList.innerHTML = "";
//     let now = new Date();
//     let filteredReminders = reminders.filter(reminder => {
//         let dueDateParts = reminder.dueDate.split('/');
//         let dueDate;
//         if (dueDateParts.length === 3) {
//             dueDate = new Date(dueDateParts[2], dueDateParts[1] - 1, dueDateParts[0]);
//         } else {
//             dueDate = new Date(reminder.dueDate);
//         }
//         if (filter === "upcoming") return dueDate >= now && !reminder.completed;
//         if (filter === "overdue") return dueDate < now && !reminder.completed;
//         if (filter === "completed") return reminder.completed;
//     });
//     if (filteredReminders.length === 0) {
//         reminderList.innerHTML = "<p class='text-center'>Không có lời nhắc nào.</p>";
//         return;
//     }
//     filteredReminders.forEach((reminder) => {
//         const originalIndex = reminders.findIndex(r =>
//             r.name === reminder.name &&
//             r.dueDate === reminder.dueDate &&
//             r.amount === reminder.amount
//         );
//         let reminderItem = document.createElement("div");
//         reminderItem.className = "reminder-item";
//         reminderItem.innerHTML = `
//             <div>
//                 <strong>${reminder.name}</strong> - ${reminder.amount} VND<br>
//                 <small>${reminder.dueDate}</small>
//             </div>
//             <div>
//                 <i class="fas fa-check text-success" onclick="markComplete(${originalIndex})" style="cursor: pointer;"></i>
//                 <i class="fas fa-pencil-alt text-warning ms-2" onclick="goToEditReminder(${originalIndex} )" style="cursor: pointer;"></i>
//                 <i class="fas fa-trash text-secondary ms-2" onclick="deleteReminder(${originalIndex})" style="cursor: pointer;"></i>
//             </div>
//         `;
//         reminderList.appendChild(reminderItem);
//     });
// }

// function markComplete(index) {
//     let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//     reminders[index].completed = true;
//     localStorage.setItem("reminders", JSON.stringify(reminders));
//     renderReminders(getCurrentActiveTab());
// }

// function goToEditReminder(index) {
//     let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//     localStorage.setItem("editReminder", JSON.stringify(reminders[index]));
//     localStorage.setItem("editReminderIndex", index);
//     window.location.href = "/view-reminders/edit-reminder";
// }


// function deleteReminder(index) {
//     if (confirm("Bạn có chắc muốn xóa lời nhắc này?")) {
//         let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//         reminders.splice(index, 1);
//         localStorage.setItem("reminders", JSON.stringify(reminders));
//         renderReminders(getCurrentActiveTab());
//     }
// }

// function getCurrentActiveTab() {
//     if (document.getElementById("upcoming-tab").classList.contains("active")) return "upcoming";
//     if (document.getElementById("overdue-tab").classList.contains("active")) return "overdue";
//     if (document.getElementById("completed-tab").classList.contains("active")) return "completed";
//     return "upcoming"; 
// }

// function setActiveTab(activeTabId) {
//     document.querySelectorAll(".filter-tabs button").forEach(button => {
//         button.classList.remove("active");
//     });
//     document.getElementById(activeTabId).classList.add("active");
// }

// function saveEditedReminder(originalReminder, editReminderIndex) {
//     let updatedReminder = {
//         name: document.getElementById("name").value,
//         amount: document.getElementById("amount").value,
//         dueDate: formatDate(document.getElementById("dueDate").value),
//         frequency: document.getElementById("frequency").value,
//         paymentMethod: document.getElementById("paymentMethod").value,
//         notification: document.getElementById("notification").value,
//         completed: originalReminder ? originalReminder.completed || false : false
//     };
//     let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
//     if (editReminderIndex >= 0 && editReminderIndex < reminders.length) {
//         reminders[editReminderIndex] = updatedReminder;
//         console.log("Cập nhật lời nhắc tại chỉ mục:", editReminderIndex);
//     } else {
//         const index = reminders.findIndex(r =>
//             r.name === originalReminder.name &&
//             r.dueDate === originalReminder.dueDate &&
//             r.amount === originalReminder.amount
//         );
//         if (index !== -1) {
//             reminders[index] = updatedReminder;
//             console.log("Cập nhật lời nhắc tìm thấy tại chỉ mục:", index);
//         } else {
//             console.log("Không tìm thấy lời nhắc cần cập nhật, thêm mới");
//             reminders.push(updatedReminder);
//         }
//     }
//     localStorage.setItem("reminders", JSON.stringify(reminders));
//     localStorage.removeItem("editReminder");
//     localStorage.removeItem("editReminderIndex");
//     window.location.href = window.location.origin + "/view-reminders";
// }

// function formatDate(dateString) {
//     if (!dateString) return "";
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) {
//             return dateString;
//         }
//         const day = date.getDate().toString().padStart(2, '0');
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     } catch (error) {
//         console.error("Lỗi khi định dạng ngày:", error);
//         return dateString;
//     }
// }
