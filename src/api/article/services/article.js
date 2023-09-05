'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', ({ strapi }) => ({

    loadArticles() {
        return strapi.entityService.findMany('api::article.article', {
            populate: 
            {
                publisher: 
                {
                    // fields: ['*'],
                    populate:
                    {
                        follower:
                        {
                            fields: ['id', 'username']
                        }
                    }
                },
                comments: 
                {
                    populate: 
                    {
                        owner: 
                        {
                            fields: ['id' , 'username', 'profilePic']
                        }
                    }
                }
            }
        });
    },

    findArticle(id) {

        return strapi.entityService.findOne('api::article.article', id, {

            populate: 
            {
                publisher: 
                {
                    // fields: ['*'],
                    populate:
                    {
                        follower:
                        {
                            fields: ['id', 'username']
                        }
                    }
                },
                comments: 
                {
                    populate: 
                    {
                        owner: 
                        {
                            fields: ['id' , 'username', 'profilePic']
                        }
                    }
                },
                likes:
                    {
                        fields: ['id', 'username']
                    }
                
            }
        });

    }

}));
