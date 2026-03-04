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
   3. CHARACTER BUILDER LOGIC
   ========================================= */

function selectFeature(type, value) {

    if (hostConfig.lockedFeatures[type]) {
        console.warn(`Feature "${type}" is locked by host.`);
        return;
    }

    const layer = document.getElementById(`layer-${type}`);
    if (layer) {
        const imgPath = `media/${value}.png`;

        layer.onerror = () => {
            layer.src = "";
        };

        layer.src = imgPath;
    } else {
        console.error(`Layer for type "${type}" not found.`);
    }

    playerData.character[type] = value;
    console.log(`Updated ${type} to ${value}`);
}


/* =========================================
   4. APPLY HOST PRESETS ON LOAD
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
   5. SETUP SCREEN LOGIC
   ========================================= */

// function startCustomization() {
//     const skin = document.getElementById("skin-select").value;
//     const gender = document.getElementById("gender-select").value;

//     playerData.character.skin = skin;
//     playerData.character.gender = gender;

//     // Hide setup screen
//     document.getElementById("setup-screen").style.display = "none";

//     // Show game UI
//     document.getElementById("game-ui").style.display = "flex";

//     // Update which buttons appear
//     updateFeatureButtons(skin, gender);
// }

// function updateFeatureButtons(skin, gender) {
//     // Example: hide long hair for male characters
//     const longHairBtn = document.getElementById("hair-long");
//     if (longHairBtn) {
//         longHairBtn.style.display = gender === "male" ? "none" : "block";
//     }

//     // Example: hide nose4 for dark skin tone
//     const nose4Btn = document.getElementById("nose4");
//     if (nose4Btn) {
//         nose4Btn.style.display = skin === "dark" ? "none" : "block";
//     }
// }

