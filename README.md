github 部署的地址：https://doria76593.github.io/mangosteen_front/dist/index.html

## 一些关键的步骤

## init 配置

init 项目

```typescript
npm create vite@latest mangosteen_front -- --template vue-ts
```

- init pnpm ，并且将 globalBinDir 配置到环境变量

```typescript
 pnpm config set store-dir "D:\software\pnpm\storeDir"
 pnpm config set global-dir "D:\software\pnpm\globalDir"
 pnpm config set global-bin-dir "D:\software\pnpm\globalBinDir"
 pnpm config set state-dir "D:\software\pnpm\state"
 pnpm config set cache-dir "D:\software\pnpm\cache"
```

- 安装 vue3 vite tsx 插件

```
pnpm i @vitejs/plugin-vue-jsx -D
```

并且配置

```typescript
export default defineConfig({
  // base: "/mangosteen_front/dist/",
  plugins: [
    vue(),
    vueJsx({
      // transformOn: true,这个属性开启或者关闭感觉影响不太大呀
      mergeProps: true,
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
});
```

- 安装配置路由,并进行模块拆分、配置子路由

```typescript
pnpm install vue-router@4 -S
```

- 使用 css module(不用配置，直接使用即可，并且使用 scss)

```scss
pnpm add -D sass
```

- init reset.css 和跨平台字体：font.css github 黑体

```css
flex-shrink: 0; 不伸缩，默认为1
flex-grow:1;占的比例 默认为0。当其他为0或者没有设置的时候，设置为1就会占父级元素的100%。
```

