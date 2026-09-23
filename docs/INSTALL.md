# 首次安装

## 1. 准备条件

- iPhone 已安装 Shadowrocket。
- Shadowrocket 能正常建立 VPN 连接。
- 可以访问本仓库的 GitHub Raw 文件。
- 已安装 Apple 自带的地图、天气和快捷指令 App。

## 2. 导入 Shadowrocket 模块

在 Shadowrocket 中依次打开：

```text
配置 -> 模块 -> 右上角 +
```

输入以下订阅地址：

```text
https://raw.githubusercontent.com/donney521qq/wloc-location-spoofer/main/modules/wloc.module
```

导入后确认 `Apple WLOC 定位修改` 已启用。若替换过旧模块，请执行一次：

```text
停用模块 -> 启用模块
```

这一步会让 Shadowrocket 重新加载规则和脚本 URL。

## 3. 开启 HTTPS 解密

在 Shadowrocket 配置中打开 HTTPS 解密。确认模块列出的定位主机已加入解密范围：

```text
gs-loc.apple.com
gs-loc-cn.apple.com
gsp-ssl.ls.apple.com
gsp64-ssl.ls.apple.com
gspe19-2-cn-ssl.ls.apple.com
gspe79-cn-ssl.ls.apple.com
bluedot.is.autonavi.com
bluedot.is.autonavi.com.gds.alibabadns.com
```

Apple 可能轮换编号主机。如果日志出现新的 `gsp...ssl.ls.apple.com`，请按照排障手册追加该完整主机名。

## 4. 安装并信任 CA 证书

1. 在 Shadowrocket 的 HTTPS 解密页面生成并安装 CA 证书。
2. 打开 iPhone：`设置 -> 通用 -> VPN 与设备管理`，安装描述文件。
3. 打开：`设置 -> 通用 -> 关于本机 -> 证书信任设置`。
4. 对刚安装的 Shadowrocket CA 开启完全信任。

不要安装来源不明的 CA，不要向任何人分享 CA 私钥。

## 5. 安装快捷指令

打开 [快捷指令入口](../shortcuts/README.md)，分别安装：

- `WLOC设置位置`
- `WLOC恢复定位`

安装完成后，确保 `WLOC设置位置` 出现在 Apple 地图的共享菜单中。

## 6. 最终检查

- Shadowrocket VPN：已连接
- WLOC 模块：已启用
- HTTPS 解密：已开启
- CA：已安装且完全信任
- 两个快捷指令：已安装
- Shadowrocket `诊断 -> 允许访问`：正常使用时关闭
