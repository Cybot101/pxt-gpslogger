/**
 * Custom GPS blocks
 */
//% weight=100 color=#0fbc11 icon="\uf279"
namespace gps {

    let g_timestamp: string = "0";
    let g_lat: string = "0";
    let g_lon: string = "0";

    //% blockId="gps_start" block="Start GPS"
    export function gps_start(): void {
        serial.redirect(SerialPin.P1, SerialPin.P0, 38400)

        serial.onDataReceived("\n", () => {
            let str: string = serial.readUntil("\n");
            // basic.showString(str)
            serial.writeLine(str)
            if (str.length > 10) {
                // Parse string
                //[timestamp],[lat],[lon]
                let tsp = 0
                let ts = 0
                // ts = indexOf(str, ',', 0);
                // if (ts <= 0)
                //     return;
                // g_timestamp = str.substr(0, ts);
                // tsp = ts + 1

                ts = indexOf(str, ',', tsp);
                if (ts <= 0)
                    return;
                g_lat = str.substr(tsp, ts - tsp);

                tsp = ts + 1
                g_lon = str.substr(tsp);
            }
        })
    }

    /**
     * Get GPS coordinates in Lat, Lon form
     */
    //% blockId="gps_read_gps" block="read GPS coordinates"
    export function read_gps(): void {

        serial.writeString("\r\n");
        serial.writeString("GPS\r\n");
        basic.pause(200);
        // Result will be parsed in callback
    }

    //% blockId="gps_get_lat" block="get Lattitude"
    export function get_lat(): string {
        return g_lat;
    }

    //% blockId="gps_get_lon" block="get Longitude"
    export function get_lon(): string {
        return g_lon;
    }

    //% blockId="gps_get_time" block="get Timestamp"
    export function get_time(): string {
        return g_timestamp;
    }

    function indexOf(st: string, chr: string, offset: number): number {
        let len = st.length
        let i: number = 0
        if (offset > len)
            return -1;
        i += offset
        while (i < len) {
            if (st.charAt(i) == chr)
                return i;
            i++
        }
        return -1;
    }

}
