const body = {
  "code": 200,
  "msg": "登录成功",
  "status": 1,
  "token": "surge_fake_token_888"
};

$done({
  status: 200,             // 这一行极其重要，强制覆盖 404
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(body)
});
