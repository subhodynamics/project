
// const chatButtonContainer = "coding_desc_container__gdB9M";
const chatButtonContainer = "coding_nav_bg__HRkIn p-2 nav nav-pills w-100 ";
const chatFormContainer = "coding_desc_container__gdB9M";
const pageUrl = window.location.href;
const uniqueId = extractUniqueId(pageUrl);
console.log(uniqueId , " outside");

// window.addEventListener('load', addChatButton);

// ! Function to check page change
let lastPageVisited = "";
let allInputTextContent = '';
const observer = new MutationObserver(() => {
    handleContentChange();
    console.log("Mutation observed");
});

observer.observe(document.body, {childList: true, subtree: true});

handleContentChange();

function handleContentChange() {
    if (isPageChanged()) {
        handlePageChange();
        console.log("Page changed");
    }
}

function isPageChanged() {
    const currentPage = window.location.pathname;
    if (currentPage === lastPageVisited) return false;
    lastPageVisited = currentPage;
    return true;
}

function onTargetPage() {
    return window.location.pathname.startsWith("/problems/") && window.location.pathname.length > "/problems/".length;
}

function cleanUpPage() {
    const chatButton = document.getElementById('add-chat-button');
    if (chatButton) {
        chatButton.remove();
        // console.log('button must be removed');
    }

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.remove();
    }
}

function handlePageChange() {
    if (onTargetPage()) {
        console.log("changes done on target page");
        cleanUpPage();
        addChatButton();
        getContext();
    }
}

function extractUniqueId (url) {
    const start = url.indexOf("problems/") + "problems/".length; 
    const end = url.indexOf("?", start); 
    const result = end === -1 ? url.slice(start) : url.slice(start, end);

    return result;
    // console.log(result);
}

// ! Function to add chat button

function addChatButton() {
    injectCSS();

    const chatButton = document.createElement('div');
    chatButton.id = "add-chat-button";
    // console.log('button must be added');
    chatButton.innerHTML = `<button class="az-chat-button">
    <span class="az-chat-shadow"></span>
    <span class="az-chat-edge"></span>
    <div class="az-chat-front">
        <span>AI Chat</span>
    </div>
    </button>
    `;

    const buttonPlace = document.getElementsByClassName(chatButtonContainer)[0];

    buttonPlace.insertAdjacentElement('afterbegin', chatButton);

    const buttonElement = document.querySelector('.az-chat-button');
    buttonElement.addEventListener('click', showChatForm);

}

// ! Function to inject the CSS

function injectCSS() {
    const az_chat_style = document.createElement('style');
    az_chat_style.innerHTML = `
        .az-chat-button {
            position: relative;
            border: none;
            background: transparent;
            padding: 0;
            outline: none;
            cursor: pointer;
            font-family: sans-serif;
            margin-right: 10px;
        }
        
        /* az-chat-shadow layer */
        .az-chat-button .az-chat-shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 6px;
            transform: translateY(2px);
            transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
        }
        
        /* az-chat-edge layer */
        .az-chat-button .az-chat-edge {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background: linear-gradient(
                to left,
                hsl(217, 33%, 16%) 0%,
                hsl(217, 33%, 32%) 8%,
                hsl(217, 33%, 32%) 92%,
                hsl(217, 33%, 16%) 100%
            );
        }
        
        /* az-chat-front layer */
        .az-chat-button .az-chat-front {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5.76px 16px;
            font-size: 0.9rem;
            color: white;
            background: hsl(217, 33%, 17%);
            border-radius: 6px;
            transform: translateY(-4px);
            transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
        }
        
        /* Hover and active states */
        .az-chat-button:hover .az-chat-shadow {
            transform: translateY(4px);
            transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
        }
        
        .az-chat-button:hover .az-chat-front {
            transform: translateY(-6px);
            transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
        }
        
        .az-chat-button:active .az-chat-shadow {
            transform: translateY(1px);
            transition: transform 34ms;
        }
        
        .az-chat-button:active .az-chat-front {
            transform: translateY(-2px);
            transition: transform 34ms;
        }
        
        /* Disable text selection */
        .az-chat-button .az-chat-front span {
            user-select: none;
        }
    `;

    document.head.appendChild(az_chat_style);  // Append the style tag to the head of the document
}

function showChatForm() {
    // console.log(document.getElementByClassName(chatFormContainer)[0]);
    if (document.querySelector('.coding_desc_container__gdB9M')) {

        // Remove the chat button when chat form is shown
        const chatButton = document.getElementById('add-chat-button');
        if (chatButton) chatButton.remove();

        // Chat form style inject
        injectCSSinForm();

        if (!document.getElementById("chat-form")) {


            const chatForm = document.createElement("div");
            chatForm.id = "chat-form";
            chatForm.innerHTML = `
                <div class="chat-header">
                <button class="chat-close-button" title="Close">&times;</button>
                AI Chat
                </div>
                <div class="chat-messages">
                    <p>Welcome! How can I assist you?</p>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" placeholder="Type your message here..." />
                    <button class="chat-send-button">Send</button>
                </div>
            `;

            const formPlace = document.getElementsByClassName(chatFormContainer)[0];
            formPlace.parentNode.insertAdjacentElement("beforeend", chatForm);

            const sendButton = chatForm.querySelector(".chat-send-button");
            const inputField = chatForm.querySelector(".chat-input");
            const messageContainer = chatForm.querySelector(".chat-messages");

            // load chat history
            loadChatHistory(uniqueId, messageContainer);

            sendButton.addEventListener("click", async () => {
                const userMessage = inputField.value.trim();
                if (userMessage) {
                    // Add user's message to the chat
                    const userMessageElement = document.createElement("p");
                    userMessageElement.textContent = `You: ${userMessage}`;
                    messageContainer.appendChild(userMessageElement);

                    // Save chat history for the user for current uniqueId
                    saveChatHistory(uniqueId, userMessage, "user");

                    // Clear the input field
                    inputField.value = "";

                    // Fetch context before calling Gemini API
                    getContext();

                    // Call Gemini API
                    const responseMessage = await callGeminiAPI(userMessage, allInputTextContent);

                    // Add response to the chat
                    const responseMessageElement = document.createElement("p");
                    responseMessageElement.textContent = `AI: ${responseMessage}`;
                    messageContainer.appendChild(responseMessageElement);

                    // Save chat history for the AI for current uniqueId
                    saveChatHistory(uniqueId, responseMessage, "AI");
                }
            });

            // adding event listener to close the chat form
            const closeButton = chatForm.querySelector(".chat-close-button");
            closeButton.addEventListener("click", () => {
                chatForm.remove();
                addChatButton();
            });
        }
    }else {
        // Show a popup if the class does not exist
        alert('Go to Descritpion page');
    }
}

function injectCSSinForm() {
    const style = document.createElement("style");
    style.innerHTML = `
        /* Button Styles (similar to your modal button) */
        .az-chat-button {
            /* Add your button styles here */
        }

        /* Form Styles */
        #chat-form {
            // position: absolute;
            bottom: 10px;
            right: 10px;
            width: 500px;
            height: 600px;
            border: 1px solid hsl(217, 33%, 32%);
            border-radius: 8px;
            background: hsl(217, 33%, 17%);
            color: white;
            display: flex;
            flex-direction: column;
        }

        .chat-header {
            padding: 15px;
            background: hsl(217, 50%, 45%);
            border-radius: 8px 8px 0 0;
            border-bottom: 1px solid hsl(217, 33%, 32%);
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
        }

        .chat-close-button {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: white;
            cursor: pointer;
            line-height: 1;
        }

        .chat-close-button:hover {
            color: hsl(217, 50%, 70%);
        }

        .chat-messages {
            flex: 1;
            max-height: 480px;
            overflow-y: auto;
            padding: 15px;
            background: hsl(217, 33%, 22%);
        }

        .chat-input-container {
            display: flex;
            align-items: center;
            padding: 15px;
            gap: 15px;
        }

        .chat-input {
            flex: 1;
            padding: 12px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            background: hsl(217, 33%, 32%);
            color: white;
            outline: none;
        }

        .chat-input::placeholder {
            color: hsl(217, 33%, 50%);
        }

        .chat-send-button {
            padding: 12px 16px;
            font-size: 1rem;
            border: none;
            border-radius: 8px;
            background: hsl(217, 50%, 45%);
            color: white;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

async function callGeminiAPI(userMessage, allInputTextContent) {
    
    const apiKey = await new Promise((resolve, reject) => {
        chrome.storage.sync.get('apiKey', (data) => {
            resolve(data.apiKey)
        });
    });

    if (!apiKey) {
        console.error("API Key not found.");
        return "Please set your API key in the extension popup.";
    }

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{
            parts: [
                { text: allInputTextContent },
                { text: userMessage }
            ] 
        }]
    };

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            const responseText = data.candidates[0]?.content?.parts[0]?.text || "No response received.";

            return responseText;

        } else {
            console.error("Error from Gemini API:", response.status, response.statusText);
            return "Sorry, something went wrong with the AI.";
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, an error occurred.";
    }
}

function getContext() {
    const checkElements = () => {
        const problemDescription = document.querySelector('.coding_desc__pltWY');
        const problemInput = document.querySelectorAll('.coding_input_format__pv9fS');

        if (problemDescription && problemInput.length > 0) {
            allInputTextContent = 'Do not just give me the code, explain the code then if asked, provide me with the code.' + '\n' + 'Here is the coding problem description :' + '\n'
                                + problemDescription.textContent.trim() + '\n';
            problemInput.forEach((div) => {
                allInputTextContent += div.textContent.trim() + '\n';
            });

            // console.log("Context fetched:", allInputTextContent); // Debugging output
        } else {
            // console.log("Retrying to fetch context...");
            setTimeout(checkElements, 500); // Retry after 500ms
        }
    };
    checkElements();
}

// save chat history

function saveChatHistory(uniqueId, message, sender = "user") {
    const newMessage = { sender, message };

    chrome.storage.local.get([uniqueId], (result) => {
        const chatHistory = result[uniqueId] || [];
        chatHistory.push(newMessage);

        chrome.storage.local.set({ [uniqueId]: chatHistory }, () => {
            console.log(`Chat history saved for ${uniqueId}`);
        });
    });
}

// load the chat history on the chat box

function loadChatHistory(uniqueId, container) {
    chrome.storage.local.get([uniqueId], (result) => {
        const chatHistory = result[uniqueId] || [];
        chatHistory.forEach(({ sender, message }) => {
            const messageElement = document.createElement("p");
            messageElement.textContent = `${sender === "user" ? "You" : "AI"}: ${message}`;
            container.appendChild(messageElement);
        });
    });
}