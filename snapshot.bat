@echo off
echo 웹사이트 스크린샷 작업을 시작합니다...

echo 블로그 스크린샷 생성 중...
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\blogs1.png" --window-size=1280,768 "https://pinedance.github.io/blog"
echo blogs1.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\blogs2.png" --window-size=1280,768 "https://pinedance.github.io/mediclassics/"
echo blogs2.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\blogs3.png" --window-size=1280,768 "https://rpubs.com/pinedance"
echo blogs3.png 완료

echo 연구 페이지 스크린샷 생성 중...
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\research1.png" --window-size=1280,768 "https://pinedance.github.io/research/"
echo research1.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\research2.png" --window-size=1280,768 "https://pinedance.github.io/shanghanlun/"
echo research2.png 완료

echo 앱 및 웹 스크린샷 생성 중...
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\appsnwebs1.png" --window-size=1280,768 "https://zayosoft.github.io/spa-gofang/formulafinder.html"
echo appsnwebs1.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\appsnwebs2.png" --window-size=1280,768 "https://zayosoft.github.io/spa-ahp-mind-miner/app.html"
echo appsnwebs2.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\appsnwebs3.png" --window-size=1280,768 "https://every-formula.netlify.app"
echo appsnwebs3.png 완료

"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="D:\Users\User\Desktop\appsnwebs4.png" --window-size=1280,768 "https://www.khfamilyclinic.com"
echo appsnwebs4.png 완료

echo 모든 스크린샷 작업이 완료되었습니다!
echo 결과물은 D:\Users\User\Desktop\ 폴더에 저장되었습니다.
pause