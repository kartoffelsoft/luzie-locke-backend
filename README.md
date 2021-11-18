# luzie-locke-backend

## API
### users
```
GET api/users/:id  
PATCH api/users/location
```

### items
```
GET api/items
GET api/items/:id
```

### auth
```
POST api/auth/google
```

## Response
```
{ 
  success = true,       // or false
  message = '',         // extra message string. Mostly an error message
  data = { ... }        // null if error occurred or not found
}
```
