import mirador from 'mirador';
import config from './mirador-config';
import catchpyAnnotationsPlugin from './plugins/catchpy-annotations';

mirador.viewer(config, [catchpyAnnotationsPlugin]);
