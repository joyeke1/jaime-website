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
        tie: "none",
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
            layer.src = `../media/${value}.png`;
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
    // Remove highlighting from all buttons in the same control group
    document.querySelectorAll(`#controls button[id^="${type}"]`)
        .forEach(btn => btn.classList.remove("selected"));

    // Ensure we target the correct button id
    const activeBtn = document.getElementById(type === 'hair' ? value : `${type}-${value}`);
    if (activeBtn) {
        activeBtn.classList.add("selected");
    } else {
        console.warn(`No button found for type=${type} value=${value}`);
    }


    /* ------------------------------
       Prevent changes if locked
    ------------------------------ */
    if (hostConfig.lockedFeatures[type]) {
        console.warn(`Feature "${type}" is locked by host.`);
        return;
    }

    /* ------------------------------
       For tie, skip if already selected
    ------------------------------ */
    if (type === 'tie' && value === playerData.character.tie) {
        return;
    }

    /* ------------------------------
       Update the image layer
    ------------------------------ */
    const layer = document.getElementById(`layer-${type}`);

    if (layer) {

        // IMPORTANT: must be let, not const
        let imgPath = `../media/${value}.png`;

        // Eyes and tie use special filename patterns or behavior
        if (type === 'skin') {
            imgPath = `../media/skin-${value}.png`;
            layer.src = imgPath;
        } else if (type === 'eyes') {
            imgPath = `../media/eyes-${value}.png`;
            layer.src = imgPath;
        } else if (type === 'tie') {
            if (value === 'blue') {
                layer.src = "";
            } else {
                imgPath = `../media/tie-${value}.png`;
                layer.src = imgPath;
            }
        } else {
            layer.src = imgPath;
        }

        /* ------------------------------
           SKIN CLASS HANDLING
        ------------------------------ */
        /* ------------------------------
   SKIN CLASS HANDLING
------------------------------ */
if (type === 'skin') {
    const stage = document.getElementById('character-stage');
    
    // Dynamically remove any class that starts with "skin-"
    stage.className = stage.className.split(' ')
        .filter(c => !c.startsWith('skin-'))
        .join(' ');

    stage.classList.add(`skin-${value}`);
}

        /* ------------------------------
   HAIR CLASS HANDLING
------------------------------ */
if (type === 'hair') {
    const hairLayer = document.getElementById('layer-hair');
    
    hairLayer.className = hairLayer.className.split(' ')
        .filter(c => c === 'character-layer' || c === 'hair-layer' || !c.match(/hair\d+/))
        .join(' ');

    hairLayer.classList.add(value);
}

/* ------------------------------
   NOSE CLASS HANDLING
------------------------------ */
if (type === 'nose') {
    const noseLayer = document.getElementById('layer-nose');

    // Preserve the base nose-layer class, remove only previous nose variant classes
    noseLayer.classList.remove('nose-nose1', 'nose-nose2', 'nose-nose3', 'nose-nose4');
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

        if (type === 'tie') {
            const tieLayer = document.getElementById('layer-tie');

            tieLayer.classList.remove('tie-blue', 'tie-red');
            if (value !== 'blue') {
                tieLayer.classList.add(`tie-${value}`);
            }
        }

        /* ------------------------------
        MOUTH CLASS HANDLING
        ------------------------------ */
        if (type === 'mouth') {
            const mouthLayer = document.getElementById('layer-mouth');

            mouthLayer.classList.remove(
                'mouth-smile', 'mouth-frown', 'mouth-teeth'
            );

            mouthLayer.classList.add(`mouth-${value}`);
            mouthLayer.src = `../media/mouth-${value}.png`;
        }

    } else {
        console.error(`Layer for type "${type}" not found.`);
    }

    /* ------------------------------
       Update player data
    ------------------------------ */
    if (type === 'tie' && value === 'blue') {
        playerData.character[type] = 'none';
        console.log(`Updated ${type} to none`);
    } else {
        playerData.character[type] = value;
        console.log(`Updated ${type} to ${value}`);
    }
}
