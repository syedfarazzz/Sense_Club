'use strict';

/**
 * comment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comment.comment' , ({ strapi }) => ({



    createComment(params) {

        try{
            return strapi.service('api::comment.comment').create({
                data: {
    
                    commentText: params.commentText,
                    replies: params.replies,
                    article: params.article,
                    owner: params.owner,
                    publishedAt: new Date()
    
                }
            });
        }
        catch(err){
            console.log(err);
        }
    },

    findComment(id)
    {
        try
        {
            return strapi.entityService.findOne("api::comment.comment", id ,{
                populate: {
                    owner: { fields: ['id', 'fcm', 'profilePic'] }
                }
            })
        }
        catch (err)
        {
            console.log(err);
        }
    },

    updateReply(id, data)
    {
        try
        {
            console.log(data);
            return strapi.entityService.update("api::comment.comment", id, {
                data: 
                {
                    replies: data
                }
              })
        }
        catch (err)
        {
            console.log(err);
        }
    }
}));

