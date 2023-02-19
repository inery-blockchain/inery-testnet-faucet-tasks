# vitest-svelte-kit

Automatically configure Vitest from your SvelteKit configuration.

## Deprecation Notice :warning:

This package is no longer necessary nor maintained given that SvelteKit is now exposed as a Vite plugin. To learn more about how to configure Vite – and subsequently Vitest – in SvelteKit, see [here](https://kit.svelte.dev/docs/project-structure#project-files-vite-config-js).

## Getting Started

### Installing

In an existing SvelteKit project, run the following.

```sh
npm install --save-dev vitest vitest-svelte-kit
```

### Configuring

Create a file called `vitest.config.js`:

```js
import { extractFromSvelteConfig } from "vitest-svelte-kit"

export default extractFromSvelteConfig()
```

## What’s Included

This package aims to emulate SvelteKit-specific behavior in a unit testing context. It does not actually run SvelteKit, but rather configures Vite in a way similar to how SvelteKit would do so.

### Svelte File Support

Importing `.svelte` files into tests will work out of the box.

### SvelteKit Modules

SvelteKit makes a number of [modules](https://kit.svelte.dev/docs#modules) available to your application.

This package will define those modules with reasonable defaults, but if you depend on their behavior its suggested you mock them using Vitest’s [mocking capabilities](https://vitest.dev/guide/mocking-modules.html).

### Vite Configuration

Since SvelteKit is built on Vite, it allows you to pass a [Vite configuration](https://kit.svelte.dev/docs#configuration-vite) as part of your Svelte config file.

This package will use that configuration when running Vitest – meaning any custom Vite config, such as plugins, will be used in your tests.

## Example

An example usage of this package can be seen [here](/examples/svelte-kit-demo-app).

## Stability

Vitest and SvelteKit are both under active development and are subject to breaking changes. This package aims to stay up-to-date with any upstream changes, but may introduce breaking changes as a result.

When both of these projects become stable, this package aims to follow suit.

## Additional Resources

-   [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro/)
-   [Vitest Environment](https://vitest.dev/config/#environment)
    -   Note: [`jsdom`](https://github.com/jsdom/jsdom) seems to work the best with Svelte Testing Library
