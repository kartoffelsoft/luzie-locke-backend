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

### login
```
POST api/login/google
```

## Response
```
{ 
  success = true,             // or false
  message = '',               // extra message string. Mostly an error message
  data = { user = { ... } }   // null if error occurred or not found
}
```