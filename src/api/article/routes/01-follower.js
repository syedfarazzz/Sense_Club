module.exports = 
{
    routes: 
    [
        {
            method: "GET",
            path: "/articles/followers/",
            handler: "article.followerArticle",
            config: {
                prefix: '',
                policies: []
            }
        }
    ]
}