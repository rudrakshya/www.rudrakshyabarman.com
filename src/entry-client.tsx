import { hydrate } from "react";
import { hydrateRoot } from "react-dom/client";
import { ClientRouter } from "@react-router/client-runtime";

hydrateRoot(document.getElementById("root")!, <ClientRouter />);