// FAQ Accordion Toggle
document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                // Close any open answers
                document.querySelectorAll('.faq-answer').forEach(faqAnswer => {
                    faqAnswer.style.display = 'none';
                });
                // Open the clicked answer
                answer.style.display = 'block';
            }
        });
    });
});
