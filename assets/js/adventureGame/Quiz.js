import gameControlInstance from "./GameControl.js";

class Quiz {
    constructor() {
        this.isOpen = false;
        this.dim = false;
        this.currentNpc = null;
        this.currentPage = 0;
        this.injectStyles(); // Injects CSS styles dynamically
    }

    // Inject CSS styles directly into the document
    injectStyles() {
        const style = document.createElement("style");
        style.innerHTML = `
            /* Cool pixelated font */
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

            /* Quiz pop-up window */
            .quiz-popup {
                position: fixed;
                width: 50%;
                top: 15%;
                left: 50%;
                transform: translate(-50%, 0);
                background: rgba(44, 62, 80, 0.95);
                color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6);
                z-index: 9999;
                animation: fadeIn 0.3s ease-in-out;
                max-height: 70vh;
                display: flex;
                flex-direction: column;
                font-family: 'Press Start 2P', cursive; /* Cool font */
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            /* Fade-in animation */
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -10%); }
                to { opacity: 1; transform: translate(-50%, 0); }
            }

            /* Scrollable question area */
            .quiz-content {
                overflow-y: auto;
                max-height: 50vh;
                padding: 10px;
                border-radius: 5px;
                background: rgba(255, 255, 255, 0.1);
                flex-grow: 1;
            }

            /* Quiz table */
            .quiz-table {
                width: 100%;
                border-collapse: collapse;
            }

            .quiz-table th {
                background: rgba(52, 73, 94, 0.9);
                color: #00ffff; /* Neon cyan text */
                padding: 12px;
                text-align: left;
                font-size: 18px;
                text-shadow: 0px 0px 5px #00ffff; /* Soft glow effect */
            }

            .quiz-table td {
                padding: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
                font-size: 16px;
            }

            /* Input fields */
            .quiz-input {
                width: 95%;
                padding: 8px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                background: #ecf0f1;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 5px;
                font-family: 'Press Start 2P', cursive;
            }

            /* Submit button */
            .quiz-submit {
                background-color: #27ae60;
                color: white;
                border: none;
                padding: 12px 20px;
                font-size: 18px;
                cursor: pointer;
                border-radius: 5px;
                margin-top: 15px;
                transition: 0.3s ease-in-out;
                font-family: 'Press Start 2P', cursive;
            }

            .quiz-submit:hover {
                background-color: #2ecc71;
            }

            /* Dimmed background (click to close) */
            #dim {
                position: fixed;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                z-index: 9998;
                top: 0;
                left: 0;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    backgroundDim = {
        create: () => {
            this.dim = true;
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            document.body.append(dimDiv);
            dimDiv.addEventListener("click", this.backgroundDim.remove); // Click off to close
        },

        remove: () => {
            this.dim = false;
            const dimDiv = document.getElementById("dim");
            if (dimDiv) dimDiv.remove();
            this.isOpen = false;
            document.getElementById("promptTitle").style.display = "none";
            const promptDropDown = document.getElementById("promptDropDown");
            promptDropDown.style.width = "0"; 
            promptDropDown.style.top = "0";  
            promptDropDown.style.left = "-100%"; 
            promptDropDown.style.transition = "all 0.3s ease-in-out";
        },
    };

    createDisplayTable() {
        const table = document.createElement("table");
        table.className = "quiz-table";

        const header = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 2;
        th.innerText = "Answer the Questions Below:";
        header.appendChild(th);
        table.appendChild(header);

        return table;
    }

    updateTable() {
        const table = this.createDisplayTable();
        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((question, index) => {
                const row = document.createElement("tr");

                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${question}`;
                row.appendChild(questionCell);

                const inputCell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Your answer...";
                input.dataset.questionIndex = index;
                input.className = "quiz-input";
                inputCell.appendChild(input);
                row.appendChild(inputCell);
                table.appendChild(row);
            });

            // Submit button row
            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";

            const submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.className = "quiz-submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this));

            submitCell.appendChild(submitButton);
            submitRow.appendChild(submitCell);
            table.appendChild(submitRow);
        } else {
            const row = document.createElement("tr");
            const noQuestionsCell = document.createElement("td");
            noQuestionsCell.colSpan = 2;
            noQuestionsCell.innerText = "No questions available.";
            row.appendChild(noQuestionsCell);
            table.appendChild(row);
        }

        const container = document.createElement("div");
        container.className = "quiz-content";
        container.appendChild(table);
        return container;
    }

    handleSubmit() {
        const inputs = document.querySelectorAll(".quiz-input");
        const answers = Array.from(inputs).map(input => ({
            questionIndex: input.dataset.questionIndex,
            answer: input.value.trim()
        }));
        console.log("Submitted Answers:", answers);

        alert("Your answers have been submitted!");
        this.isOpen = false;
        this.backgroundDim.remove();
    }

    openPanel(npc) {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");

        if (this.isOpen) {
            this.backgroundDim.remove();
        }

        this.currentNpc = npc;
        this.isOpen = true;
        promptDropDown.innerHTML = "";

        promptTitle.style.display = "block";
        promptTitle.innerHTML = npc?.title || "Quiz Time!";
        promptDropDown.appendChild(promptTitle);

        promptDropDown.appendChild(this.updateTable());
        this.backgroundDim.create();

        promptDropDown.classList.add("quiz-popup");
    }

    initialize() {
        const promptTitle = document.createElement("div");
        promptTitle.id = "promptTitle";
        document.getElementById("promptDropDown").appendChild(promptTitle);
    }
}

export default Quiz;
