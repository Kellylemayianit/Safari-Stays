// ==========================================
// STEP 1: Add this to property-list.html
// Create a new file: js/property-data.js
// ==========================================

const CONFIG = {
    imageBase: '' // Optional: configure your CDN/image server base URL
};

const properties = [
    {
        id: "crystal-houses-chema",
        name: "Crystal Houses by Chema",
        type: "Cottage",
        price: "Ksh 7,500",
        location: "Kimana, Near Amboseli National Park",
        sqft: "400 sq ft",
        beds: 2,
        baths: 1,
        description: "Welcome to Crystal Houses by Chema, your home away from home in Kimana. Our modern house features a fully equipped kitchen, comfortable living space, and beautiful garden views. Perfect for families and small groups. Note: Some images shown are representative - actual room layouts may vary.",
        amenities: [
            "Fully Equipped Kitchen",
            "Private Garden",
            "Free WiFi",
            "Parking",
            "Living Room",
            "TV with DSTV",
            "Security System",
            "Daily Housekeeping",
            "Outdoor Seating"
        ],
        images: [
            "img/chc bed 1.jpg",
            "img/chc bed 2.jpg",
            "img/chc sitting.webp"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available",
        disclaimer: "Note: Some images are representative. Contact us for current property photos."
    },
    {
        id: "eleghtant-bnb",
        name: "Eleghtant BnB",
        type: "BnB",
        price: "Ksh 3,500",
        location: "Kimana, Kajiado",
        sqft: "300 sq ft",
        beds: 2,
        baths: 1,
        description: "Experience comfort and convenience at Eleghtant BnB. Our modern rooms feature clean bathrooms, comfortable beds, and all essential amenities to make your stay memorable. Perfect for both short stays and extended visits.",
        amenities: [
            "Free Parking",
            "Free WiFi",
            "Air Conditioning",
            "Hot Water",
            "Clean Bathroom",
            "24/7 Security",
            "Daily Housekeeping"
        ],
        images: [
            "img/likizo bnb toilet.jpg",
            "img/likizo bnb shower.jpg",
            "img/likizo bnb sink.jpg",
            "img/likizo bnb bed.jpg",
            "img/likizo bnb room.jpg"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available"
    },
    {
        id: "hillstone-lodge",
        name: "Hillstone Safari Lodge",
        type: "Safari Lodge",
        price: "Ksh 12,500",
        location: "Kimana Conservancy, Near Amboseli",
        sqft: "450 sq ft",
        beds: 2,
        baths: 1,
        description: "Experience luxury amidst nature at Hillstone Safari Lodge. Our rooms offer stunning views of Mt. Kilimanjaro and the surrounding wilderness. Note: Property images are representative - actual room aesthetics and views may vary. Please contact us for current photos.",
        amenities: [
            "Restaurant & Bar",
            "Game Drives",
            "Swimming Pool",
            "Free WiFi",
            "Air Conditioning",
            "Private Balcony",
            "24/7 Room Service",
            "Guided Nature Walks",
            "Conference Facilities"
        ],
        images: [
            "img/HSL-Beds Standard-Room.webp",
            "img/HSL-Beds king bed.jpg",
            "img/HSL-Beds queen bed.webp",
            "img/HSL-Beds family room.jpg",
            // Reusing image as placeholder
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available",
        disclaimer: "Note: Some images are representative only. Contact us for current property photos."
    },
    {
        id: "cnc-bnb",
        name: "CNC BnB Kimana",
        type: "Hotel",
        price: "Ksh 4,500",
        location: "Kimana Town Center",
        sqft: "350 sq ft",
        beds: 2,
        baths: 1,
        description: "Modern rooms in the heart of Kimana. CNC BnB offers comfortable accommodation perfect for business travelers and those seeking a central location. Features a fully equipped kitchen, comfortable living area with Smart TV, and stunning views of Mt. Kilimanjaro.",
        amenities: [
            "Fully Equipped Kitchen",
            "Smart TV",
            "Free WiFi",
            "Mountain View",
            "First Aid Kit",
            "Security System",
            "Modern Furniture",
            "Cooking Utensils",
            "24/7 Security"
        ],
        images: [
            "img/cnc bed.jpg",
            "img/cnc kitchen.jpg", 
            "img/cnc living.jpg",
            "img/cnc bathroom.jpg",
            "img/cnc sink.jpg",
            "img/cnc utensils.jpg",
            "img/cnc first aid.jpg",
            "img/cnc view.jpg"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available"
    },
    {
        id: "sironosim-gardens",
        name: "Sironosim Gardens Hotel",
        type: "Hotel",
        price: "Ksh 5,500",
        location: "Kimana Town, Near Shopping Center",
        sqft: "400 sq ft",
        beds: 2,
        baths: 1,
        description: "Welcome to Sironosim Gardens Hotel, where comfort meets convenience. Featuring well-appointed rooms, a restaurant serving local and continental cuisine, conference facilities, and secure parking. Perfect for business travelers and families. Enjoy our complimentary breakfast with both local and international options.",
        amenities: [
            "Restaurant & Bar",
            "Conference Facilities",
            "Free Breakfast",
            "Secure Parking",
            "Room Service",
            "Free WiFi",
            "Business Center",
            "24/7 Security",
            "Meeting Rooms",
            "Local & Continental Cuisine"
        ],
        images: [
            "img/SGH twin bed.jpg",
            "img/SGH restaurant.jpg",
            "img/SGH conference.jpg",
            "img/SGH parking.jpg",
            "img/SGH breakfast.jpg",
            "img/SGH local food.jpg",
            "img/SGH bathroom.jpg"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available",
        meals: {
            breakfast: "Included",
            restaurant: "Open 6:00 AM - 10:00 PM"
        }
    },
    {
        id: "vintex-guest-house",
        name: "Vintex Guest House",
        type: "Guest House",
        price: "Ksh 2,500",
        location: "Kimana Town",
        sqft: "250 sq ft",
        beds: 2,
        baths: 1,
        description: "A comfortable and affordable stay in Kimana. Our guest house offers clean rooms with mosquito nets, hot showers, and access to our restaurant and fitness area. Perfect for budget-conscious travelers who don't want to compromise on comfort.",
        amenities: [
            "Hot Shower",
            "Restaurant",
            "Mosquito Nets",
            "Fitness Equipment",
            "Common Area",
            "24/7 Security",
            "Daily Room Service",
            "Local Food Available",
            "Free Parking"
        ],
        images: [
            "img/VGH twin bed.jpg",
            "img/VGH dining.jpg",
            "img/VGH gym.jpg",
            "img/VGH shower.jpg",
            "img/VGH common.jpg",
            "img/VGH nets.jpg"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available",
        meals: {
            breakfast: "Available for purchase",
            restaurant: "Open 7:00 AM - 9:00 PM"
        }
    },
    {
        id: "wgh-guest-house",
        name: "WGH Guest House",
        type: "Guest House",
        price: "Ksh 3,000",
        location: "Kimana Town",
        sqft: "280 sq ft",
        beds: 2,
        baths: 1,
        description: "WGH Guest House offers clean, comfortable rooms with mosquito nets, hot water, and quick access to local shops and transport. Ideal for budget travelers and families seeking a simple, friendly stay.",
        amenities: [
            "Mosquito Nets",
            "Hot Water",
            "Free WiFi",
            "Basic Kitchen Facilities",
            "24/7 Security",
            "Daily Housekeeping"
        ],
        images: [
            "img/WGH twin bed.jpg",
            "img/VGH shower.jpg",
            "img/VGH common.jpg"
        ],
        contact: "+254 713556385",
        featured: true,
        availability: "Available"
    }
];
// Add helpers: sanitize image paths, lookup and simple filters

(function () {
	// Updated sanitizer that handles both local and remote paths
	function sanitizeImagePaths() {
		if (!Array.isArray(properties)) return;
		properties.forEach(p => {
			if (!Array.isArray(p.images)) return;
			p.images = p.images.map(img => {
				// Remove any device-specific path components
				let webPath = img.replace(/^.*[\/\\]img[\/\\]/, '/img/');
				// Add optional CDN/base URL
				return CONFIG.imageBase + webPath;
			});
		});
	}

	// Get property by id (or slug)
	function getPropertyById(id) {
		if (!id || !Array.isArray(properties)) return null;
		return properties.find(p => p.id === id || p.id === decodeURIComponent(id)) || null;
	}

	// Parse price like "Ksh 7,500" -> number 7500 (returns NaN if not parseable)
	function parsePrice(priceStr) {
		if (!priceStr) return NaN;
		const digits = priceStr.replace(/[^\d]/g, '');
		return digits ? parseInt(digits, 10) : NaN;
	}

	// Simple finder: filters = { type, location, maxPrice, minPrice, featured }
	function findProperties(filters = {}) {
		if (!Array.isArray(properties)) return [];
		return properties.filter(p => {
			if (filters.type && p.type && p.type.toLowerCase() !== filters.type.toLowerCase()) return false;
			if (filters.location && p.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
			if (typeof filters.featured === 'boolean' && !!p.featured !== filters.featured) return false;
			const price = parsePrice(p.price);
			if (filters.maxPrice != null && !Number.isNaN(price) && price > Number(filters.maxPrice)) return false;
			if (filters.minPrice != null && !Number.isNaN(price) && price < Number(filters.minPrice)) return false;
			return true;
		});
	}

	// Expose functions for other scripts
	window.properties = properties;
	window.getPropertyById = getPropertyById;
	window.findProperties = findProperties;
	window.sanitizeImagePaths = sanitizeImagePaths;
	window.parsePrice = parsePrice;

	// Open property details: accept id or full property object
	function openPropertyDetails(idOrObject) {
		let prop = null;
		if (!idOrObject) return;
		if (typeof idOrObject === 'string') {
			prop = getPropertyById(idOrObject);
		} else if (typeof idOrObject === 'object' && idOrObject.id) {
			prop = idOrObject;
		}
		if (!prop) return;
		try {
			sessionStorage.setItem('selectedProperty', JSON.stringify(prop));
		} catch (e) {
			// ignore storage errors
		}
		// Navigate to details page with id in querystring as fallback
		const id = encodeURIComponent(prop.id || '');
		window.location.href = `property-details.html?id=${id}`;
	}

	window.openPropertyDetails = openPropertyDetails;

	// Run sanitizer once on load
	sanitizeImagePaths();
})();