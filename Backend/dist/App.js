console.clear();
import './config/env.js';
//import connectMongoDB from './config/Mongodb.js'; //Esto si se usa mongo
import { httpHarwareHavenServer } from "./config/http.js";
const bootstrap = async () => {
    //await connectMongoDB(process.env.MONGODB_URL); //Esto si se usa mongo
    const custom_port = Number(process.env.PORT);
    httpHarwareHavenServer.listen(custom_port, () => {
        console.log(`Harware Haven Server is listening on port: ${custom_port}`);
    });
};
bootstrap();
//# sourceMappingURL=App.js.map