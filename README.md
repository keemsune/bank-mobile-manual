# Manual 프로젝트

리걸프렌즈 매뉴얼 페이지 HTML/CSS 작업

## 📁 폴더 구조

```
manual-project/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 스타일시트
├── js/
│   └── script.js       # JavaScript
├── images/             # 이미지 파일들을 여기에 넣으세요
└── README.md
```

## 🚀 실시간 작업 방법

### 방법 1: VS Code Live Server (추천)

1. VS Code에서 이 폴더 열기
2. `index.html` 우클릭 → "Open with Live Server"
3. CSS 수정하면 자동으로 브라우저 새로고침

### 방법 2: 파일 직접 열기

```bash
open index.html
```

수정 후 브라우저 새로고침 (Cmd + R)

### 방법 3: Python 서버

```bash
python3 -m http.server 8000
```

브라우저에서: http://localhost:8000

## 📝 작업 순서

1. Figma 디자인 확인
2. `index.html`에 HTML 구조 작성
3. `css/style.css`에 스타일 작성
4. 브라우저에서 실시간 확인
5. 이미지는 `images/` 폴더에 저장
6. 완성 후 프론트 개발자에게 전달

## 🎨 CSS 작업 팁

- 색상, 폰트 등은 최상단에 CSS 변수로 정의
- 모바일 반응형 고려 (@media 쿼리)
- 클래스명은 명확하게 (BEM 방식 추천)

## 📦 전달할 파일

완성 후:
- `css/style.css`
- `images/` 폴더
- (참고용) `index.html`

## 배포 정보

- 개발서버: http://dev.legalflow.co.kr/manual/
- 실서버: https://www.legalfriends.co.kr/manual/












