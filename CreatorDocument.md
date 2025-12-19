# 開発者向けドキュメント

## 対象とするシステムの決定
いつ参戦したかなどの一覧を表示する「スマブラキャラ一覧システム」である．三つ目は，スプラトゥーンの武器に関する内容を記載した「スプラトゥーン武器一覧システム」である．

## ページ構造の検討

### うまい棒システム
| 論理名 | 物理名（key） | 型（type） | 必須 | 説明 |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|ID|id|Integer|Yes|システム上の管理番号 (PK)|
|味の名前|name|String|Yes|例：コーンポタージュ味|
|製造開始年|release_year|Integer|Yes|例：1980|
|販売終了年|discontinued_year|Integer|No|空白(NULL)なら「販売中」|
|売り上げ本数|sales_count|Integer|No|わかっている場合のみ入力|
|説明|description|Text|Yes|味の特徴など|

### スマブラキャラ一覧システム
| 論理名 | 物理名（key） | 型（type） | 必須 | 説明 |
|:-----:|:-----:|:-----:|:-----:|:-----:|
|ID|id|Integer|Yes|システム上の管理番号 (PK)|
|キャラクター名|name|String|Yes|例:マリオ|
|参戦シリーズ|smash_title|String|Yes|例：大乱闘スマッシュブラザーズDX|
|出身ゲーム|origin_game|String|Yes|例：スーパーマリオブラザーズ|
|弱|Weak|String|Yes|技と説明|
|横強|side_Strong|String|Yes|技と説明|
|上強|up_Strong|string|Yes|技と説明|
|下強|down_Strong|string|Yes|技と説明|
|横スマッシュ|side_Smash|string|Yes|技と説明|
|上スマッシュ|up_Smash|string|Yes|技と説明|
|下スマッシュ|down_Smash|string|Yes|技と説明|
|掴み|grab|string|Yes|技と説明|
|前投げ|Before_throw|string|Yes|技と説明|
|後ろ投げ|back_throw|string|Yes|技と説明|
|上投げ|up_throw|string|Yes|技と説明|
|下投げ|down_throw|string|Yes|技と説明|
|空中ニュートラル|neutral_air|string|Yes|技と説明|
|空中前攻撃|Before_air|string|Yes|技と説明|
|空中後ろ攻撃|back_air|string|Yes|技と説明|
|空中上攻撃|up_air|string|Yes|技と説明|
|空中下攻撃|down_air|string|Yes|技と説明|
|通常必殺技|Neutral_Special|string|Yes|技と説明|
|横必殺技|side_Special|string|Yes|技と説明|
|上必殺技|up_Special|string|Yes|技と説明|
|下必殺技|down_Special|string|Yes|技と説明|
|最後の切りふだ|Last_resort|string|Yes|技と説明|
|キャラクター固有の特徴|character_features|string|No|技と説明|