//Chager JSON

fetch("js/data.json")
    .then(response => response.json())
    .then(articles => afficherPosts(articles))




function afficherPosts(articles){
    const feed = document.getElementById('feed');

    articles.forEach(article => {
        const ElArticle = document.createElement('div');
        ElArticle.classList.add('article');
        ElArticle.innerHTML = `
        
        <div class="article-header">
            <img src="${article.avatar}">
            <span>${article.author}</span>
        </div>
        <p>${article.content}</p>
        ${article.image ? `<img src="${article.image}" class="article-image">` : ""}
        <div class="reac">
            <div class="reac-btn like" data-id="${article.id}" data-type="like">👍 ${article.reactions.like}</div>
            <div class="reac-btn dislike" data-id="${article.id}" data-type="dislike">👎 ${article.reactions.dislike}</div>
            <div class="reac-btn love" data-id="${article.id}" data-type="love">❤️ ${article.reactions.love}</div>
        </div>

         <div class="comments">
            ${article.comments.map(comment => `<p><strong>${comment.user}: </strong> ${comment.comment}</p>`).join('')}
         </div>

          <form class="comment-form" data-id="${article.id}">
                <input type="text" class="comment-input" placeholder="Écrire un commentaire...">
                <button type="submit" class="comment-submit">Envoyer</button>
            </form>
        
        `;
        feed.appendChild(ElArticle);

        // Zoom image

        const articleImage = ElArticle.querySelector('.article-image');
        if(articleImage){
            articleImage.addEventListener('click', () => zoomImage(article.image));

        }

        //reactions

        ElArticle.querySelectorAll('.reac-btn').forEach(btn =>{
            btn.addEventListener('click', () => reactionsAnim(btn));
        });

        const commentForm = ElArticle.querySelector('.comment-form');
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addComment(article.id, commentForm);
        });

    });
}


//Zoom images

function zoomImage(image){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = `<img src="${image}" class="zoom-image">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => document.body.removeChild(overlay));
}


//reactions anim.

function reactionsAnim(button){
    const type = button.getAttribute('data-type');
    button.classList.add('anim');
    setTimeout(()=> button.classList.remove('anim'),300);
    // Ajout d'un effet de particules ici pour simuler des réactions

    const particle = document.createElement('div');
    particle.classList.add('particle', type);
    button.appendChild(particle);
    setTimeout(() => button.removeChild(particle), 500);

}

//Ajout comment

function addComment(postId, form){
    const commentInput = form.querySelector(".comment-input");
    const commentText = commentInput.value.trim();
    if(commentText){
        const commentContainer = form.previousElementSibling;
        const newComment = document.createElement('p');
        newComment.innerHTML =  `<strong>Vous:</strong> ${commentText}`;
        commentContainer.appendChild(newComment);
        commentInput.value = '';
    }
}