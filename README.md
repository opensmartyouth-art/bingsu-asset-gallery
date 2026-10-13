# bingsu-asset-gallery
빙수 월드 투어 에셋 갤러리 — https://opensmartyouth-art.github.io/bingsu-asset-gallery/

React 19 + Vite + TypeScript. 화면은 [chakra-design-system](https://github.com/opensmartyouth-art/chakra-design-system)의 토큰과 컴포넌트로 만든다.

## 실행
```
npm install
npm run dev      # 개발 서버
npm test         # 필터 로직 테스트
npm run build    # dist/ 로 빌드
```

## 구조
| 위치 | 내용 |
| --- | --- |
| `assets/` | PNG·GLB 에셋 원본. 갤러리가 GitHub API 와 raw 주소로 읽는다 |
| `src/lib/assets.ts` | 에셋 목록 변환, 검색·국가 필터 (테스트 있음) |
| `src/hooks/useAssets.ts` | GitHub 에서 목록 읽기 |
| `src/components/`, `src/App.tsx` | 갤러리 화면 |
| `src/ds/` | 디자인 시스템에서 복사한 토큰·컴포넌트 ([출처](src/ds/README.md)) |

배포는 `main` 에 푸시하면 GitHub Actions 가 빌드해 Pages 로 올린다.
