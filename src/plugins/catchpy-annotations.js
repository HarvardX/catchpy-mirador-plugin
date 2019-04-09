/**
* This plugin calls an external database (in this case, catchpy) to retrieve
* annotations on the canvas level.
*/

import React from 'react';
import mirador from 'mirador';
import config from './catchpy-annotations-config';

/**
* Extract image url of the selected canvas from manifest.
*
* For the sake of simplicity it only recognizes the url if it's
* a fully qualified jpeg url. That is, it doesn't transform
* a info.json to a image url.
*
* Also note that `canvas` here is a manifesto object.
*/
function getImageUrlFromCanvas(canvas) {
  const url = canvas.getImages()[0] &&
    canvas.getImages()[0].getResource().id;
  if (url)
    return url;
}

/**
* This component will call and convert annotations to expected IIIF v2 spec.
*/
class CatchpyAnnotationLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var self = this;
    
    const { receiveAnnotation, canvas, getAnnotationInOA } = this.props
    if (canvas) {
      fetch(config.databaseUrl(canvas.id), {
        method: 'GET',
        headers: config.databaseAuthorizationHeaders(),
      }).then(res => res.json())
        .then((result) => {
          let cleanup = config.resultHandler(result, canvas.id);
          if (cleanup.json.resources.length > 0) {
            receiveAnnotation(canvas.id, cleanup.id, cleanup.json);
          }
      }, (error) => {
        console.log(error);
      });
    }
    

    return (null);
  }
}

/**
* Inject the current canvas into the component.
* Here we use state selectors that are exported by Mirador.
*/
function mapStateToProps(state, { windowId }) {
  return {
    canvas: mirador.selectors.getSelectedCanvas(state, windowId),
  };
};

const mapDispatchToProps = {
  receiveAnnotation: mirador.actions.receiveAnnotation
};

/**
* This is the actual plugin object.
*/
export default {
  // Component the plugin addresses
  target: 'WindowTopBarButtons',
  // Plugin mode replace
  mode: 'replace',
  // Component that will be renderd in place of the target
  component: CatchpyAnnotationLoader,
  // This function will be used to connect the plugin component to the mirador store
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
};
