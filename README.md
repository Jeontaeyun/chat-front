# 웹 소켓을 이용한 채팅 어플 - 클라이언트

## 01. 프로젝트 개요

### (01) 프로젝트 목적

 해당 프로젝트는 HTML5에서 지원하는 웹 소켓 모듈을 사용하며 채팅 어플을 구현하기 위한 프로젝트의 클라이언트(프론트엔드)부분 입니다.   
 해당 프로젝트의 목적은 리액트에 SASS를 적용해서 프로젝트를 구성하는 방법을 연습하고, 자체적인 리액트 컴포넌트를 설계해보기 위한 프로젝트입니다.

- 리액트 프로젝트를 초기에 설정하는 방법을 연습.

- 스스로 구현하는 React Component를 설계.

- story-book 환경을 이해하여 React-Component를 단위별로 설계하는 법 숙달.

 ### (02) 프로젝트 아키텍쳐

 - **Language** : JavaScript
 - **View Framework** : React.js
 - **State Management** : Redux.js
 - **Component Dev Environment** : story-book

 ### (03) 프로젝트 리스트

 - [x] 프로젝트 초기 설정 및 git 설정
 - [x] 프로젝트 개발 리스트 작성 및 README.md 프로젝트 정리
 - [x] 개발 환경 설정 및 기본 개념 습득
 - [x] storybook 환경 구현하기
 - [x] 채팅방 컴포넌트 구현하기
 - [x] 컴포넌트를 사용해 실제 채팅방 구현하기
 - [x] 웹 소켓 모듈(Socket.io)를 이용해 서버에서 데이터 호출하기
 - [X] 프로젝트 고찰 및 피드백

 ## 02. 프로젝트 이론

 ### (01) 스토리북 사용하기

  리액트를 이용해서 프로젝트를 진행할 때마다 컴포넌트의 디자인을 하나 띄워두고 매번 수정하고 하는 작업을 반복해야 했다.  
  이럴 경우 파일 간 이동이 잦아져 어떻게 하면 컴포넌트를 하나의 요소로서 관리할 수 있을까에 대한 고민을 시작했다. 
  개발자 커뮤니티에서 사람들과 이야기 하는 도중 이런 문제를 해결해주는 솔루션으로 스토리북이라는 툴이 있다는 것을 확인하고 이번 프로젝트에 적용해 보도록 하였다.

#### 01) 스토리북이란?

 스토리북을 학습하기 이전에 스토리북에 대한 학습은 [리액트 스토리북(React Storybook)을 통한 컴포넌트 개발과 활용 방법](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-react-storybook-%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B3%BC-%ED%99%9C)과 [Naver D2의 Say Hello to Storybook: 스토리 북을 통한 React UI 컴포넌트 개발](https://www.youtube.com/watch?v=jc9xKzdkYDg&t=741s)의 글을 통해서 학습했다. 

 - Normalize
 
 - Modularization [모듈화]

 - Isolated [독립된 환경]
 
 스토리북은 UI컴포넌트를 위한 간단한 scaffollder(플랫폼, 환경) 이자 UI 테스팅 툴입니다. 

즉, 리액트 스토리북은 UI 컴포넌트를 직접 보면서 개발을 할 수 있는 환경을 제공하는 툴이다.  
이를 활용하면 개발자 뿐 아니라, **기획자나 디자이너와 같은 팀과 협업 구조에서 원활한 커뮤니케이션이 가능하고 빠른 진행이 가능하다는 점에서 개발 생산성 향상 효과가 생길 수 있다.**

특히, 스토리 북은 수 많은 엘레멘트들이 생기고 이걸 **모듈화** 하려고 노력할 때 도움이 된다.


구분           | 설명
----------    | -------------------------------------------------------------
Manager App   | 모든 스토리가 나열되는 곳. 여기서 선택된 스토리를 시각적으로 확인할 수 있습니다.
Preview Panel | 매니저 앱에서 선택된 스토리(컴포넌트)가 렌더링 되어 보여지는 곳
Add-on Panel  | 다양한 애드온을 통해 컴포넌트와 인터렉션을 하거나 컴포넌트 정보등을 보여주는 곳으로 기본 설치시 Action Logger 패널이 추가되어 있다.

- 스토리북의 가장 큰 장점은 애드온 기능을 통해 다양한 기능을 플러그인으로 추가할 수 있다는 것이다.

#### 03) 스토리북 시작하기

```bash

$sudo npm i -g @storybook/cli               // 스토리 북 CLI환경 전역 설치
$getstorybook                               // 스토리 북 환경 설정
$yarn storybook                             // 스토리 북 실행 명령어

```
[스토리 기본 설정]

```javascript

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('ChattingRoom', module).add('to unlogin', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

```

 또한, create-react-app 으로 프로젝트를 생성했을 경우에 ```sb init``` 명령어를 통해서도 스토리북 환경을 생성할 수 있다.

 **다만, 스토리북에서 SASS를 적용하는 방법을 찾지 못해서 styled Component를 통해서 디자인을 구현하였다.**  
 다음 프로젝트에서는 SASS를 적용하도록 해봐야겠다.

 구분          | 설명 
 ------------ | -----------------------------------------------------------------------------------
 storiesOf()  | 컴포넌트를 감싸하는 함수, storiesOf('componentName', module)
 add()        | 스토리를 추가하는 함수, add('storyName',() => {<Component/>})

#### 04) 스토리북의 장점

01. Component를 독립된(Isolated) 환경에서 개발

02. webpack과 addon을 통해 storybook과 Interactive 한 개발

03. 깔끔하고 모듈화된 View의 강제성 - Clean코드와 재사용성 증가

04. 쉽고 빠른 Deploy와 협업

#### 05) 스토리북의 워크플로우

01. Define Behavior Flow / Possible states

- 유저 행동을 정의하고 화면별로 컴포넌트별로 동작될 모든 사용자 행동을 정의하고, 가능한 state를 설계한다.

02. Stories First

- 앞선 단계에서 기획한 페이지를 바탕으로 작은 컴포넌트를 Atomic 디자인 패턴으로 작은 단위 부터 구상하여 설계한다.

03. Embody atoms, pages, flows in story

04. Happy Coding + Continuous Storybook

05. Storyshot을 통한 UI 테스트

#### 06) 스토리북에서 정적 파일 제공하기

- 스토리북에서 정적 파일을 사용하기 위해서는 스크립트를 다음과 같이 바꾸면 된다.

```javascript
  "storybook": "start-storybook -s ./public -p 6006"
```

- 스토리북 CLI 명령어에서 -s는 퍼블릭 파일을 설정하는 옵션이다. 

### (02) Socket.io-client

 클라이언트 측에서 Socekt.io를 이용한 통신을 위해서는 **socket.io-client**라는 자바스크립트 패키지를 이용해야 합니다. 기본적인 Socket.io-client의 사용법을 위해 테스트해 본 코드는 다음과 같습니다.

 ```javascript

import React, {Component} from 'react';
import styles from './index.scss';
import classNames from 'classnames/bind';
import io from 'socket.io-client';

const cx = classNames.bind(styles);
class ChattingRoom extends Component {
    componentDidMount(){
        // socket.io-client모듈을 받아 io.connect를 통해 socket을 만들어 줍니다.
        const socket = io.connect('http://localhost:8000', {
            path: '/socket.io'
        });
        socket.on('news', (data) => {
            console.log(data);
            socket.emit('reply', 'Hello Node.JS');
        });
    };   
    render(){
        return(
            <>
                <div>안녕하세요</div>
            </>
        );
    }
};

export default ChattingRoom;

 ```

 ### (03) React-dnd 라이브러리

 리액트를 사용하여 드래그 앤 드랍 기능을 사용하기 위한 라이브러리 먼저 다음과 같은 패키지를 설치 해야 한다.

 ```bash
 $npm install --save react-dnd
 $npm install --save react-dnd-html5-backend
 ```

 ## 03. 프로젝트 Directory 

 구분       | 설명 
 ----------| --------------------------------------------------------------------------------------------------
 components| 프로젝트의 컴포넌트들을 보관하는 디렉토리
 pages     | 컴포넌트를 모아 구현한 페이지를 보관하는 디렉토리
 sotires   | 리액트 스토리북을 사용하기 위해 스토리를 추가하는 디렉토리

 ## 04. 프로젝트 고찰 

 ### (01) 리액트 스토리북과 스타일드 컴포넌트 사용

 이번 프로젝트를 진행하면서 스토리북을 사용하기 위해 SASS의 사용을 접어두고 Styled Component를 사용하기로 했다.  
왜냐하면 스토리북에서 SASS를 사용하기 위해서는 몇 가지 설정을 해야하기 때문이다.  
이런 설정은 나중에 하고 이번 프로젝트에서는 스토리북의 기능에 집중하며 부수적으로 스타일드 컴포넌트 방식을 사용해보기 위해 두 가지 스택을 선택하였다.

 해당 기능들을 이용해서 컴포넌트 디자인을 해 본 결과 컴포넌트 단위별로 작업을 하는데 효과가 좋다는 것을 알았다.   
 보통 개발자는 개발을 하기에 앞서 전체 페이지부터 작업을 할 것인가, 컴포넌트 단위로 작업을 할 것인가 하는 디자인 패턴이 있다. 

네이버 D2 개발자분의 강의를 보면 **Atomic Design 패턴**이라는 것이 나온다.  
UI를 디자인할 때 매우 작은 컴포넌트 단위부터 컴포넌트를 조합해서 커다란 페이지를 만들어가는 디자인 패턴을 말한다.  

> 복잡하고 대단한 것은 간단하고 단순한 것들을 꾸준히 쌓아서 이루어진다.

위의 생각에 전적으로 공감하는 나에게 Atomic Design Pattern은 아주 마음에 드는 개발 방식이었고, 높은 재사용성과 협업을 중요시하는 나에게 해당 개발 방식은 효과적이었다. 다만, 스토리북이 마냥 편한 것 만은 아니었다. 

스토리북은 웹팩의 기능을 지원하기 때문에 별도의 로더와 플러그인을 설정해주어야 한다는 점에서 웹팩에 대한 높은 이해도가 필요하다는 것을 알았다.  
또한, 스토리북을 통해서 작업을 할 시에 컴포넌트 단위로 구체적으로 개발하기 때문에 시간이 많이든다는 단점이 있다.


스토리북 장점                   |  스토리북 단점
---------------------------- | -----------------------------------------------
디자이너, 기획자와 협업에 적합      | 컴포넌트 단위로 작성하기에 초반 작성 시간이 오래걸림
시각화를 통해 컴포넌트 단위 설계 가능 | 별도로 웹팩을 설정해주어야 하기에 웹팩에 대한 이해 필요
UX/UI 단위로 배포 및 문서화 가능   | 

 ### (02) Drag and Drop 기능

 해당 프로젝트를 진행하면서 의도하지 않게 Trello를 사용하다 든 궁금증을 해결하게 되었다.   
 채팅방을 설계하면서 카카오톡과 페북 메세지 등의 벤치마킹 대상을 보고 트렐로와 깃북을 사용하면서 최근 웹 설계에 **드래그 앤 드랍 기능**을 통한 UX가 자연스럽게 동작하는 것을 확인할 수 있었다. 

 따라서, 해당 채팅 메신저를 구현할 때 이 기능을 도입해서 채팅방 간의 우선순위 및 배치를 좀 더 자유롭게 할 수 없을까 하는 생각을 하였다. 해당 생각의 근거는 다음과 같다.

 01. 최신 메신저의 패러다임은 최근에 온 카톡을 맨 우선적으로 위로 보이게 한다. 하지만, 사람들은 보고싶은 카톡은 보는데 보기 싫은 카톡이 위로 뜨는 것을 싫어한다.

 02. 나만의 우선 순위를 통한 배치가 현재는 상위 고정(핀기능) 기능을 통해서 이루어지고 있다.

 03. 하지만 상위 고정된 것 끼리는 우선 순위를 바꿀 수 없는 것 같다.

 04. 따라서, 드래그 앤 드랍 기능을 통해 채팅방의 우선 순위를 자유자재로 할 수 있다면 좋을 것 같다.

해당 기술을 조사하는 도중에 HTML5부터는 Drag and Drop기능을 지원한다는 사실을 알게 되었다.  
먼저 엘레멘트에 다음과 같은 설정을 하면 된다.

```HTML
  <img draggable="true">
```
해당 기능을 표로 정리하면 다음과 같다.

구분                          | 설명
---------------------------- | --------------------------------------------------------------------------------------------------
draggable                    | 해당 엘레먼트가 드래그가 되도록 할 것인지 아닌지를 정하는 태그 속성
ondragstart                  | 드래그가 시작되었을 때 발생하는 이벤트, 이벤트 객체(e)를 반환한다.
ondragover                   | 드래그 한 엘레멘트가 특정 장소에 over되었을 때 드랍이 가능한지 여부로 발생하는 이벤트. 해당 엘레멘트에 이벤트를 설정해야한다.
ondrop                       | 드래그한 데이터가 드랍되었을 때 발생하는 이벤트
event.dataTransfer.setData() | 드래그 한 데이터를 이벤트 객체에 저장하는 메소드
event.dataTransfer.getData() | 드랍 한 데이터를 이벤트 객체에서 불러오는 메소드
event.preventDefault()       | 드랍이 가능하도록 해주는 메소드

 리액트나 프레임워크에서 드래그앤 드랍을 손 쉽게 구현하는 방법이 많다.  
**하지만, 해당 동작이 어디서 지원하는지, 그리고 그 원리는 어떻게 되는지 이해를 하고 사용하는 것이 다음에 비슷한 UI가 나왔을 때 빠르게 적용할 수 있기에 해당 기능을 이해해 두도록 하였다.**

 트렐로와 비슷한 드래그앤 드랍을 구현하기 위해서 구글에 trello like drag and drop이라는 키워드를 입력했다.  
하지만 자료를 조사하는 도중에 React를 이용하여 drag and drop을 구현하기 위해서는 React-dnd 라이브러리를 사용하는 것이 러닝커브를 낮추는데 효과적일 것 같았다.

 따라서 [React Drag and Drop Example](https://www.youtube.com/watch?v=930JPFaKg-s) 강의를 통해서 원하는 기능을 구현하였다.

 언젠가, 내가 프레임워크에 벗어나서 구현을 진행해보도록 해 보도록 해야겠다. 다만, 해당 프로젝트의 초점은 스토리 북 사용이기에 시간을 더 이상 투자하지 않을 것이다.

- 이번 프로젝트에서는 드래그 앤 드랍을 그저 추가만 해 볼 것이다.

- 언젠가 드래그 앤 드랍을 활용한 애플리케이션 프로젝트를 진행해보도록 하자.  

 ### (03) 렌더링 최적화 - 프론트엔드 성능 개선

  해당 프로젝트를 진행하면서 배열을 사용하여 chats을 구성할 때 chat 데이터가 발생할 때 마다 렌더링이 되므로 데이터가 8개 쌓일 때 마다 렌더링에 심각한 에러가 발생하는 것을 확인할 수 있었다. 

  리액트에서 렌더링 성능 최적화라는 개념을 배웠을 당시에는 이 부분에 대해서 신경 쓸 겨를이 없었지만 채팅방이 더 자연스럽기 위해서는 데이터 변동에 따른 렌더링이 최소화 되어야 한다는 것을 확인하였다.  
  이 부분을 어떻게 해결할 지에 대해 고민해봐야겠다.

  리액트에서 불필요한 렌더링을 막는 방법은 첫번째로, 라이프사이클의 shouldComponentUpdate(nextProps, nestState)를 사용하여 특정 값이 바뀔 때에만 렌더링 해주는 방법이 있다.   
  이런 방법은 리스트형 컴포넌트를 렌더링할 때 많이 사용 하며 예시는 다음과 같다.

  ```javascript
import React, { Fragment, Component } from 'react';
import ChatBox from '../../UI_Components/ChatBox';

class ChatBoxRender extends Component {
	// 리스트 형 컴포넌트일 때 이처럼 shouldCOmponent를 통해서 리액트 렌더링 최적화를 할 수 있다.
	// 리스트 형 컴포넌트를 렌더링 해주는 설계를 할 때 리렌더링 최적화가 반드시 필요하다.
	// 리스트가 적다면 모르지만 수백, 수천개 일 때 렌더링 이슈가 생긴다.
	// 리액트 훅스가 있어도 클래스형을 써야하는 이유이다.
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.description !== this.props.description;
	}
	render() {
		return (
			<Fragment>
				<ChatBox {...this.props} />
			</Fragment>
		);
	}
}

export default ChatBoxRender;

  ```

  이렇게 ChatBox의 내용이 변할 때만 렌더링을 다시한다는 조건으로 리스특의 값 업데이트 될 때마다 다시 렌더링 되는 것을 막아주어 렌더링 최적화를 할 수있다.

  다만, 리액트 훅을 자주 쓰는 나로써는 shouldComponentUpdate를 훅 문법으로 사용할 수 없을지 찾아보고 있다. 이후 React.memo를 이용하여 함수형 훅을 사용할 때 렌더링 최적화를 진행할 수 있었다.

  ```javascript

const RoomPage = (props) => {
	const autoScroll = useRef(null);
	const { chats } = props;
	useEffect(
		() => {
			const { scrollHeight, clientHeight } = autoScroll.current;
			if (clientHeight < scrollHeight) {
				autoScroll.current.scrollTop = scrollHeight - clientHeight;
			}
		},
		[ chats ]
	);
	const ChatBoxRender = React.memo((props) => <ChatBox {...props} />);
	const chatList = useMemo(
		() => {
			return chats.map((chat, idx) => <ChatBoxRender key={idx} description={chat} />);
		},
		[ chats ]
	);
	return (
		<Fragment>
			<Container ref={autoScroll}>{chats && chatList}</Container>
		</Fragment>
	);
};
export default RoomPage;

  ```

  Hooks를 쓰는 방법이 더 코드가 간결해서 이 방법을 채택했다.

  구분  | 설명 
  ---- | -------------------------------
  React.memo | 기본적으로 HOC로 동일한 입력값이 발생할 때 재실행 되지 않게 해서 최적화를 도와준다. shallow(얇은) 비교를 통해서 props값에 변화가 있을 때만 리렌더링합니다. 첫 번째 인자에 컴포넌트를 지정하고, 두 번째 인자로 비교함수를 지정할 수 있습니다.

  ## 05. 그 외 에러 및 생각

  ### (01) git config --global user.email 

   그 동안 git config --global user.email에 잘못된 이메일 주소를 넣어서 깃허브의 내 커밋이 기록되지 않았다. 깃허브가 나의 작업량을 통계해주는 포트폴리오가 될 수도 있기에 이부분을 신경 쓰는 것이 개발자로서 퍼스널 브랜딩을 만드는 데 중요하다. 깃 설정을 바꾸는 방법은 다음과 같다.

   ```bash
  $git config --global user.email "수정된 이메일"
   ```

   ### (02) TDD에 대한 생각

   해당 프로젝트에 스토리북을 도입하면서 TDD라는 Test Driven Develope에 대해 알게되었다. 즉, 테스트 툴을 사용하여 특정 테스트가 통과되는 최소한의 코드를 작성한 후 나머지 개발을 진행하는 방법이다.

   이 방법은 다소 시간이 오래걸릴 수 있지만, 대규모 프로젝트에서 여러 사람이 함께 컴포넌트, 함수 등을 작성할 때 서로의 코드간 호환성을 높여줄 수 있다.

   만약, 서로 최소한의 기능을 맞추는 동작을 한다는 가정하에 특정부분에 문제가 발생한다면, 그 부분은 

