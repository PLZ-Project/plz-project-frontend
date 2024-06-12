import { atom } from 'jotai';
// jotai로 레이아웃 버튼의 상태를 만든다.
// 가로형 레이아웃과 세로형 레이아웃을 선택할 수 있고,
// 가로형이 true, 세로형이 false이다.

const layoutAtom = atom({
  layout: 'horizontal'
});

export default layoutAtom;
