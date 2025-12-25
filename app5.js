"use strict";
const express = require("express");
const app = express();

// フォームから送信されたデータ (req.body) を読み取れるようにする設定
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
let station = [
  { id:1, code:"JE01", name:"東京駅"},
  { id:2, code:"JE07", name:"舞浜駅"},
  { id:3, code:"JE12", name:"新習志野駅"},
  { id:4, code:"JE13", name:"幕張豊砂駅"},
  { id:5, code:"JE14", name:"海浜幕張駅"},
  { id:6, code:"JE05", name:"新浦安駅"},
];
let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  res.render("db2", { data: station});
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/janken_radio", (req, res) => {
  let hand = req.query.hand; 
  let win = Number(req.query.win);
  let total = Number(req.query.total);

  const hands = ["グー", "チョキ", "パー"];
  const cpuHand = hands[Math.floor(Math.random() * 3)];
  let result;

  total++; 

  if (hand === cpuHand) {
      result = "あいこ";
  } else if (
      (hand === "グー" && cpuHand === "チョキ") ||
      (hand === "チョキ" && cpuHand === "パー") ||
      (hand === "パー" && cpuHand === "グー")
  ) {
      result = "勝ち";
      win++;
  } else {
      result = "負け";
  }

  res.render('janken_radio', {
      hand: hand,
      cpuHand: cpuHand,
      result: result,
      win: win,
      total: total
  });
}); 

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ==================================================
// 1. うまい棒システム (Umaibo System)
// ==================================================

// データ (ID, 味, 価格, カロリー)
let umaiboData = [
  { id: 1, flavor: "メンタイ", price: 12, calorie: 44 },
  { id: 2, flavor: "コーンポタージュ", price: 12, calorie: 43 },
  { id: 3, flavor: "チーズ", price: 12, calorie: 43 },
  { id: 4, flavor: "たこ焼", price: 12, calorie: 44 },
  { id: 5, flavor: "シュガーラスク", price: 12, calorie: 43 },
];

// 一覧表示
app.get("/umaibo", (req, res) => {
  res.render('umaibo_list', { data: umaiboData });
});

// 新規作成画面へ遷移 (静的HTMLへのリダイレクト)
app.get("/umaibo/create", (req, res) => {
  res.redirect('/public/umaibo_new.html');
});

// 新規登録処理
app.post("/umaibo", (req, res) => {
  const id = umaiboData.length + 1;
  const flavor = req.body.flavor;
  const price = req.body.price;
  const calorie = req.body.calorie;
  umaiboData.push({ id: id, flavor: flavor, price: price, calorie: calorie });
  res.render('umaibo_list', { data: umaiboData });
});

// 詳細表示
app.get("/umaibo/:number", (req, res) => {
  const number = req.params.number;
  const detail = umaiboData[number];
  res.render('umaibo_detail', { id: number, data: detail });
});

// 編集画面表示
app.get("/umaibo/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = umaiboData[number];
  res.render('umaibo_edit', { id: number, data: detail });
});

// 更新処理
app.post("/umaibo/update/:number", (req, res) => {
  const number = req.params.number;
  umaiboData[number].flavor = req.body.flavor;
  umaiboData[number].price = req.body.price;
  umaiboData[number].calorie = req.body.calorie;
  res.redirect('/umaibo');
});

// 削除処理
app.get("/umaibo/delete/:number", (req, res) => {
  umaiboData.splice(req.params.number, 1);
  res.redirect('/umaibo');
});


// ==================================================
// 2. スマブラキャラ一覧システム (Smash Bros System)
// ==================================================

// データ (ID, 名前, 出典シリーズ, 参戦ナンバー)
let smashData = [
  { id: 1, name: "マリオ", series: "スーパーマリオ", number: "01" },
  { id: 2, name: "リンク", series: "ゼルダの伝説", number: "03" },
  { id: 3, name: "カービィ", series: "星のカービィ", number: "06" },
  { id: 4, name: "ピカチュウ", series: "ポケモン", number: "08" },
  { id: 5, name: "クラウド", series: "FFVII", number: "61" },
];

// 一覧表示
app.get("/smash", (req, res) => {
  res.render('smash_list', { data: smashData });
});

// 新規作成画面へ遷移
app.get("/smash/create", (req, res) => {
  res.redirect('/public/smash_new.html');
});

// 新規登録処理
app.post("/smash", (req, res) => {
  const id = smashData.length + 1;
  const name = req.body.name;
  const series = req.body.series;
  const number = req.body.number;
  smashData.push({ id: id, name: name, series: series, number: number });
  res.render('smash_list', { data: smashData });
});

// 詳細表示
app.get("/smash/:index", (req, res) => {
  const index = req.params.index;
  const detail = smashData[index];
  res.render('smash_detail', { id: index, data: detail });
});

// 編集画面表示
app.get("/smash/edit/:index", (req, res) => {
  const index = req.params.index;
  const detail = smashData[index];
  res.render('smash_edit', { id: index, data: detail });
});

// 更新処理
app.post("/smash/update/:index", (req, res) => {
  const index = req.params.index;
  smashData[index].name = req.body.name;
  smashData[index].series = req.body.series;
  smashData[index].number = req.body.number;
  res.redirect('/smash');
});

// 削除処理
app.get("/smash/delete/:index", (req, res) => {
  smashData.splice(req.params.index, 1);
  res.redirect('/smash');
});


// ==================================================
// 3. スプラトゥーン武器一覧システム (Splatoon System)
// ==================================================

// データ (ID, ブキ名, サブ, スペシャル)
let splaData = [
  { id: 1, name: "わかばシューター", sub: "スプラッシュボム", special: "グレートバリア" },
  { id: 2, name: "スプラシューター", sub: "キューバンボム", special: "ウルトラショット" },
  { id: 3, name: "スプラローラー", sub: "カーリングボム", special: "グレートバリア" },
  { id: 4, name: "スプラチャージャー", sub: "スプラッシュボム", special: "キューインキ" },
];

// 一覧表示
app.get("/splatoon", (req, res) => {
  res.render('spla_list', { data: splaData });
});

// 新規作成画面へ遷移
app.get("/splatoon/create", (req, res) => {
  res.redirect('/public/spla_new.html');
});

// 新規登録処理
app.post("/splatoon", (req, res) => {
  const id = splaData.length + 1;
  const name = req.body.name;
  const sub = req.body.sub;
  const special = req.body.special;
  splaData.push({ id: id, name: name, sub: sub, special: special });
  res.render('spla_list', { data: splaData });
});

// 詳細表示
app.get("/splatoon/:index", (req, res) => {
  const index = req.params.index;
  const detail = splaData[index];
  res.render('spla_detail', { id: index, data: detail });
});

// 編集画面表示
app.get("/splatoon/edit/:index", (req, res) => {
  const index = req.params.index;
  const detail = splaData[index];
  res.render('spla_edit', { id: index, data: detail });
});

// 更新処理
app.post("/splatoon/update/:index", (req, res) => {
  const index = req.params.index;
  splaData[index].name = req.body.name;
  splaData[index].sub = req.body.sub;
  splaData[index].special = req.body.special;
  res.redirect('/splatoon');
});

// 削除処理
app.get("/splatoon/delete/:index", (req, res) => {
  splaData.splice(req.params.index, 1);
  res.redirect('/splatoon');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
