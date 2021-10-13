# Cryptography as service

This app ensure encrypt and decrypt body.
All encryption is managed by internal keys and can only be used once.

---

## Generate a session

This tag is an auth.
It is not a encryption key. It just authorize you to use the app.
It expires after 5 minutes or after to be used to decrypt some data.

`GET http://localhost:3000/key`

Result

```json

{
    "session": "129db5f5-5f00-4735-8792-ec621207661b"
}

```

---

## Encrypt data

This endpoint encrypt any data you provide on body.
It must be an object as example below.

`POST http://localhost:3000/encrypt`

Headers

```json
{
    "x-api-key": "129db5f5-5f00-4735-8792-ec621207661b"
}
```

Body

```json

{
    "data": {
        "id": "e962c247-523e-43d9-bc2b-c4b4fceeef6f",
        "userName":"Alessandro"
    }
}

```

Result

```json

{
    "data": "472e7765a7d1f93befaf0d940c6f14448fc4a6f9764beb7e108f6838647036a47e28931f3e9071533d01df1af17d707ad6f5f76cf4835dbf0d15b7110a30c682308bda6f82"
}

```

---

## Decrypt data

This endpoint decrypt any data you provide on body data as string.
It can be used once because the tag you generate on step 1 expires after first use.

Headers

```json
{
    "x-api-key": "129db5f5-5f00-4735-8792-ec621207661b"
}
```

Body

`POST http://localhost:3000/decrypt`

```json
{
    "data": "472e7765a7d1f93befaf0d940c6f14448fc4a6f9764beb7e108f6838647036a47e28931f3e9071533d01df1af17d707ad6f5f76cf4835dbf0d15b7110a30c682308bda6f82"
}

```

Result

```json

{
    "data": {
        "id": "e962c247-523e-43d9-bc2b-c4b4fceeef6f",
        "userName":"Alessandro"
    }
}

```

---

## Todo

Only authorized apps can generate a session.

- Implement authentication to api.
- Implement JWT to expires access to the service.
