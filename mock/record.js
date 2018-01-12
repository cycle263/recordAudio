export default {
    [`POST /uploadAudio.json`](req, res) {
        const data = { "status": "ok", "text": "请问天府软件园怎么走？", "audio_key": "https://www.test.com" };
        res.status(200).json(data);
    },
    [`POST /audioReply.json`](req, res) {
        const data = { "status": "ok", "text": "噢，你可能迷路了，天府软件园就在你的左侧！", "audio_key": "https://www.reply.com" };
        res.status(200).json(data);
    },
    [`POST /getAudio.json`](req, res) {
        const data = { "status": "ok" };
        res.status(200).json(data);
    },
}
