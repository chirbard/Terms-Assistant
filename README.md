# termsprint
![termsprint-cover](https://github.com/user-attachments/assets/d1bcd8d7-b1e8-4d35-8e68-1fb457ecb53d)

## Creating env file

Create a file `/.env` in root folder (not src folder) with contents

```
VITE_PROJECT_ID=<watsonx-project-id>
VITE_API_KEY=<watsonx-api-key>
```

## Compiling project files

```sh
# install dependencies
npm install

# compile
npm run build
```

You'll get a `dist` folder which is the actual extension.

## Loading the extension to Chrome

Open Google Chrome browser and visit the URL: `chrome://extensions`. Activate developer mode and click on `Load unpacked`. Select the newly generated `dist` folder.

The extension should be loaded and working perfectly.
