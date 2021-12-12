

```shell
tools/dev/gm.py x64.debug

```


# 问题
## 1 下载sysroot失败 错误如下
```text
# gn gen out/x64.debug
ERROR at //build/config/sysroot.gni:64:7: Assertion failed.
      assert(
      ^-----
Missing sysroot (//build/linux/debian_sid_amd64-sysroot). To fix, run: build/linux/sysroot_scripts/install-sysroot.py --arch=amd64
See //build/config/sysroot.gni:65:11: 
          exec_script("//build/dir_exists.py",
          ^-----------------------------------
This is where it was set.                                                            
See //build/config/gcc/BUILD.gn:8:1: whence it was imported.
import("//build/config/sysroot.gni")
^----------------------------------
See //gni/v8.gni:182:23: which caused the file to be included.                       
  v8_add_configs += [ "//build/config/gcc:symbol_visibility_default" ]
```
解决: 手动下载sysroot。先修改安装sysroot.py[./v8/build/linux/sysroot_scripts/install-sysroot.py] 130行 注释掉下载的代码 
```python
#  if os.path.isdir(sysroot):
#    shutil.rmtree(sysroot)
#  os.mkdir(sysroot)
  tarball = os.path.join(sysroot, tarball_filename)
  print('Downloading %s' % url)
  sys.stdout.flush()
  sys.stderr.flush()
#  for _ in range(3):
#    try:
#      response = urlopen(url)
#      with open(tarball, "wb") as f:
#        f.write(response.read())
#      break
#    except Exception:  # Ignore exceptions.
#      pass
#  else:
#    raise Error('Failed to download %s' % url)

```
https://commondatastorage.googleapis.com/chrome-linux-sysroot 找到属于你系统的对应文件。 
我这里下载的是debian_sid_amd64_sysroot.tar.xz，
再移动到./v8/build/linux/debian_sid_amd64-sysroot/debian_sid_amd64_sysroot.tar.xz
[这里替换为对应的目录名称]



