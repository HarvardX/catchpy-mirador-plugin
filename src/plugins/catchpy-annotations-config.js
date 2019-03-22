export default {
    databaseUrl: function(canvasId) {
        return "https://example.com/search?media=image&limit=10&uri=" + encodeURI(canvasId);
    },
    databaseAuthorizationHeaders: function() {
        return {
            'auth-token': "example.jwt.token"
        }
    },
    resultHandler: function(result, canvasId) {
        return {
            id: result['@id'] ? result['@id'] : result['id'],
            json: result
        }
    }
}