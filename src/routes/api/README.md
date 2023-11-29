## this additional custom API should be used only for requests that cannot be done directly on neither the server nor client.

### DELETE /api/applications/:id

### DELETE /api/apartments/:id

- The deletion request does not work directly from the client, and creating an extra page for it would be sort of redundant
- There also isn't too much time to figure all small things out so I think this is the best alternative

### POST /api/applications/:id?status=<accept | decline>

- Same as previous basically; an extra page would be needed either way
