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
        // const  {post_title, question, upload_pic, description, tags, social_link, likes, comments, categories, uploadPic}  = ctx.request.body.data
        //the above way is commented out as it can be used with spread operator ...ctx.req.bd.data

        try
        {
        // use the create method from Strapi enitityService
        const createdArticles = await strapi.entityService.create("api::article.article", 
        {
            data: 
            {
                // post_title, question, upload_pic, description, tags, social_link, likes, comments, categories, uploadPic,
                ...ctx.request.body.data,

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

    async find(ctx, next)
    {
        
        try
        {
            // let data = await strapi.entityService.findMany('api::article.article', {
            //     populate: '*'
            //   });

            let data = await strapi.service('api::article.article').loadArticles();

            const { meta } = await super.find(ctx);
            return { data, meta }
        
        }

        catch(err)
        {
            console.log(err);
        }
    },

    async findOne(ctx) {
        try
        {
            // let data = await strapi.entityService.findOne('api::article.article', ctx.request.params.id, {
            //     populate: '*'
            //   });

            let entity = await strapi.service('api::article.article').findArticle(ctx.request.params.id);
       
            return entity;   
        }

        catch(err)
        {
            console.log(err);
        }
      }
}));
