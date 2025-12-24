"use strict"; 

const express = require("express");
const app = express();

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


app.listen(8080, () => console.log("Server listening on port 8080!"));