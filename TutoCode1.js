 // URL du serveur WebSocket (à adapter)
 const socketUrl = 'ws://localhost:8080'; // Exemple pour un serveur local
 const socket = new WebSocket(socketUrl);
 
 const messagesContainer = document.getElementById('messages');
 const form = document.getElementById('chatForm');
 const input = document.getElementById('messageInput');
 
 // Fonction pour ajouter un message dans la fenêtre de chat
 function addMessage(content, sender = 'user') {
   const messageDiv = document.createElement('div');
   messageDiv.className = sender === 'user' ? 'message user' : 'message server';
   messageDiv.innerText = content;
   messagesContainer.appendChild(messageDiv);
   // Scroller automatique
   messagesContainer.scrollTop = messagesContainer.scrollHeight;
 }
 
 // Gestion de la connexion WebSocket
 socket.addEventListener('open', () => {
   addMessage('Connexion établie avec le serveur.', 'server');
 });
 
 socket.addEventListener('message', (event) => {
   // Traiter le message reçu
   const message = event.data;
   addMessage(message, 'server');
 });
 
 socket.addEventListener('error', (error) => {
   addMessage('Erreur de connexion.', 'server');
   console.error('WebSocket error:', error);
 });
 
 socket.addEventListener('close', () => {
   addMessage('Déconnexion du serveur.', 'server');
 });
 
 // Envoyer un message lors de la soumission du formulaire
 form.addEventListener('submit', (e) => {
   e.preventDefault();
   const message = input.value.trim();
   if (message !== '') {
     // Afficher le message local
     addMessage(message, 'user');
     // Envoyer au serveur
     socket.send(message);
     input.value = '';
   }
 });
 
 
