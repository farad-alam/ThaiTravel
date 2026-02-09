import 'server-only';

import * as v from 'valibot';
import { createEnv } from '@/utils/createEnv';

const envSchema = {
  SANITY_API_READ_TOKEN: v.pipe(v.string(), v.minLength(1)),
  MAX_STATIC_PARAMS: v.pipe(
    v.string(),
    v.transform(parseInt),
    v.number(),
    v.minValue(1),
    v.maxValue(1000)
  ),
  GMAIL_USER: v.pipe(v.string(), v.email()),
  GMAIL_APP_PASSWORD: v.pipe(v.string(), v.minLength(1)),
  CONTACT_EMAIL: v.pipe(v.string(), v.email()),
  SANITY_REVALIDATE_SECRET: v.pipe(v.string(), v.minLength(1)),
};
const serverEnv = createEnv(envSchema);
export { serverEnv };
