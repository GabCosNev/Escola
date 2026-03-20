import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      // exigir ponto e vírgula
      semi: ["error", "always"],

      // remover espaços no fim da linha
      "no-trailing-spaces": "error",

      // não permitir múltiplas linhas em branco
      "no-multiple-empty-lines": ["error", { max: 1 }],

      // espaço dentro de chaves
      "object-curly-spacing": ["error", "always"],
    },
  },
]);

