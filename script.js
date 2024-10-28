let audio = new Audio();
let context, source, gainNode, pitchShift, biquadFilter;

// Load Audio File
function loadFile() {
    const file = document.getElementById("audioFile").files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audio.src = fileURL;
        audio.load();

        // Set up Web Audio API for sound effects
        context = new (window.AudioContext || window.webkitAudioContext)();
        source = context.createMediaElementSource(audio);
        gainNode = context.createGain();
        pitchShift = context.createGain();
        biquadFilter = context.createBiquadFilter();

        source.connect(gainNode).connect(pitchShift).connect(biquadFilter).connect(context.destination);
    }
}

// Play or Pause Audio
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Stop Audio
function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

// Adjust Volume
function adjustVolume(value) {
    gainNode.gain.value = value;
}

// Adjust Pitch
function adjustPitch(value) {
    audio.playbackRate = value;
}

// Adjust Frequency
function adjustFrequency(value) {
    biquadFilter.type = "lowshelf";
    biquadFilter.frequency.value = value;
    biquadFilter.gain.value = 15;
}

// Share Audio
function share() {
    if (navigator.share) {
        navigator.share({
            title: "My Custom Sound",
            text: "Check out my adjusted sound!",
            url: audio.src
        }).then(() => console.log("Shared successfully"))
          .catch((error) => console.log("Share failed:", error));
    } else {
        alert("Sharing not supported on this browser.");
    }
}
