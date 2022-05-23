# Server API

## 請求時的參數

| method | middleware  | path                       | para           | location  | note                                           |
| ------ | ----------- | -------------------------- | -------------- | --------- | ---------------------------------------------- |
| GET    |             | /api/seatsInfo             |                |           | get all seats information                      |
| POST   |             | /api/login                 | usernameOrMail | body      | just login, you know that                      |
|        |             |                            | password       | body      |                                                |
| GET    | auth, admin | /api/auth/admin/memberInfo | memberId       | url query | for admin, get specific member information     |
| POST   | auth, admin | /api/auth/admin/addUser    | username       | body      | for admin, add one-day or using-voucher member |
|        |             |                            | mail           | body      |                                                |
|        |             |                            | phoneNumber    | body      |                                                |
| PUT    | auth, admin | /api/auth/admin/seatState  | seat.index     | body      | for admin, update specific seat state and user |
|        |             |                            | seat.state     | body      |                                                |
|        |             |                            | username       | body      |                                                |

## 回傳時的參數

``` code=json
/api/setsInfo:
    200:    
        detail: "成功取得所有位置資訊",
        seats: [
            {
                id: 1,
                state: 0,
                memberId: 3,
                updatedAt: "2022-04-19T03:59:27.000Z",
                createdAt: "2022-04-19T03:43:16.000Z"
            },
            <[id=2, id=10]>
        ]
    500:
        detail: "伺服器內部錯誤",       
```

``` code=json
/api/login:
    400:    
        detail: "參數錯誤，請參考文件" # 參數命名錯誤
    403:
        detail: "帳號或密碼錯誤"
    200:
        detail: "登入成功",
        token: token(include member id, member name, level)
    500:
        detail: "伺服器內部錯誤",       
```

``` code=json
/api/auth/*:
    422:
        detail: "參數錯誤，請參考文件" 
        # 請將 login 後取得的 token 放置在 headers 中的 authorization ，並加入前綴"Bearer "
    403:
        detail: "授權錯誤"
        # 請確認未修改過 token 中的內容
    500:
        detail: "伺服器內部錯誤",       
```

``` code=json
/api/auth/admin/*:
    403:    
        detail: "特權使用者授權錯誤"
    500:
        detail: "伺服器內部錯誤",       
```


``` code=json
/api/auth/admin/memberInfo:
    422:
        detail: "參數錯誤，請參考文件" # 未攜帶適當的變數
    404:
        detail: "該會員並不存在，請聯絡相關人員"
    200:    
        detail: "成功取得該使用者之相關資訊",
        member: {
            name: userInfo.username,
            phoneNumber: userInfo.phoneNumber,
            mail: userInfo.mail,
        }
    500:
        detail: "伺服器內部錯誤",       
```

``` code=json
/api/auth/admin/addUser:
    422:
        detail: "參數錯誤，請參考文件" # 未攜帶適當的參數
    400:
        detail: "該名用戶已存在"
    200:    
        detail: "成功新增"
    500:
        detail: "伺服器內部錯誤",       
```

``` code=json
/api/auth/admin/seatState:
    422:
        detail: "參數錯誤，請參考文件" # 未攜帶適當的參數，及參數範圍(seat.index || seat.state)不正確
    404:
        detail: "該會員並不存在，請聯絡相關人員"
    200:    
        detail: "成功修改座位資訊"
    500:
        detail: "伺服器內部錯誤",       
```