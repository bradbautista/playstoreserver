# playstoreserver

This server listens on port 8000 for GET requests to the endpoint /apps/, with two optional query parameters. If no queries are present, it will return a selection of apps and information about them.

Valid queries include *genre* and *sort*. *genre* must be one of *action*, *arcade*, *card*, *casual*, *puzzle* or *strategy*. *sort* must be either *Rating* or *App*.
