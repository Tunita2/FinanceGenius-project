let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Ẩn tất cả slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("is-active");
        dots[i].classList.remove("is-active");
    }

    // Hiển thị slide hiện tại
    slides[slideIndex - 1].classList.add("is-active");
    dots[slideIndex - 1].classList.add("is-active");
}