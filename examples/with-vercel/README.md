# Vercel

This example shows how to use `vite-plugin-mix` with the Vercel adapter.

## How it works ?

We use `yarn` for the package manager - `pnpm` isn't currently well supported on Vercel. Make sure to install the packages by running `yarn`.

- `yarn dev` to start the Vite development server.
- `yarn build` to build the app for Vercel.

When building, it will create a folder `.vercel/output` that contains the bundle.

You can manually deploy your prebuilt folder to Vercel using their CLI with `vercel deploy --prebuilt`.