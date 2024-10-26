// Menghubungkan elemen HTML
const profileImage = document.getElementById("profileImage");
const uploadInput = document.getElementById("uploadInput");
const uploadButton = document.getElementById("uploadButton");
const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");
const commentsList = document.getElementById("commentsList");
const musicInput = document.getElementById("musicInput");
const musicButton = document.getElementById("musicButton");
const musicList = document.getElementById("musicList");
const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = progressArea.querySelector(".progress-bar");

let musicIndex = 0; // Start with the first song
let isMusicPaused = true;
let addedMusicFiles = []; // Array to keep track of added music files

// Sample music list
const allMusic = [
    { name: "Song 1", artist: "Artist 1", img: "path_to_image_1.jpg", src: "path_to_audio_1.mp3" },
    { name: "Song 2", artist: "Artist 2", img: "path_to_image_2.jpg", src: "path_to_audio_2.mp3" },
];

// Load the first music on page load
window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

// Load music function
function loadMusic(index) {
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = allMusic[index].img;
    mainAudio.src = allMusic[index].src;
}

// Play or pause music
function playPauseMusic() {
    if (isMusicPaused) {
        mainAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
    } else {
        mainAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
    }
    isMusicPaused = !isMusicPaused; // Toggle the state
}

// Event listeners for buttons
playPauseBtn.addEventListener("click", playPauseMusic);
nextBtn.addEventListener("click", () => {
    musicIndex = (musicIndex + 1) % allMusic.length; // Loop to the first song
    loadMusic(musicIndex);
    playPauseMusic();
});
prevBtn.addEventListener("click", () => {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length; // Loop to the last song
    loadMusic(musicIndex);
    playPauseMusic();
});

// Update progress bar
mainAudio.addEventListener("timeupdate", () => {
    const currentTime = mainAudio.currentTime;
    const duration = mainAudio.duration;
    const progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
});

// Seek functionality
progressArea.addEventListener("click", (event) => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = event.offsetX;
    const duration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * duration;
});

// Fungsi untuk menambahkan lagu
musicButton.addEventListener("click", () => {
    musicInput.click();
});

musicInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("audio/")) {
        // Cek apakah lagu sudah ada
        const existingMusic = addedMusicFiles.find(music => music.name === file.name);
        if (existingMusic) {
            alert("Lagu ini sudah ditambahkan!");
            return; // Tidak menambahkan lagu jika sudah ada
        }

        addedMusicFiles.push(file); // Tambahkan file ke array
        const musicItem = document.createElement("div");
        musicItem.classList.add("music-item");
        musicItem.innerHTML = `<p>${file.name}</p>`;
        musicList.appendChild(musicItem);

        // Tambahkan event listener untuk memutar lagu
        musicItem.addEventListener("click", () => {
            musicIndex = addedMusicFiles.indexOf(file);
            loadMusic(musicIndex);
            playPauseMusic();
        });
    }
});