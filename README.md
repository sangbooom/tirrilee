# 🧾 Assignment Test
> 3/31, 4/2, 4/3 진행

## 📚 사용 기술 스택
- react-native (typescript, 함수형 컴포넌트), react-navigation
- redux-toolkit, emotion.js
- firbase (auth, realtime database)


## 💭 처음 제플린을 보고 생각한 구조

### ui를 어떻게 구성해야 할까

로그인,회원가입은 스택네비게이션, 홈,상품목록,등록페이지,검색,마이페이지는 바텀탭 네비게이션, 그안에 페이지들은 중첩된 스택네비게이션으로 처리하려고 했다.

### 데이터 처리는 어떻게 할까

로그인, 회원가입, 자동로그인 등 인증에 관련된 것은 간단하게 파이어베이스를 사용해서 해결하고, 상품에 대한 데이터는 파이어베이스의 리얼타임 데이터베이스를 사용하거나, 컴포넌트 state에 목업데이터를 넣고 사용하면 되겠다.

### api 사용여부

redux-toolkit과 Asyncstorage or keychain이 필요하다 생각했다. rtk는 상태관리 위해서 storage는 사용자 토큰 저장을 위해서 (로그인후 통신할때 사용자인지 확인하기 위해, 자동로그인, 로그아웃, 회원탈퇴 용도)

api는 만들 필요없고, 사용자의 이름, 이메일, 사진, 등록상품, 찜목록 그리고 전체 등록상품를 저장 할 저장소만 있으면 될 것 같았다. 스토리지에 넣을지 데이터베이스에 저장할지 고민한 결과 파이어베이스 리얼타임 데이터베이스에 넣을 결정을 했다. 안전하고 인증부분은 편하기 때문이다.   

# 📅 3/31

### 진행상황
- 서비스 이해하기, 간단한 구조 설계,  프로젝트에 타입스크립트 적용

- 라이브러리 (react-navigation, redux-toolkit, emotion, react-native-firebase) 설치

- 구글 파이어베이스와 프로젝트 연동하기 ,네비게이션 적용

css는 빠르고 편하게 개발을 하기위해 짧은건 inline-style로 적용시켰음.    
react에서는 emotion이 nested selector도 되고 굉장히 생산성에 도움됐는데 react native에서는 nested selector가 적용이 안된다고 한다..   
[https://github.com/emotion-js/emotion/issues/1862](https://github.com/emotion-js/emotion/issues/1862)    

마진과 패딩은 아래적용으로 통일시켰다.  

사실 css 재사용 컴포넌트를 위해 나누려고 시도를 많이 했다가 nested selector가 적용이 안되는 것을 알고나서는 공통 컴포넌트의 css만 재사용했다.  

image를 불러오기 위해 

```jsx
<Image source={require('../../assets/image/header-logo@2x.png')}/>

// error: Error: Unable to resolve module ...
```

위와 같이 작성하면 에러가 난다.그 이유는 이미지이름에 @가 들어가 있어서였다.

이미지 이름을 header-logo-2x로 바꾸면 정상작동한다. 

디자인이 web디자인이여서 RN에 css를 적용하면 react-native에 적용되지않는 css때문에 시간이 오래걸렸다. font-stretch: normal, box-shadow, letter-spacing: normal 등 RN에 맞게 고쳐야하는데 일단은 다 주석 처리했다.

# 📅 4/2

### firebase auth 적용

firebase를 사용하여 이메일 비밀번호를 가지고서 빠르게 로그인, 자동로그인, 회원가입을 할 수 있어서 도입했다. 회원 이름이나 프로필 url, 상품 목록은 firebase realtime database에 넣으려고 한다.

### redux toolkit 도입

사실 상태관리를 안해도 될정도의 규모일 것 같아서 처음에는 적용을 안시켰다가 조금씩 커지는 규모에 그냥 redux를 사용해서 상품정도는 redux로 관리하자고 생각했다.

redux보다는 redux-toolkit을 사용하여 더 직관적이고 짧은 코드로 유지보수 용이하게 했다. redux-toolkit에 익숙하지않아 시간이 오래 걸렸다. 이전 프로젝트들은 ducks패턴에 컨테이너컴포넌트, 프레젠테이셔널 컴포넌트를 나눠 관심사를 분리시키고 props로 사용할 인자들을 일일히 다 넘겼었는데 redux-toolkit을 도입해보니까 훨씬 코드가 짧아지고 사용하기 편해졌다.

하지만 redux-toolkit의 createSelector는 아직 사용에 미숙해서 useSelector를 사용했다.

### 특이사항

```jsx
<Image source={require('../../assets/image/invalid-name.png')} />
<Image source={require('../../assets/image/id-pw.png')} />
<Image source={require('../../assets/image/oo.png')} />
```

제플린에 회원가입과 ID/PW 찾기가 이미지로 되어있길래 이미지로 하는 줄 알고 적용했다가 다시 고쳤다.

box-shadow를 적용시키기 위해

```jsx
style={{
  shadowColor: '#red',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}}
```

등 많은 방법을 적용시켜봤지만 잘 되지 않아 넘어갔다.

# 📅 4/3

## 구현 시나리오
파이어베이스 리얼타임 데이터베이스에 등록한 상품을 저장시킨다. 저장시킨 순간 상품목록을 업데이트 시키고 사용자들은 실시간으로 등록된 상품을 볼 수 있게 한다.   

상품 목록은 데이터베이스에서 상품데이터를 배열로 가져와 map으로 보여주고, flatList의 스크롤이 바닥에 닿을때 쯤 적당한 갯수의 상품 데이터를 불러오게한다.


### 특이사항

```jsx
<Tab.Navigator
...
screenOptions={({route}) => ({
  tabBarIcon: ({focused}) => {
    let imageName: any;
    if (route.name === '홈') {
      imageName = focused ? 'home-focused-3x' : 'home-3x';
    } else if (route.name === '상품목록') {
      imageName = focused ? 'product-focused-3x' : 'product-3x';
    } else if (route.name === '등록하기') {
      imageName = focused ? 'enroll-3x' : 'enroll-3x';
    } else if (route.name === '검색') {
      imageName = focused ? 'search-3x' : 'search-3x';
    } else if (route.name === '마이페이지') {
      imageName = focused ? 'mypage-focused-3x' : 'mypage-3x';
    }
    return (
      <Image
        source={require(`../../assets/image/${imageName}.png`)}
        style={{width: 32, height: 32}}
      />
    );
  },
})}
```

메인페이지에서 탭바 아이콘을 포커스했을때와 하지않았을때의 이미지를 다르게 하기 위해 중복되는 코드를 막으려 했으나 이미지에 동적 경로가 설정이 되지않아 그냥 컴포넌트마다 다 따로 붙여줬다

[https://stackoverflow.com/questions/48713580/set-image-name-from-obj-to-source-react-native](https://stackoverflow.com/questions/48713580/set-image-name-from-obj-to-source-react-native)

```jsx
<Tab.Navigator
...
<Tab.Screen
 name="홈"
 options={{
  tabBarIcon: ({focused}) =>
    focused ? (
      <Image
	source={require('../../assets/image/home-focused-3x.png')}
	style={{width: 32, height: 32}}
      />
    ) : (
      <Image
	source={require('../../assets/image/home-3x.png')}
	style={{width: 32, height: 32}}
      />
    ),
}}>
```

<br />

# 👩🏻‍💻 과제테스트를 하고 느낀점

일단 디자인을 보고 개발을 하니 혼자 해커톤 하는 것 같았다. 스스로 해결해보려고 많이 하다보니 사고의 폭이 넓어진 것 같다.

테스트 디바이스가 삼성 갤럭시 6 (360x640) 이다보니까 화면 크기가 맞지않아 css적으로 그에 맞게 고치다가 시간을 많이썼다. (에뮬레이터를 돌리면 성능이 좋지않아 디바이스로 테스트했음) 

개인적으로 css가 가장 어려웠다. 다른 기종에 맞게 반응형 고려, css 네이밍, 규칙 통일하는 연습부터 해야겠다. 

설계와 디자인에 대한 고민을 많이하다보니 개발속도가 매우 느렸다. 그래서 많은 기능들을 구현하지 못했다.

<br />

# 과제테스트가 끝나고 이어서 개발하기

## 💭 TextInput 안에 텍스트?

![image](https://user-images.githubusercontent.com/43921054/113576906-59efa500-965b-11eb-84b3-9844d173a3db.png)

위와같은 인풋창 안에 텍스트를 추가하기 위해선 단순하게 '원'이라는 텍스트를 `position:absolute`를 통해 원하는 위치에 두는 방법밖에 생각나지 않았다. 

시간을 두고 더 생각해본 결과, 단순히 View 안에 TextInput과 Text가 있는 구조라는 것을 깨달았다..

```jsx
<View
  style={css`
    width: 334px;
    height: 48px;
    flex-direction: row;
    padding: 14px 0 14px 12px;
    margin-bottom: 24px;
    border-radius: 8px;
    border: solid 1px #eaeaea;
  `}>
  <TextInput
    textAlignVertical="top"
    style={css`
      width: 288px;
      height: 20px;
      padding: 0;
    `}
    placeholder="가격 입력"
    placeholderTextColor="#bfbfbf"
  />
  <Text
    style={css`
      font-family: 'NotoSansKR-Regular';
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      color: #000000;
    `}>
    원
  </Text>
</View>
```

## 💭 Infinity Scroll 구현방법

> 데이터베이스에 20000만개의 상품이 등록 되어있다고 가정한다. flatList에서 1000개씩의 데이터를 꺼내오는 상황이다.

```jsx
useEffect(() => {
  setLoading(true);
  database()
    .ref('상품목록')
    .on('value', snapshot => {
      setProductList(snapshot.val().slice(beginIndex, endIndex));
      setBeginIndex(prev => prev + 1000);
      setEndIndex(prev => prev + 1000);
      setLoading(false);
    });
}, []);
```

처음에 `beginIndex`를 시작할 인덱스만큼, `endIndex`는 꺼내올 데이터의 갯수만큼 초기화를 시켜준다.

그 후에 `endIndex - beginIndex + 1`만큼 꺼내온 후에 다음 가져올 데이터의 수만큼 인덱스를 더해준다.


```jsx
<FlatList
  ...
  onEndReached={onEndReachedHandler}
  onEndReachedThreshold={0}
  ...
  data={productList}
  ...
```

그 후에 스크롤이 임계값 0(스크롤의 끝)에 도달하면 `onEndReachedHandler` 함수를 발생시켜서 

```jsx
const onEndReachedHandler = () => {
  setLoading(true);
  database()
    .ref('상품목록')
    .on('value', snapshot => {
      if (productList.length < beginIndex) {
        setLoading(false);
        return;
      }
      setProductList(
        productList.concat(snapshot.val().slice(beginIndex, endIndex)),
      );
      setBeginIndex(prev => prev + 1000);
      setEndIndex(prev => prev + 1000);
      setLoading(false);
    });
};
```

기존에 state가 가지고있던 데이터에 보여줄 데이터를 더해줘서 다시 화면에 렌더링하게 된다.
