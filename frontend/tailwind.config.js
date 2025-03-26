export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            textColor: {
                textOne: "#1c1c1c",
                textTwo:
                    "#4d4d4d",
            },
            backgroundColor: {
                bgOne: "#f0f0f0",
                bgTwo: "#e0e0e0",
                bgThree: "#b3b3b3",
                bgFour: "#333333",
                bgFive: "#000000",
            },
            animation: {
                "scale-pulse": "scale-pulse 2s infinite ease-in-out",
            },
            keyFrames: {
                scalePulse: {
                    "0% 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.2)" },
                }
            }
        }
    },
    plugins: [],
}