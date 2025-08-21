import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers';

import { isAuthorized } from '@tinacms/auth';

export const config = mediaHandlerConfig;

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtlbxu8ya',
  api_key: process.env.CLOUDINARY_API_KEY || '671255211726649',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'IcBPNLBHiml3LPagPpWejhnp2c4',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true;
      }

      const user = await isAuthorized(req);

      return Boolean(user && user.verified);
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
