# Vercel

This example shows how to use `vite-plugin-mix` with the Vercel adapter.

## How it works ?

We use `pnpm` for the package manager. Make sure to install the packages with `pnpm install`.

- `pnpm dev` to start the Vite development server.
- `pnpm build` to build the app for Vercel.

When building, it will create a folder `.vercel/output` that contains the bundle.

You can deploy your prebuilt folder to Vercel using their CLI with `vercel deploy --prebuilt`.