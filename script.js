(() => {
  const backToMain = function() {
    // 返回到主页面
    // todo：如果在其他页面，一直摁返回，可能返回不到这个页面？
    const main = "org.xinkb.blackboard.android.ui.activity.MainActivity"
    let backLimit = 8 // 为了不要死循环
    while (currentActivity() !== main && backLimit !== 0) {
      back()
      backLimit--
      sleep(500)
    }
  }

  const endScript = function() {
    // 结束程序的时候运行这个
    sleep(1000)
    // 退出到桌面
    backToMain()
    home()
    console.log("=== end ===")
    // 结束脚本的运行
    exit()
  }

  const punch = function(name) {
    let btn = text(name).findOne(2000)
    if (btn) {
      sleep(2000)
      btn.click()
      console.log(name + " 已点击")
      punchYes()
      endScript()
    } else {
      console.log("找不到 " + name + " 按钮");
    }
  }
  const punchYes = function() {
    let btn = text("确定").findOne(2000)
    if (btn) {
      sleep(1000)
      btn.click()
      console.log("确定" + " 已点击")
      endScript()
    } else {
      console.log("找不到 " + "确定" + " 按钮");
    }
  }

  const toXiaoMain = function() {
    const xiao = "org.xinkb.blackboard.android"
    if (currentPackage() !== xiao) {
      app.launchPackage(xiao)
      console.log("opened xiao");
    } else {
      backToMain()
    }
  }

  const unlockScreen = function() {
    const max_try = 5
    const keyguard_manager = context.getSystemService(context
      .KEYGUARD_SERVICE);
    let isLocked = () => keyguard_manager.isKeyguardLocked();

    while (isLocked() && max_try !== 0) {
      max_try--
      sleep(1000)
      console.log("unlocked screen");
      gesture(320, [394, 1536], [680, 320]) // 我也不知道为啥持续时间要是320
    }
    if (isLocked()) {
      console.log("cant unlock screen")
      endScript()
    }
  }

  const waitForLoacte = function() {
    sleep(2000)
    const waitTime = 10
    while (text("定位中").findOne(100) && waitTime !== 0) {
      console.log("-- 定位中 --")
      sleep(1000)
      waitTime--
    }
  }

  const enterThePunch = function() {
    // 0. 点击通知
    let btn = id("tab_item_text").className("android.widget.TextView").text(
      "通知").findOne(6000).parent()
    if (btn) {
      btn.click()
      console.log("通知 已点击")
    } else {
      console.log("*** 找不到 通知 按钮");
      endScript() // 这里找不到就结束
    }
    sleep(1000)

    // 1. 点击教师考勤
    btn = text("教师考勤").findOne(3000).parent() // 等6秒，是为了防止冷启动需要等很久
    if (btn) {
      btn.click()
      // click(btn.bounds().centerX(), btn.bounds().centerY());
      console.log("教师考勤 已点击")
    } else {
      console.log("*** 找不到 教师考勤 按钮");
      endScript() // 这里找不到就结束
    }

    // 2. 点击考勤打卡
    btn = text("考勤打卡").findOne(3000)
    if (btn) {
      click(btn.bounds().centerX(), btn.bounds().centerY());
      console.log("考勤打卡 已点击")
    } else {
      console.log("*** 找不到 考勤打卡 按钮");
      endScript()
    }
  }

  // ========== 主函数从此处开始 ==============
  device.wakeUp() // 开启屏幕，不然看不到在做啥
  console.show() // 打开控制台的输出，到公司后可以看一下之前的打卡记录

  // 判断有没有锁屏，有的话就解锁
  unlockScreen()

  console.log("=== xiao start ===")

  // 为了避免被反作弊系统搞，等个0到2分钟的随机时间
  const sleepTime = random(0, 120000)
  // 写毫秒的话反应不过来要等多久。。
  console.log("random sleep " + Math.floor(sleepTime / 1000) + " s")
  device.keepScreenOn(sleepTime)
  // sleep(sleepTime)
  console.log("random sleep end")

  // 1. 开启晓黑板
  toXiaoMain()

  // 2. 进入打卡页面
  enterThePunch()

  waitForLoacte()

  // 3. 上班打卡
  punch("上班打卡")

  // 4 下班打卡
  punch("下班打卡")

  // 5. 更新下班打卡
  punch("更新打卡")

  // 如果啥按钮都没有，就跑路
  console.log("*** nothing to punch")
  endScript()
})()
