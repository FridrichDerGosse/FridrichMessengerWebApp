let sock
try {
    sock = new WebSocket("ws://192.168.7.15:3588")
    console.log("sock success")
} catch {
    console.log("socket error")
}
