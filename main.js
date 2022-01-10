const vertical = document.querySelector('.vertical')
const horizontal = document.querySelector('.horizontal')
const target = document.querySelector('.target')
const tag = document.querySelector('.tag')

document.addEventListener('mousemove', (event) => {
  //문서기준이아니라, 내부브라우저 창기준 좌표는 clientX, Y임
  const x = event.clientX
  const y = event.clientY

  vertical.style.left = `${x}px`
  horizontal.style.top = `${y}px`

  target.style.left = `${x}px`
  target.style.top = `${y}px`

  tag.style.left = `${x}px`
  tag.style.top = `${y}px`

  tag.innerHTML = `${x}px, ${y}px`
})

//https://csstriggers.com/를 보면 left와 top은 
//layout, Paint, Composite가 모두 일어나는 속성이다.
//헌데 mounmove이벤튼  완전 빈번하게 일어나는 이벤트인데, 그 안에서
//top과 left속성을 쓴다로??!! 그럼 그때마다 layout부터 계속 다시 그릴텐데??!!
//완전 최악!!!!!! top과 left보다는 translate을 사용하여 composite만 일어나게하여 성능 개선을 해보자