1-> Create tsconfig.json file and add required info

2-> npm i --save-dev @types/express for typescript coz typescript doesn't know what is express

3-> npm i --save-dev ts-node to run typescript without compiling into js

4-> npm install --save-dev nodemon to continue changes watching

apply changes into package.json -> "dev": "ts-node src/index.ts" to ->  "dev": "nodemon --watch \"src/**\" --ext \"ts,json\" --exec \"ts-node src/index.ts\""