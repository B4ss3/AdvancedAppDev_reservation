## this additional custom API should be used only for requests that cannot be done directly on neither the server nor client.

### DELETE /api/applications/:id

- The deletion request did not work directly from the client, and creating a extra page for it would be sort of weird
- There also isn't too much time to figure all small things out so I think this is the best alternative

### POST /api/applications/:id?status=<accept | decline>

- Same as previous basically; an extra page would be needed either way
