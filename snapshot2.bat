@echo off
setlocal EnableDelayedExpansion

:: 변수 설정
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
set OUTPUT_DIR=D:\Users\User\Desktop
set WINDOW_SIZE=1280,768
set CHROME_ARGS=--headless --disable-gpu --hide-scrollbars --timeout=2500 --window-size=%WINDOW_SIZE%

echo 웹사이트 스크린샷 작업을 시작합니다...

:: 블로그 스크린샷
echo 블로그 스크린샷 생성 중...

call :take_screenshot "blogs1.png" "https://pinedance.github.io/blog"
call :take_screenshot "blogs2.png" "https://pinedance.github.io/mediclassics/"
call :take_screenshot "blogs3.png" "https://rpubs.com/pinedance"

:: 연구 페이지 스크린샷
echo 연구 페이지 스크린샷 생성 중...

call :take_screenshot "research1.png" "https://pinedance.github.io/research/"
call :take_screenshot "research2.png" "https://pinedance.github.io/shanghanlun/"

:: 앱 및 웹 스크린샷
echo 앱 및 웹 스크린샷 생성 중...

call :take_screenshot "appsnwebs1.png" "https://zayosoft.github.io/spa-gofang/formulafinder.html"
call :take_screenshot "appsnwebs2.png" "https://zayosoft.github.io/spa-ahp-mind-miner/app.html"
call :take_screenshot "appsnwebs3.png" "https://every-formula.netlify.app"
call :take_screenshot "appsnwebs4.png" "https://www.khfamilyclinic.com"

echo 모든 스크린샷 작업이 완료되었습니다!
echo 결과물은 %OUTPUT_DIR% 폴더에 저장되었습니다.
pause
goto :eof

:: 스크린샷 함수
:take_screenshot
set FILENAME=%~1
set URL=%~2
echo 처리 중: %URL% -^> %FILENAME%
%CHROME% %CHROME_ARGS% --screenshot="%OUTPUT_DIR%\%FILENAME%" "%URL%"
echo %FILENAME% 완료
goto :eof