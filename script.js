document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.createElement('audio');
    const playButton = document.getElementById('play-btn');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const albumCover = document.querySelector('.album-cover');
    const progressBar = document.getElementById('progress');
    const currentTime = document.getElementById('current-time');
    const durationTime = document.getElementById('duration');
    const songList = document.querySelector('.song-list');

    const tracks = [
        {
            title: "Tu Hain Toh",
            artist: "Mr. & Mrs.Mahi",
            src: "song1.mp3",
            cover: "cover1.jpg"
        },
        {
            title: "Dekha Tenu",
            artist: "Mr. & Mrs.Mahi",
            src: "song2.mp3",
            cover: "cover2.jpg"
        },
        {
            title: "Mana Ke Hum",
            artist: "Meri Pyari Bindu",
            src: "song3.mp3",
            cover: "cover3.jpg"
        },
        {
            title: "Agar tum Sath Ho",
            artist: "Tamasha",
            src: "song4.mp3",
            cover: "cover4.jpg"
        },
        {
            title: "Bulleya",
            artist: "Ae Dil Hai Mushkil",
            src: "song5.mp3",
            cover: "cover5.jpg"
        },
        {
            title: "Satranga",
            artist: "Animal",
            src: "song6.mp3",
            cover: "cover6.jpg"
        },
        {
            title: "Ve Kamleya",
            artist: "Rocky And Rani",
            src: "song7.mp3",
            cover: "cover7.jpg"
        },
        
        
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        audioPlayer.src = tracks[index].src;
        trackTitle.textContent = tracks[index].title;
        trackArtist.textContent = tracks[index].artist;
        albumCover.src = tracks[index].cover;
        updateSongListHighlight(index);
    }

    function playTrack() {
        audioPlayer.play();
        playButton.textContent = "Pause";
    }

    function pauseTrack() {
        audioPlayer.pause();
        playButton.textContent = "Play";
    }

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    prevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex === 0) ? tracks.length - 1 : currentTrackIndex - 1;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    nextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex === tracks.length - 1) ? 0 : currentTrackIndex + 1;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTimeValue = Math.floor(audioPlayer.currentTime);
        const durationTimeValue = Math.floor(audioPlayer.duration);
        progressBar.value = (currentTimeValue / durationTimeValue) * 100;
        currentTime.textContent = formatTime(currentTimeValue);
        durationTime.textContent = formatTime(durationTimeValue);
    });

    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function updateSongListHighlight(index) {
        const items = songList.querySelectorAll('li');
        items.forEach((item, idx) => {
            item.style.backgroundColor = idx === index ? '#666' : '#444';
        });
    }

    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.title} - ${track.artist}`;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        songList.appendChild(li);
    });

    // Load the first track
    loadTrack(currentTrackIndex);
});
