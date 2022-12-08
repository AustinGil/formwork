import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { resolve } from 'path'
// import handlebars from 'vite-plugin-handlebars';
// import vitePugPlugin from 'vite-plugin-pug-transformer';
// import { pizzaToppings, starterPokemon } from './src/data';

export default defineConfig({
  plugins: [
    vue(),
    // vitePugPlugin({
    //   pugLocals: {
    //     pizzaToppings: pizzaToppings,
    //     starterPokemon: starterPokemon
    //   }
    // }),
    // handlebars({
    //   partialDirectory: resolve(__dirname, 'src/partials'),
    //   context: {
    //     pizzaToppings: pizzaToppings,
    //     starterPokemon: starterPokemon
    //   },
    // })
  ],
});
