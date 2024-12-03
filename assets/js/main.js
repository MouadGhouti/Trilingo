document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons
    document.querySelector('.navbar a[href="#home"]').addEventListener('click', () => {
        window.location.href = '/';
    });

    document.querySelector('.navbar a[href="#courses"]').addEventListener('click', () => {
        window.location.href = '/course-page';
    });

    document.querySelector('.navbar a[href="#pricing"]').addEventListener('click', () => {
        window.location.href = '/#pricing';
    });

    document.querySelector('.navbar a[href="#contact"]').addEventListener('click', () => {
        window.location.href = '/#footer';
    });

    // Explore Courses button
    document.querySelector('.explore-btn').addEventListener('click', () => {
        window.location.href = '/course-list';
    });

    // View Pricing button
    document.querySelector('.pricing-btn').addEventListener('click', () => {
        window.location.href = '/#pricing';
    });

    // Get It Now buttons
    document.querySelectorAll('.get-it-now').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/check-auth', { method: 'GET', credentials: 'include' });
                const result = await response.json();

                if (result.isAuthenticated) {
                    window.location.href = '/course-page';
                } else {
                    window.location.href = '/log-in';
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        });
    });

    // Get Started buttons
    document.querySelectorAll('.get-started').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/course-page';
        });
    });
});
