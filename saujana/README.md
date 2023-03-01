## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
##  create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

##  You can also use create-svelte programmatically:
```
import { create } from 'create-svelte';

await create('my-new-app', {
  name: 'my-new-app',
  template: 'default', // or 'skeleton' or 'skeletonlib'
  types: 'checkjs', // or 'typescript' or null;
  prettier: false,
  eslint: false,
  playwright: false,
  vitest: false
});
checkjs means your project will use TypeScript to typecheck JavaScript via JSDoc comments.
```

## Check our Dapps
- https://saujana.netlify.com/
