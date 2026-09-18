/* =====================================
   ELEMENTS
===================================== */

const scenes =
    document.querySelectorAll(".scene");

const startButton =
    document.getElementById("startButton");

const envelope =
    document.getElementById("envelope");

const surpriseButton =
    document.getElementById("surpriseButton");

const restartButton =
    document.getElementById("restartButton");

const confettiContainer =
    document.getElementById(
        "confettiContainer"
    );

const birthdayMusic =
    document.getElementById(
        "birthdayMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );

const musicIcon =
    document.getElementById(
        "musicIcon"
    );

const musicText =
    document.getElementById(
        "musicText"
    );

const typingText =
    document.getElementById(
        "typingText"
    );


/* =====================================
   SCENE
===================================== */

let currentScene = 1;

function showScene(sceneNumber) {

    scenes.forEach((scene) => {

        scene.classList.remove("active");

    });

    const target =
        document.getElementById(
            `scene${sceneNumber}`
        );

    if (!target) {
        return;
    }

    target.classList.add("active");

    currentScene = sceneNumber;
}


/* =====================================
   TYPING EFFECT
===================================== */

const typingMessages = [
    "A small surprise is waiting...",
    "Take your time.",
    "There is something inside."
];

let messageIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {

    const currentMessage =
        typingMessages[messageIndex];

    if (!deleting) {

        typingText.textContent =
            currentMessage.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex >=
            currentMessage.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1700
            );

            return;
        }

    } else {

        typingText.textContent =
            currentMessage.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex <= 0) {

            deleting = false;

            messageIndex++;

            if (
                messageIndex >=
                typingMessages.length
            ) {
                messageIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 45 : 75
    );
}

typeEffect();

/* =====================================
   START
===================================== */

startButton.addEventListener(
    "click",
    () => {

        showScene(2);

    }
);


/* =====================================
   OPEN ENVELOPE
===================================== */

envelope.addEventListener(
    "click",
    () => {

        if (
            envelope.classList.contains(
                "open"
            )
        ) {
            return;
        }

        envelope.classList.add(
            "open"
        );

        setTimeout(
            () => {

                showScene(3);

            },
            1300
        );
    }
);


/* =====================================
   FINAL SURPRISE
===================================== */

surpriseButton.addEventListener(
    "click",
    () => {

        createConfetti();

        setTimeout(
            () => {

                showScene(4);

            },
            450
        );
    }
);


/* =====================================
   RESTART
===================================== */

restartButton.addEventListener(
    "click",
    () => {

        envelope.classList.remove(
            "open"
        );

        showScene(1);

    }
);


/* =====================================
   CONFETTI
===================================== */

function createConfetti() {

    confettiContainer.innerHTML = "";

    const symbols = [
        "✦",
        "✧",
        "★",
        "⚡",
        "🎉",
        "✨",
        "◆"
    ];

    for (
        let i = 0;
        i < 65;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.classList.add(
            "confetti"
        );

        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        confetti.style.left =
            Math.random() *
            100 +
            "%";

        confetti.style.fontSize =
            10 +
            Math.random() * 16 +
            "px";

        confetti.style.animationDuration =
            2.5 +
            Math.random() * 2 +
            "s";

        confetti.style.animationDelay =
            Math.random() *
            0.5 +
            "s";

        confettiContainer.appendChild(
            confetti
        );
    }

    setTimeout(
        () => {

            confettiContainer.innerHTML =
                "";

        },
        5000
    );
}


/* =====================================
   KEYBOARD SUPPORT
===================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            currentScene === 1
        ) {

            showScene(2);

        }

    }
);