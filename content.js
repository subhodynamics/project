
const chatButtonContainer = "coding_desc_container__gdB9M";

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