// Script to load property details from sessionStorage and update the page

(function(){
	// Helper to read ?id= from URL
	function getQueryId() {
		const params = new URLSearchParams(window.location.search);
		return params.get('id');
	}

	function changeMainImage(imgEl) {
		if (!imgEl) return;
		const main = document.getElementById('mainPropertyImage');
		if (main) main.src = imgEl.src;
		document.querySelectorAll('.gallery-thumb').forEach(t => {
			t.classList.remove('active-thumb');
			t.style.border = '3px solid transparent';
			t.style.opacity = '0.7';
		});
		imgEl.classList.add('active-thumb');
		imgEl.style.border = '3px solid #00b98e';
		imgEl.style.opacity = '1';
	}

	function renderGallery(container, images, propertyName) {
		if (!container) return;
		container.innerHTML = images.map((img, index) => `
			<img
				src="${img}"
				class="gallery-thumb ${index === 0 ? 'active-thumb' : ''}"
				onclick="changeMainImage(this)"
				style="width:80px;height:80px;object-fit:cover;cursor:pointer;border:3px solid ${index===0? '#00b98e':'transparent'};border-radius:8px;transition:all .2s;opacity:${index===0? '1':'0.7'};margin-right:6px;"
				alt="${propertyName} - View ${index+1}" />
		`).join('');
	}

	function renderChat(container, property) {
		if (!container) return;
		container.innerHTML = `
			<div style="padding:12px;border-radius:8px;background:#fff;border-left:4px solid #00b98e;">
				<strong>Safari AI Assistant</strong><br/>👋 I'm here to help with <strong>${property.name}</strong>
			</div>
			<div style="padding:15px;border-radius:8px;background:#fff;border:1px solid #ddd;margin-top:10px;">
				<h5 style="color:#00b98e;margin:0 0 10px 0;">${property.name}</h5>
				<p style="margin:5px 0;"><strong>Type:</strong> ${property.type||'—'}</p>
				<p style="margin:5px 0;"><strong>Price:</strong> <span style="color:#00b98e;font-size:1.1em;">${property.price||'—'}</span></p>
				<p style="margin:5px 0;"><strong>Location:</strong> ${property.location||'—'}</p>
				<p style="margin:5px 0;"><strong>Size:</strong> ${property.sqft||'—'}</p>
				<p style="margin:5px 0;"><strong>Beds:</strong> ${property.beds||'—'} | <strong>Baths:</strong> ${property.baths||'—'}</p>
				<hr style="border-top:1px solid #eee;">
				<p style="margin:10px 0;"><strong>Description:</strong><br/>${property.description||'—'}</p>
				<p style="margin:10px 0;"><strong>Amenities:</strong><br/>${(property.amenities||[]).map(a=>`<span style="display:inline-block;background:#f0f0f0;padding:3px 8px;margin:2px;border-radius:3px;font-size:0.85em;">✓ ${a}</span>`).join('')}</p>
				<hr style="border-top:1px solid #eee;">
				<p style="margin:5px 0;"><strong>📞 Contact:</strong> ${property.contact ? `<a href="https://wa.me/${property.contact.replace(/\+/g,'')}" target="_blank" style="color:#00b98e;">${property.contact}</a>` : '—'}</p>
			</div>
		`;
		container.scrollTop = container.scrollHeight;
	}

	function showSelectMessage(container) {
		if (!container) return;
		container.innerHTML = `
			<div style="padding:12px;border-radius:8px;background:#fff;border-left:4px solid #00b98e;">
				<strong>Safari AI Assistant</strong><br/>👋 Please select a property from <a href="property-list.html" style="color:#00b98e;">the properties page</a>.
			</div>
		`;
	}

	function loadPropertyDetails() {
		// Try sessionStorage first
		let propertyData = null;
		try {
			const raw = sessionStorage.getItem('selectedProperty');
			if (raw) propertyData = JSON.parse(raw);
		} catch (e) {
			// ignore
		}

		// If none, try URL id lookup in properties array (provided by property-data.js)
		if (!propertyData) {
			const id = getQueryId();
			if (id && typeof properties !== 'undefined' && Array.isArray(properties)) {
				propertyData = properties.find(p => p.id === id) || null;
			}
		}

		const chatContainer = document.getElementById('chatMessages');
		const mainImage = document.getElementById('mainPropertyImage');
		// gallery container: prefer container with id galleryContainer, fallback to first .gallery-thumb parent or .gallery-thumbs
		let galleryContainer = document.getElementById('galleryContainer');
		if (!galleryContainer) {
			const sample = document.querySelector('.gallery-thumb');
			if (sample && sample.parentElement) galleryContainer = sample.parentElement;
		}
		if (!galleryContainer) galleryContainer = document.querySelector('.gallery-thumbs');

		if (!propertyData) {
			showSelectMessage(chatContainer);
			if (mainImage) mainImage.src = 'img/placeholder.jpg';
			if (galleryContainer) galleryContainer.innerHTML = '';
			return;
		}

		// Update title
		if (propertyData.name) document.title = `${propertyData.name} - Safari Stays Kimana`;

		// Main image
		if (mainImage && propertyData.images && propertyData.images.length) {
			mainImage.src = propertyData.images[0];
		}

		// Gallery
		if (galleryContainer) {
			renderGallery(galleryContainer, propertyData.images || [], propertyData.name || '');
			// ensure global function exists for inline onclick to call
			window.changeMainImage = changeMainImage;
		}

		// Chat / info
		renderChat(chatContainer, propertyData);
	}

	// Expose changeMainImage so inline onclick works on generated imgs
	window.changeMainImage = changeMainImage;

	document.addEventListener('DOMContentLoaded', loadPropertyDetails);
})();