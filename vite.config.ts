import react from '@vitejs/plugin-react-swc';
import { ConfigEnv, defineConfig } from 'vite';

export default defineConfig((configEnv: ConfigEnv) => {
  const { mode } = configEnv;
  const isLibMode = (mode as string) === 'lib';

  if (isLibMode) {
    console.log('In here - building library');
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: 'index.ts',
          name: 'ReactStories',
          fileName: 'react-stories'
        }
      }
    };
  } else {
    console.log('In here - building site');
    return {
      plugins: [react()],
      base: '/react-stories/',
      build: {
        outDir: 'dist'
      }
    };
  }
});
