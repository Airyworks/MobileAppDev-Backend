## About this
Backend for mobile app dev project(wachet)

### Run
`yarn && yarn serve`  

--------------------

### HTTP Api
Listen port `3000`
#### Login
* __Request__   
  __Url__: `/login`  
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
  __Url__: `/logout`  
  __Method__: `POST`  
  __Body__: _no body_
* __Response__  
  __HTTP code__: `204 No Content | 403 Forbidden`  
  __Body__: _no body_
#### Friends
* __Request__  
  __Url__: `/friends`  
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
Listen port `3001`
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
    "msg": {
      "id": number,
      "name": string,
      "avatar": string
    }
  }
  ```
  this response means server authorized user  
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
  __to Client__:
  ```json
  {
    "action": "new-chat-res",
    "msg": {
      "channel": string
    }
  }
  ```
  returns created channel
#### Receive Message(Client Side) / Pull Message(Server Side)
* __Server__
  ```json
  {
    "action": "pull-message",
    "msg": {
      "messages": [
        IMessageType
      ]
    }
  }
  ```
  `IMessageType` is defined as:
  ```json
  {
    "uuids": [
      {
        "user": number,
        "uuid": number
      }
    ],
    "sender": {
      "id": number,
      "name": string,
      "avatar": string
    },   // user
    "msgId": number,
    "channel": string,
    "content": string,
    "time": timestamp
  }
  ```
* __Client__
  ```json
  {
    "action": "client-received",
    "msg": {
      "uuids": [number]
    }
  }
  ```
  `sequence` is to distinguish which message client received
#### Send Message(Client Side) / Push Message(Server Side)
* __Client__
  ```json
  {
    "action": "push-message",
    "msg": {
      "sequence": number,
      "channel": string,
      "content": string
    }
  }
  ```
* __Server__
  ```json
  {
    "action": "server-received",
    "msg": {
      "sequence": number,
      "time": timestamp,
      "msgId": number
    }
  }
  ```
  where `sequence` is to distinguish wich message has been received  
#### Any Error Definations
* `forbidden`: No access to current channel
* `invalid-param`: Param invalid
* `token-missing`: Token given missing or incorrect
