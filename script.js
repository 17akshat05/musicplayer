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
    // Check if navigator.share is supported
    if (navigator.share) {
        navigator.share({
            title: "My Custom Sound",
            text: "Check out my adjusted sound!",
            url: audio.src // Ensure audio.src is a URL
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Share failed:", error));
    } else {
        // Fallback for unsupported browsers
        alert("Sharing is not supported on this browser. Copy the link to share manually.");
        // Optional: Copy audio URL to clipboard if sharing isn’t available
        if (audio.src) {
            copyToClipboard(audio.src);
            alert("Audio link copied to clipboard!");
        }
    }
}

// Fallback function to copy the URL to clipboard
function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
