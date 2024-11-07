// Fonction pour filtrer les amis par nom ou prénom
function filterFriends() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const friends = document.querySelectorAll('.friend');

    friends.forEach(friend => {
        const fullName = friend.querySelector('strong').textContent.toLowerCase();
        friend.style.display = fullName.includes(searchInput) ? 'flex' : 'none';
    });
}

// Simule un passage vers la messagerie
function goToChat(name) {
    alert(`Passage à la messagerie avec ${name}`);
}

// Drag and Drop pour réorganiser les amis
document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friendsList');
    let draggedItem = null;

    // Ajouter les événements de drag and drop à chaque élément de la liste d'amis
    document.querySelectorAll('.friend').forEach(friend => {
        friend.addEventListener('dragstart', handleDragStart);
        friend.addEventListener('dragover', handleDragOver);
        friend.addEventListener('drop', handleDrop);
        friend.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        draggedItem = this;  // On enregistre l'élément en cours de drag
        setTimeout(() => {
            this.style.display = 'none'; // Cache l'élément temporairement pour l'effet visuel
        }, 0);
    }

    function handleDragOver(e) {
        e.preventDefault(); // Empêche le comportement par défaut pour autoriser le drop
    }

    function handleDrop(e) {
        e.preventDefault();
        if (draggedItem !== this) {  // Vérifie que l'élément n'est pas déposé sur lui-même
            // Insère l'élément déplacé avant ou après l'élément cible
            if (this.compareDocumentPosition(draggedItem) & Node.DOCUMENT_POSITION_FOLLOWING) {
                this.before(draggedItem);  // Dépose au-dessus
            } else {
                this.after(draggedItem);   // Dépose en dessous
            }
        }
    }

    function handleDragEnd(e) {
        this.style.display = 'block'; // Remet l'affichage de l'élément à la fin du drag
        draggedItem = null; // Réinitialise l'élément drag
    }
});


