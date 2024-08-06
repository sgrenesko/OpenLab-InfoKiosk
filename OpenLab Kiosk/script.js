let timeout;

function navigate(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'flex';
    resetTimeout();
    if (page === 'page1') {
        loadWorkshopImages();
    }
}

function resetTimeout() {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => navigate('home'), 300000); // 5 minutes
}

function loadWorkshopImages() {
    const imageContainer = document.getElementById('workshopImages');
    imageContainer.innerHTML = ''; // Clear existing images

    const imageTypes = ['jpg', 'jpeg', 'png', 'gif'];

    function tryLoadImage(index, typeIndex) {
        if (typeIndex >= imageTypes.length) {
            return; // We've tried all image types, stop trying
        }

        const img = new Image();
        img.onload = function() {
            img.alt = `Workshop Image ${index}`;
            img.className = 'workshop-image';
            imageContainer.appendChild(img);
            
            // Try to load the next image
            tryLoadImage(index + 1, 0);
        };
        img.onerror = function() {
            // This image type failed, try the next type
            tryLoadImage(index, typeIndex + 1);
        };
        img.src = `workshops/workshopimage${index}.${imageTypes[typeIndex]}`;
    }

    // Start trying to load images
    tryLoadImage(1, 0);
}

resetTimeout();

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', resetTimeout);
});

// Initial load of workshop images if we're on page1
if (document.getElementById('page1').style.display !== 'none') {
    loadWorkshopImages();
}