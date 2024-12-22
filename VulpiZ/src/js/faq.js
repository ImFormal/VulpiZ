export function initializeFAQ() {
    const faqs = document.querySelectorAll(".faq");
    faqs.forEach(faq => {
        faq.removeEventListener("click", toggleFAQ);
        faq.addEventListener("click", toggleFAQ);
    });
}

function toggleFAQ(event) {
    event.currentTarget.classList.toggle("active");
}
