function fetchPosts() {
    const ids = [
        document.getElementById('postId1').value,
        document.getElementById('postId2').value,
        document.getElementById('postId3').value
    ].filter(id => id); // Filtrar IDs vacíos

    if (ids.length > 0) {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = ''; // Limpiar publicaciones anteriores

        ids.forEach(id => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => response.json())
                .then(post => {
                    if (post.id) {
                        const postElement = document.createElement('div');
                        postElement.classList.add('post');
                        postElement.innerHTML = `
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        `;
                        postsContainer.appendChild(postElement);
                    } else {
                        const errorElement = document.createElement('div');
                        errorElement.classList.add('post');
                        errorElement.innerHTML = `<p>No se encontró la publicación con ID ${id}.</p>`;
                        postsContainer.appendChild(errorElement);
                    }
                })
                .catch(error => {
                    const errorElement = document.createElement('div');
                    errorElement.classList.add('post');
                    errorElement.innerHTML = `<p>Error al obtener la publicación con ID ${id}.</p>`;
                    postsContainer.appendChild(errorElement);
                    console.error('Error al obtener la publicación:', error);
                });
        });
    } else {
        document.getElementById('posts').innerHTML = `<p>Por favor, ingresa al menos un ID de publicación.</p>`;
    }
}
