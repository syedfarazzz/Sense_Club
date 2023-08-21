module.exports = {
        routes: [
          {
            method: "POST",
            path: "/comments/replies/:id",
            handler: "comment.commentReply"
          }
        ]
      }