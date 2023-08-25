'use strict';

/**
 * comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment' , ({ strapi }) => ({
    async create(ctx) {
            const currentUserId = ctx.state.user.id;
            
        try{
            let result = await strapi.service('api::comment.comment').createComment({
                ...ctx.request.body.data,
                owner: currentUserId
            });
            
            var article = await strapi.service('api::article.article').findArticle(ctx.request.body.data.article);

            const publisherId = article.publisher.id;
            const publisher = article.publisher.fcm;  

            if (currentUserId !== publisherId)
            {
            strapi.notification.sendNotification(publisher, {
                notification: {
                    title: `${ctx.state.user.username} commented on your Article`,
                    body: `${article.post_title}`
                }
            });
            }

            ctx.body = result;

        }

        catch(err){
            console.log(err);
        }
    },

    commentReply: async (ctx, next) => {

        const {id} = ctx.request.params
        const currentUserId = ctx.state.user.id
        const username = ctx.state.user.username
        const profilePic = ctx.state.user.profilePic;
        const newReply = ctx.request.body.replies;
        const createdAt = new Date();

        const owner = {
            username,
            profilePic
        }

        // const numberOfIndexes = replies.length;
        // replies[numberOfIndexes-1].username = username;
        // newReply.username = username;

        newReply.owner = owner;
        newReply.createdAt = createdAt;

        try 
        {
            var comment = await strapi.service('api::comment.comment').findComment(id);

            comment.replies.push(newReply);
            
            const updatedReplies = await strapi.service("api::comment.comment").updateReply(id, comment.replies);

            if (currentUserId !== comment.owner.id)
            {
                strapi.notification.sendNotification(comment.owner.fcm, {
                    notification: {
                        title: `${username} replied to your comment on`,
                        body: `${comment.commentText}`
                    }
                });
            }

            return updatedReplies;
        }

        catch (er)
        {
            console.log(er);
        }   

    },
}));
