function makeid(len) {
  var
    text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ;

  for( var i=0; i < len; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

if (Meteor.isClient) {
  var game_id;
  // check for game id
  if (Session.get('game_id') === undefined) {
    var hash = window.location.hash;

    // check if game_id available via hash
    if (hash.match(/^#[a-zA-Z0-9]*$/)) {
      game_id = hash.slice(1);
    } else {
      // create a new game_id
      game_id = makeid(8);
    }
  } else {
    game_id = Session.get('game_id');
  }
  // set the game_id everywhere
  window.location.hash = '#' + game_id;
  Session.set('game_id', game_id);
  console.log('Current game id: ', game_id);

  Session.setDefault('counter', 0);

  Template.game.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.game.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
