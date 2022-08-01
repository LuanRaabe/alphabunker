import { app } from "./server";
import { config } from "./config";

app.listen(config.port, () =>{
    console.log(`[server]: Server is running at: http://localhost:${config.port}`);
});