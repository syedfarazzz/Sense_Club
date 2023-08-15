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
                }
                
            }
        });
    },

    findArticle(id) {

        return strapi.entityService.findOne('api::article.article', id, {

            populate: {
                publisher: {
                    fields: ['*']
                }
            }
        });

    }

}));
