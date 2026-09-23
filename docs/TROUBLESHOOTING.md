# 排障手册

## 快速判断

按以下顺序检查，不要一开始就重装所有内容：

1. VPN 是否连接。
2. 模块是否启用。
3. 脚本 URL 是否返回 HTTP 200。
4. 坐标保存脚本是否执行成功。
5. WLOC 响应脚本是否执行成功。
6. 是否重新开关过 iPhone 定位服务。
7. 天气“我的位置”是否已改变。

## 日志：脚本地址返回 404

典型记录：

```text
script update ... wloc-settings.js => not found
script ... exception => wloc-settings.js
```

原因是旧模块仍指向已经删除的仓库。删除或停用旧模块，导入本仓库的 `modules/wloc.module`，然后执行一次“停用 -> 启用”。

## 日志：Socket closed by remote peer

如果它紧跟在 `wloc-settings/save` 之后，通常说明保存脚本没有接管请求，请求继续发送到了 Apple。优先检查脚本 URL、模块启用状态和 `gs-loc.apple.com` 的 HTTPS 解密。

## 保存返回 success:true，但位置不动

1. 关闭并重新开启 iPhone 定位服务。
2. 强制退出地图和天气后再打开。
3. 等待数十秒，让系统重新请求网络定位。
4. 必要时重启 iPhone。
5. 查看是否出现 `[wloc] 目标坐标` 日志。

## 有 gsp 连接，但没有 wloc.js 日志

日志可能会出现类似主机：

```text
gsp64-ssl.ls.apple.com
gspe19-2-cn-ssl.ls.apple.com
gspe79-cn-ssl.ls.apple.com
```

这说明 Apple 使用了编号定位主机，但该主机可能没有进入 MITM。把日志中的完整主机名同时加入：

1. `modules/wloc.module` 的 `[MITM] hostname`。
2. Shadowrocket HTTPS 解密域名列表。

保存后执行一次“停用模块 -> 启用模块”。不要长期使用过宽的 `*.apple.com` 解密规则。

## 天气改变了，第三方 App 没改变

第三方 App 可能：

- 缓存旧位置；
- 直接使用 GPS；
- 同时校验 IP、SIM、时区、Wi-Fi 或账号国家；
- 在服务端检测位置与网络出口是否一致。

先确认代理 IP 国家与目标定位国家一致，再重新启动目标 App。WLOC 不能保证覆盖所有定位和风控方式。

## 临时日志与本地访问

排障时可临时打开 Shadowrocket 日志。电脑读取日志或使用本地编辑器时，才临时打开 `诊断 -> 允许访问`。

排障完成后：

- 关闭“允许访问”；
- 关闭详细日志，避免持续记录访问主机；
- 不要把含个人 IP、地址或坐标的日志提交到公开仓库。
