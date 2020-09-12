const express = require('express') //익스프레스를 쓰기위해 익스프레스 모듈을 받아옴 #include느낌
const app = express() //익스프레스 모듈을 앱에다가 넣음
const port = 3000 // 익스프레스 노드에서는 보통 3000포트를 씀
const mdbConn = require('./mariaDBConn.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({exrended:false}))
app.use(bodyParser.json())

//get방식이랑 post방식이 있음
//get방식은 클라이언트에서 서버를 통해 어떠한 정보를 받아올 때
//post는 반대로 서버가 클라이언트에게 정보를 받아서 정보를 저장할 때

//인덱스페이지
app.get('/', (req, res) => {
  res.send('hello world!')
})     //get방식으로 통신을 한다

app.get('/data', (req, res) => {
  mdbConn.getDataList()     // 값 가져오기
  .then((results) => {  //기다렸다가 값 다 받은거 확인하면
    res.send(results);  //출력
  })
  .catch((err) => {     //에러뜨면
    res.send(err);      //출력
  })
})

app.get('/data/:choice_temp', (req, res) => {
  const choice_temp = req.params.choice_temp; //요청한 파라미터의 temp값을 가져옴
  console.log(choice_temp)
  mdbConn.getDataByTemp(choice_temp)    //값 가져오기
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
  })
})

app.post('/data/new', (req, res) => {
  let choice_time = req.body.choice_time;
  let choice_temp = req.body.choice_temp;
  let choice_humi = req.body.choice_humi;
  let choice_cds = req.body.choice_cds;
  console.log("data input! " + choice_temp);
  console.log('INSERT INTO dht VALUES(now(), ' + choice_temp + ', ' + choice_humi + ', ' + choice_cds + ')');

  mdbConn.createData(choice_time, choice_temp, choice_humi, choice_cds)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
  })
})

// 서버열기
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
