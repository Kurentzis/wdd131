        // Display form data from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        
        document.getElementById('review-product').textContent = urlParams.get('product');
        document.getElementById('review-rating').textContent = urlParams.get('rating');
        document.getElementById('review-date').textContent = urlParams.get('installDate');
        document.getElementById('review-features').textContent = urlParams.getAll('features').join(', ') || 'None selected';
        document.getElementById('review-text').textContent = urlParams.get('review') || 'No review provided';
        document.getElementById('review-user').textContent = urlParams.get('username') || 'Anonymous';

        // Display review counter
        const reviewCount = localStorage.getItem('reviewCount') || 0;
        document.getElementById('review-counter').textContent = reviewCount;