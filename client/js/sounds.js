const SOUND_INFO = [
    {name: "click", volume: 0.1},
    {name: "coin", volume: 0.2},
    {name: "explode", volume: 0.4},
    {name: "fight", volume: 0.4},
    {name: "lose", volume: 0.4},
    {name: "random", volume: 0.4},
    {name: "slide", volume: 0.4},
    {name: "step", volume: 0.4},
    {name: "win", volume: 0.4},
];

const sounds = {};

export function loadSounds() {
    for (const soundInfo of SOUND_INFO) {
        const name = soundInfo.name;
        sounds[name] = [];
        for (let i = 0; i < 30; i++) {
            const audio = new Audio(`sfx/${name}.mp3`);
            audio.oncanplaythrough = () => {
                audio.volume = soundInfo.volume;    
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