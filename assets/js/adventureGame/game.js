import GameControl from './GameControl.js';


class Game {
    // initialize user and launch GameControl 
    static main(path, pythonURI, javaURI, fetchOptions) {
        this.pythonURI = pythonURI;
        this.javaURI = javaURI;
        this.fetchOptions = fetchOptions;
        this.initializeUser();
        this.uid;
        this.id;
        new GameControl(path).start();
    }

    static initializeUser() {
        const pythonURL = this.pythonURI + '/api/id';
        fetch(pythonURL, this.fetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.uid = data.uid;
                console.log("User ID:", this.uid);  // Ensure this prints correctly
    
                // Now that this.uid is set, fetch from the Java backend
                const javaURL = this.javaURI + '/rpg_answer/person/' + this.uid;
                return fetch(javaURL, this.fetchOptions);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data) return;
                this.id = data.id;
                this.fetchStats(data.id);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
    

    static fetchStats(personId) {
        const endpoints = {
            balance: this.javaURI + '/rpg_answer/getBalance/' + personId,
            chatScore: this.javaURI + '/rpg_answer/getChatScore/' + personId,
            questionsAnswered: this.javaURI + '/rpg_answer/getQuestionsAnswered/' + personId
        };

        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, this.fetchOptions)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem(key, data ?? 0);
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }
    // called to update scoreboard and player stats
    static updateStats(content, questionId, personId) {
        try {
            const response = fetch(this.javaURI + '/rpg_answer/submitAnswer', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content,
                    questionId: questionId,
                    personId: personId
                })
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = response.json();

            return data.score || "Error scoring answer"; // Return score

        } catch (error) {
            console.error("Error submitting answer:", error);
            return "Error submitting answer";
        }
    }
}
export default Game;

