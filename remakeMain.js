const vertical = document.querySelector('.vertical')
const horizontal = document.querySelector('.horizontal')
const target = document.querySelector('.target')
const tag = document.querySelector('.tag')

addEventListener('load', () => {
  //브라우저에서 target에 대한 이미지를 가져오기전에 getBoundingClientReact()가 발동되어
  //문제가 생길수 있다
  //고로 addEventListener('load')안에 넣어 모든 리소스를 확보한 후에 실행 되게 해보자
  const targetRect = target.getBoundingClientRect()
  const targetHalfWidth = targetRect.width / 2
  const targetHalfHeight = targetRect.height / 2

  document.addEventListener('mousemove', (event) => {
    // //문서기준이아니라, 내부브라우저 창기준 좌표는 clientX, Y임
    const x = event.clientX
    const y = event.clientY

    vertical.style.transform = `translateX(${x}px)`
    horizontal.style.transform = `translateY(${y}px)`

    target.style.transform = `translate(${x - targetHalfWidth}px, ${
      y - targetHalfHeight
    }px)`
    tag.style.transform = `translate(${x}px, ${y}px)`
    tag.innerHTML = `${x}px, ${y}px`
  })
})

//https://csstriggers.com/를 보면 left와 top은
//layout, Paint, Composite가 모두 일어나는 속성이다.
//헌데 mounmove이벤튼  완전 빈번하게 일어나는 이벤트인데, 그 안에서
//top과 left속성을 쓴다로??!! 그럼 그때마다 layout부터 계속 다시 그릴텐데??!!
//완전 최악!!!!!! top과 left보다는 translate을 사용하여 composite만 일어나게하여 성능 개선을 해보자
