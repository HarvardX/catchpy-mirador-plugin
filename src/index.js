import mirador from 'mirador';
import config from './mirador-config';
import downloadImagePlugin from './plugins/download-image';
import catchpyAnnotationsPlugin from './plugins/catchpy-annotations';

mirador.viewer(config, [catchpyAnnotationsPlugin]);
