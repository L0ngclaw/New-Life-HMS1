import httpProxyMiddleware from 'next-http-proxy-middleware'

export default (req, res) =>
    httpProxyMiddleware(req, res, {
      target: `http://localhost:8002/api/`,
      pathRewrite: [
        {
          patternStr: '^/api',
          replaceStr: '',
        },
      ],
    })
