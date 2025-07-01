# jq 플레이그라운드

JSON 데이터를 쉽게 처리하고 조작하는 방법을 배울 수 있는 jq 커맨드 튜토리얼 & 플레이그라운드입니다.

이 페이지는 `v0.dev`를 통해서 만들었습니다.

## 🚀 기능

- **인터랙티브 튜토리얼**: 기본 문법부터 고급 기능까지 단계별 학습
- **실시간 플레이그라운드**: JSON 데이터와 jq 쿼리를 입력하고 즉시 결과 확인
- **예제 모음**: 자주 사용되는 jq 패턴들을 원클릭으로 테스트
- **반응형 디자인**: 데스크톱과 모바일 모두 지원

## 🛠 기술 스택

- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 정적 타입 지원
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트 라이브러리
- **Radix UI** - 접근성을 고려한 UI 프리미티브

## 📦 개발 환경 설정

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/pierceh89/jq-playground.git
cd jq-playground

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 📁 프로젝트 구조

```
jq-playground/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   └── ui/               # shadcn/ui 컴포넌트들
├── .github/workflows/     # GitHub Actions
├── lib/                  # 유틸리티 함수
└── public/               # 정적 파일들
```

## 🎯 주요 학습 내용

### 기본 문법

- JSON 선택자 (`.`, `.users`, `.users[0]`)
- 배열 길이 조회 (`| length`)
- 속성 접근 (`.users[0].name`)

### 필터링

- 조건부 선택 (`select(.age > 30)`)
- 문자열 비교 (`select(.city == "Seoul")`)
- 불리언 필터 (`select(.inStock)`)

### 매핑 & 변환

- 배열 매핑 (`map(.name)`)
- 객체 선택 (`map({name, age})`)
- 값 변환 (`map(.price * 1.1)`)

### 고급 기능

- 그룹화 (`group_by(.city)`)
- 정렬 (`sort_by(.price)`)
- 중복 제거 (`unique`)

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 제공됩니다.

## 🔗 링크

- [Live Demo](https://pierceh89.github.io/jq-playground)
- [jq 공식 문서](https://jqlang.org/)
- [jq typescript 구현체](https://github.com/kentdotn/jqts)
- [Next.js 문서](https://nextjs.org/docs)
