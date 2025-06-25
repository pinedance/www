
```bash
uv add mkdocs mkdocs-material mkdocs-macros-plugin pymdown-extensions
```

```bash
uv run mkdocs new .
uv run mkdocs serve
uv run mkdocs build
```

webpage snapshot

```bash
# install playwright
uv add playwright --dev
uv run playwright install
```

chrome headless mode in windows CMD

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\screenshot.png" --window-size=1920,1080 "https://www.example.com"
```
