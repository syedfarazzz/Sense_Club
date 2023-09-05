    //./src/extensions/user-permissions/strapi-server.js
    
    module.exports = (plugin) => {
        /**
        Appends a function that saves the messaging token from a client device to the plugin's controller
        **/
        plugin.controllers.auth.saveFCM = async (ctx) => {
        var res = await strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, { data: { fcm: ctx.request.body.fcmToken } });
                ctx.body = res;
            };

        //Follow Functionality
        plugin.controllers.user.follow = async (ctx) => 
        {
            const currentUserId = ctx.state.user.id
            // const follow = ctx.request.body.data.follow;
            const id = ctx.request.params.id;
            // console.log(typeof(id));
            const follow = parseInt(id, 10); // Use parseInt with base 10
            // console.log(typeof follow, follow);

            //Follow Other's Feature
            const oldList = await strapi.entityService.findOne('plugin::users-permissions.user', currentUserId, 
            {
                populate: 
                {
                    following : { fields: ['id'] }
                }
            });

            //Pushing the id of the person user wants to follow in his existing following list
            oldList.following.push(follow);
            const newFollowList = oldList.following;
     
            var res = await strapi.entityService.update('plugin::users-permissions.user', currentUserId, 
            { 
                data: 
                { 
                    following: newFollowList, 
                
                },
                populate: 
                {
                    following : { fields: ['id', 'username'] },
                    follower : { fields: ['id', 'username'] }
                } 
            }
            );

            ctx.body = res;

            // Not Needed now as it is automatically making the relation with following - follower
            // //Followers Feature
            // const oldFollowerList = await strapi.entityService.findOne('plugin::users-permissions.user', follow, 
            // {
            //     populate: 
            //     {
            //         follower : { fields: ['id'] }
            //     }
            // });

            // console.log(oldFollowerList);
            // console.log("---");
            // console.log(oldFollowerList.follower);
            // oldFollowerList.follower.push(follow);
            // const newFollowerList = oldFollowerList.follower;
            // console.log(newFollowerList);
            // console.log(currentUserId);
            // var res2 = await strapi.entityService.update('plugin::users-permissions.user', follow, 
            // { 
            //     data: 
            //     { 
            //         follower: newFollowerList, 
                
            //     }
            // }
            // );
            
        };
        
        // Routes
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
        },

        /**
        Adds a POST method route that is handled by the follow function above.
        **/
        {
            method: 'POST',
            path: '/users/follow/:id',
            handler: 'user.follow',
            config: {
                prefix: '',
                policies: []
            }
        }
        );
        
        return plugin;
        
        };