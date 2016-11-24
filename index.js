// TF2 Update Bot
// Sends a message to some Discord servers whenever a TF2 update is released
//
// Created: 11/23/16 17:07
// Last Update: 11/23/16 17:07
// Author: Lana

const Promise = require( 'bluebird' );

const config = require( './config.json' );
const discordBot = require( './controllers/bot.controller' );
const feedReader = require( './controllers/feed.controller' );

//discordBot.initBot(config.BOT_TOKEN)
//  .then( bot => {
//    discordBot.sendMessageToAllChannels( "I am here" );
//  });

Promise.join(
    discordBot.initBot( config.BOT_TOKEN ),
    feedReader.initFeed( config.FEED_URL ) )
  .spread( function( bot, feed ) {
    feed.on( 'newPost', item => {
      if ( item.title === "Team Fortress 2 Update Released" ) {
        discordBot.sendMessageToAllChannels( item.description );
      }
    });

    feedReader.updateFeed();

    setTimeout( feedReader.updateFeed, 10000 );
  });
