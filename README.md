# Personal Portfolio

Stitch 디자인을 기반으로 만든 HTML, CSS, JavaScript 정적 포트폴리오입니다.

## 로컬 실행

Node.js 18 이상에서 별도의 패키지 설치 없이 실행할 수 있습니다.

```bash
npm start
```

브라우저에서 `http://127.0.0.1:3000`을 여세요.

포트를 변경하려면 다음과 같이 실행합니다.

```bash
PORT=4173 npm start
```

## Vercel 배포

Vercel에서 이 폴더를 프로젝트 루트로 선택해 배포합니다. 빌드 명령이나 패키지 설치은 필요하지 않으며, `public` 폴더가 정적 출력 디렉터리로 사용됩니다.

## 구조

```text
personal-portfolio/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
└── vercel.json
```
