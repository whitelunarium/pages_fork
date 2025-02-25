import GameControl from './GameControl.js';


class Game {
    // initialize user and launch GameControl 
    static main(path, javaURI, pythonURI, fetchOptions) {
        this.javaURI = javaURI;
        this.pythonURI = pythonURI;
        this.fetchOptions = fetchOptions;
        this.initializeUser();
        new GameControl(path).start();
    }

    static initializeUser() {
        const URL = this.pythonURI + '/api/id';
        return fetch(URL, this.fetchOptions)
            .then(response => {
                if (response.status !== 200) {
                    console.error("HTTP status code: " + response.status);
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data === null) return null;
                console.log(data);
                return data;
            })
            .catch(err => {
                console.error("Fetch error: ", err);
                return null;
            });
    }

    static fetchStats(personId) {
        const endpoints = {
            balance: `${javaURI}/rpg_answer/getBalance/${personId}`,
            chatScore: `${javaURI}/rpg_answer/getChatScore/${personId}`,
            questionsAnswered: `${javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
        };

        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, fetchOptions)
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
            const response = fetch(`${javaURI}/rpg_answer/submitAnswer`, {
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

