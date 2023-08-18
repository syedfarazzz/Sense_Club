'use strict';

/**
 * comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment' , ({ strapi }) => ({
    async create(ctx) {
        try{
            let result = await strapi.service('api::comment.comment').createComment({
                ...ctx.request.body.data,
                owner: ctx.state.user.id
            });
            var article = await strapi.service('api::article.article').findArticle(ctx.request.body.data.article);
            console.log(article);
            var owner = await strapi.entityService.findOne('plugin::users-permissions.user', article.publisher.id);
    
            strapi.notification.sendNotification(owner.fcm, {
                notification: {
                    title: `${ctx.state.user.username} commented on your Article`,
                    body: `${article.post_title}`
                }
            });
            ctx.body = result;
        }

        catch(err){
            console.log(err);
        }
    }
}));
