const mariadb = require('mariadb'); //#include
const vals = require('./DBconfig.json');

//DB에 접속해서 ConnectionPool 생성
const pool = mariadb.createPool({
  host: vals.host,
  port: vals.port,
  user: vals.user,
  password: vals.password,
  connectionLimit: 5
});

// DB에서 쿼리문을 통해 데이터를 가져옴
// 자신의 DB에 맞게 수정 하기

async function GetDataList(){
  let conn, results;
  try{
    conn = await pool.getConnection();
    conn.query('USE ' + vals.database);
    results = await conn.query('SELECT * FROM DHT');
  }
  catch(err){
    throw err;
  }
  finally{
    if(conn) conn.end();    //커넥션 열었으면 닫기
    return results;
  }
}

async function GetDataByTemp(choice_temp){
  let conn, results;
  try{
    conn = await pool.getConnection();
    conn.query('USE ' + vals.database);
    results = await conn.query('SELECT * FROM DHT WHERE temp = "' + choice_temp + '"');
  }
  catch(err){
    throw err;
  }
  finally{
    if(conn) conn.end();
    return results;
  }
}



module.exports = {
  getDataList: GetDataList,
  getDataByTemp: GetDataByTemp
}
