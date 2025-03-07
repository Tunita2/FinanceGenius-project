function toggleAnswer(event) {
    var parent = event.currentTarget;
    var answer = parent.nextElementSibling;
    var icon = parent.querySelector("i");

    if (answer.style.display === "none" || answer.style.display === "") {
        answer.style.display = "block";
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
    } else {
        answer.style.display = "none";
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
    }
}