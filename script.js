
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');           
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
  
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});



videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});






function goBackWithoutScroll() {
  
  window.history.back();
}




const searchButton = document.querySelector('#search-btn');  
const searchInput = document.querySelector('#search-bar');  


const packageNames = {
    'mysore': 'mysore-package-section',
    'koppal': 'koppal-package-section',
    'bangalore': 'bangalore-package-section',
    'coorg': 'coorg-package-section',
    'mangalore': 'mangalore-package-section',
    'vijayapura': 'vijayapura-package-section',
    'shivamogga': 'shivamogga-package-section',
    'uttara kannada': 'uttara-kannada-package-section',
    'udupi': 'udupi-package-section',
    'vijayanagara': 'vijayanagara-package-section',
    'mandya': 'mandya-package-section',
    'hubli-dharwad': 'hubli-dharwad-package-section',
    'kalaburagi': 'kalaburagi-package-section',
    'bagalkote': 'bagalkote-package-section',
    'chikkaballapura': 'chikkaballapura-package-section',
    'dakshina kannada': 'dakshina-kannada-package-section',
    'chitradurga': 'chitradurga-package-section',
    'chikkamagaluru': 'chikkamagaluru-package-section',
    'belagavi':'belagavi-package-section',
    'hassan':'hassan-package-section',
    'bidar':'bidar-package-section',
    'haveri':'haveri-package-section',
};


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId); 
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); 
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
      }
}


searchButton.addEventListener('click', function() {
  const searchValue = searchInput.value.trim().toLowerCase(); 
  
  if (packageNames[searchValue]) {
    scrollToSection(packageNames[searchValue]); 
  } else if (searchValue.includes('packages')) {
    scrollToSection('packages');  
  } else if (searchValue.includes('gallery')) {
    scrollToSection('gallery');  
  } else if (searchValue.includes('review')) {
    scrollToSection('review');  
  }
    else if (searchValue.includes('contact')) {
        scrollToSection('contact'); 
  } else {
    alert("No matching section found. Please check the package name or category.");
  }
});


searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});






    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Clear any previous error or success messages
        message.textContent = '';

        // Check if all required fields are filled
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const number = form.querySelector('input[name="number"]').value.trim();
        const subject = form.querySelector('input[name="subject"]').value.trim();
        const messageText = form.querySelector('textarea[name="message"]').value.trim();

        // Validate fields
        if (!name || !email || !number || !subject || !messageText) {
            message.textContent = 'Please fill in all fields.';
            message.style.color = 'red';
            return; // Stop the form submission
        }

        // Additional Email Validation (Simple Regex)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            message.textContent = 'Please enter a valid email address.';
            message.style.color = 'red';
            return;
        }

        // Additional Number Validation (Only numbers)
        const numberPattern = /^[0-9]+$/;
        if (!numberPattern.test(number)) {
            message.textContent = 'Please enter a valid phone number (only digits).';
            message.style.color = 'red';
            return;
        }

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: new URLSearchParams(formData)
            });

            if (response.ok) {
                message.textContent = 'Message sent successfully!';
                message.style.color = 'green';
                form.reset();
            } else {
                message.textContent = 'Failed to send message. Please try again.';
                message.style.color = 'red';
            }
        } catch (error) {
            message.textContent = 'An error occurred. Please try again.';
            message.style.color = 'red';
        }
    });


// 1. Handle Review Form Submission
document.getElementById('reviewForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const experience = document.getElementById('experience').value.trim();
    const rating = document.getElementById('rating').value;

    if (!name ||!email|| !experience || !rating) {
        alert("All fields are required.");
        return;
    }

    try {
        // Submit the review to the backend
        const response = await fetch('http://localhost:5000/submit-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name,email, experience, rating })
        });

        if (response.ok) {
            // Reset the form and show a success message
            document.getElementById('reviewForm').reset();
            document.getElementById('successMessage').style.display = 'block';

            // Reload reviews after submission
            fetchApprovedReviews();  // This will re-fetch approved reviews after submission
        } else {
            alert('Failed to submit review.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error submitting review.');
    }
});


window.addEventListener('DOMContentLoaded', async () => {
    fetchApprovedReviews();  
});


async function fetchApprovedReviews() {
    try {
        const response = await fetch('http://localhost:5000/reviews');
        const reviews = await response.json();

        console.log(reviews);  

        const reviewContainer = document.getElementById('reviewContainer');
        reviewContainer.innerHTML = '';  

        reviews.forEach(review => {
            const newReview = document.createElement('div');
            newReview.classList.add('swiper-slide');
            newReview.innerHTML = `
                <div class="box">
                    
                    <h3>${review.name}</h3>
                    <p>${review.experience}</p>
                    <div class="stars">
                        ${getStars(review.rating)}
                    </div>
                </div>
            `;
            reviewContainer.appendChild(newReview);
        });

        const swiper = new Swiper('.review-slider', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
        });
        swiper.update(); 

    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}


function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}


async function approveReview(reviewId) {
    try {
        const response = await fetch(`http://localhost:5000/admin/approve-review/${reviewId}`, {
            method: 'POST',
        });

        if (response.ok) {
            alert('Review approved!');
            fetchApprovedReviews();  
        } else {
            alert('Failed to approve review.');
        }
    } catch (error) {
        console.error('Error approving review:', error);
    }
}


function addReviewToCarousel(reviewData) {
    const reviewContainer = document.getElementById('reviewContainer');

   
    const newReview = document.createElement('div');
    newReview.classList.add('swiper-slide');
    newReview.innerHTML = `
        <div class="box">
            <img src="images/pic-placeholder.png" alt="User Image">
            <h3>${reviewData.name}</h3>
            <p>${reviewData.experience}</p>
            <div class="stars">
                ${getStars(reviewData.rating)}
            </div>
        </div>
    `;

    
    reviewContainer.appendChild(newReview);

 
    const swiper = new Swiper('.review-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
    });
    swiper.update();
}

async function fetchUnapprovedReviews() {
    try {
        const response = await fetch('http://localhost:5000/admin/reviews');  
        const reviews = await response.json();

        const unapprovedReviewsList = document.getElementById('unapprovedReviews');
        unapprovedReviewsList.innerHTML = ''; 

        reviews.forEach(review => {
            if (!review.approved) {  
                const reviewItem = document.createElement('li');
                reviewItem.innerHTML = `
                    <div>
                        <strong>${review.name}</strong>:
                        <p>${review.experience}</p>
                        <button onclick="approveReview('${review._id}')">Approve</button>
                    </div>
                `;
                unapprovedReviewsList.appendChild(reviewItem);
            }
        });
    } catch (error) {
        console.error('Error fetching unapproved reviews:', error);
    }
}






function toggleFavorite(icon) {
    const packageBox = icon.closest('.package-box');
    const packageTitle = packageBox.querySelector('h3').innerText;
    const packageHTML = packageBox.outerHTML; 
  
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    
    if (favorites.includes(packageHTML)) {
        // If the item is already in the favorites, show an alert
        // alert('This place is already added to the wishlist.');
        alert(`${packageTitle} is already in your favorites!`);
    } else {
        // If the item is not in the favorites, add it
        favorites.push(packageHTML);
        localStorage.setItem('favorites', JSON.stringify(favorites));
  
        // Show a success message
        // alert('Place added to wishlist!');
        alert(`${packageTitle} added to favorites!`);
        
        // Add the "active" class to mark the heart icon as selected
        icon.classList.add('active');
    }
  }
  
  // Event listener for the heart icon to redirect to favorites page
  document.getElementById('heart-btn').addEventListener('click', function () {
    // Redirect to the favorites page
    window.location.href = 'fav.html';  // Ensure the path is correct
  });











