    //./src/extensions/user-permissions/strapi-server.js
    
    module.exports = (plugin) => {
        /**
        Appends a function that saves the messaging token from a client device to the plugin's controller
        **/
        plugin.controllers.auth.saveFCM = async (ctx) => {
        var res = await strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, { data: { fcm: ctx.request.body.fcmToken } });
                ctx.body = res;
            };
        /**
        Adds a POST method route that is handled by the saveFCM function above.
        **/
        plugin.routes['content-api'].routes.push({
                method: 'POST',
                path: '/auth/local/fcm',
                handler: 'auth.saveFCM',
                config: {
                    prefix: '',
                    policies: []
                }
        });
        
        return plugin;
        
        };