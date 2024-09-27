let reminders = [];
let notes = [];

function printOutput(message) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<p><b><i>${message}</i></b></p>`;
}

function clearInput() {
    document.getElementById("userInput").value = "";
}

function get_time_of_day() {
    const currentHour = new Date().getHours();
    if (5 <= currentHour && currentHour < 12) {
        return "morning";
    } else if (12 <= currentHour && currentHour < 17) {
        return "afternoon";
    } else if (17 <= currentHour && currentHour < 20) {
        return "evening";
    } else {
        return "night";
    }
}

function printGreeting() {
    const timeOfDay = get_time_of_day();
    printOutput(`Welcome Sir!<br>Good ${timeOfDay}!<br>It's ${new Date().toLocaleTimeString()}, sir`);
}

function printAssistancePrompt() {
    printOutput("How can I assist you today?");
}

function printFurtherAssistance() {
    const assistanceMessages = [
        "Anything else on your mind, sir?",
        "How may I assist you further, sir?",
        "Any other questions, sir?",
        "What else can I do for you, sir?",
        "Is there anything else you would like to ask?",
        "Anything else you would like assistance with, sir?"
    ];
    printOutput(assistanceMessages[Math.floor(Math.random() * assistanceMessages.length)]);
}

function printDate() {
    printOutput(`Today's date is ${new Date().toLocaleDateString()}`);
}

function setReminder(reminderText, reminderTime) {
    reminders.push([reminderText, reminderTime]);
    printOutput("Reminder set!");
}

function printReminders() {
    if (reminders.length === 0) {
        printOutput("You have no reminders.");
    } else {
        printOutput("Your reminders:");
        reminders.forEach((reminder, index) => {
            printOutput(`${index + 1}. ${reminder[0]} at ${reminder[1]}`);
        });
    }
}

function handleEquation(query) {
    try {
        const result = eval(query.split("equation")[1]);
        printOutput(`The result is ${result}`);
    } catch (error) {
        printOutput("Sorry, an error occurred while evaluating the equation.");
    }
}

function generateSecurePassword(length = 12) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

function addNote() {
    const noteText = prompt("What would you like to note?");
    const timestamp = new Date().toLocaleString();
    const note = `${timestamp}: ${noteText}`;
    notes.push(note);
    printOutput("Note added!");
}

function printNotes() {
    if (notes.length === 0) {
        printOutput("You have no notes.");
    } else {
        printOutput("Your notes:");
        notes.forEach((note, index) => {
            printOutput(`${index + 1}. ${note}`);
        });
    }
}

function printGoodbye(timeOfDay) {
    let message = "";
    if (timeOfDay === "morning" || timeOfDay === "afternoon") {
        message = "Have a good day.";
    } else if (timeOfDay === "night") {
        message = "Have a good night and sweet dreams.";
    }
    printOutput(`${message}<br>Goodbye sir!`);
}

function openApp(appName) {
    printOutput(`Opening ${appName}, Done sir`);
    window.open(`https://www.${appName.toLowerCase()}.com`, '_blank');
}

function generateQRCode(qrText) {
    const outputDiv = document.getElementById("output");
    const qrCodeDiv = document.createElement("div");
    outputDiv.appendChild(qrCodeDiv);
    new QRCode(qrCodeDiv, {
        text: qrText,
        width: 128,
        height: 128
    });
}

function processCommand() {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase();

    if (userInput.includes("time")) {
        printOutput(`It's ${new Date().toLocaleTimeString()} sir`);
        printFurtherAssistance();
    } else if (userInput.includes("date")) {
        printDate();
        printFurtherAssistance();
    } else if (userInput.includes("add reminder")) {
        const reminderText = prompt("What would you like to be reminded of?");
        const reminderTime = prompt("When should I remind you? (HH:MM)");
        setReminder(reminderText, reminderTime);
        printFurtherAssistance();
    } else if (userInput.includes("reminders")) {
        printReminders();
        printFurtherAssistance();
    } else if (userInput.includes("equation")) {
        handleEquation(userInput);
        printFurtherAssistance();
    } else if (userInput.includes("generate password")) {
        const passwordLength = parseInt(prompt("Enter password length (default is 12):")) || 12;
        const newPassword = generateSecurePassword(passwordLength);
        printOutput(`Generated Password: ${newPassword}`);
        printFurtherAssistance();
    } else if (userInput.includes("add note")) {
        addNote();
        printFurtherAssistance();
    } else if (userInput.includes("generate qr")) {
        const qrText = prompt("Enter text for QR code:");
        if (qrText) {
            generateQRCode(qrText);
            printOutput("QR code generated!");
        } else {
            printOutput("Please enter some text for the QR code.");
        }
    } else if (userInput.includes("todo add")) {
        const task = prompt("Enter the task:");
        addTask(task);
        printFurtherAssistance();
    } else if (userInput.includes("todo list")) {
        listTasks();
        printFurtherAssistance();
    } else if (userInput.includes("todo remove")) {
        const taskIndex = parseInt(prompt("Enter the task number to remove:"));
        removeTask(taskIndex);
        printFurtherAssistance();
    } else if (userInput === "help") {
        printHelp();
        printFurtherAssistance();
    } else if (userInput === "bye") {
        printGoodbye(get_time_of_day());
    } else if (userInput.includes("open")) {
        const appName = userInput.split("open")[1].trim();
        if (appName) {
            openApp(appName);
        } else {
            printOutput("Please specify the name of the application you want to open.");
        }
    } else {
        printOutput("Invalid command.");
        printFurtherAssistance();
    }

    clearInput();
}

printGreeting();
printAssistancePrompt();

function addTask(task) {
    if (task) {
        reminders.push(task);
        printOutput("Task added to your to-do list!");
    } else {
        printOutput("Please enter a task.");
    }
}

function listTasks() {
    if (reminders.length === 0) {
        printOutput("Your to-do list is empty.");
    } else {
        printOutput("Your to-do list:");
        reminders.forEach((task, index) => {
            printOutput(`${index + 1}. ${task}`);
        });
    }
}

function removeTask(taskIndex) {
    if (!isNaN(taskIndex) && taskIndex > 0 && taskIndex <= reminders.length) {
        reminders.splice(taskIndex - 1, 1);
        printOutput("Task removed from your to-do list.");
    } else {
        printOutput("Invalid task number.");
    }
}

function printHelp() {
    printOutput("Available commands:");
    printOutput("1. time - Get the current time");
    printOutput("2. date - Get the current date");
    printOutput("3. add reminder - Add a new reminder");
    printOutput("4. reminders - List all reminders");
    printOutput("5. equation [expression] - Solve a mathematical expression");
    printOutput("6. generate password - Generate a secure password");
    printOutput("7. add note - Add a new note");
    printOutput("8. generate qr - Generate a QR code");
    printOutput("9. todo add - Add a new task to the to-do list");
    printOutput("10. todo list - List all tasks in the to-do list");
    printOutput("11. todo remove - Remove a task from the to-do list");
    printOutput("12. open [app] - Open a specified application");
    printOutput("13. help - Show available commands");
    printOutput("14. bye - Say goodbye");
}

document.addEventListener('DOMContentLoaded', () => {
    let recognition = null;
    let isListening = false;

    const speak = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    const checkPassword = () => {
        const passwordInput = prompt('Enter password to start:');

        if (passwordInput !== 'aeliana@2024') {
            alert('Incorrect password.');
            return false;
        }
        return true;
    };

    const openApp = (appName) => {
        speak(`Opening ${appName}, Done sir`);
        window.open(`https://www.${appName.toLowerCase()}.com`, '_blank');
    };

    const handleError = (error) => {
        console.error('An error occurred:', error);
        speak('Sorry, there was an error. Please try again later.');
    };

    const getUserPreferences = () => {
        return {
            name: 'Sir', // Default name if not specified
            location: 'Chas, Jharkhand'
        };
    };

    const personalizeGreeting = () => {
        const userPreferences = getUserPreferences();
        const { name, location } = userPreferences;
        const currentTime = new Date();
        const hours = currentTime.getHours();

        let greeting = '';
        if (hours < 12) {
            greeting = 'Good morning';
        } else if (hours < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }

        speak(`Welcome ${name}. ${greeting}. Aeliana at your service. What can I do for you, sir?`);
    };

    const getRandomResponse = () => {
        const responses = [
            "Anything else on your mind, sir?",
            "How may I assist you further, sir?",
            "Any other questions, sir?",
            "What else can I do for you, sir?",
            "Is there anything else you would like to ask?",
            "Anything else you would like assistance with, sir?"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return randomResponse;
    };

    const performSearch = (query) => {
        if (query) {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        } else {
            speak('No search query entered.');
        }
    };

    const handleRecognitionResult = async (event) => {
        const result = event.results[0][0].transcript;
        document.getElementById('output').textContent = `You said: ${result}`;

        
        
        
        if (!isListening) {
            isListening = true;
            personalizeGreeting();
        } else {
            if (result.includes('tell me a joke')) {
                try {
                    const joke = await getJoke();
                    speak(joke);
                } catch (error) {
                    handleError(error);
                }
            } else if (result.includes('weather')) {
                try {
                    const weatherInfo = await getWeather();
                    speak(weatherInfo);
                } catch (error) {
                    handleError(error);
                }
            } else if (result.includes('calculate')) {
                try {
                    let equation = result.split('calculate ')[1];
                    equation = equation.replace(/pi/g, Math.PI);

                    if (equation.includes('sqrt of')) {
                        equation = equation.split('square root of').join('Math.sqrt');
                    } else if (equation.includes('√')) {
                        equation = equation.replace(/√/g, 'Math.sqrt');
                    }

                    const answer = eval(equation);
                    speak(`Sir, the answer to ${equation} is ${answer}`);
                } catch (error) {
                    handleError(error);
                }
            } else if (result.includes('time')) {
                const currentTime = new Date().toLocaleTimeString();
                speak(`It's ${currentTime}, sir`);
                speak(getRandomResponse());
            } else if (result.includes('date')) {
                const currentDate = new Date().toLocaleDateString();
                speak(`Today's date is ${currentDate}`);
                speak(getRandomResponse());
            } else if (result.includes('open')) {
                const appName = result.split('open ')[1];

                if (appName) {
                    openApp(appName);
                } else {
                    speak('Sorry sir, I don\'t recognize that app.');
                }
            } else if (result.toLowerCase().includes('search')) {
                if (result.toLowerCase().includes('with keyboard')) {
                    const query = prompt('Enter your search query:');
                    performSearch(query);
                } else {
                    performSearch(result.replace('search', '').trim());
                }
            } else {
                speak(getRandomResponse());
            }
        }
    };

    const startRecognition = () => {
        if (!isListening) {
            isListening = true;

            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';

            recognition.onresult = handleRecognitionResult;

            recognition.onend = () => {
                if (isListening) {
                    setTimeout(() => {
                        recognition.start();
                    }, 2000);
                }
            };

            recognition.start();
            document.getElementById('output').textContent = 'Listening...';
        }
    };

    // Function to fetch a random joke in Hindi
    const getJoke = async () => {
        try {
            const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any');
            const jokeData = await jokeResponse.json();

            return jokeData.type === 'twopart' ? `${jokeData.setup} ${jokeData.delivery}` : jokeData.joke;
        } catch (error) {
            console.error('Error fetching joke:', error);
            throw new Error('Failed to fetch joke');
        }
    };

    // Function to fetch weather information using OpenWeather API
    const getWeather = async () => {
        const apiKey = '9fd3e42f107014b62cb7b2bbfcbea1bd'; // Replace 'YOUR_API_KEY' with your actual API key
        const city = 'Chas'; // Replace 'Chas' with your desired city

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const weatherData = await response.json();

            if (weatherData.cod !== 200) {
                throw new Error(weatherData.message);
            }

            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;
            const humidity = weatherData.main.humidity;

            const weatherInfo = `Currently in ${city}, it's ${weatherDescription}. The temperature is ${temperature}°C and the humidity is ${humidity}%.`;

            return weatherInfo;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw new Error('Failed to fetch weather information');
        }
    };

    // Prompt for password immediately upon running the program
    if (checkPassword()) {
        personalizeGreeting();

        // Event listener for the "Start Recognition" button
        document.getElementById('startRecognition').addEventListener('click', () => {
            startRecognition();
        });

        // Event listener for the "Stop Recognition" button
        document.getElementById('stopRecognition').addEventListener('click', () => {
            isListening = false;
            if (recognition && recognition.abort) {
                recognition.abort();
            }
            document.getElementById('output').textContent = 'Recognition stopped.';
        });
    }
});