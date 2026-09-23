import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const files = new Map([
  [new URL("../scripts/wloc.js", import.meta.url), "a1b361e60f0b434585260fb59c65d1ddbe3bff89ace3639f592e7d8af432b3c1"],
  [new URL("../scripts/wloc-settings.js", import.meta.url), "cbff047a7f42055615ee19e208ddfc2ec66833e6f2b75555eac84f1c299a66cf"],
  [new URL("../LICENSE", import.meta.url), "8486a10c4393cee1c25392769ddd3b2d6c242d6ec7928e1414efff7dfb2f07ef"]
]);

test("vendored files retain their pinned SHA-256 hashes", async () => {
  for (const [file, expectedHash] of files) {
    const contents = await readFile(file);
    const actualHash = createHash("sha256").update(contents).digest("hex");
    assert.equal(actualHash, expectedHash, file.pathname);
  }
});
test("settings bundle saves, queries, and clears Shadowrocket storage", async () => {
  const source = await readFile(new URL("../scripts/wloc-settings.js", import.meta.url), "utf8");
  const storage = new Map();

  const run = (url) => {
    let result;
    vm.runInNewContext(source, {
      $rocket: {},
      $request: { url },
      $persistentStore: {
        read: (key) => storage.get(key) ?? null,
        write: (value, key) => {
          storage.set(key, value);
          return true;
        }
      },
      $done: (value) => { result = value; },
      console
    });
    return JSON.parse(result.response.body);
  };

  const saved = run("https://gs-loc.apple.com/wloc-settings/save?lon=-0.12&lat=51.5&acc=25");
  assert.equal(saved.success, true);
  assert.equal(storage.has("wloc_settings"), true);

  const queried = run("https://gs-loc.apple.com/wloc-settings/save?action=query");
  assert.deepEqual(
    { success: queried.success, longitude: queried.longitude, latitude: queried.latitude, accuracy: queried.accuracy },
    { success: true, longitude: -0.12, latitude: 51.5, accuracy: 25 }
  );

  const cleared = run("https://gs-loc.apple.com/wloc-settings/save?action=clear");
  assert.equal(cleared.success, true);
  assert.equal(run("https://gs-loc.apple.com/wloc-settings/save?action=query").success, false);
});

test("module uses repository-owned scripts and matches observed Apple hosts", async () => {
  const module = await readFile(new URL("../modules/wloc.module", import.meta.url), "utf8");

  assert.match(module, /raw\.githubusercontent\.com\/donney521qq\/wloc-location-spoofer\/main\/scripts\/wloc\.js\?v=1\.0\.0/);
  assert.match(module, /raw\.githubusercontent\.com\/donney521qq\/wloc-location-spoofer\/main\/scripts\/wloc-settings\.js\?v=1\.0\.0/);

  const responsePattern = /^https?:\/\/(?:gs-loc(?:-cn)?\.apple\.com|gsp(?:e)?(?:\d+(?:-\d+)*)?(?:-cn)?-ssl\.ls\.apple\.com|bluedot\.is\.autonavi\.com(?:\.gds\.alibabadns\.com)?)\/clls\/wloc/;
  const observedHosts = [
    "gs-loc.apple.com",
    "gs-loc-cn.apple.com",
    "gsp-ssl.ls.apple.com",
    "gsp64-ssl.ls.apple.com",
    "gspe19-2-cn-ssl.ls.apple.com",
    "gspe79-cn-ssl.ls.apple.com",
    "bluedot.is.autonavi.com",
    "bluedot.is.autonavi.com.gds.alibabadns.com"
  ];

  for (const host of observedHosts) {
    assert.equal(responsePattern.test(`https://${host}/clls/wloc`), true, host);
    assert.match(module, new RegExp(host.replaceAll(".", "\\.")));
  }
});

test("shortcut documentation keeps both canonical iCloud links", async () => {
  const shortcuts = await readFile(new URL("../shortcuts/README.md", import.meta.url), "utf8");
  assert.match(shortcuts, /a82717d8fdad4e6280866fcf911173f7/);
  assert.match(shortcuts, /f42632d406504f24a2cd163af4fe012f/);
});
