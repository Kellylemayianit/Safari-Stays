// ==========================================
// FIXED SEARCH FUNCTIONALITY
// Place this in: js/search.js
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get search button and inputs
    const searchBtn = document.querySelector('.btn-dark[class*="w-100"]');
    const searchInput = document.querySelector('input[placeholder="Search Keyword"]');
    const propertyTypeSelect = document.querySelectorAll('.form-select')[0];
    const roomTypeSelect = document.querySelectorAll('.form-select')[1];

    if (!searchBtn) return;

    // Handle search button click
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });

    // Handle Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Auto-filter when dropdowns change (optional)
    if (propertyTypeSelect) {
        propertyTypeSelect.addEventListener('change', performSearch);
    }

    function performSearch() {
        const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const propertyType = propertyTypeSelect ? propertyTypeSelect.value : 'Property Type';
        const roomType = roomTypeSelect ? roomTypeSelect.value : 'Room Type';

        console.log('Search:', { keyword, propertyType, roomType }); // Debug

        // Get current page
        const currentPage = window.location.pathname;

        // If on property-list page, filter directly
        if (currentPage.includes('property-list')) {
            filterPropertiesOnPage(keyword, propertyType, roomType);
        } else {
            // Redirect to property-list with search params
            const params = new URLSearchParams();
            if (keyword) params.append('keyword', keyword);
            if (propertyType !== 'Property Type') params.append('type', propertyType);
            if (roomType !== 'Room Type') params.append('room', roomType);
            
            window.location.href = 'property-list.html?' + params.toString();
        }
    }

    // Filter properties on the current page
    function filterPropertiesOnPage(keyword, propertyType, roomType) {
        let activeTabId = null;

        // Determine which tab to show based on property type
        if (propertyType === 'Airbnb') {
            activeTabId = 'tab-1';
        } else if (propertyType === 'Hotel') {
            activeTabId = 'tab-2';
        } else if (propertyType === 'Lodges') {
            activeTabId = 'tab-3';
        }

        // Switch tabs if property type is selected
        if (activeTabId) {
            switchToTab(activeTabId);
        }

        // Get all property items in all tabs
        const allTabs = document.querySelectorAll('.tab-pane');
        let visibleCount = 0;

        allTabs.forEach(tab => {
            const properties = tab.querySelectorAll('.col-lg-4, .col-md-6');
            
            properties.forEach(propertyCol => {
                const propertyItem = propertyCol.querySelector('.property-item');
                if (!propertyItem) return;

                // Get property details
                const nameElement = propertyItem.querySelector('a.h5, .h5');
                const locationElement = propertyItem.querySelector('p');
                const priceElement = propertyItem.querySelector('.text-primary');
                const roomSizeElement = propertyItem.querySelector('.border-top small:first-child');

                const name = nameElement ? nameElement.textContent.toLowerCase() : '';
                const location = locationElement ? locationElement.textContent.toLowerCase() : '';
                const price = priceElement ? priceElement.textContent.toLowerCase() : '';
                const roomSize = roomSizeElement ? roomSizeElement.textContent.toLowerCase() : '';

                // Check if property matches filters
                let matchesKeyword = true;
                let matchesRoomType = true;

                // Keyword search (checks name, location, price)
                if (keyword) {
                    matchesKeyword = name.includes(keyword) || 
                                   location.includes(keyword) || 
                                   price.includes(keyword);
                }

                // Room type filter
                if (roomType !== 'Room Type') {
                    matchesRoomType = roomSize.includes(roomType.toLowerCase());
                }

                // Show or hide property
                if (matchesKeyword && matchesRoomType) {
                    propertyCol.style.display = 'block';
                    visibleCount++;
                } else {
                    propertyCol.style.display = 'none';
                }
            });
        });

        // Show "no results" message if needed
        showNoResultsMessage(visibleCount);
    }

    // Switch to specific tab
    function switchToTab(tabId) {
        // Remove active from all tabs
        document.querySelectorAll('.tab-pane').forEach(tab => {
            tab.classList.remove('show', 'active');
        });

        // Add active to target tab
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
            targetTab.classList.add('show', 'active');
        }

        // Update tab buttons
        document.querySelectorAll('.nav-pills .btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const targetBtn = document.querySelector(`[href="#${tabId}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }

    // Show/hide "no results" message
    function showNoResultsMessage(visibleCount) {
        // Remove existing message
        const existingMsg = document.querySelector('.no-results-message');
        if (existingMsg) existingMsg.remove();

        if (visibleCount === 0) {
            // Create "no results" message
            const activeTab = document.querySelector('.tab-pane.active');
            if (activeTab) {
                const message = document.createElement('div');
                message.className = 'col-12 text-center no-results-message';
                message.innerHTML = `
                    <div class="alert alert-info" role="alert">
                        <i class="fa fa-search me-2"></i>
                        <strong>No properties found</strong><br>
                        Try adjusting your search filters or <a href="property-list.html" class="alert-link">view all properties</a>
                    </div>
                `;
                
                const row = activeTab.querySelector('.row');
                if (row) row.appendChild(message);
            }
        }
    }

    // Apply filters from URL parameters (when redirected from search)
    function applyFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        const keyword = params.get('keyword');
        const propertyType = params.get('type');
        const roomType = params.get('room');

        // Update form fields
        if (keyword && searchInput) {
            searchInput.value = keyword;
        }
        if (propertyType && propertyTypeSelect) {
            propertyTypeSelect.value = propertyType;
        }
        if (roomType && roomTypeSelect) {
            roomTypeSelect.value = roomType;
        }

        // Apply filters if any exist
        if (keyword || propertyType || roomType) {
            filterPropertiesOnPage(
                keyword || '',
                propertyType || 'Property Type',
                roomType || 'Room Type'
            );
        }
    }

    // Apply URL filters on page load
    applyFiltersFromURL();

    // Clear filters button (optional - add to HTML if needed)
    const clearBtn = document.querySelector('.clear-filters-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (propertyTypeSelect) propertyTypeSelect.selectedIndex = 0;
            if (roomTypeSelect) roomTypeSelect.selectedIndex = 0;
            
            // Show all properties
            document.querySelectorAll('.col-lg-4, .col-md-6').forEach(col => {
                col.style.display = 'block';
            });
            
            // Remove no results message
            const msg = document.querySelector('.no-results-message');
            if (msg) msg.remove();
        });
    }
});

// ==========================================
// CLEAR FILTERS FUNCTION (Can be called from HTML)
// ==========================================
function clearAllFilters() {
    document.querySelector('input[placeholder="Search Keyword"]').value = '';
    document.querySelectorAll('.form-select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Show all properties
    document.querySelectorAll('.col-lg-4, .col-md-6').forEach(col => {
        col.style.display = 'block';
    });
    
    // Remove no results message
    const msg = document.querySelector('.no-results-message');
    if (msg) msg.remove();
}