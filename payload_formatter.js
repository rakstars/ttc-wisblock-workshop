// WisBlock Enviromental Data Frame Example: 0x0109CE104D00018A510000F848

function Decoder(bytes, port) {
    // Decode an uplink message from a buffer
    // (array) of bytes to an object of fields.
    var decoded = {};
    // Check which data we received
    if (bytes[0] == 1) {
        // Received data is Environment Monitoring data
        decoded.temperature = (bytes[1] << 8 | (bytes[2])) / 100;
        decoded.humidity = (bytes[3] << 8 | (bytes[4])) / 100;
        decoded.pressure = (bytes[8] | (bytes[7] << 8) | (bytes[6] << 16) | (bytes[5] << 24)) / 100;
        decoded.gas = bytes[12] | (bytes[11] << 8) | (bytes[10] << 16) | (bytes[9] << 24);
    } else if (bytes[0] == 7) {
// add more sensor data formats here
//        } else if (bytes.[0] == xx) {
    }
    return decoded;
}