const username = 'sinisimattia';
const url = 'https://blog.mattia.codes';
const apiUrl = 'https://api.hashnode.com';

const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!, $username: String!) {
        user(username: $username) {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                }
            }
        }
    }
`;

async function gql(query, variables={}) {
    const data = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

gql(GET_USER_ARTICLES, { page: 0, username })
    .then(result => {
        const articles = result.data.user.publication.posts;
        let container = document.createElement('ul');

		container.classList = []

        articles.forEach(article => {
			let item = document.createElement('li');
            let title = document.createElement('a');
            title.innerText = article.title;
			title.href = `${url}/${article.slug}`;

			item.appendChild(title);
            container.appendChild(item);
        })

		var main = document.getElementById('articles');
		main.innerHTML = '';
        main.appendChild(container);
});