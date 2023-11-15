import { NextApiRequest, NextApiResponse } from 'next';

import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const proxy = httpProxyMiddleware(req, res, {
    target: process.env.API_PROXY_TARGET_URL,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: '^/api/query',
        replaceStr: '/query',
      },
    ],
  });

  return proxy;
};

export default handler;
