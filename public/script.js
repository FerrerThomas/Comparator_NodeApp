document.getElementById('compareBtn').addEventListener('click', () => {
    const followersFile = document.getElementById('followersFile').files[0];
    const followingFile = document.getElementById('followingFile').files[0];

    if (!followersFile || !followingFile) {
        alert('Por favor, selecciona ambos archivos.');
        return;
    }

    const followersReader = new FileReader();
    const followingReader = new FileReader();

    // Leer el archivo de seguidores
    followersReader.onload = function (e) {
        const followersHTML = e.target.result;
        const followers = extractUsernames(followersHTML);

        // Leer el archivo de seguidos
        followingReader.onload = function (e) {
            const followingHTML = e.target.result;
            const following = extractUsernames(followingHTML);

            // Comparar listas
            const notFollowingBack = following.filter(user => !followers.includes(user));

            // Mostrar resultados
            const resultContainer = document.getElementById('notFollowingBack');
            resultContainer.innerHTML = '';

            if (notFollowingBack.length > 0) {
                notFollowingBack.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user;
                    resultContainer.appendChild(li);
                });
            } else {
                resultContainer.innerHTML = '<li>¡Todos te siguen de vuelta!</li>';
            }
        };

        followingReader.readAsText(followingFile); // Leer el archivo de seguidos
    };

    followersReader.readAsText(followersFile); // Leer el archivo de seguidores
});

// Función para extraer nombres de usuario de un archivo HTML
function extractUsernames(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const links = doc.querySelectorAll('a[target="_blank"]');
    return Array.from(links).map(link => link.textContent.trim());
}
