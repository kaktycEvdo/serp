import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Header } from "./components/UI/Header.jsx";
import { Footer } from "./components/UI/Footer.jsx";
import { YMInitializer } from 'react-yandex-metrika';

import stylesheet from "./app.css?url";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <YMInitializer accounts={[102575796]} />
        <noscript><div><img src="https://mc.yandex.ru/watch/102575796" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen">
        <Header />
        <div className="flex h-full w-screen justify-center flex-col items-center">
        {children}
        </div>
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return <><Outlet /></>;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
