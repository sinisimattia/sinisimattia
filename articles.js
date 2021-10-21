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
        let container = document.createElement('div');

        articles.forEach(article => {
            let title = document.createElement('h2');
            title.innerText = article.title;

            let brief = document.createElement('p');
            brief.innerText = article.brief;

            let link = document.createElement('a');
            link.innerText = 'Read more...';
            link.href = `${url}/${article.slug}`;

            container.appendChild(title);
            container.appendChild(brief);
            container.appendChild(link);
        })

        document.getElementById('articles').appendChild(container);
});