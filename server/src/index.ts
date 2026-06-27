import { createApp } from './app';
import { assertServerConfig, config } from './config';

assertServerConfig();

const app = createApp();

app.listen(config.port, () => {
  console.log(`RAF Connect API running on port ${config.port}`);
});
