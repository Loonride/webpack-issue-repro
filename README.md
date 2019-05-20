Adapted from the minimum reproducible test repo found here: https://github.com/webpack/webpack-dev-server/pull/1514

## Steps

### Run the app

```sh
// start the backend server on port 8080
npm run server

// start webpack dev server on port 9000
npm run hot
```

### Update the source to test HMR

Change the `background-color` in `main.css`

### Issue

Error in the browser's console: `GET http://localhost:8080/08a64a5d1bd954786070.hot-update.json 404 (Not Found)`

The dev server tries to fetch from the backend on port 8080 and not from webpack on port 9000.

### Issue 1 - publicPath

- Go to `http://localhost:9000`
- Change `main.css`
- See a 404 from `http://localhost:9000/08a64a5d1bd954786070.hot-update.json`
- The correct place to request from should be `http://localhost:9000/dist/08a64a5d1bd954786070.hot-update.json`

`publicPath: '/dist/'` from `devServer` is causing a 404 because it is not overriding `publicPath` of webpack.

- Uncomment the `publicPath` in webpack config `output` and it will work without a 404

This confirms: https://github.com/webpack/webpack-dev-server/issues/1785 

### Issue 2 - Incorrect Port

- Uncomment the `publicPath` in webpack config `output`
- Go to `http://localhost:8080`
- Change `main.css`
- See a 404 from `http://localhost:8080/dist/08a64a5d1bd954786070.hot-update.json`
- The correct place to request from should be `http://localhost:9000/dist/08a64a5d1bd954786070.hot-update.json`

The port is evidently being inferred from `window.location.port`, when it should not be.


### Conclusion

I think that a combination of these two issues are causing the problem here: https://github.com/webpack/webpack-dev-server/issues/1385