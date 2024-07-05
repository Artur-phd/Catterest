document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form[onsubmit="stopreload(this)"]').forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const button = form.querySelector('button.like');
            const span = button.querySelector('span');
            const currentLikes = parseInt(span.textContent, 10);

            // Disable the button to prevent multiple clicks
            button.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    span.textContent = currentLikes + 1; // Increment the like count
                    button.classList.add('liked'); // Add class to change button color
                } else {
                    button.disabled = false; // Re-enable the button if the request fails
                }
            } catch (error) {
                button.disabled = false; // Re-enable the button if there's an error
            }
        });
    });
});