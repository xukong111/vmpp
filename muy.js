/**
 * 沐阳助手 Surge 修复脚本
 * 逻辑：拦截请求并直接返回伪造的登录成功数据
 */

const body = {
  "code": 200,
  "msg": "登录成功",
  "status": 1,
  "token": "surge_fake_token_888"
};

$done({
  status: 200, // 强制将 404 修改为 200
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(body)
});
