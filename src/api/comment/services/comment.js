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
                    article: params.article,
                    owner: params.owner,
                    publishedAt: new Date()
    
                }
            });
        }
        catch(err){
            console.log(err);
        }
        




    }
}));

