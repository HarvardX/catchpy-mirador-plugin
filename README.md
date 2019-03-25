# catchpy-mirador-plugin
This plugin follows the [plugin demo project provided by charbugs](https://github.com/charbugs/mirador-plugin-demos). Though its main purpose is to connect Mirador v3 to HarvardX's [annotation backend, catchpy](https://github.com/nmaekawa/catchpy), the code included should be open-ended enough to be adapted to any external store containing annotations.

## Plugin Development
1. Run `npm install` in project to build and install dependencies
2. Change config file to talk to external datastore
3. Change dist output to meet needs and rebuild using webpack `npx webpack --config webpack.config.js`
## Config file set up
The `src/plugins/catchpy-annotations-config.js` should be updated first to handle the annotation server and contains 3 main components:
1. databaseURL
2. databaseAuthorizationHeaders
3. resultHandler

### databseURL
The main assumption made by this plugin is that there will only be an interest in canvas-level annotations. The value for `databaseUrl` should be a function that is passed in a `canvasId`. It should then return the url that will be called given a `GET` ajax call.

### databaseAuthorizationHeaders
Catchpy  expects authorization to be sent via headers using [JSON Web Tokens (JWT)](https://jwt.io/). Thus, the config file is expecting a dictionary to be passed to the fetch call containing the authorization token to be passed in. In production, this will be created server-side and passed in to the page.

### resultHandler
This is the trickier of the settings. Currently, the expected input follows the [Presentation API 2.1.1 model](https://iiif.io/api/presentation/2.1/#canvas) under the `otherContent` part of the Canvas section marked as an `AnnotationList`. The function returned in resultHandler expects the id of the list and the json containing the list object (example shown below, but explained [here](https://iiif.io/api/presentation/2.1/#annotation-list)):
```javascript
{
  "@context": "http://iiif.io/api/presentation/2/context.json",
  "@id": "http://example.org/iiif/book1/list/p1",
  "@type": "sc:AnnotationList",

  "resources": [
    {
      "@type": "oa:Annotation",
      "motivation": "sc:painting",
      "resource":{
        "@id": "http://example.org/iiif/book1/res/music.mp3",
        "@type": "dctypes:Sound",
        "format": "audio/mpeg"
      },
      "on": "http://example.org/iiif/book1/canvas/p1"
    },
    {
      "@type": "oa:Annotation",
      "motivation": "sc:painting",
      "resource":{
        "@id": "http://example.org/iiif/book1/res/tei-text-p1.xml",
        "@type": "dctypes:Text",
        "format": "application/tei+xml"
      },
      "on": "http://example.org/iiif/book1/canvas/p1"
    }
    // ... and so on
  ]
}
```

## Preview
Once you've run `npx webpack --config webpack.config.js` to webpack project, open the `dist/index.html` page to preview changes.