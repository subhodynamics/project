
const chatButtonContainer = "coding_desc_container__gdB9M";
const chatFormContainer = "coding_desc_container__gdB9M";

// window.addEventListener('load', addChatButton);

// ! Function to check page change

let lastPageVisited = "";

const observer = new MutationObserver(() => {
    handleContentChange();
});

observer.observe(document.body, {childList: true, subtree: true});

handleContentChange();

function handleContentChange() {
    if (isPageChanged()) handlePageChange();
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
        console.log('button must be removed');
    }

    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.remove();
    }
}

function handlePageChange() {
    if (onTargetPage()) {
        cleanUpPage();
        addChatButton();
    }
}

// ! Function to add chat button

function addChatButton() {
    injectCSS();

    const chatButton = document.createElement('div');
    chatButton.id = "add-chat-button";
    console.log('button must be added');
    chatButton.innerHTML = `<button class="az-chat-button">
    <span class="az-chat-shadow"></span>
    <span class="az-chat-edge"></span>
    <div class="az-chat-front">
        <span>AI Chat</span>
    </div>
    </button>
    `;

    const buttonPlace = document.getElementsByClassName(chatButtonContainer)[0];

    buttonPlace.parentNode.insertAdjacentElement('beforeend', chatButton);

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
        }
        
        /* az-chat-shadow layer */
        .az-chat-button .az-chat-shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 8px;
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
            padding: 12px 28px;
            font-size: 1.25rem;
            color: white;
            background: hsl(217, 33%, 17%);
            border-radius: 8px;
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

    // Remove the chat button when chat form is shown
    const chatButton = document.getElementById('add-chat-button');
    if (chatButton) chatButton.remove();

    // Chat form style inject
    injectCSSinForm();

    if (!document.getElementById("chat-form")) {

        const chatForm = document.createElement("div");
        chatForm.id = "chat-form";
        chatForm.innerHTML = `
            <div class="chat-header">AI Chat</div>
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

        sendButton.addEventListener("click", () => {
            const message = inputField.value.trim();
            if (message) {
                const userMessage = document.createElement("p");
                userMessage.textContent = message;
                messageContainer.appendChild(userMessage);
                inputField.value = "";
            }
        });
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
            // position: relative;
            bottom: 10px;
            right: 10px;
            width: 300px;
            border: 1px solid hsl(217, 33%, 32%);
            border-radius: 8px;
            background: hsl(217, 33%, 17%);
            color: white;
            // z-index: 1000;
            display: flex;
            flex-direction: column;
            // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .chat-header {
            padding: 10px;
            background: hsl(217, 50%, 45%);
            border-bottom: 1px solid hsl(217, 33%, 32%);
            font-size: 1.2rem;
            font-weight: bold;
            text-align: center;
        }

        .chat-messages {
            flex: 1;
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
            background: hsl(217, 33%, 22%);
        }

        .chat-input-container {
            display: flex;
            align-items: center;
            padding: 10px;
            gap: 10px;
        }

        .chat-input {
            flex: 1;
            padding: 8px;
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
            padding: 8px 12px;
            border: none;
            border-radius: 8px;
            background: hsl(217, 50%, 45%);
            color: white;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}