const { exec } = require('child_process');

const backend = exec('node backend/server.js');
const frontend = exec('npm start --prefix frontend');

backend.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
});

backend.stderr.on('data', (data) => {
    console.error(`Backend error: ${data}`);
});

frontend.stdout.on('data', (data) => {
    console.log(`Frontend: ${data}`);
});

frontend.stderr.on('data', (data) => {
    console.error(`Frontend error: ${data}`);
});