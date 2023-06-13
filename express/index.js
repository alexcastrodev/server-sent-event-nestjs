import express from "express"
const app = express ();

app.get("/events",(req, res) => {
    res. setHeader ("Content-Type", "text/event-stream");
    res.setHeader ("Cache-Control", "no-cache");
    res.setHeader ("Connection","keep-alive");

    // Clean headers
    res.flushHeaders();

    const sendEvent = () => {
        const data = {
            message: "Evento SSE",
            timestamp: Date.now (),
        }
        res.write(`id: ${Math.random()}\n`);
        res.write ("event: message\n");
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    const interval = setInterval(sendEvent, 1000);

    setTimeout(() => {
        res.write("event: close\n\n");
        res.write("data: Server closed\n\n")
        clearInterval(interval);
        res.end();
    }, 5000);
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
