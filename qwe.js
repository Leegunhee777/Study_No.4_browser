const testFunc = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('ㅉㅏㄴ!!!!')
      resolve()
    }, number)
  })
}

const sleep = async () => {
  await testFunc(3000)
  console.log('이건나중에 실행되야지요!!')
}

sleep()
