/**
 * pandanvpn 获取节点（去混淆稳定版）
 * 只依赖接口返回的 JSON
 * 适用于 Surge / Shadowrocket
 */

let body = $response.body;

let data;
try {
  data = JSON.parse(body);
} catch (e) {
  console.log("❌ JSON 解析失败");
  $done({});
  return;
}

// 不同接口字段名兼容
let list =
  data.serverList ||
  data.vpnServerList ||
  data.data ||
  [];

if (!Array.isArray(list) || list.length === 0) {
  console.log("❌ 未获取到节点列表");
  $done({});
  return;
}

let results = [];
let logs = [];

for (let i = 0; i < list.length; i++) {
  let n = list[i];

  // 常见字段兜底
  let host =
    n.host ||
    n.ip ||
    n.server ||
    n.addr;

  let port =
    n.port ||
    n.serverPort ||
    n.vpnPort;

  let password =
    n.password ||
    n.pwd ||
    n.pass;

  let method =
    n.method ||
    n.encrypt ||
    "aes-256-gcm";

  let name =
    n.name ||
    n.country ||
    n.region ||
    `Node-${i + 1}`;

  // 基本校验
  if (!host || !port || !password) {
    continue;
  }

  // ss:// 构造
  let userinfo = `${method}:${password}`;
  let base64 = Buffer.from(userinfo).toString("base64");

  let ss = `ss://${base64}@${host}:${port}#${encodeURIComponent(
    name
  )}`;

  results.push(ss);
  logs.push(`【${name}】\n${ss}`);
}

if (results.length === 0) {
  console.log("❌ 节点解析失败（字段不完整）");
  $done({});
  return;
}

// 输出通知
let title = "PandanVPN 节点获取成功";
let subtitle = `成功 ${results.length} 个`;
let message = logs.join("\n\n");

if (typeof $notify !== "undefined") {
  $notify(title, subtitle, message);
} else if (typeof $notification !== "undefined") {
  $notification.post(title, subtitle, message);
}

// 不修改原响应
$done({ body });
