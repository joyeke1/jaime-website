/**
 * game.js
 * Handles Character Creation, Host Restrictions, and Data Collection.
 */

/* =========================================
   1. HOST CONFIGURATION (The Rules)
   ========================================= */

const hostConfig = {
    hostId: "host_12345",
    lockedFeatures: {
        skin: false,
        hair: false,
        eyes: false,
        clothing: false
    },
    presets: {}
};

/* =========================================
   2. GAME STATE (The Player's Data)
   ========================================= */

let playerData = {
    character: {
        skin: "default",
        hair: "default",
        eyes: "default",
        nose: "default",
        mouth: "default",
        clothing: "default",
        accessories: "none",
        gender: "default"
    },
    surveyAnswers: {}
};

/* =========================================
   3. APPLY HOST PRESETS ON LOAD
   ========================================= */

window.addEventListener("DOMContentLoaded", () => {
    for (let feature in hostConfig.presets) {
        const value = hostConfig.presets[feature];
        const layer = document.getElementById(`layer-${feature}`);

        if (layer) {
            layer.src = `media/${value}.png`;
            playerData.character[feature] = value;
        }
    }
});

/* =========================================
   4. MAIN FEATURE SELECTION LOGIC
   ========================================= */

function selectFeature(type, value) {

    /* ------------------------------
       Highlight selected button
    ------------------------------ */
    document.querySelectorAll(`#controls button[id^="${type}"]`)
        .forEach(btn => btn.classList.remove("selected"));

    const activeBtn = document.getElementById(`${type}-${value}`);
    if (activeBtn) activeBtn.classList.add("selected");

    /* ------------------------------
       Prevent changes if locked
    ------------------------------ */
    if (hostConfig.lockedFeatures[type]) {
        console.warn(`Feature "${type}" is locked by host.`);
        return;
    }

    /* ------------------------------
       Update the image layer
    ------------------------------ */
    const layer = document.getElementById(`layer-${type}`);

    if (layer) {

        // IMPORTANT: must be let, not const
        let imgPath = `media/${value}.png`;

        // Eyes use a different filename pattern
        if (type === 'eyes') {
            imgPath = `media/eyes-${value}.png`;
        }

        layer.onerror = () => {
            layer.src = "";
        };

        layer.src = imgPath;

        /* ------------------------------
           SKIN CLASS HANDLING
        ------------------------------ */
        if (type === 'skin') {
            const skinLayer = document.getElementById('layer-skin');

            skinLayer.classList.remove(
                'skin-light', 'skin-medium', 'skin-tan', 'skin-brown', 'skin-dark'
            );

            skinLayer.classList.add(`skin-${value}`);
        }

        /* ------------------------------
           NOSE CLASS HANDLING
        ------------------------------ */
        if (type === 'nose') {
            const noseLayer = document.getElementById('layer-nose');

            noseLayer.classList.remove(
                'nose-nose1','nose-nose2','nose-nose3','nose-nose4','nose-nose5'
            );

            noseLayer.classList.add(`nose-${value}`);
        }
        /* ------------------------------
        EYE CLASS HANDLING
        ------------------------------ */
        if (type === 'eyes') {
            const eyesLayer = document.getElementById('layer-eyes');

            eyesLayer.classList.remove(
                'eyes-blue', 'eyes-brown', 'eyes-green', 'eyes-black'
            );

            eyesLayer.classList.add(`eyes-${value}`);
        }


    } else {
        console.error(`Layer for type "${type}" not found.`);
    }

    /* ------------------------------
       Update player data
    ------------------------------ */
    playerData.character[type] = value;
    console.log(`Updated ${type} to ${value}`);
}
