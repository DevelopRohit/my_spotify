let song = [
    {
        id: 1,
        songName: "Chandniya",
        artis: "Vishal Mishra, Mithoon",
        src: "song/Chandaniya Master Of Melody 128 Kbps.mp3",
        songimg: "songimg/chandniya.jpeg",
        musicsvg: "svg/music.svg"
    },
    {
        id: 2,
        songName: "Chor Bazari",
        artis: "Neeraj Shridhar, Sunidhi Chauhan, Zahrah S Khan, and Tanishk Bagchi",
        src: "song/Chor Bazari Phir Se Bhool Chuk Maaf 128 Kbps.mp3",
        songimg: "songimg/Chorbazari.jpeg",
        musicsvg: "svg/music.svg"
    },
    {
        id: 3,
        songName: "Dhun",
        artis: "Arijit Singh, Mithoon",
        src: "song/Dhun Saiyaara 128 Kbps.mp3",
        songimg: "songimg/Dhun.jpeg",
        musicsvg: "svg/music.svg"
    },
    {
        id: 4,
        songName: "Hamsafar",
        artis: "Sachet Tandon and Parampara Tandon",
        src: "song/Humsafar Saiyaara 128 Kbps.mp3",
        songimg: "songimg/Humsafar.jpeg",
        musicsvg: "svg/music.svg"
    },
];

let currentSongindex = 0;
let audio = new Audio();

function musicList() {
    let songlist = document.querySelector(".songList ul");
    songlist.innerHTML = "";

    song.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <img src="${item.musicsvg}" alt="music-icon" class="invert">
            <img src="${item.songimg}" alt="music-icon" class="songimg">
            <div> 
                <span>${item.songName}</span>
                <p>${item.artis}</p>
            </div>
            <img src="svg/spotify_play_btn.svg" alt="" class="list_playbtn">
        `;
        li.onclick = () => {
            currentSongindex = index;
            playsong(song[currentSongindex]);
        };
        songlist.appendChild(li);
    });
}

function playsong(Songdata) {
    audio.src = Songdata.src;
    audio.play();

    document.querySelector(".songinfo").innerHTML = Songdata.songName;
    document.querySelector(".artics_name").innerHTML = Songdata.artis;

    document.querySelector("#play").src = "svg/pause.svg";
}

function formattime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

document.addEventListener("DOMContentLoaded", () => {
    musicList();
    playsong(song[currentSongindex]);

    let playBtn = document.querySelector("#play");
    let musicrange = document.querySelector("#musicrange");
    let currentTimeEl = document.querySelector(".current_time");
    let totalTimeEl = document.querySelector(".total_time");

    // Play / Pause
    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playBtn.src = "svg/pause.svg";
        } else {
            audio.pause();
            playBtn.src = "svg/play.svg";
        }
    });

    // Next song
    document.querySelector("#next").addEventListener("click", () => {
        currentSongindex = (currentSongindex + 1) % song.length;
        playsong(song[currentSongindex]);
    });

    // Previous song
    document.querySelector("#previous").addEventListener("click", () => {
        currentSongindex = (currentSongindex - 1 + song.length) % song.length;
        playsong(song[currentSongindex]);
    });



    // Time update
    audio.addEventListener("timeupdate", () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            musicrange.value = (audio.currentTime / audio.duration) * 100;
            let songtime = document.querySelector(".songtime");
            songtime.textContent = `${formattime(audio.currentTime)} / ${formattime(audio.duration)}`;
        }
    });

    // Seek
    musicrange.addEventListener("input", () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            audio.currentTime = (musicrange.value / 100) * audio.duration;
        }
    });

    // Auto next on end
    audio.addEventListener("ended", () => {
        currentSongindex = (currentSongindex + 1) % song.length;
        playsong(song[currentSongindex]);
    });


    // Assume you already have your song array and playsong(songObj) function

let cardElements = document.querySelectorAll(".card"); // All cards in HTML

cardElements.forEach((card, index) => {
    card.addEventListener("click", () => {
        // Get the song from array based on card's index
        let selectedSong = song[index];

        // Play the selected song
        playsong(selectedSong);
    });
});


});
