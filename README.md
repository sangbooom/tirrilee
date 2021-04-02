## 💭 처음 제플린을 보고 생각한 구조

## ui를 어떻게 구성해야 할까

로그인,회원가입은 스택네비게이션, 홈,상품목록,등록페이지,검색,마이페이지는 바텀탭 네비게이션, 그안에 페이지들은 중첩된 스택네비게이션으로 처리하려고 했다.

## 데이터 처리는 어떻게 할까

로그인, 회원가입, 자동로그인 등 인증에 관련된 것은 간단하게 파이어베이스를 사용해서 해결하고, 상품에 대한 데이터는 파이어베이스의 리얼타임 데이터베이스를 사용하거나, 컴포넌트 state에 목업데이터를 넣고 사용하면 되겠다.

## api 사용여부

redux-toolkit과 Asyncstorage or keychain이 필요하다 생각했다. rtk는 상태관리 위해서 storage는 사용자 토큰 저장을 위해서 (로그인후 통신할때 사용자인지 확인하기 위해, 자동로그인, 로그아웃, 회원탈퇴 용도)

api는 만들 필요없고, 사용자의 이름, 이메일, 사진, 등록상품, 찜목록 그리고 전체 등록상품를 저장 할 저장소만 있으면 될 것 같았다. 스토리지에 넣을지 데이터베이스에 저장할지 고민한 결과 파이어베이스 리얼타임 데이터베이스에 넣을 결정을 했다. 안전하고 인증부분은 편하기 때문이다.

# 3/31

서비스 이해하기, 간단한 구조 설계,  프로젝트에 타입스크립트 적용

라이브러리 (react-navigation, redux-toolkit, emotion, react-native-firebase) 설치

구글 파이어베이스와 프로젝트 연동하기 ,네비게이션 적용

css는 빠른 개발을위해 inline-style로 적용시켰음. react에서는 emotion이 nested selector도 되고 굉장히 생산성에 도움됐는데 react native에서는 nested selector가 적용이 안된다고 한다..
[https://github.com/emotion-js/emotion/issues/1862](https://github.com/emotion-js/emotion/issues/1862) 

마진과 패딩은 아래적용으로 통일시켰다.

사실 css 재사용 컴포넌트를 위해 나누려고 시도를 많이 했다가 nested selector가 적용이 안되는 것을 알고나서는 공통 컴포넌트의 css만 재사용했다. 

image를 불러오기 위해 

```jsx
<Image source={require('../../assets/image/header-logo@2x.png')}/>
```

위와 같이 작성했더니 에러가 났다.

```jsx
error: Error: Unable to resolve module ...
```

그 이유는 이미지이름에 @가 들어가있어서였다.

이미지 이름을 header-logo-2x로 바꾸면 정상작동한다. 이런건 디자이너와 커뮤니케이션을 통해 저장할때 @기호를 빼달라고 요청하는게 좋을것같다.

제플린에 있는 css를 적용하면 react-native에 적용되지않는 css때문에 시간이 오래걸렸다. font-stretch: normal, box-shadow, letter-spacing: normal 등 RN에 맞게 고쳐야하는데 일단은 다 주석 처리했다.. 그리고 font는 구글폰트를 다운받아 적용했는데 적용이 잘안돼서 일단 넘어갔다.. css만 적용하는것도 시간이 오래걸렸기때문이다..
