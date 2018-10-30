## About this
Backend for mobile app dev project(wachet)

### Run
`yarn && yarn serve`  

--------------------

### HTTP Api
#### Login
* __Request__   
  __Url__: `/account/login`  
  __Method__: `POST`  
  __Body__:
  ```json
  ### form-data formated ###
  {
    "name": string,
    "pwd": string
  }
  ```
  where `pwd` has been hashed
* __Response__  
  __HTTP code__: `200 OK | 404 Not Found`  
  __Body__:
  ```json
  {
    "id": number,
    "token": string
  }
  ```
  browser will be set cookie here  
  note: `token` used to build websocket connection
#### Logout
* __Request__  
  __Url__: `/account/logout`  
  __Method__: `POST`  
  __Body__: _no body_
* __Response__  
  __HTTP code__: `204 No Content | 403 Forbidden`  
  __Body__: _no body_
#### Friends
* __Request__  
  __Url__: `/account/friends`  
  __Method__: `GET`  
  __Body__: _no body_  
* __Response__  
  __HTTP code__: `200 OK | 403 Forbidden`  
  __Body__:
  ```json
  [
    {
      "id": number,
      "name": string,
      "avatar": string
    }
  ]
  ```

----------------
### Websocket API
After login, client creates a websocket connection with server 
#### Hello
* __Client__  
  ```json
  {
    "action": "hello",
    "msg": {
      "token": string
    }
  }
  ```
  all actions should be uncapitalized  
  note: `token` gotten from `login` API
* __Server__  
  ```json
  {
    "action": "hi",
    "msg": {}
  }
  ```
  this response means server authorized user  
  invalid `token` will cause connection disconnects
#### New chat
* __Client__
  ```json
  {
    "action": "new-chat",
    "msg": {
      "to": [
        {
          "id": number
        }
      ]
    }
  }
  ```
  `id` is a user id
* __Server__
  ```json
  {
    "action": "new-chat-res",
    "msg": {
      "channel": string
    }
  }
  ```
  returns created channel
#### Receive Message
* __Server__
  ```json
  {
    "action": "new-message",
    "msg": {
      "sequence": number,
      "messages": [
        IMessageType
      ]
    }
  }
  ```
  `IMessageType` is defined as:
  ```json
  {
    "uuid": string,
    "from": number,   // user id
    "toChannel": string,
    "content": string,
    "time": timestamp
  }
  ```
* __Client__
  ```json
  {
    "action": "client-received",
    "msg": {
      "sequence": number
    }
  }
  ```
  `sequence` is to distinguish which message client received
#### Send Message
* __Client__
  ```json
  {
    "action": "send-message",
    "msg": {
      "sequence": number,
      "toChannel": string,
      "content": string
    }
  }
  ```
* __Server__
  ```json
  {
    "action": "server-received",
    "msg": {
      "uuid": string,
      "sequence": number,
      "time": timestamp
    }
  }
  ```
  where `sequence` is to distinguish wich message has been received
