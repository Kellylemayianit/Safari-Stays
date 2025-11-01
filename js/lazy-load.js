(function() {
    // Replace static images with lazy loading
    document.querySelectorAll('img:not([loading])').forEach(img => {
        if (!img.classList.contains('logo')) {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
            
            // Add loading animation
            img.style.transition = 'opacity 0.3s';
            img.style.opacity = '0';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
        }
    });

    // Optional: Add blur-up preview
    document.querySelectorAll('.property-item img').forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // Add tiny preview
        const preview = document.createElement('img');
        preview.src = img.src.replace(/\.(jpg|webp)$/, '-tiny.$1');
        preview.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;filter:blur(10px);transition:opacity 0.3s';
        wrapper.insertBefore(preview, img);
        
        img.onload = () => {
            preview.style.opacity = '0';
        };
    });
})();
