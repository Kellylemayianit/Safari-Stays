// ==========================================
// STEP 1: Add this to property-list.html
// Create a new file: js/property-data.js
// ==========================================

const properties = {
    // AIRBNB PROPERTIES
    'elighant-bnb': {
        name: 'Elighant bnb',
        type: 'Airbnb',
        price: 'Ksh 4,400',
        location: 'Kimana Kajiado, Kenya',
        sqft: '1000 Sqft',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/likizo%20bnb%20bed.jpg',
            'img/likizo%20bnb%20kitchen.jpg',
            'img/likizo%20bnb%20outlook.jpg',
            'img/likizo%20bnb%20sits.jpg',
            'img/likizo%20bnb%20tv.jpg',
            'img/likizo%20bnb%20washroom.jpg',
        ],
        description: 'Cozy Airbnb perfect for solo travelers or couples. Located in the heart of Kimana with easy access to Amboseli National Park.',
        amenities: ['WiFi', 'Hot Water', 'Parking', 'Kitchen', 'TV'],
        contact: '+254113556385'
    },
    'crystal-homes-2bed': {
        name: 'Crystal Homes - 2 Bedroom',
        type: 'Airbnb',
        price: 'Ksh 7,500',
        location: 'Loitoktok- Emali Road',
        sqft: '1,000 Sqft',
        beds: '2 Bed',
        baths: '2 Bath',
        images: [
            'img/chc%20bed%201.jpg',
            'img/chc%20bed%202.jpg',
            'img/chc%20sitting.webp',
            'img/chc%20sitting%202.jpg',
            'img/chc%20kitchen.jpg',
        ],
        description: 'Spacious 2-bedroom home with modern amenities. Perfect for families or small groups visiting Amboseli.',
        amenities: ['WiFi', 'Hot Water', 'Parking', 'Full Kitchen', 'Living Room', 'Garden'],
        contact: '+254113556385'
    },
    'crystal-homes-3bed': {
        name: 'Crystal Homes - 3 Bedroom',
        type: 'Airbnb',
        price: 'Ksh 8,700',
        location: 'Loitoktok- Emali Road',
        sqft: '1,000 Sqft',
        beds: '3 Bed',
        baths: '2 Bath',
        images: [
            'img/chc%20bed%202.jpg',
            'img/chc%20bed%201.jpg',
            'img/chc%20sitting%202.jpg',
            'img/chc%20sitting.webp'
        ],
        description: 'Large 3-bedroom house ideal for families. Stunning views of Mount Kilimanjaro.',
        amenities: ['WiFi', 'Hot Water', 'Parking', 'Full Kitchen', 'Living Room', 'Garden', 'BBQ Area'],
        contact: '+254113556385'
    },
    'cnc-airbnb-3bed': {
        name: 'CNC Airbnb - 3 Bedroom',
        type: 'Airbnb',
        price: 'Ksh 6,000',
        location: 'Loitoktok- Emali Road',
        sqft: '1000 Sqft',
        beds: '3 beds',
        baths: '1 bath',
        images: [
            'img/cnc%20bed.jpg',
            'img/cnc%20sitting.jpg',
            'img/cnc%202bed.jpg'
        ],
        description: 'Comfortable 3-bedroom home with great views. Close to Amboseli National Park entrance.',
        amenities: ['WiFi', 'Hot Water', 'Parking', 'Kitchen'],
        contact: '+254113556385'
    },
    'cnc-airbnb-2bed': {
        name: 'CNC Airbnb - 2 Bedroom',
        type: 'Airbnb',
        price: 'Ksh 4,300',
        location: 'EMALI, OLOITOKITOK ROAD, Kimana',
        sqft: '1700 Sqft',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/cnc%202bed.jpg',
            'img/cnc%20bed.jpg',
            'img/cnc%20sitting.jpg'
        ],
        description: 'Affordable 2-bedroom accommodation perfect for budget-conscious travelers.',
        amenities: ['Hot Water', 'Parking', 'Kitchen'],
        contact: '+254113556385'
    },
    'bejah-airbnb': {
        name: 'Bejah Airbnb',
        type: 'Airbnb',
        price: 'Ksh 4,500',
        location: '6G2M+284 Amboseli Glass House, Kimana',
        sqft: '1,000 Sqft',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/property-6.jpg',
            'img/likizo%20bnb%20bed.jpg'
        ],
        description: 'Cozy studio near Amboseli with great views. Perfect for solo travelers.',
        amenities: ['WiFi', 'Hot Water', 'Parking'],
        contact: '+254113556385'
    },

    // HOTEL PROPERTIES
    'sgh-single': {
        name: 'Sironosim Gardens Hotel - Single Room',
        type: 'Hotel',
        price: 'Ksh 6,400',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Single Room',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/SGH%20single_room.jpg',
            'img/SGH%20twin%20bed.jpg',
            'img/SGH%20double%20room.jpg'
        ],
        description: 'Comfortable single room with modern amenities at Sironosim Gardens Hotel.',
        amenities: ['WiFi', 'Restaurant', 'Room Service', 'Hot Water', 'TV', 'Parking'],
        contact: '+254113556385'
    },
    'sgh-twin': {
        name: 'Sironosim Gardens Hotel - Twin Room',
        type: 'Hotel',
        price: 'Ksh 8,500',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Twin Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/SGH%20twin%20bed.jpg',
            'img/SGH%20single_room.jpg',
            'img/SGH%20double%20room.jpg'
        ],
        description: 'Twin room perfect for friends or colleagues traveling together.',
        amenities: ['WiFi', 'Restaurant', 'Room Service', 'Hot Water', 'TV', 'Parking'],
        contact: '+254113556385'
    },
    'sgh-double': {
        name: 'Sironosim Gardens Hotel - Double Room',
        type: 'Hotel',
        price: 'Ksh 12,800',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Double Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/SGH%20double%20room.jpg',
            'img/SGH%20twin%20bed.jpg',
            'img/SGH%20single_room.jpg'
        ],
        description: 'Spacious double room with premium amenities for a comfortable stay.',
        amenities: ['WiFi', 'Restaurant', 'Room Service', 'Hot Water', 'TV', 'Parking', 'Mini Fridge'],
        contact: '+254113556385'
    },
    'vgh-double': {
        name: 'VINTEX GUEST HOUSE - Double Room',
        type: 'Hotel',
        price: 'Ksh 3,000',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Double Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/VGH%202%20BEDS.jpg',
            'img/VGH%20bed%201.jpg'
        ],
        description: 'Budget-friendly double room at Vintex Guest House. Great value for money.',
        amenities: ['Hot Water', 'Parking', 'TV'],
        contact: '+254113556385'
    },
    'vgh-single': {
        name: 'VINTEX GUEST HOUSE - Single Room',
        type: 'Hotel',
        price: 'Ksh 2,000',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Single Room',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/VGH%20bed%201.jpg',
            'img/VGH%202%20BEDS.jpg'
        ],
        description: 'Affordable single room perfect for solo travelers on a budget.',
        amenities: ['Hot Water', 'Parking', 'TV'],
        contact: '+254113556385'
    },
    'wonderful-hotel': {
        name: 'Wonderful Hotel - Double Room',
        type: 'Hotel',
        price: 'Ksh 6,300',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Double Room',
        beds: '2 beds',
        baths: '1 bath',
        images: [
            'img/WGH%20bed.jpg'
        ],
        description: 'Comfortable accommodation at Wonderful Hotel with great service.',
        amenities: ['WiFi', 'Restaurant', 'Hot Water', 'TV', 'Parking'],
        contact: '+254113556385'
    },

    // LODGE PROPERTIES
    'hsl-single': {
        name: 'Hillstone Safari Lodge - Single Room',
        type: 'Lodge',
        price: 'Ksh 11,365',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Single Room',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20Single%20room.jpg',
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-exterior.jpg'
        ],
        description: 'Luxury single room at Hillstone Safari Lodge with stunning Kilimanjaro views.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa'],
        contact: '+254113556385'
    },
    'hsl-standard': {
        name: 'Hillstone Safari Lodge - Standard Room',
        type: 'Lodge',
        price: 'Ksh 14,250',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Double Room',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-Beds%20king%20bed.jpg',
            'img/HSL-exterior.jpg'
        ],
        description: 'Elegant standard room with premium safari experience and mountain views.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa', 'Balcony'],
        contact: '+254113556385'
    },
    'hsl-twin': {
        name: 'Hillstone Safari Lodge - Twin Room',
        type: 'Lodge',
        price: 'Ksh 15,700',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Twin Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20twin%20bed.jpg',
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-exterior.jpg'
        ],
        description: 'Twin room perfect for safari companions with full lodge amenities.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa', 'Balcony'],
        contact: '+254113556385'
    },
    'hsl-king': {
        name: 'Hillstone Safari Lodge - King Room',
        type: 'Lodge',
        price: 'Ksh 17,100',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'King Room',
        beds: '1 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20king%20bed.jpg',
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-exterior.jpg'
        ],
        description: 'Luxurious king room with premium bedding and spectacular wildlife views.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa', 'Private Balcony'],
        contact: '+254113556385'
    },
    'hsl-family': {
        name: 'Hillstone Safari Lodge - Family Room',
        type: 'Lodge',
        price: 'Ksh 39,150',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Family Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20family%20room.jpg',
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-exterior.jpg'
        ],
        description: 'Spacious family room perfect for safari adventures with children.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa', 'Private Balcony', 'Kids Activities'],
        contact: '+254113556385'
    },
    'hsl-family-deluxe': {
        name: 'Hillstone Safari Lodge - Deluxe Family Room',
        type: 'Lodge',
        price: 'Ksh 42,619',
        location: 'Kimana Kajiado, Kenya',
        sqft: 'Family Room',
        beds: '2 Bed',
        baths: '1 Bath',
        images: [
            'img/HSL-Beds%20%20Standard-Room.webp',
            'img/HSL-Beds%20family%20room.jpg',
            'img/HSL-exterior.jpg'
        ],
        description: 'Premium family room with extra space and luxury amenities.',
        amenities: ['WiFi', 'Restaurant', 'Bar', 'Pool', 'Game Drives', 'Room Service', 'Spa', 'Private Balcony', 'Kids Activities', 'Butler Service'],
        contact: '+254113556385'
    }
};

// Function to save property and navigate
function viewPropertyDetails(propertyId) {
    // Save property data to sessionStorage
    const property = properties[propertyId];
    if (property) {
        sessionStorage.setItem('selectedProperty', JSON.stringify(property));
        // Navigate to property details page
        window.location.href = `property-details.html?id=${propertyId}`;
    }
}

// ==========================================
// STEP 2: Update property-list.html
// Add onclick handlers to property links
// ==========================================
// Replace all property <a href="#tab-1"> with:
// <a href="javascript:void(0)" onclick="viewPropertyDetails('property-id')">

// Example for first property:
// <a href="javascript:void(0)" onclick="viewPropertyDetails('elighant-bnb')">
//     <img class="img-fluid" src="img/likizo%20bnb%20bed.jpg" alt="Elighant bnb bed"/>
// </a>

// ==========================================
// STEP 3: Add to property-details.html
// Add this script before closing </body>
// ==========================================

function loadPropertyDetails() {
    // Get property from sessionStorage
    const propertyData = sessionStorage.getItem('selectedProperty');
    
    if (!propertyData) {
        // If no property selected, show default message
        document.getElementById('chatMessages').innerHTML = `
            <div style="padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00b98e; align-self: flex-start;">
                <strong>Safari AI Assistant</strong><br/>
                👋 Welcome! Please select a property from our <a href="property-list.html" style="color: #00b98e;">properties page</a> to view details.
            </div>
        `;
        return;
    }
    
    const property = JSON.parse(propertyData);
    
    // Update page title
    document.title = `${property.name} - Safari Stays Kimana`;
    
    // Update main image
    const mainImage = document.getElementById('mainPropertyImage');
    if (mainImage && property.images.length > 0) {
        mainImage.src = property.images[0];
    }
    
    // Update thumbnail gallery
    const galleryContainer = document.querySelector('.gallery-thumb').parentElement;
    if (galleryContainer) {
        galleryContainer.innerHTML = property.images.map((img, index) => `
            <img
                src="${img}"
                class="gallery-thumb ${index === 0 ? 'active-thumb' : ''}"
                onclick="changeMainImage(this)"
                style="
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    cursor: pointer;
                    border: 3px solid ${index === 0 ? '#00b98e' : 'transparent'};
                    border-radius: 8px;
                    transition: all 0.3s;
                    flex-shrink: 0;
                    opacity: ${index === 0 ? '1' : '0.7'};
                "
                alt="${property.name} - View ${index + 1}" />
        `).join('');
    }
    
    // Update chat with property info
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div style="padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00b98e; align-self: flex-start;">
            <strong>Safari AI Assistant</strong><br/>
            👋 Welcome! I'm here to help you with <strong>${property.name}</strong>
        </div>
        <div style="padding: 15px; border-radius: 8px; background: white; border: 1px solid #ddd; align-self: flex-start;">
            <h5 style="color: #00b98e; margin: 0 0 10px 0;">${property.name}</h5>
            <p style="margin: 5px 0;"><strong>Type:</strong> ${property.type}</p>
            <p style="margin: 5px 0;"><strong>Price:</strong> <span style="color: #00b98e; font-size: 1.2em;">${property.price}</span> per night</p>
            <p style="margin: 5px 0;"><strong>Location:</strong> ${property.location}</p>
            <p style="margin: 5px 0;"><strong>Room Size:</strong> ${property.sqft}</p>
            <p style="margin: 5px 0;"><strong>Beds:</strong> ${property.beds} | <strong>Baths:</strong> ${property.baths}</p>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
            <p style="margin: 10px 0;"><strong>Description:</strong><br/>${property.description}</p>
            <p style="margin: 10px 0;"><strong>Amenities:</strong><br/>
                ${property.amenities.map(a => `<span style="display: inline-block; background: #f0f0f0; padding: 3px 8px; margin: 2px; border-radius: 3px; font-size: 0.85em;">✓ ${a}</span>`).join('')}
            </p>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;">
            <p style="margin: 5px 0;"><strong>📞 Contact:</strong> <a href="https://wa.me/${property.contact.replace(/\+/g, '')}" target="_blank" style="color: #00b98e;">${property.contact}</a></p>
        </div>
        <div style="padding: 12px 15px; border-radius: 8px; background: white; border-left: 4px solid #00b98e; align-self: flex-start;">
            <strong>Safari AI Assistant</strong><br/>
            Feel free to ask me any questions about this property, availability, or booking process!
        </div>
    `;
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Load property details when page loads
document.addEventListener('DOMContentLoaded', loadPropertyDetails);