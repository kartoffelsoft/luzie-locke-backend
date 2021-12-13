# luzie-locke-backend

## API
### users
```
GET api/users/:id  
GET api/items/:id/image
GET api/users/self
```

### items
```
GET api/items?cursor=...&limit=...
GET api/items/:id
GET api/items/:id/image
GET api/items/:id/state
GET api/items/search?q=...&cursor=...&limit=...

POST api/items

PATCH api/items/:id
DELETE api/items/:id
```

### user-items
```
GET api/users/:id/items?cursor=...&limit=...
GET api/users/:id/items/sold?cursor=...&limit=...
GET api/users/:id/items/bought?cursor=...&limit=...

GET api/users/:id/open-items?cursor=...&limit=...
GET api/users/:id/sold-items?cursor=...&limit=...
GET api/users/:id/bought-items?cursor=...&limit=...

GET api/users/:id/favorite-items?cursor=...&limit=...
GET api/users/:id1/favorite-items/:id2/exist
POST api/users/:id/favorite-items
DELETE api/users/:id1/favorite-items/:id2
```

### auth
```
POST api/auth/google
```

### settings
```
GET api/users/self/settings/location
GET api/users/self/settings/local-level

PATCH api/users/self/settings/location
PATCH api/users/self/settings/local-level
```


### images
```
GET api/images/users/:id
GET api/images/items/:id
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
  success = true,       
  message = '',         
  data = { 
    list = [ ... ]
    nextCursor = ...    // timestamp = miliseconds since 1970
  }
}
```
