'use strict';

/**
 * article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article.article', ({ strapi }) => ({

    loadArticles() {
        return strapi.entityService.findMany('api::article.article', {
            populate: {
                publisher: {
                    // fields: ['username']
                    fields: ['*']
                },
                comments: {
                    populate: {
                        owner: {
                            fields: ['id' , 'username']
                        }
                    }
                }
                
            }
        });
    },

    findArticle(id) {

        return strapi.entityService.findOne('api::article.article', id, {

            populate: {
                publisher: {
                    fields: ['*']
                },
                comments: {
                    populate: {
                        owner: {
                            fields: ['id' , 'username', 'profilePic']
                        }
                    }
                }
            }
        });

    }

}));
