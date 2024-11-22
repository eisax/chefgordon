import axios from 'axios';
import { menu } from '../menu.js';
import { storage } from '../storage.js';

const url = ""

export const five = {
    async exec({ from, message }) {
        if (!storage[from]) {
            console.error('No storage entry for from:', from);
            return 'Error: No storage found';
        }

        storage[from].stage = 0;

        const leftovers = message;
        const leftoverIdeas = await suggestLeftoverIdeas(leftovers);

        return `🍽 Here’s how you can use your leftovers:\n\n${leftoverIdeas}\n\nHope this helps reduce waste and create something delicious!`;
    }
};


async function suggestLeftoverIdeas(leftovers) {
    const payload = {
        "prompt": `Suggest three meals suitable for these dietary preferences: ${leftovers}.`
    };

    // Step 1: Send the initial POST request to generate the recipe
    try {
        const response = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer --"
            }
        });
        // Step 2: Extract the ID from the response
        const resultId = response.data.id;
        console.log("Result first : " + JSON.stringify(response.data));
        return await pollStatus(resultId);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return `Error: ${error.message}`;
    }
}

function pollStatus(resultId) {
    let retries = 0;
    const maxRetries = 20;

    return new Promise((resolve, reject) => {
        function checkStatus() {
            if (retries < maxRetries) {
                axios.get(`${url}${resultId}/`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer --"
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            const data = res.data;
                            if (data.content.status === 'success') {
                                console.log("Recipe generation completed!");
                                resolve(data.content.results.output.results[0].generated_text);
                            } else {
                                retries++;
                                setTimeout(checkStatus, 3000);
                            }
                        } else {
                            reject(`Error: ${res.statusText}`);
                        }
                    })
                    .catch(err => {
                        reject(`Error: ${err.message}`);
                    });
            } else {
                reject("Max retries reached. The generation did not complete in time.");
            }
        }

        checkStatus();
    });
}

