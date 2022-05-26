import { serverHTTP } from "./app";
import "./websocket";

serverHTTP.listen(8080, () => console.log("Server is a Running on PORT 8080"));
