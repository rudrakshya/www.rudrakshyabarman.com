import { createRequestHandler } from "@react-router/serve";
import * as build from "@react-router/dev/server-build";

export default createRequestHandler({ build });