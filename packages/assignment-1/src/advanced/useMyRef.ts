import { useMemo } from "react"

export function useMyRef<T>(initValue: T | null) {

  const ref = useMemo(()=>{
    return { current: initValue };
  },[])

  return ref;
}

// 같은 메모리의 참조타입을 반환하지 않는다.
// 그럼 지금 문제는 리렌더링 버튼을 누를때마다 계속 새로운 객체를 반환한다는 건데,
// useMyRef는 함수. 함수는 실행될때마다 새로운 실행컨텍스트가 생성되기 때문에
// 그 안의 객체도 같은 값이여도 새로운 주소의 객체를 반환한다.
// 리렌더링 될때 메모이제이션 훅들로 다른 메모리로 객체를 생성하지 못하게 막아야 하나..?

// useMemo를 사용하면 계산된값을 캐싱을 하기때문에 의존성 배열의 값이 바뀔때까지 같은 메모리 참조를 한다.
// useRef는 .current 값을 바꿔도 항상 같은 메모리의 객체를 반환한다.
// 이 커스텀훅에도 동일하게 해주기 위해서 의존성 배열을 비운다.
// 의존성 배열을 비우면 다시 계산해야될 기준이 없기때문에
// 처음 렌더링 되었을때 계산된 값을 어떤 메모리에 값을 저장하고 그 뒤에는 동일한 메모리를 참조한다.
// 그러면 객체내부의 값은 바뀌어도 동일한 메모리를 참조해서 useRef와 비슷하지 않을까...?