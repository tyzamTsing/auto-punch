/*
   签退
*/

const setHeader = function (r) {

  r.setRequestHeader('Host', ' comac - k.e.lanxin.cn')
  r.setRequestHeader('Accept', ' application / json, text / javascript, */*; q=0.01')
  r.setRequestHeader('Origin', 'https://comac-k.e.lanxin.cn')
  r.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  r.setRequestHeader('User-Agent', "Mozilla/5.0 (Linux; Android 6.0; M5 Build/MRA58K; wv) AppleWebKit/')'537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.147 Mobile Safari/r.setRequestHeader537.(')'36 Lanxin/4.9.9.2")
  r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  r.setRequestHeader('Referer', 'https://comac-k.e.lanxin.cn/Attendance/SignIn/SignInPage?')
  r.setRequestHeader('timeTmp=1606101295722')
  r.setRequestHeader('Accept-Language', 'zh-CN,en-US;q=0.8')
  r.setRequestHeader('Cookie', 'ASP.NET_SessionId=dvmt5hhoqboascinaypekobq')

  return r
}

const getData = function () {
  var data = "userid=4CE3C42D-0164-4374-B8B1-3C327061A56E&address=%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA%E5%BC%A0%E6%B1%9F%E9%95%87%E9%87%91%E7%A7%91%E8%B7%AF5500%E5%8F%B7%E4%B8%8A%E6%B5%B7%E9%A3%9E%E6%9C%BA%E8%AE%BE%E8%AE%A1%E7%A0%94%E7%A9%B6%E9%99%A2&place_id=9a90df8d-1483-413b-b244-12623e659782&inout=2&device=Android&latitude=31.171132537459123&longitude=121.61115593558785&datatype=0&imageid=&remarks=&oldshift=&newshift=&datasrc=43&opetype=1&opesrc=0&imei=&loginid=4CE3C42D-0164-4374-B8B1-3C327061A56E&devno=0&macno=1&image_data=&image_name=&status=0"
  return data
}


const __main = function () {
  console.show()

  var r = new XMLHttpRequest();//第一步：建立所需的对象
  var url = "https://comac-k.e.lanxin.cn/SignIn/SaveSignInfo"

  r.open('POST', url, true);//第二步：打开连接  将请求参数写在url中

  // header
  r = setHeader(r)

  // body
  const data = getData()
  r.send(data);//第三步：发送请求  将请求参数写在URL中


  /**
   * 获取数据后的处理程序
   */
  r.onreadystatechange = function () {
    if (r.readyState == 4 && r.status == 200) {
      var json = r.responseText;//获取到json字符串，还需解析
      console.log(json);
    }
  };

}

__main()