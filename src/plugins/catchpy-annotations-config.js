export default {
    databaseUrl: function(canvasId) {
        return "https://example.com/search?media=image&limit=10&uri=" + encodeURI(canvasId);
    },
    databaseAuthorizationHeaders: function() {
        return {
            'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    },
    resultHandler: function(result, canvasId) {
        return {
            id: result['@id'] ? result['@id'] : result['id'],
            json: result
        }
    }
}