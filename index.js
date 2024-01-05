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
let lastLiveCheck = 0; // Menyimpan waktu terakhir cek status live stream
const liveCheckInterval = 5 * 60 * 1000; // Interval cek status live stream (5 menit)

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
            console.log('Channel is currently streaming, not responding to ping.');
        } else {
            client.say(channel, `@${tags.username}, pong: ${args.join(' ')} (Channel offline)`);
            say.speak(args.join(' '));
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

function sendFollowReminder() {
    const channel = 'anarthriagalumphed';
    const message = reminderMessages[currentReminderIndex];

    // Kirim pesan ke chat jika channel sedang live
    if (isLive) {
        client.say(channel, `${message}`);
    }

    currentReminderIndex = (currentReminderIndex + 1) % reminderMessages.length;
}

// Set interval untuk memanggil fungsi sendFollowReminder setiap 5 menit (300000 milidetik)
setInterval(sendFollowReminder, 60000);

// Set interval untuk memeriksa status live stream setiap 5 menit
setInterval(checkLiveStatus, liveCheckInterval);

function checkLiveStatus() {
    // Ambil status live stream dari Twitch API (misalnya dengan menggunakan Twitch API Client atau HTTP request)
    // Contoh sederhana:
    const currentTime = Date.now();
    
    if (currentTime - lastLiveCheck >= liveCheckInterval) {
        lastLiveCheck = currentTime;

        // Implementasi untuk memeriksa status live stream
        // Misalnya, Anda dapat menggunakan Twitch API untuk mendapatkan status live stream
        // dengan melakukan HTTP request ke https://api.twitch.tv/helix/streams?user_login=channelName
        // Pastikan untuk menetapkan nilai isLive berdasarkan hasil pengecekan status live stream
    }
}
