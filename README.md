# css-preprocessor
webpack기반의 (SA/SC/C)SS 전처리 장치
  
## Install

```bash
npm i
```

## Extract assets files

```bash
npm run build
```

## Description
정적 페이지로 관리를 하는 마크업 프로젝트에 (SA/SC/C)SS를 전처리 시켜주는 webpack 기반의 번들러입니다.
SPA구조 등 모듈화된 프레임워크 기반의 프로젝트가 아닌 html, css, javascript를 정적으로 관리하여 사용하는 구조에서 (SA/SC/C)SS 전처리만을 도입하기 위할 경우 활용하시면 됩니다.

postcss 기능 활용이 가능하므로 적용하고 싶은 플러그인이 있다면 추가로 구성하셔도 무방합니다.

기존의 작업 폴더에 package.json과 webpack.config.js파일만 추가하여 간편히 구성 가능합니다.


## 작업 예시
- 다음과 같은 마크업 구조를 가진 프로젝트가 있다면

```bash
├── css
├── images
├── js
├── page1.html
└── page2.html
```

- 아래와 같이 src 폴더를 생성하고 하위에 images 폴더를 복사하여 넣어줍니다.
- scss폴더도 만들어 css폴더 하위의 파일들을 복사하여 넣어줍니다. (경로 수정가능)
- 트랜스파일링할 style파일은 (SA/SC/C)SS 어느것이든 상관없습니다.
- 기존 css파일을 그대로 가져와서 postCSS의 다양한 기능을 적용하여 추출할 수도 있고 scss파일로 확장자를 변경하고 특정 요소들을 변수화 하여 사용하는 등 원하시는 작업 방식대로 활용가능합니다.
- postCSS의 기본 설정은 autoprefix, cssnano, css-declaration-sorter가 적용되어 있습니다.

```bash
├── css
├── images
├── js
├── src
│   ├── scss
│   └── images
├── page1.html
└── page2.html
```

- webpack.config.js의 entry 설정을 통하여 추출될 css 파일명을 확인하시고 html에 참조 걸어줍니다.
- 기존의 css명을 그대로 유지하시면 html에 별도의 코드를 추가하실 필요가 없으며 css파일 한개당 하나의 scss파일을 entry 지정해주시면 됩니다.

```javascript
// webpack.config.js
...
entry: {
  sample: path.resolve(assetsBasePath, 'scss', 'sample.scss')
}
...
```

```html
<!-- 빌드 후의 html파일에 참조될 css -->
<link rel="stylesheet" href="./css/sample.css">
```

- 번들 작업을 수행 시 기존 폴더에 덮어씌워지게 되는 구조이므로 백업이 필요한경우는 트랜스파일링 전 파일들을 별도로 보관하시거나 형상관리 해 주시길 바랍니다.
- css에 참조된 file의 경우는 번들과정에서 탐지되어 처리됩니다만 html파일에 img 태그 등의 요소로 참조되어있는 경우는 탐지하지 못하므로 미사용 파일을 걸러내는 용도인 경우에는 별도로 처리하셔야 합니다.
- html을 포함한 번들링 및 테스트서버까지 제공해주는 기능을 원하실 경우에는 [markup-extractor](https://github.com/aldur-cat/markup-extractor "마크업 추출기")를 활용해 보세요.

```bash
npm run build
```

- css폴더에 트랜스파일링된 결과 css를 확인하고 html 파일을 열어 마크업이 온전히 추출되었는지 확인합니다.
- 이상이 없다면 결과물을 개발자에게 전달합니다.