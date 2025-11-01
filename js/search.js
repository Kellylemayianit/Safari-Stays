// Place it in a new file: js/search.js

document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchBtn = document.querySelector('.row.g-2 .btn-dark');
    const propertyTypeSelect = document.querySelectorAll('.form-select')[0];
    const roomTypeSelect = document.querySelectorAll('.form-select')[1];
    const searchKeywordInput = document.querySelector('.form-control[placeholder="Search Keyword"]');

    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const propertyType = propertyTypeSelect.value;
            const roomType = roomTypeSelect.value;
            const keyword = searchKeywordInput.value;
            const currentPage = window.location.pathname;

            // Check if we're on property-list page
            if (currentPage.includes('property-list.html') || currentPage.includes('property-list')) {
                // Filter on current page
                filterProperties(propertyType, roomType, keyword);
            } else {
                // Redirect to property-list with filters
                let url = 'property-list.html?type=' + encodeURIComponent(propertyType) + '&room=' + encodeURIComponent(roomType) + '&keyword=' + encodeURIComponent(keyword);
                window.location.href = url;
            }
        });
    }
});

// Function to filter properties on property-list page
function filterProperties(propertyType, roomType, keyword = '') {
    const tabs = document.querySelectorAll('.tab-pane');
    let targetTab = null;

    // Determine which tab to show based on property type
    if (propertyType === 'Airbnb') {
        targetTab = document.getElementById('tab-1');
    } else if (propertyType === 'Hotel') {
        targetTab = document.getElementById('tab-2');
    } else if (propertyType === 'Lodges') {
        targetTab = document.getElementById('tab-3');
    } else {
        // If no specific type, show first tab (Airbnb) by default
        targetTab = document.getElementById('tab-1');
    }

    // Hide all tabs
    tabs.forEach(tab => {
        tab.classList.remove('show', 'active');
    });

    // Show target tab
    if (targetTab) {
        targetTab.classList.add('show', 'active');

        // Filter properties by room type and keyword
        const propertyItems = targetTab.querySelectorAll('.property-item');
        propertyItems.forEach(item => {
            const roomDisplay = item.querySelector('.d-flex.border-top small:first-child');
            const propertyName = item.querySelector('h5.fw-bold, a.h5');
            const propertyLocation = item.querySelector('p');
            
            let showRoom = true;
            let showKeyword = true;

            // Check room type
            if (roomType !== 'Room Type' && roomDisplay) {
                const roomText = roomDisplay.textContent.trim();
                showRoom = roomText.includes(roomType);
            }

            // Check keyword (search in property name, location, and price)
            if (keyword.trim() !== '') {
                const nameText = propertyName ? propertyName.textContent.toLowerCase() : '';
                const locationText = propertyLocation ? propertyLocation.textContent.toLowerCase() : '';
                const priceText = item.querySelector('h5.text-primary') ? item.querySelector('h5.text-primary').textContent.toLowerCase() : '';
                const keywordLower = keyword.toLowerCase();
                showKeyword = nameText.includes(keywordLower) || locationText.includes(keywordLower) || priceText.includes(keywordLower);
            }

            // Show or hide property
            if (showRoom && showKeyword) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    }
}

// Auto-apply filters if coming from search redirect
window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    const roomParam = params.get('room');
    const keywordParam = params.get('keyword');

    if (typeParam || roomParam || keywordParam) {
        filterProperties(typeParam || 'Property Type', roomParam || 'Room Type', keywordParam || '');
        
        // Update dropdowns to show selected values
        const propertyTypeSelect = document.querySelectorAll('.form-select')[0];
        const roomTypeSelect = document.querySelectorAll('.form-select')[1];
        const searchKeywordInput = document.querySelector('.form-control[placeholder="Search Keyword"]');
        
        if (typeParam && propertyTypeSelect) propertyTypeSelect.value = typeParam;
        if (roomParam && roomTypeSelect) roomTypeSelect.value = roomParam;
        if (keywordParam && searchKeywordInput) searchKeywordInput.value = decodeURIComponent(keywordParam);
    }
});

(function() {
    const searchForm = document.querySelector('.container-fluid.bg-primary');
    if (!searchForm) return;

    function filterProperties() {
        const keyword = document.querySelector('input[placeholder="Search Keyword"]').value.toLowerCase();
        const propertyType = document.querySelector('select:nth-of-type(1)').value;
        const roomType = document.querySelector('select:nth-of-type(2)').value;

        const results = window.findProperties({
            type: propertyType !== 'Property Type' ? propertyType : null,
            keyword: keyword,
            roomType: roomType !== 'Room Type' ? roomType : null
        });

        // Fade out current items
        document.querySelectorAll('.property-item').forEach(item => {
            item.style.opacity = '0.5';
            item.style.transform = 'scale(0.95)';
        });

        // Show matching items with animation
        setTimeout(() => {
            document.querySelectorAll('.property-item').forEach(item => {
                const id = item.querySelector('[data-prop-id]')?.getAttribute('data-prop-id');
                const show = results.some(r => r.id === id);
                item.style.display = show ? 'block' : 'none';
                if (show) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }
            });
        }, 300);
    }

    // Add event listeners
    searchForm.querySelector('input').addEventListener('input', filterProperties);
    searchForm.querySelectorAll('select').forEach(select => 
        select.addEventListener('change', filterProperties)
    );
    searchForm.querySelector('button').addEventListener('click', filterProperties);
})();