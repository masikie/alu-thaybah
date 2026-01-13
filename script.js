document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Tab Switching Function for Rundown
    function openTab(evt, dayName) {
        // Hide all tab content
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove('active');
        }

        // Remove active class from all buttons
        tablinks = document.getElementsByClassName("tab-btn");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }

        // Show the specific tab and add active class to button
        document.getElementById(dayName).style.display = "block";
        /* force reflow for animation if needed, or just let CSS handle it */
        setTimeout(() => {
            document.getElementById(dayName).classList.add('active');
        }, 10);

        if (evt) {
            evt.currentTarget.classList.add("active");
        }
    }

    // Initialize first tab open by default logic is in HTML (style="display:block" or class="active")
    // but let's Ensure Day 1 is open
    const defaultTab = document.getElementById('day1');
    if (defaultTab) {
        defaultTab.style.display = "block";
    }

    // Expose to window for HTML onclick access
    window.openTab = openTab;

    // Elements
    const openBtn = document.getElementById('open-btn');
    const coverScreen = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('i');

    // State
    let isMusicPlaying = false;

    // Open Invitation Function
    // Open Invitation Function
    function openInvitation() {
        // Slide up cover
        coverScreen.classList.add('open');

        // Show main content
        mainContent.classList.remove('hidden');

        // Allow scroll
        document.body.style.overflowY = 'auto';

        // Play Music
        playMusic();
    }

    openBtn.addEventListener('click', openInvitation);

    // Swipe to Open (Mobile)
    let touchStartY = 0;
    let touchEndY = 0;

    coverScreen.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    coverScreen.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // Threshold for swipe detection (e.g., 50px)
        if (touchStartY - touchEndY > 50) {
            // Swipe Up detected
            openInvitation();
        }
    }

    // Music Control
    function playMusic() {
        if (bgMusic) {
            bgMusic.volume = 1.0;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggle.classList.remove('hidden'); // Show toggle if hidden
                musicIcon.classList.remove('fa-play');
                musicIcon.classList.add('fa-music', 'spin');
            }).catch(error => {
                console.error("Audio playback error:", error);
                // Try playing again if it was a load issue? No, unsafe.
            });
        }
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            isMusicPlaying = false;
            musicIcon.style.animation = 'none';
        } else {
            bgMusic.play();
            isMusicPlaying = true;
            musicIcon.style.animation = 'spin 4s linear infinite';
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Lock scroll initially
    document.body.style.overflowY = 'hidden';

    // Countdown Timer
    const targetDate = new Date("January 20, 2026 12:00:00").getTime();

    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }, 1000);
});

// Copy Number Function
function copyNumber(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor berhasil disalin!");
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}

