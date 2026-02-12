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
        eyes: true,     // Eyes locked to blue
        clothing: false
    },
    presets: {
        eyes: "blue"
    }
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
        accessories: "none"
    },
    surveyAnswers: {}
};

/* =========================================
   3. CHARACTER BUILDER LOGIC
   ========================================= */

/**
 * Updates a specific feature of the character.
 * This version uses your flat `media/` folder.
 */

function selectFeature(type, value) {

    // If the host locked this feature, ignore changes
    if (hostConfig.lockedFeatures[type]) {
        console.warn(`Feature "${type}" is locked by host.`);
        return;
    }

    // Update the image layer
    const layer = document.getElementById(`layer-${type}`);
    if (layer) {
        layer.src = `media/${value}.png`;
    } else {
        console.error(`Layer for type "${type}" not found.`);
    }

    // Update player data
    playerData.character[type] = value;

    console.log(`Updated ${type} to ${value}`);
}

/* =========================================
   4. APPLY HOST PRESETS ON LOAD
   ========================================= */

window.addEventListener("DOMContentLoaded", () => {
    // Apply locked presets (e.g., eyes = blue)
    for (let feature in hostConfig.presets) {
        const value = hostConfig.presets[feature];
        const layer = document.getElementById(`layer-${feature}`);

        if (layer) {
            layer.src = `media/${value}.png`;
            playerData.character[feature] = value;
        }
    }
});
