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
GET api/items/user
GET api/items/user/sold
GET api/items/user/bought
GET api/items/user/favorite
GET api/items/:id

POST api/items
POST api/items/user/favorite

DELETE api/items/user/favorite/:id
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
  success = true,       
  message = '',         
  data = { 
    list = [ ... ]
    nextCursor = ...    // timestamp = miliseconds since 1970
  }
}
```
