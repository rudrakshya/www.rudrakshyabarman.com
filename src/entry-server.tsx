import { renderToReadableStream } from "@react-router/node";
import { ServerRouter } from "@react-router/server-runtime";
import { isbot } from "isbot";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { createReadableStreamFromReadable } from "@react-router/node";
import { rootRoute } from "../app/root";

export function render(url: string, userAgent: string) {
  const abortController = new AbortController();
  const { signal } = abortController;
  
  return new Promise(async (resolve, reject) => {
    let didError = false;
    
    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter
        context={{
          url,
          userAgent,
          isbot: isbot(userAgent),
        }}
      />,
      {
        bootstrapScripts: ["/build/client/index.js"],
        onShellReady() {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          resolve({ stream, abort });
          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
        signal,
      }
    );
    
    // Don't hang forever
    setTimeout(() => abort(), 5000);
  });
}