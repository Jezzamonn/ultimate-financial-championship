const SOUND_NAMES = [
    "click",
    "coin",
    "explode",
    "fight",
    "lose",
    "random",
    "slide",
    "step",
    "win",
];

const sounds = {};

export function loadSounds() {
    for (const name of SOUND_NAMES) {
        sounds[name] = [];
        for (let i = 0; i < 30; i++) {
            const audio = new Audio(`sfx/${name}.mp3`);
            audio.oncanplaythrough = () => {
                sounds[name].push(audio);
            }
        }
    }
}

export function playSound(name) {
    /** @type {!Array<!HTMLAudioElement>} */
    const soundQueue = sounds[name];
    if (soundQueue.length === 0) {
        return;
    }

    const nextSound = soundQueue.shift();
    nextSound.play();
    soundQueue.push(nextSound);
}

loadSounds();