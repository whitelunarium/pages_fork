/**
 * DialogueData.js
 * Contains randomized dialogue data for NPCs in GameLevelDesert
 */

// Each NPC has an array of possible dialogues
// Each dialogue object has a message and can optionally have a mood property
// that can be used for determining which animation to play or other styling
const DialogueData = {
  Tux: [
    { message: "Hi I am Tux, the Linux mascot. I am very happy to spend some linux shell time with you!" },
    { message: "Did you know that Linux powers most of the internet's servers? Pretty cool, right?" },
    { message: "Want to learn some Linux commands? Just hit 'E' to interact with me!" },
    { message: "The terminal may look intimidating at first, but it's actually quite powerful and fun to use!" },
    { message: "In Linux, everything is a file. Even devices are represented as files in the system." }
  ],
  
  Octocat: [
    { message: "Hi I am Octocat! I am the GitHub code code code collaboration mascot" },
    { message: "Git is all about version control. Never lose your work again!" },
    { message: "Want to test your GitHub knowledge? Press 'E' to take my quiz!" },
    { message: "Pull requests are a great way to collaborate on code. Create, review, discuss, and merge!" },
    { message: "Remember to commit early and commit often! It's the GitHub way." }
  ],
  
  Robot: [
    { message: "Hi I am Robot, the Jupyter Notebook mascot. I am very happy to spend some linux shell time with you!" },
    { message: "Jupyter Notebooks are perfect for data science and interactive computing!" },
    { message: "Ready for a space adventure? Press 'E' to blast some meteors!" },
    { message: "Did you know Jupyter supports over 40 programming languages? Python, R, Julia, and many more!" },
    { message: "Markdown cells make documentation a breeze in Jupyter Notebooks. Try it out!" }
  ],
  
  'StarWarsR2D2': [
    { message: "Hi I am R2D2. Leave this planet and help defend the rebel base on Hoth!" },
    { message: "Beep boop! The Empire is attacking! We need your help!" },
    { message: "R2-D2 whistles excitedly about the starfighters waiting for pilots." },
    { message: "Binary sounds translate to: Press 'E' to join the Rebellion!" },
    { message: "R2 projects a hologram of Princess Leia saying 'Help me, you're my only hope.'" }
  ],
  
  'Stock-NPC': [
    { message: "Darn it, I lost some money on the stock market.. come with me to help me out?" },
    { message: "Buy low, sell high! That's the key to success... I think." },
    { message: "Have you seen the latest market trends? I could use some help analyzing them." },
    { message: "I've got a hot tip on a new tech stock! Want to check it out?" },
    { message: "My portfolio is diversified, but I'm still not seeing the returns I expected." }
  ],
  
  'Crypto-NPC': [
    { message: "*cha-ching*" },
    { message: "To the moon! 🚀 My Bitcoin investment is going places!" },
    { message: "Have you heard about the latest blockchain technology?" },
    { message: "Crypto never sleeps, and neither do I! Always watching those charts..." },
    { message: "Want to try your luck at the crypto casino? Press 'E'!" }
  ],
  
  Minesweeper: [
    { message: "Want to play a game of Minesweeper? Right-click to flag mines!" },
    { message: "I've hidden mines all over the field. Think you can find them without getting blown up?" },
    { message: "Minesweeper is all about logic and careful planning. Are you up for the challenge?" },
    { message: "The numbers tell you how many mines are adjacent. Pay attention to them!" },
    { message: "Some say I'm an AI trained specifically for pattern recognition. Want to test your skills?" }
  ],
  
  'End Portal': [
    { message: "Teleport to the End? Press E" },
    { message: "The void calls to you... Do you dare to enter?" },
    { message: "Beyond this portal lies the conclusion of your journey." },
    { message: "All adventures must come to an end. Are you ready for yours?" },
    { message: "Press 'E' to discover what awaits you on the other side..." }
  ]
};

export default DialogueData;