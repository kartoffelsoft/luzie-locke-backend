# luzie-locke-backend

## API
### users
```
GET api/users/:id  
GET api/users/self
```

### items
```
GET api/items?cursor=...&limit=...
GET api/items/:id
GET api/items/search?q=...&cursor=...&limit=...
GET api/items/user
GET api/items/user/sold
GET api/items/user/bought
GET api/items/user/favorite?cursor=...&limit=...
GET api/items/user/favorite/:id

POST api/items
POST api/items/user/favorite

PATCH api/items/:id
DELETE api/items/:id
DELETE api/items/user/favorite/:id
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
