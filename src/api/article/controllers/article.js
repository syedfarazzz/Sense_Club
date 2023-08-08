'use strict';

/**
 * article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({strapi}) => ({
    

    // customizing the create controller
    async create(ctx, next)
    {
        // get user from context
        const currentUser = ctx.state.user

        // get request body data from context
        const  {post_title, question, upload_pic, description, tags, social_link, likes, comments, categories}  = ctx.request.body.data

        try
        {
        // use the create method from Strapi enitityService
        const createdArticles = await strapi.entityService.create("api::article.article", 
        {
            data: 
            {
                post_title, question, upload_pic, description, tags, social_link, likes, comments, categories,

                // pass in the publisher id to define the publisher
                publisher: currentUser.id,
            }
        })

            return {createdArticles}

        }

        catch(err)
        {
            console.log(err);
        }
    },

}));
