import { Innertube } from 'youtubei.js';
import { MpdClient } from "@cuadue/mpd";

const server = Bun.serve({
    port: 3002,
    fetch(req) {
        const url = new URL(req.url);

        if (!url.pathname.startsWith('/video')) {
            return new Response();
        }

        const ytUrl = url.pathname.split('/')[2];

        return (async () => {
            const youtube = await Innertube.create();
            const video = await youtube.getInfo(ytUrl);
            const format = video.chooseFormat({type: 'audio', format: 'opus'});
            const audioUrl = format?.decipher(youtube.session.player);

            const client = new MpdClient();
            await client.connect({
                port: 6600,
                host: 'ip',
            });

            await client.sendCommands([
                'clear',
                ['add', audioUrl],
                'play',
            ])

            return new Response();
        })();
    },
});
