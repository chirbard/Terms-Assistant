# Chrome extension

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
