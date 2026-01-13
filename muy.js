/**
 * 沐阳助手强制修复
 */
const body = {
  "code": 200,
  "msg": "登录成功",
  "status": 1,
  "token": "surge_fake_888"
};

$done({
  status: 200, // 核心：强制把 404 转为 200
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});
