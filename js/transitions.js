(function() {
    const loader = document.querySelector('.loading-overlay');

    // Show loading overlay
    function showLoader() {
        loader.style.display = 'flex';
    }

    // Hide loading overlay
    function hideLoader() {
        loader.style.display = 'none';
    }

    // Handle image loading
    document.querySelectorAll('.property-item img').forEach(img => {
        img.style.opacity = '0';
        img.onload = function() {
            this.classList.add('loaded');
        }
    });

    // Show loader before page navigation
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && !link.target && !e.ctrlKey && !e.shiftKey) {
            showLoader();
        }
    });

    // Handle tab transitions
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            showLoader();
            setTimeout(hideLoader, 300); // Hide after transition
        });
    });

    // Hide loader when page is fully loaded
    window.addEventListener('load', hideLoader);

    // Expose loader functions globally
    window.showLoader = showLoader;
    window.hideLoader = hideLoader;
})();
