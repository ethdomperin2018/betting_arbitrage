# Git on `D:` — "Permission denied" writing `.git/config`

On this PC, **Git for Windows cannot write** under `D:\development\…` (Windows blocks `git.exe`, not your project). PowerShell can edit the same files, so the repo works if config is updated manually or initialized on `C:`.

## Quick check

```powershell
cd D:\development\project\betting
git remote -v
```

If `origin` points to your GitHub URL, remotes are set (even when `git remote add` failed).

## Push / pull (works without `git` writing config)

```powershell
git push origin master
git pull origin master
```

Avoid `git remote add` / `git config --local` on `D:` until the block is fixed.

## Permanent fix (pick one)

### A. Allow Git through Windows protection

1. **Windows Security** → **Virus & threat protection** → **Ransomware protection**
2. **Controlled folder access** → **Allow an app**
3. Add:
   - `C:\Program Files\Git\cmd\git.exe`
   - `C:\Program Files\Git\bin\git.exe`
4. Remove `D:\development` from protected folders if listed.

Then:

```powershell
Remove-Item -Recurse -Force .git   # only if you want a clean re-init
git init
git remote add origin https://github.com/ethdomperin2018/betting_arbitrage.git
```

### B. Move the project to `C:`

Example: `C:\dev\betting` — Git usually works with no extra rules.

### C. Init on `C:`, copy `.git` to `D:`

```powershell
cd D:\development\project\betting
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init C:\Users\Administrator\_git-tmp-betting
Copy-Item -Recurse C:\Users\Administrator\_git-tmp-betting\.git .git
Remove-Item -Recurse -Force C:\Users\Administrator\_git-tmp-betting
```

Then edit `.git\config` in Notepad if you need new remotes, or use fix A.

## Edit `.git\config` manually

If `git remote add` fails, add:

```ini
[remote "origin"]
	url = https://github.com/ethdomperin2018/betting_arbitrage.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

Use **tabs** before `url`, `fetch`, `remote`, and `merge` (Git expects tab-indented values).
