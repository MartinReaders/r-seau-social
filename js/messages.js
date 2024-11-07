let conversationsData = null;  // Variable pour stocker les conversations en mémoire
let currentConversation = null;

// Charger les données JSON en mémoire
fetch('js/messages.json')
    .then(response => response.json())
    .then(data => {
        conversationsData = data.conversations;  // Stocker les conversations en mémoire
        displayConversations(conversationsData); // Afficher la liste des conversations
    });

// Afficher la liste des conversations
function displayConversations(conversations) {
    const listElement = document.getElementById('conversationsList');
    listElement.innerHTML = '';
    conversations.forEach(conversation => {
        const conversationElement = document.createElement('div');
        conversationElement.classList.add('conversation');
        conversationElement.innerHTML = `
            <img src="${conversation.contact.avatar}" alt="${conversation.contact.name}">
            <div>
                <strong>${conversation.contact.name}</strong>
                <p>${conversation.messages[conversation.messages.length - 1].content}</p>
            </div>
        `;
        conversationElement.addEventListener('click', () => loadConversation(conversation));
        listElement.appendChild(conversationElement);
    });
}

// Charger les messages de la conversation sélectionnée
function loadConversation(conversation) {
    currentConversation = conversation;
    const header = document.getElementById('chatHeader');
    header.innerHTML = `
        <img src="${conversation.contact.avatar}" alt="${conversation.contact.name}">
        <strong>${conversation.contact.name}</strong>
    `;

    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    conversation.messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <p><strong>${msg.sender}:</strong> ${msg.content}</p>
            <p class="message-timestamp">${new Date(msg.timestamp).toLocaleString()}</p>
        `;
        messagesContainer.appendChild(messageElement);
    });
}

// Gérer l'envoi d'un nouveau message
document.getElementById('messageForm').addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('.message-input');
    const messageContent = input.value.trim();
    if (messageContent && currentConversation) {
        const newMessage = {
            timestamp: new Date().toISOString(),
            sender: 'Vous',
            content: messageContent
        };
        currentConversation.messages.push(newMessage);  // Ajouter le message dans le JSON en mémoire
        addMessageToChat(newMessage);                   // Ajouter le message dans l'interface
        input.value = '';
        updateLastMessage(currentConversation.id, messageContent);  // Mettre à jour le dernier message affiché dans la liste
    }
});

// Afficher le message dans l'interface de la conversation active
function addMessageToChat(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <p><strong>${message.sender}:</strong> ${message.content}</p>
        <p class="message-timestamp">${new Date(message.timestamp).toLocaleString()}</p>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mettre à jour le dernier message dans la liste des conversations
function updateLastMessage(conversationId, lastMessageContent) {
    const conversationElements = document.querySelectorAll('.conversations-list .conversation');
    conversationElements.forEach(conversationElement => {
        const name = conversationElement.querySelector('strong').innerText;
        const conversation = conversationsData.find(conv => conv.contact.name === name);
        if (conversation && conversation.id === conversationId) {
            const messagePreview = conversationElement.querySelector('p');
            messagePreview.textContent = lastMessageContent;
        }
    });
}
