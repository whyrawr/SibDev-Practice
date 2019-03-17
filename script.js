const Bus = {
  channels: {},
  subscribe (channelName, listener) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }
    this.channels[channelName].push(listener);
  },

  publish (channelName, data) {
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
			console.log('we r fucked');
      return;
    }

    channel.forEach(listener => listener(data));
  }
}

class Messages {
  constructor (params) {
    this.params = params;
  }

  save () {
    console.log('Message saved')
    Bus.publish('Default Room', {
      userMail: this.params.userMail
    })
  }
}

class Mailer {
  constructor () {
    Bus.subscribe('Default Room', this.sendMail);
  }

  sendMail (params) {
    console.log('Message sent to ' + params.userMail);
  }
}

const mailer = new Mailer();
const messages = new Messages({userMail: 'Right person'});
messages.save();


Bus.subscribe('Room2', (message) => console.log(message));
Bus.publish('Room2', 'Hello world');
