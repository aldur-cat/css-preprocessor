# css-preprocessor
webpack기반의 (SA/SC/C)SS 전처리 장치
  
## Install

```bash
npm i
```

## Run dev

```bash
npm run dev
```

## Extract css files

```bash
npm run build
```

## Description
정적 페이지로 관리를 하는 마크업 프로젝트에 (SA/SC/C)SS를 전처리 시켜주는 webpack 기반의 번들러입니다.
SPA구조 등 모듈화된 프레임워크 기반의 프로젝트가 아닌 html, css, javascript를 정적으로 관리하여 사용하는 구조에서 (SA/SC/C)SS 전처리만을 도입하기 위할 경우 활용하시면 됩니다.

autoprefix 설정 가능하며 기타 추가하고 싶은 postcss 플러그인이 있다면 원하시는대로 구성하셔도 무방합니다.

기존의 작업 폴더에 package.json과 webpack.config.js파일만 추가하여 간편히 구성 가능합니다.


## 작업 예시
- 전처리 처리를 원하는 (SA/SC/C)SS 파일을 scss폴더에 생성합니다.  (경로 수정가능)
- 마크업 작업을 진행할 정적 html파일에 webpack dev server에서 동작할 js파일을 참조합니다.

```html
<!-- 테섭으로 작업 중이라면 참조, 완료후 빌드 처리후에 스크립트 태그 제거 -->
<script  src="./js-dev/sample.js"></script>
```

- webpack dev server를 실행하여 스타일링 작업을 진행합니다.

```bash
npm run dev
```

- 작업이 완료되었다면 테섭을 종료 후 css파일 추출을 위해 build합니다.

```bash
npm run build
```

- css폴더에(변경가능) 트랜스파일링된 결과 css를 확인가능하며, 추출된 css를 html파일에 참조하고 테섭간 사용했던 스크립트 참조는 제거합니다.

```html
<!-- 번들된 css 참조, 테섭에서 사용하던 js참조는 제거 -->
<link rel="stylesheet" href="./css/sample.css">
```

- 정적으로 뽑혀진 결과물을 개발자에게 전달합니다.