const tmi = require('tmi.js');
const say = require('say');
require('dotenv').config();

const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [process.env.TWITCH_CHANNELS]
};

const client = new tmi.client(opts);

let isLive = false; // Menyimpan status live stream

client.on('message', onMessage);
client.on('connected', onConnected);

client.connect();

const blockedWords = ['fuck', 'asu'];  // Daftar kata yang ingin diblokir

function onConnected(addr, port) {
    console.log(`Bot connected ${addr} y ${port}`);
}

function onMessage(channel, tags, message, self) {
    if (!message.startsWith('!')) {
        const containsBlockedWord = blockedWords.some(word => message.toLowerCase().includes(word.toLowerCase()));

        if (containsBlockedWord) {
            // Jika pesan mengandung kata yang diblokir, hapus pesan tersebut
            client.deletemessage(channel, tags.id)
                .then((data) => {
                    if (data === null) {
                        console.log(`Pesan dari @${tags.username} dihapus karena mengandung kata-kata yang tidak diinginkan.`);
                    } else {
                        console.error(`Error deleting message from @${tags.username}:`, data);
                    }
                })
                .catch(error => {
                    console.error(`Error deleting message from @${tags.username}:`, error.message);
                });

            return;
        }
    }

    // Handle command messages or other logic as needed
    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        if (isLive) {
            client.say(channel, `@${tags.username}, pong: ${args.join(' ')}`);
            say.speak(args.join(' '));
        } else {
            console.log('Channel is currently offline, not responding to ping.');
        }
    } else if (command === 'hello') {
        client.say(channel, `Hello, @${tags.username}!`);
    } else if (command === 'greet') {
        client.say(channel, `Greetings, @${tags.username}!`);
    } else if (command === 'info') {
        client.say(channel, `I am a simple bot created by Anarthriagalumphed.`);
    } else if (command === 'commands') {
        client.say(channel, `Available commands: !ping, !hello, !greet, !info, !commands`);
    }
    // Add more commands as needed using additional else if statements
}

// Event handler for when the stream goes online
client.on('stream', (channel, username, viewerCount) => {
    console.log(`Channel is now live with ${viewerCount} viewers!`);
    isLive = true;
});

// Event handler for when the stream goes offline
client.on('streamOff', (channel, username) => {
    console.log(`Channel is now offline.`);
    isLive = false;
});
