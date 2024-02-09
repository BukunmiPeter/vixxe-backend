import config from "config";
import connect from "./utils/connect";
import createServer from "./utils/server";
import logger from "./utils/logger";


const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
logger.info(`App is running at http://localhost:${port}`);

  await connect();
});