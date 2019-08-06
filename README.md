# 웹 소켓을 이용한 채팅 어플 - 클라이언트

## 01. 프로젝트 개요

### (01) 프로젝트 목적

 해당 프로젝트는 HTML5에서 지원하는 웹 소켓 모듈을 사용하며 채팅 어플을 구현하기 위한 프로젝트의 클라이언트(프론트엔드)부분 입니다. 해당 프로젝트의 목적은 리액트에 SASS를 적용해서 프로젝트를 구성하는 방법을 연습하고, 자체적인 리액트 컴포넌트를 설계해보기 위한 프로젝트입니다.

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
 - [ ] 채팅방 컴포넌트 구현하기
 - [ ] 컴포넌트를 사용해 실제 채팅방 구현하기
 - [ ] 웹 소켓 모듈(Socket.io)를 이용해 서버에서 데이터 호출하기
 - [ ] 프로젝트 고찰 및 피드백

 ## 02. 프로젝트 이론

 ### (01) 스토리북 사용하기

  리액트를 이용해서 프로젝트를 진행할 때마다 컴포넌트의 디자인을 하나 띄워두고 매번 수정하고 하는 작업을 반복해야 했다. 이럴 경우 파일간 이동이 잦아져 어떻게 하면 컴포넌트를 하나의 요소로서 관리할 수 있을까에 대한 고민을 시작했다. 개발자 커뮤니티에서 사람들과 이야기 하는 도중 이런 문제를 해결해주는 솔루션으로 스토리북이라는 툴이 있다는 것을 확인하고 이번 프로젝트에 적용해 보도록 하였다.

#### 01) 스토리북이란?

 스토리북을 학습하기 이전에 스토리북에 대한 학습은 [리액트 스토리북(React Storybook)을 통한 컴포넌트 개발과 활용 방법](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-react-storybook-%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B3%BC-%ED%99%9C)과 [Naver D2의 Say Hello to Storybook: 스토리 북을 통한 React UI 컴포넌트 개발](https://www.youtube.com/watch?v=jc9xKzdkYDg&t=741s)의 글을 통해서 학습했다. 

 - Normalize
 
 - Modularization [모듈화]

 - Isolated [독립된 환경]
 
 스토리북은 UI컴포넌트를 위한 간단한 scaffollder 이자 UI 테스팅 툴입니다. 

즉, 리액트 스토리북은 UI 컴포넌트를 직접 보면서 개발을 할 수 있는 환경을 제공하는 툴이다.
이를 활용하면 개발자 뿐 아니라, 기획자나 디자이너와 같은 팀과 협업 구조에서 원활한 커뮤니케이션이 가능하고 빠른 진행이 가능하다는 점에서 개발 생산성 향상 효과가 생길 수 있다.

특히, 스토리 북은 수 많은 엘레멘트들이 생기고 이걸 모듈화 하려고 노력할 때 도움이 된다.


구분           | 설명
----------    | -------------------------------------------------------------
Manager App   | 모든 스토리가 나열되는 곳. 여기서 선택된 스토리를 시각적으로 확인할 수 있습니다.
Preview Panel | 매니저 앱에서 선택된 스토리(컴포넌트)가 렌더링 되어 보여지는 곳
Add-on Panel  | 다양한 애드온을 통해 컴포넌트와 인터렉션을 하거나 컴포넌트 정보등을 보여주는 곳으로 기본 설치시 Action Logger 패널이 추가되어 있다.

- 스토리북의 가장 큰 장점은 애드온 기능을 통해 다양한 기능을 플러그인으로 추가할 수 있다는 것이다.

#### 03) 스토리북 시작하기

```bash

$sudo npm i -g @storybook/cli               // 스토리 북 CLI환경 전역설치
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

 **다만, 스토리북에서 SASS를 적용하는 방법을 찾지 못해서 styled Component를 통해서 디자인을 구현하였다. 다음 프로젝트에서는 SASS를 적용하도록 해봐야겠다.**

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

 ## 03. 프로젝트 Directory 

 구분       | 설명 
 ----------| --------------------------------------------------------------------------------------------------
 components| 프로젝트의 컴포넌트들을 보관하는 디렉토리
 pages     | 컴포넌트를 모아 구현한 페이지를 보관하는 디렉토리
 sotires   | 리액트 스토리북을 사용하기 위해 스토리를 추가하는 디렉토리

 ## 04. 프로젝트 고찰 

 ### (01) 리액트 스토리북과 스타일드 컴포넌트 사용

 이번 프로젝트를 진행하면서 스토리북을 사용하기 위해 SASS의 사용을 접어두고 Styled Component를 사용하기로 했다. 왜냐하면 스토리북에서 SASS를 사용하기 위해서는 몇 가지 설정을 해야하기 때문이다. 이런 설정은 나중에 하고 이번 프로젝트에서는 스토리북의 기능에 집중하며 부수적으로 스타일드 컴포넌트 방식을 사용해보기 위해 두 가지 스택을 선택하였다.

 해당 기능들을 이용해서 컴포넌트 디자인을 해 본 결과 
 