# Modubuy

ModuBuy는 실시간 콘텐츠 편집 기능을 제공하는 혁신적인 전자상거래 플랫폼입니다.

**배포 링크**: https://modubuy.vercel.app/

## Description

ModuBuy는 사용자 친화적인 인터페이스와 강력한 실시간 콘텐츠 편집 기능을 통해 사용자에게 최상의 쇼핑 경험을 제공합니다. Next.js를 기반으로 하며, Sanity Content Studio를 통해 백엔드 콘텐츠 관리를 간편하게 할 수 있습니다.

## Authors

|                                                            성창수                                                            |
| :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/jsdmas/jsdmas.github.io/assets/105098581/e237b4f3-26f3-4a37-8818-86787f5d858b" width="160px" /> |
|                                       [🙎🏻‍♂️ FE 팀원 : 창수](https://github.com/scs0209)                                        |
|                                                                                                                              |

## Installation

ModuBuy를 시작하려면, repository를 클론하고 의존성을 설치하세요:

```bash
git clone https://github.com/scs0209/modubuy.git
cd modubuy
npm install
```

## Tech Stack

**Front-end**

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
- ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=Next.js&logoColor=white)
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-2088FF?logo=React%20Hook%20Form&logoColor=white)
- ![Framer-motion](https://img.shields.io/badge/-Framer--motion-0055FF?logo=Framer&-logoColor=white)
- ![Recharts](https://img.shields.io/badge/-Recharts-FF7300?logo=Recharts&logoColor=white)
- ![react-day-picker](https://img.shields.io/badge/-react--day--picker-FF7300?-logo=react-day-picker&logoColor=white)
- ![react-three-fiber](https://img.shields.io/badge/-react--three--fiber-20232A?logo=three.js&logoColor=white)
- ![react-three-drei](https://img.shields.io/badge/-react--three--drei-20232A?logo=three.js&logoColor=white)
- ![clsx](https://img.shields.io/badge/-clsx-0055FF?logo=clsx&logoColor=white)
- ![lucide-react](https://img.shields.io/badge/-lucide--react-47A3F3?logo=lucide-icons&logoColor=white)
- ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=TailwindCSS&logoColor=white)

**Back-end**

- ![Next-auth](https://img.shields.io/badge/-Next--auth-000000?logo=Next.js&logoColor=white)
- ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=Prisma&logoColor=white)
- ![bcrypt](https://img.shields.io/badge/-bcrypt-023047?logo=bcrypt&logoColor=white)
- ![nodemailer](https://img.shields.io/badge/-nodemailer-007BFF?logo=nodemailer&logoColor=white)
- ![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=Stripe&logoColor=white)

**Testing & Code Quality**

- ![eslint](https://img.shields.io/badge/-eslint-4B32C3?logo=eslint&logoColor=white)
- ![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=Prettier&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white)

**Utilities**

- ![date-fns](https://img.shields.io/badge/-date--fns-2D3748?logo=date-fns&logoColor=white)
- ![clsx](https://img.shields.io/badge/-clsx-0055FF?logo=clsx&logoColor=white)
- ![zustand](https://img.shields.io/badge/-zustand-FF7300?logo=zustand&logoColor=white)
- ![zod](https://img.shields.io/badge/-zod-007BFF?logo=zod&logoColor=white)
- ![use-shopping-cart](https://img.shields.io/badge/-use--shopping--cart-2D3748?logo=use-shopping-cart&logoColor=white)

## Implemented Features

- 로그인 및 회원가입
- 사용자 프로필 페이지
- Stripe 결제 시스템
- 관리자 대시보드
- 데이터 시각화
- 상품 상세 페이지
- 쇼핑 카트 기능
- 상품 좋아요 기능

## Feature Details

1. 로그인 및 회원가입
   `next-auth`를 사용하여 안전하고 빠른 인증 절차를 구현하였으며, 사용자 인증 상태 관리와 폼 제출 및 유효성 검사는 `react-hook-form`을 통해 처리됩니다

2. 유저 상세 페이지
   유저 상세 페이지에서 사용자는 자신의 정보를 수정하고, 구매한 제품 내역 및 좋아요를 누른 제품 내역을 볼 수 있습니다.

3. 랜딩 페이지
   랜딩 페이지는 `react-three-fiber`와 `react-three-drei` 라이브러리를 사용하여 3D 모델을 렌더링합니다. 또한, `framer-motion` 라이브러리를 사용하여 페이지 로딩 시 애니메이션 효과를 Hero 섹션에 추가하여 사용자에게 인터랙티브환 경험을 제공합니다.

4. 카테고리 페이지
   카테고리 페이지는 콘텐츠 관리 시스템인 `sanity.io`에서 데이터를 가져와 사용합니다. 각 제품은 그리드 형식으로 표시되며, 제품 이미지, 이름, 카테고리, 가격 등의 정보를 포함합니다. 사용자가 특정 카테고리를 선택하면 해당 카테고리에 속하는 제품들만 보여지도록 구현되어 있습니다.

5. 상품 상세 페이지
   상품 상세 페이지에는 좋아요 기능과 리뷰 기능이 포함되어 있으며, 사용자가 리뷰를 남길 때 평점도 함께 제공합니다. 이 평점의 평균값과 좋아요 개수는 숫자로 표시됩니다. 상품 이미지는 Sanity.io를 통해 관리되고 있습니다. - 좋아요 기능
   사용자가 좋아요 버튼을 클릭하면, 해당 상품에 대한 좋아요 상태를 토글하고, 좋아요 개수를 업데이트합니다. - 리뷰 및 평점 기능
   리뷰 기능은 사용자가 제품에 대한 평가를 남길 수 있게 하며, 이때 평점 정보도 함께 수집됩니다.

6. 결제 페이지
   Stripe API를 통합하여 안전하고 신뢰할 수 있는 결제 시스템을 구축하였습니다. 사용자는 손쉽게 결제를 진행할 수 있으며, 모든 거래는 Stripe의 강력한 보안 프로토콜을 통해 보호받습니다. 이뿐만 아니라, Stripe 웹훅을 사용하여 결제 상태를 실시간으로 확인하고, 사용자의 결제 정보를 데이터베이스에 업데이트하도록 구성되어 있습니다. - 성공 페이지
   결제가 성공적으로 완료되면 StripeSuccess 컴포넌트가 성공 메시지를 표시합니다. - 실패 페이지
   결제 과정에서 문제가 발생하면 ErrorStripe 컴포넌트가 에러 메시지를 렌더링합니다.

7. Admin 페이지 대쉬보드
   관리자 대시보드를 통해 사이트 운영자는 사용자 활동, 매출, 그리고 기타 중요한 데이터를 한눈에 파악할 수 있습니다. 대시보드는 실시간으로 업데이트되어 최신 정보를 제공합니다.

대시보드 내에서는 `recharts` 라이브러리를 활용하여 데이터를 시각화합니다. 매출, 사용자 수, 거래량 등의 데이터가 바 차트 형태로 표현되어, 직관적인 분석이 가능합니다. 이를 통해 관리자는 비즈니스 인사이트를 얻고 전략적인 의사결정을 내릴 수 있습니다.

8. 커스텀 에러 페이지

잘못된 url에 들어가면 홈으로 돌아가는 에러페이지를 구현했습니다.

## ❤ git commit message 컨벤션

| 커밋 유형 | 의미                       |
| --------- | -------------------------- |
| feat      | 새로운 기능 추가           |
| fix       | 버그, 기능 수정            |
| Docs      | 문서 수정                  |
| style     | 스타일 코드 추가           |
| refactor  | 코드 리팩토링              |
| chore     | 기능과 관련 없는 내용 수정 |

---
