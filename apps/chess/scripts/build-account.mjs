import {build} from 'esbuild';
await build({entryPoints:['src/account.js'],outfile:'dist/account.js',bundle:true,external:['./storage.js'],tsconfig:'tsconfig.json',format:'esm',minify:true,target:'es2022'});
