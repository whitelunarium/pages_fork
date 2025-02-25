import GameControl from './GameControl.js';

class Game {
    // launch GameControl
    static main(path) {
        new GameControl(path).start();
    }

    static initializeUser() {
        const URL = pythonURI + '/api/id';
        return fetch(URL, fetchOptions)
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
    static updateStats(quizAnswers) {

    }
}
export default Game;
// Launch game on load
window.onload = () => Game.main();
