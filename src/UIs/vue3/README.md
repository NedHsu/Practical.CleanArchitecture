# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Volar => OK

Run `Volar: Switch TS Plugin on/off` from VSCode command palette.

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"


# Scaling Up

## Routing - 

### vue-router - [Document](https://next.router.vuejs.org/guide/)

```
npm install vue-router@4
```

## State Management

### Vuex - [Document](https://next.vuex.vuejs.org/)

```
npm install vuex@next --save
```

## Http client

### Axios - [Document](https://axios-http.com/docs/intro)

```
npm install axios
```

## UI

### PrimeVue 3

```
npm install primevue@^3.5.1 --save
npm install primeicons --save

npm install primeflex@2.0.0 --save
```

### Notification

```

```

## SCSS/SASS

``` 
npm install -D sass
```

## i18n

```
npm install vue-i18n@next
npm i --save-dev @intlify/vite-plugin-vue-i18n
```

### DAY.JS - instead of momentjs
> lite only 2kb

```
npm install dayjs --save
```

### calendar

```
npm i --save tui-calendar
```

### Signalr

```
npm i --save @microsoft/signalr
```

### Playwright - [Document](https://playwright.dev/docs/intro)
> End to End Test

``` bash
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

### Test

```
npm install @babel/core @babel/preset-env @testing-library/jest-dom @types/jest @vue/test-utils@next @babel/preset-typescript @vue/babel-plugin-jsx vue-jest@next -D

// 下面三個包的版本需要固定，有些版本和 vue-test 的對應不上，則會出錯

npm install babel-jest@26.0.0 jest@26.0.0 ts-jest@26.4.4 -D
```