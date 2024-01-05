const tmi = require('tmi.js');
const say = require('say');
require('dotenv').config();

const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN,
    },
    channels: [process.env.TWITCH_CHANNELS],
};

const client = new tmi.client(opts);

client.on('message', onMessage);
client.on('connected', onConnected);

client.connect();

const blockedWords = ['fuck', 'asu']; // Daftar kata yang ingin diblokir
let isStreaming = false;

function onConnected(addr, port) {
    console.log(`Bot connected ${addr} y ${port}`);
}

function onMessage(channel, tags, message, self) {
    if (!message.startsWith('!')) {
        const containsBlockedWord = blockedWords.some((word) =>
            message.toLowerCase().includes(word.toLowerCase())
        );

        if (containsBlockedWord) {
            // Jika pesan mengandung kata yang diblokir, hapus pesan tersebut
            client
                .deletemessage(channel, tags.id)
                .then((data) => {
                    if (data === null) {
                        console.log(
                            `Pesan dari @${tags.username} dihapus karena mengandung kata-kata yang tidak diinginkan.`
                        );
                    } else {
                        console.error(`Error deleting message from @${tags.username}:`, data);
                    }
                })
                .catch((error) => {
                    console.error(`Error deleting message from @${tags.username}:`, error.message);
                });

            return;
        }
    }

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.say(channel, `@${tags.username}, pong: ${args.join(' ')}`);
        say.speak(args.join(' '));
    } else if (command === 'hello') {
        client.say(channel, `Hello, @${tags.username}!`);
    } else if (command === 'greet') {
        client.say(channel, `Greetings, @${tags.username}!`);
    } else if (command === 'info') {
        client.say(channel, `I am a simple bot created by Anarthriagalumphed.`);
    } else if (command === 'commands') {
        client.say(
            channel,
            `Available commands: !ping, !hello, !greet, !info, !commands`
        );
    }
    // Add more commands as needed using additional else if statements
}

const reminderMessages = [
    'Jangan lupa follow Twitch!',
    'Jangan lupa follow Instagram!',
    'Jangan lupa subscribe YouTube!',
    // Tambahkan pesan-pesan lain sesuai kebutuhan
];

let currentReminderIndex = 0;

function sendFollowReminder() {
    if (isStreaming) {
        const channel = 'anarthriagalumphed';
        const message = reminderMessages[currentReminderIndex];

        // Kirim pesan ke chat
        client.say(channel, `${message}`);

        // Ganti indeks untuk pesan selanjutnya
        currentReminderIndex = (currentReminderIndex + 1) % reminderMessages.length;
    }
}

// Set interval untuk memanggil fungsi sendFollowReminder setiap 5 menit (300000 milidetik)
setInterval(sendFollowReminder, 300000); // Mengirim setiap 5 menit

// Menyimak status streaming
client.on('streaming', (data) => {
    isStreaming = data;
    console.log(`Bot sedang streaming: ${isStreaming}`);
});

// Menyimak status offline
client.on('streaming-offline', () => {
    isStreaming = false;
    console.log(`Bot sedang offline`);
});
