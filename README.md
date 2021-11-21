# luzie-locke-backend

## API
### users
```
GET api/users/:id  
PATCH api/users/location
```

### items
```
GET api/items?cursor=...&limit=...
GET api/items/search?q=...&cursor=...&limit=...
GET api/items/:id
```

### auth
```
POST api/auth/google
```

## Response
### Base
```
{ 
  success = true,       // or false
  message = '',         // extra message string. Mostly an error message
  data = { ... }        // null if error occurred or not found
}
```

### Pagination
```
{ 
  success = true,       // or false
  message = '',         // extra message string. Mostly an error message
  data = { 
    list = [ ... ]
    nextCursor = ...    // timestamp
  }
}
```
