# src/ds — 디자인 시스템 사본

[chakra-design-system](https://github.com/opensmartyouth-art/chakra-design-system) 의 `storybook/src/` 에서 **그대로 복사**한 파일이다. 여기서 고치지 않고, 바꿀 일이 있으면 원본을 고친 뒤 다시 복사한다.

- 복사한 날: 2026-10-13 (원본 `main`, 2026-10-12 기준)
- 토큰: `tokens/` 전체
- 컴포넌트: Button, Tag, Input, FormItem, FormLabel, PageHeader, Avatar(PageHeader 가 사용), CheckboxControl
- 에셋: 위 컴포넌트가 쓰는 아이콘·이미지만. 갤러리 전용 아이콘(검색·다운로드)은 `src/components/icons.tsx` 에 Material Symbols(Apache-2.0)를 직접 넣었다.
- Card·Checkbox 는 갤러리 용도에 맞지 않아 쓰지 않았다. Card 는 폭 260px·속성 목록이 고정이고, CheckboxControl 은 모양만 있어 `src/components/Checkbox.tsx` 로 클릭 기능을 붙였다.
