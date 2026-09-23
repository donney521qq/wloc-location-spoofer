# WLOC Location Spoofer

一套经过实机排查和验证的 iPhone Apple 网络定位修改方案，适用于 Shadowrocket。仓库包含可订阅模块、固定版本脚本、Apple 快捷指令入口、安装教程、恢复方法和自动校验测试。

## 实机验证

- iPhone SE，iOS 18.3（22D60）
- Shadowrocket VPN 与 HTTPS 解密
- Apple 地图重新定位到目标区域
- 天气组件和天气 App 的“我的位置”均切换到目标城市

## 修复的问题

1. 原 `Yu9191/wloc` 仓库已删除，旧模块脚本地址返回 404。
2. 新版 Apple 定位请求会使用 `gsp64-ssl.ls.apple.com`、`gspe*-cn-ssl.ls.apple.com` 等编号主机，旧模块未覆盖。
3. 保存坐标后，iOS 定位服务和 App 仍可能使用旧缓存。

## 快速开始

Shadowrocket 模块订阅地址：

```text
https://raw.githubusercontent.com/donney521qq/wloc-location-spoofer/main/modules/wloc.module
```

安装顺序：

1. 按照 [安装教程](docs/INSTALL.md) 导入模块、开启 HTTPS 解密并信任证书。
2. 从 [快捷指令页面](shortcuts/README.md) 安装设置和恢复两个快捷指令。
3. 按照 [使用教程](docs/USAGE.md) 从 Apple 地图共享目标地点给 `WLOC设置位置`。
4. 保存后关闭并重新开启 iPhone 定位服务。
5. 用天气 App 的“我的位置”交叉验证。

遇到问题请查看 [排障手册](docs/TROUBLESHOOTING.md)。

## 目录

```text
modules/wloc.module       Shadowrocket 模块
scripts/wloc.js           Apple WLOC 响应修改脚本
scripts/wloc-settings.js  坐标保存/查询/清理脚本
shortcuts/README.md       Apple 官方快捷指令分享入口
docs/INSTALL.md           首次安装
docs/USAGE.md             切换、验证和恢复定位
docs/TROUBLESHOOTING.md   日志与常见故障
test/                     完整性与兼容性测试
```

## 验证

需要 Node.js 20 或更高版本：

```bash
npm test
```

测试会校验第三方脚本和许可证哈希、Shadowrocket 持久化保存/查询行为、模块脚本地址和本次观察到的定位主机匹配规则。

## 工作原理与限制

WLOC 修改的是 Apple 网络定位响应。它不等于系统级 GPS 模拟，也不保证所有第三方 App 都接受修改结果。部分服务还会校验 IP、SIM 国家、时区、Wi-Fi、蜂窝基站或账号地区。

仅在合法、授权的测试场景中使用。请遵守当地法律和目标服务的条款。

## 来源与许可证

脚本来源、固定提交和文件哈希见 [UPSTREAM.md](UPSTREAM.md)。第三方声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。脚本按 GNU AGPL v3 发布，详见 [LICENSE](LICENSE)。
