const MAX_PRICE = 2000;
const MIN_DISPLAY_SCORE = 58;
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 350;
const LAST_SCAN_KEY = "sh54_last_scan_at";
const AUTO_SCAN_SKIP_MINUTES = 10;
const DISPLAY_LIMIT = 48;
const TARGET_PRICE_LIMIT = 2000;

const RAW_TARGETS = `
USDJPY=X|USD/JPY|forex
EURJPY=X|EUR/JPY|forex
EURUSD=X|EUR/USD|forex
GBPJPY=X|GBP/JPY|forex
GBPUSD=X|GBP/USD|forex
AUDJPY=X|AUD/JPY|forex
NZDJPY=X|NZD/JPY|forex
CHFJPY=X|スイスフラン/円|forex
AUDUSD=X|豪ドル/米ドル|forex
EURNZD=X|ユーロ/NZドル|forex
AUDNZD=X|豪ドル/NZドル|forex
EURAUD=X|ユーロ/豪ドル|forex
GBPAUD=X|ポンド/豪ドル|forex
BTC-USD|ビットコイン|crypto
ETH-USD|イーサリアム|crypto
XRP-USD|リップル|crypto
SOL-USD|ソラナ|crypto
BNB-USD|バイナンスコイン|crypto
DOGE-USD|ドージコイン|crypto
^N225|日経225|index
^GSPC|S&P500|index
^DJI|ダウ|index
^IXIC|NASDAQ|index
^SOX|半導体指数|index
GC=F|ゴールド|index
^VIX|VIX恐怖指数|index
CL=F|WTI原油|index
1357|日経ダブルインバース|index
1360|日経ベア2倍|index
1366|日経ダブルインバース|index
1459|楽天日経ダブルベア|index
1491|中外鉱業|stock
1514|住石HD|stock
1518|三井松島HD|stock
1757|創建エース|stock
1783|fantasista|stock
1844|大盛工業|stock
1850|南海辰村建設|stock
2134|北浜キャピタル|stock
2158|FRONTEO|stock
2160|ジーエヌアイ|stock
2164|地域新聞社|stock
219A|Heartseed|stock
2315|CAICA DIGITAL|stock
2330|フォーサイド|stock
2342|トランスジェニック|stock
2370|メディネット|stock
2385|総医研HD|stock
2395|新日本科学|stock
2437|Shinwa Wise|stock
2459|アウンコンサル|stock
2467|バルクHD|stock
2484|出前館|stock
2497|ユナイテッド|stock
2586|フルッタフルッタ|stock
2656|ベクターHD|stock
2666|オートウェーブ|stock
2743|ピクセルカンパニーズ|stock
2762|SANKO MARKETING|stock
2776|新都HD|stock
2926|篠崎屋|stock
2936|ベースフード|stock
2970|グッドライフC|stock
2998|クリアル|stock
3041|ビューティカダンHD|stock
3070|ジェリービーンズG|stock
3071|ストリーム|stock
3083|シーズメン|stock
3111|オーミケンシ|stock
3133|海帆|stock
3189|ANAP HD|stock
3192|白鳩|stock
3202|ダイトウボウ|stock
3237|イントランス|stock
3266|ファンドクリエーション|stock
3323|レカム|stock
3350|メタプラネット|stock
3358|ワイエスフード|stock
3370|フジタコーポ|stock
3409|北日本紡績|stock
3446|ジェイテックC|stock
3461|パルマ|stock
3498|霞ヶ関キャピタル|stock
3541|農業総合研究所|stock
3556|リネットJPN|stock
3562|No.1|stock
3624|アクセルマーク|stock
3625|テックファーム|stock
3627|テクミラHD|stock
3639|ボルテージ|stock
3660|アイスタイル|stock
3661|エムアップHD|stock
3667|enish|stock
3668|コロプラ|stock
3672|オルトプラス|stock
3673|ブロードリーフ|stock
3674|オークファン|stock
3675|クロスマーケG|stock
3680|ホットリンク|stock
3681|ブイキューブ|stock
3686|DLE|stock
3691|デジタルプラス|stock
3692|FFRIセキュリティ|stock
3696|セレス|stock
3727|アプリックス|stock
3747|インタートレード|stock
3753|フライトHD|stock
3776|ブロードバンドタワー|stock
3793|ドリコム|stock
3807|フィスコ|stock
3810|サイバーステップ|stock
3815|メディア工房|stock
3823|THE WHY HOW DO|stock
3825|リミックスポイント|stock
3840|パス|stock
3845|アイフリークモバイル|stock
3853|アステリア|stock
3856|Abalance|stock
3903|gumi|stock
3904|カヤック|stock
3905|データセクション|stock
3911|Aiming|stock
3912|モバイルファクトリー|stock
3913|GreenBee|stock
3914|JIG-SAW|stock
3927|フーバーブレイン|stock
3932|アカツキ|stock
3935|エディア|stock
3936|グローバルウェイ|stock
3976|シャノン|stock
3992|ニーズウェル|stock
3994|マネーフォワード|stock
4011|ヘッドウォータース|stock
4014|カラダノート|stock
4015|ペイクラウドHD|stock
4017|クリーマ|stock
4052|フィーチャ|stock
4055|ティアンドエスG|stock
4056|ニューラルG|stock
4057|インターファクトリー|stock
4165|プレイド|stock
4167|ココペリ|stock
4168|ヤプリ|stock
4173|WACUL|stock
4176|ココナラ|stock
4179|ジーネクスト|stock
4192|スパイダープラス|stock
4260|ハイブリッドテク|stock
4263|サスメド|stock
4264|セキュア|stock
4268|エッジテクノロジー|stock
4316|ビーマップ|stock
4317|レイ|stock
4344|ソースネクスト|stock
4370|モビルス|stock
4375|セーフィー|stock
4382|HEROZ|stock
4384|ラクスル|stock
4385|メルカリ|stock
4393|バンクオブイノベ|stock
4412|サイエンスアーツ|stock
4414|フレクト|stock
4418|JDSC|stock
4424|Amazia|stock
4425|Kudan|stock
4427|EduLab|stock
4436|ミンカブ|stock
4442|バルテスHD|stock
4443|Sansan|stock
4446|Link-U|stock
4477|BASE|stock
4478|フリー|stock
4480|メドレー|stock
4484|ランサーズ|stock
4490|ビザスク|stock
4493|サイバーセキュリティC|stock
4498|サイバートラスト|stock
4506|住友ファーマ|stock
4563|アンジェス|stock
4564|オンコセラピー|stock
4565|そーせいG|stock
4566|LTTバイオ|stock
4568|第一三共|stock
4571|NANO MRNA|stock
4572|カルナバイオ|stock
4575|キャンバス|stock
4576|DWTI|stock
4579|ラクオリア創薬|stock
4582|シンバイオ|stock
4583|カイオム|stock
4584|キッズウェルバイオ|stock
4586|メドレックス|stock
4587|ペプチドリーム|stock
4588|オンコリス|stock
4591|リボミック|stock
4592|サンバイオ|stock
4593|ヘリオス|stock
4594|ブライトパス|stock
4596|窪田製薬HD|stock
4597|ソレイジア|stock
4598|デルタフライ|stock
4882|ペルセウス|stock
4883|モダリス|stock
4884|クリングルファーマ|stock
4888|ステラファーマ|stock
4890|坪田ラボ|stock
4891|ティムス|stock
4892|サイフューズ|stock
4893|ノイルイミューン|stock
4894|クオリプス|stock
4934|Pアンチエイジ|stock
4978|リプロセル|stock
5025|マーキュリー|stock
5031|モイ|stock
5032|ANYCOLOR|stock
5034|unerry|stock
5035|HOUSEI|stock
5131|リンカーズ|stock
5132|pluszero|stock
5134|POPER|stock
5136|tripla|stock
5240|monoAI|stock
5243|note|stock
5246|ELEMENTS|stock
5247|BTM|stock
5253|カバー|stock
5255|モンスターラボ|stock
5258|TMN|stock
5574|ABEJA|stock
5577|アイデミー|stock
5582|グリッド|stock
5586|Laboro.AI|stock
5595|QPS研究所|stock
5597|ブルーイノベーション|stock
5721|エス・サイエンス|stock
5724|アサカ理研|stock
5803|フジクラ|stock
5955|ヤマシナ|stock
6023|ダイハツディーゼル|stock
6031|サイジニア|stock
6033|エクストリーム|stock
6046|リンクバル|stock
6069|トレンダーズ|stock
6072|地盤ネットHD|stock
6081|アライドアーキ|stock
6094|フリークアウト|stock
6177|AppBank|stock
6181|タメニー|stock
6182|メタリアル|stock
6195|ホープ|stock
6208|石川製作所|stock
6227|AIメカテック|stock
6255|エヌ・ピー・シー|stock
6315|TOWA|stock
6335|東京機械|stock
6338|タカトリ|stock
6521|オキサイド|stock
6522|アスタリスク|stock
6537|WASHハウス|stock
6573|アジャイルメディア|stock
6613|QDレーザ|stock
6619|ダブル・スコープ|stock
6659|メディアリンクス|stock
6696|トラースOP|stock
6731|ピクセラ|stock
6740|JDI|stock
6775|TBグループ|stock
6835|アライドテレシス|stock
6855|日本電子材料|stock
6898|トミタ電機|stock
6927|ヘリオステクノ|stock
6993|大黒屋HD|stock
7014|名村造船所|stock
7063|Birdman|stock
7072|インティメートM|stock
7083|AHCグループ|stock
7094|NexTone|stock
7111|INEST|stock
7116|ダイワ通信|stock
7138|TORICO|stock
7162|アストマックス|stock
7187|ジェイリース|stock
7201|日産自動車|stock
7211|三菱自動車|stock
7342|ウェルスナビ|stock
7351|グッドパッチ|stock
7352|TWOSTONE&Sons|stock
7359|東京通信G|stock
7370|Enjin|stock
7373|アイドマHD|stock
7375|リファインバースG|stock
7378|アシロ|stock
7383|ネットプロHD|stock
7527|システムソフト|stock
7601|ポプラ|stock
7610|テイツー|stock
7615|京都きもの友禅HD|stock
7647|音通|stock
7707|PSS|stock
7771|日本精密|stock
7776|セルシード|stock
7777|3Dマトリックス|stock
7779|CYBERDYNE|stock
7803|ブシロード|stock
7831|ウイルコHD|stock
8107|キムラタン|stock
8202|ラオックスHD|stock
8304|あおぞら銀行|stock
8613|丸三証券|stock
8704|トレイダーズHD|stock
8746|UNBANKED|stock
8783|GFA|stock
8789|フィンテックG|stock
8918|ランド|stock
8946|ASIAN STAR|stock
9166|GENDA|stock
9227|マイクロ波化学|stock
9246|プロジェクトHD|stock
9252|ラストワンマイル|stock
9338|INFORICH|stock
9348|ispace|stock
9416|ビジョン|stock
9424|日本通信|stock
9439|エム・エイチ・G|stock
9560|プログリット|stock
9561|グラッドキューブ|stock
9565|GLOE|stock
9610|ウィルソンLW|stock
9973|小僧寿し|stock
1382|ホーブ|stock
1434|JESCO HD|stock
1435|robot home|stock
1436|グリーンエナジー|stock
1447|ITbook HD|stock
1711|SDS HD|stock
1712|ダイセキ環境|stock
1716|第一カッター興業|stock
1724|シンクレイヤ|stock
1786|オリエンタル白石|stock
1813|不動テトラ|stock
1821|三井住友建設|stock
1827|ナカノフドー建設|stock
1873|日本ハウスHD|stock
1893|五洋建設|stock
1914|日本基礎技術|stock
1921|巴コーポレーション|stock
1966|高田工業所|stock
2120|LIFULL|stock
2138|クルーズ|stock
2146|UTグループ|stock
2150|ケアネット|stock
2156|セーラー広告|stock
2170|リンクアンドモチベ|stock
2193|クックパッド|stock
2215|第一屋製パン|stock
2303|ドーン|stock
2345|クシム|stock
2351|ASJ|stock
2375|ギグワークス|stock
2379|ディップ|stock
2388|ウェッジHD|stock
2404|鉄人化計画|stock
2410|キャリアデザイン|stock
2428|ウェルネット|stock
2435|シダー|stock
2438|アスカネット|stock
2479|ジェイテック|stock
2489|アドウェイズ|stock
2491|バリューコマース|stock
2492|インフォマート|stock
2533|オエノンHD|stock
2593|伊藤園|stock
2652|まんだらけ|stock
2667|イメージワン|stock
2687|CVSベイエリア|stock
2721|ジェイHD|stock
2749|JPHD|stock
2788|アップルインター|stock
2792|ハニーズHD|stock
2930|北の達人|stock
2931|ユーグレナ|stock
2934|ジェイフロンティア|stock
2982|ADワークスG|stock
3023|ラサ商事|stock
3042|セキュアヴェイル|stock
3053|ペッパーフード|stock
3069|JFLA HD|stock
3073|DDグループ|stock
3082|きちりHD|stock
3093|トレジャーファクトリー|stock
3103|ユニチカ|stock
3105|日清紡HD|stock
3109|シキボウ|stock
3121|マーチャント|stock
3161|アゼアス|stock
3168|黒谷|stock
3175|APHD|stock
3185|夢展望|stock
3187|サンワカンパニー|stock
3195|ジェネレーションパス|stock
3205|ダイドーリミテッド|stock
3222|USMH|stock
3242|アーバネット|stock
3245|ディアライフ|stock
3271|THEグローバル社|stock
3284|フージャースHD|stock
3289|東急不動産HD|stock
3315|日本コークス|stock
3319|ゴルフダイジェスト|stock
3328|BEENOS|stock
3333|あさひ|stock
3347|トラスト|stock
3360|シップHD|stock
3377|バイク王|stock
3386|コスモ・バイオ|stock
3393|スターティアHD|stock
3397|トリドールHD|stock
3415|TOKYO BASE|stock
3416|ピクスタ|stock
3418|バルニバービ|stock
3423|エスイー|stock
3445|RS Technologies|stock
3452|ビーロット|stock
3454|ファーストブラザーズ|stock
3475|グッドコムアセット|stock
3482|ロードスター|stock
3486|グローバルリンクM|stock
3521|エコナックHD|stock
3529|アツギ|stock
3536|アクサスHD|stock
3558|ジェイドG|stock
3561|力の源HD|stock
3563|FOOD & LIFE|stock
3565|アセンテック|stock
3571|ソトー|stock
3607|クラウディアHD|stock
3612|ワールド|stock
3623|ビリングシステム|stock
3652|DMP|stock
3653|モルフォ|stock
3655|ブレインパッド|stock
3656|KLab|stock
3657|ポールHD|stock
3676|デジタルハーツHD|stock
3678|メディアドゥ|stock
3682|エンカレッジ|stock
3687|フィックスターズ|stock
3688|CARTA HD|stock
3690|イルグルム|stock
3694|オプティム|stock
3698|CRI・ミドルウェア|stock
3719|ジェクシード|stock
3741|セック|stock
3760|ケイブ|stock
3765|ガンホー|stock
3773|AMI|stock
3778|さくらインターネット|stock
3791|IGポート|stock
3796|いい生活|stock
3804|システムディ|stock
3814|アルファクス|stock
3835|eBASE|stock
3836|アバントG|stock
3837|アドソル日進|stock
3843|フリービット|stock
3858|ユビキタスAI|stock
3863|日本製紙|stock
3900|クラウドワークス|stock
3901|マークラインズ|stock
3902|MDV|stock
3907|シリコンスタジオ|stock
3915|テラスカイ|stock
3917|アイリッジ|stock
3918|PCI HD|stock
3920|アイビーシー|stock
3921|ネオジャパン|stock
3922|PR TIMES|stock
3923|ラクス|stock
3925|ダブルスタンダード|stock
3926|オープンドア|stock
3928|マイネット|stock
3930|はてな|stock
3933|チエル|stock
3937|Ubicom HD|stock
3940|ノムラシステム|stock
3962|チェンジHD|stock
3963|シンクロフード|stock
3967|エルテス|stock
3968|セグエG|stock
3970|イノベーション|stock
3978|マクロミル|stock
3981|ビーグリー|stock
3984|ユーザーローカル|stock
3985|テモナ|stock
3987|エコモット|stock
3993|PKSHA|stock
3996|サインポスト|stock
3998|すららネット|stock
7183|あんしん保証|stock
9444|トーシンホールディングス|stock
9514|エフオン|stock
3632|グリーホールディングス|stock
2445|タカミヤ|stock
6634|ネクスグループ|stock
2673|夢みつけ隊|stock
150A|JSH|stock
4366|ダイトーケミックス|stock
6464|ツバキ・ナカシマ|stock
3777|環境フレンドリーホールディングス|stock
9399|ビート・ホールディングス・リミテッド|stock
8798|アドバンスクリエイト|stock
9204|スカイマーク|stock
6955|FDK|stock
8254|さいか屋|stock
8105|堀田丸正|stock
8894|REVOLUTION|stock
4378|CINC|stock
5216|倉元製作所|stock
4881|ファンペップ|stock
6085|アーキテクツ・スタジオ・ジャパン|stock
3929|ソーシャルワイヤー|stock
462A|FUNDINNO|stock
7256|河西工業|stock
6721|ウインテスト|stock
198A|PostPrime|stock
7719|東京衡機|stock
4918|アイビー化粧品|stock
4265|Institution for a Global Society|stock
5137|スマートドライブ|stock
281A|インフォメティス|stock
9854|愛眼|stock
9229|サンウェルズ|stock
3997|トレードワークス|stock
7412|アトム|stock
9557|エアークローゼット|stock
5129|FIXER|stock
6343|フリージア・マクロス|stock
9425|ReYuu Japan|stock
7815|東京ボード工業|stock
4833|Def consulting|stock
6837|京写|stock
4935|リベルタ|stock
7603|ジーイエット|stock
2323|fonfun|stock
264A|Schoo|stock
3647|ジー・スリーホールディングス|stock
9326|関通|stock
6494|NFKホールディングス|stock
5248|テクノロジーズ|stock
1380|秋川牧園|stock
1418|インターライフホールディングス|stock
1420|サンヨーホームズ|stock
1429|日本アクア|stock
1430|ファーストコーポレーション|stock
1431|Ｌｉｂ　Ｗｏｒｋ|stock
1443|技研ホールディングス|stock
1446|キャンディル|stock
1717|明豊ファシリティワークス|stock
1822|大豊建設|stock
1840|土屋ホールディングス|stock
1848|富士ピー・エス|stock
1852|淺沼組|stock
1853|森組|stock
1887|日本国土開発|stock
1994|高橋カーテンウォール工業|stock
2055|日和産業|stock
2112|塩水港精糖|stock
2114|フジ日本|stock
2124|ジェイエイシーリクルートメント|stock
2127|日本Ｍ＆Ａセンターホールディングス|stock
2130|メンバーズ|stock
2139|中広|stock
2162|ｎｍｓ　ホールディングス|stock
2163|アルトナー|stock
2173|博展|stock
2179|成学社|stock
2181|パーソルホールディングス|stock
2183|リニカル|stock
2186|ソーバル|stock
2195|アミタホールディングス|stock
2198|アイ・ケイ・ケイホールディングス|stock
2286|林兼産業|stock
2291|福留ハム|stock
2300|きょくとう|stock
2304|ＣＳＳホールディングス|stock
2307|クロスキャット|stock
2311|エプコ|stock
2317|システナ|stock
2321|ソフトフロントホールディングス|stock
2329|東北新社|stock
2334|イオレ|stock
2337|いちご|stock
2338|クオンタムソリューションズ|stock
2340|極楽湯ホールディングス|stock
2341|アルバイトタイムス|stock
2353|日本駐車場開発|stock
2373|ケア２１|stock
2376|サイネックス|stock
2408|ＫＧ情報|stock
2411|ゲンダイエージェンシー|stock
2418|ツカダ・グローバルホールディング|stock
2424|ブラス|stock
2425|ケアサービス|stock
2436|共同ピーアール|stock
2440|ぐるなび|stock
2454|オールアバウト|stock
2461|ファンコミュニケーションズ|stock
2464|Ａｏｂａ‐ＢＢＴ|stock
2471|エスプール|stock
2481|タウンニュース社|stock
2485|ティア|stock
2493|イーサポートリンク|stock
2499|日本和装ホールディングス|stock
2654|アスモ|stock
2693|ＹＫＴ|stock
2694|焼肉坂井ホールディングス|stock
2722|ＩＫホールディングス|stock
2735|ワッツ|stock
2736|フェスタリアホールディングス|stock
2764|ひらまつ|stock
2769|ヴィレッジヴァンガードコーポレーション|stock
2778|パレモ・ホールディングス|stock
2789|カルラ|stock
2795|日本プリメックス|stock
2796|ファーマライズホールディングス|stock
2876|デルソーレ|stock
2877|日東ベスト|stock
2884|ヨシムラ・フード・ホールディングス|stock
2894|石井食品|stock
2901|ウェルディッシュ|stock
2904|一正蒲鉾|stock
2916|仙波糖化工業|stock
2917|大森屋|stock
2927|ＡＦＣ－ＨＤアムスライフサイエンス|stock
2929|ファーマフーズ|stock
2978|ツクルバ|stock
2984|ヤマイチエステート|stock
2991|ランドネット|stock
2999|ホームポジション|stock
3010|ポラリス・ホールディングス|stock
3011|バナーズ|stock
3030|ハブ|stock
3031|ラクーンホールディングス|stock
3035|ケイティケイ|stock
3054|ハイパー|stock
3058|三洋堂ホールディングス|stock
3059|ヒラキ|stock
3067|東京一番フーズ|stock
3077|ホリイフードサービス|stock
3079|ディーブイエックス|stock
3080|ジェーソン|stock
3113|ＵＮＩＶＡ・Ｏａｋホールディングス|stock
3123|サイボー|stock
3134|Ｈａｍｅｅ|stock
3137|ファンデリー|stock
3143|オーウイル|stock
3154|メディアスホールディングス|stock
3159|丸善ＣＨＩホールディングス|stock
3160|大光|stock
3169|ミサワ|stock
3174|ハピネス・アンド・ディ|stock
3176|三洋貿易|stock
3190|ホットマン|stock
3204|トーア紡コーポレーション|stock
3223|エスエルディー|stock
3224|ゼネラル・オイスター|stock
3231|野村不動産ホールディングス|stock
3232|三重交通グループホールディングス|stock
3236|プロパスト|stock
3238|セントラル総合開発|stock
3241|ウィル|stock
3246|コーセーアールイー|stock
3248|アールエイジ|stock
3261|グランディーズ|stock
3267|フィル・カンパニー|stock
3277|サンセイランディック|stock
3280|エストラスト|stock
3286|トラストホールディングス|stock
3293|アズマハウス|stock
3306|日本製麻|stock
3326|ランシステム|stock
3359|ｃｏｔｔａ|stock
3361|トーエル|stock
3372|関門海|stock
3387|クリエイト・レストランツ・ホールディングス|stock
3392|デリカフーズホールディングス|stock
3396|フェリシモ|stock
3422|Ｊ－ＭＡＸ|stock
3439|三ツ知|stock
3440|日創グループ|stock
3444|菊池製作所|stock
3457|Ａｎｄ　Ｄｏホールディングス|stock
3469|デュアルタップ|stock
3474|Ｇ－ＦＡＣＴＯＲＹ|stock
3477|フォーライフ|stock
3489|フェイスネットワーク|stock
3494|マリオン|stock
3512|日本フエルト|stock
3538|ウイルプラスホールディングス|stock
3548|バロックジャパンリミテッド|stock
3550|スタジオアタオ|stock
3553|共和レザー|stock
3557|ユナイテッド＆コレクティブ|stock
3559|ピーバンドットコム|stock
3566|ユニフォームネクスト|stock
3577|東海染工|stock
3580|小松マテーレ|stock
3598|山喜|stock
3622|ネットイヤーグループ|stock
3628|データホライゾン|stock
3634|ソケッツ|stock
3641|パピレス|stock
3645|メディカルネット|stock
3646|駅探|stock
3649|ファインデックス|stock
3662|エイチームホールディングス|stock
3664|ＷＩＺＥ|stock
3665|エニグモ|stock
3671|ソフトマックス|stock
3679|じげん|stock
3697|ＳＨＩＦＴ|stock
3710|ジョルダン|stock
3712|情報企画|stock
3726|フォーシーズＨＤ|stock
3744|サイオス|stock
3750|ＡＤＲバイオメディカルホールディングス|stock
3758|アエリア|stock
3768|リスクモンスター|stock
3779|ジェイ・エスコムホールディングス|stock
3787|テクノマセマティカル|stock
3798|ＵＬＳグループ|stock
3802|エコミック|stock
3803|イメージ情報開発|stock
3826|システムインテグレータ|stock
3834|朝日ネット|stock
3839|ＯＤＫソリューションズ|stock
3842|ネクストジェン|stock
3848|データ・アプリケーション|stock
3861|王子ホールディングス|stock
3865|北越コーポレーション|stock
3878|巴川コーポレーション|stock
3880|大王製紙|stock
3895|ハビックス|stock
3896|阿波製紙|stock
3908|コラボス|stock
3909|ショーケース|stock
3910|エムケイシステム|stock
3916|デジタル・インフォメーション・テクノロジー|stock
3939|カナミックネットワーク|stock
3951|朝日印刷|stock
3953|大村紙業|stock
3955|イムラ|stock
3958|笹徳印刷|stock
3965|キャピタル・アセット・プランニング|stock
3974|ＳＣＡＴ|stock
3979|うるる|stock
3986|ビーブレイクシステムズ|stock
3988|ＳＹＳホールディングス|stock
3991|ウォンテッドリー|stock
4005|住友化学|stock
4013|勤次郎|stock
4016|ＭＩＴホールディングス|stock
4019|スタメン|stock
4020|ビートレンド|stock
4053|Ｓｕｎ　Ａｓｔｅｒｉｓｋ|stock
4054|日本情報クリエイト|stock
4059|まぐまぐ|stock
4069|ＢｌｕｅＭｅｍｅ|stock
4073|ジィ・シィ企画|stock
4075|ブレインズテクノロジー|stock
4093|東邦アセチレン|stock
4113|田岡化学工業|stock
4166|かっこ|stock
4169|ＥＮＥＣＨＡＮＧＥ|stock
4170|Ｋａｉｚｅｎ　Ｐｌａｔｆｏｒｍ|stock
4174|アピリッツ|stock
4178|Ｓｈａｒｉｎｇ　Ｉｎｎｏｖａｔｉｏｎｓ|stock
4180|Ａｐｐｉｅｒ　Ｇｒｏｕｐ|stock
4198|テンダ|stock
4199|ワンダープラネット|stock
4222|児玉化学工業|stock
4228|積水化成品工業|stock
4234|サンエー化研|stock
4235|ウルトラファブリックス・ホールディングス|stock
4237|フジプレアム|stock
4240|クラスターテクノロジー|stock
4241|アテクト|stock
4243|ニックス|stock
4245|ダイキアクシス|stock
4248|竹本容器|stock
4256|サインド|stock
4259|エクサウィザーズ|stock
4284|ソルクシーズ|stock
4287|ジャストプランニング|stock
4288|アズジェント|stock
4290|プレステージ・インターナショナル|stock
4293|セプテーニ・ホールディングス|stock
4308|Ｊストリーム|stock
4318|クイック|stock
4331|テイクアンドギヴ・ニーズ|stock
4334|ユークス|stock
4341|西菱電機|stock
4345|シーティーエス|stock
4346|ＮＥＸＹＺ．Ｇｒｏｕｐ|stock
4350|メディカルシステムネットワーク|stock
4351|山田再生系債権回収総合事務所|stock
4360|マナック・ケミカル・パートナーズ|stock
4376|くふうカンパニーホールディングス|stock
4379|Ｐｈｏｔｏｓｙｎｔｈ|stock
4380|Ｍマート|stock
4381|ビープラッツ|stock
4386|ＳＩＧグループ|stock
4387|ＺＵＵ|stock
4388|エーアイ|stock
4392|ＦＩＧ|stock
4394|エクスモーション|stock
4395|アクリート|stock
4397|チームスピリット|stock
4406|新日本理化|stock
4409|東邦化学工業|stock
4416|Ｔｒｕｅ　Ｄａｔａ|stock
4420|イーソル|stock
4421|ディ・アイ・システム|stock
4422|ＶＡＬＵＥＮＥＸ|stock
4428|シノプス|stock
4429|リックソフト|stock
4433|ヒト・コミュニケーションズ・ホールディングス|stock
4437|ｇｏｏｄｄａｙｓホールディングス|stock
4438|Ｗｅｌｂｙ|stock
4439|東名|stock
4444|インフォネット|stock
4447|ピー・ビーシステムズ|stock
4448|ｋｕｂｅｌｌ|stock
4479|マクアケ|stock
4482|ウィルズ|stock
4486|ユナイトアンドグロウ|stock
4487|スペースマーケット|stock
4492|ゼネテック|stock
4496|コマースＯｎｅホールディングス|stock
4512|わかもと製薬|stock
4531|有機合成薬品工業|stock
4548|生化学工業|stock
4552|ＪＣＲファーマ|stock
4558|中京医薬品|stock
4570|免疫生物研究所|stock
4574|大幸薬品|stock
4599|ステムリム|stock
4615|神東塗料|stock
4620|藤倉化成|stock
4625|アトミクス|stock
4641|アルプス技研|stock
4645|市進ホールディングス|stock
4650|ＳＤエンターテイメント|stock
4651|サニックスホールディングス|stock
4657|環境管理センター|stock
4668|明光ネットワークジャパン|stock
4678|秀英予備校|stock
4679|田谷|stock
4687|ＴＤＣソフト|stock
4689|ＬＩＮＥヤフー|stock
4705|クリップコーポレーション|stock
4707|キタック|stock
4712|ＫｅｙＨｏｌｄｅｒ|stock
4714|リソー教育グループ|stock
4720|城南進学研究社|stock
4728|トーセ|stock
4735|京進|stock
4736|日本ラッド|stock
4750|ダイサン|stock
4755|楽天グループ|stock
4765|ＳＢＩグローバルアセットマネジメント|stock
4766|ピーエイ|stock
4767|テー・オー・ダブリュー|stock
4772|ＳＭ　ＥＮＴＥＲＴＡＩＮＭＥＮＴ　ＪＡＰＡＮ|stock
4777|ガーラ|stock
4784|ＧＭＯインターネット|stock
4811|ドリーム・アーツ|stock
4813|ＡＣＣＥＳＳ|stock
4814|ネクストウェア|stock
4820|イーエムシステムズ|stock
4826|ＣＩＪ|stock
4829|日本エンタープライズ|stock
4838|スペースシャワーＳＫＩＹＡＫＩホールディングス|stock
4839|ＷＯＷＯＷ|stock
4840|トライアイズ|stock
4845|スカラ|stock
4847|インテリジェント　ウェイブ|stock
4880|セルソース|stock
4885|室町ケミカル|stock
4896|ケイファーマ|stock
4902|コニカミノルタ|stock
4929|アジュバンホールディングス|stock
4932|アルマード|stock
4936|アクシージア|stock
4960|ケミプロ化成|stock
4990|昭和化学工業|stock
4996|クミアイ化学工業|stock
5010|日本精蝋|stock
5015|ビーピー・カストロール|stock
5026|トリプルアイズ|stock
5027|ＡｎｙＭｉｎｄ　Ｇｒｏｕｐ|stock
5028|セカンドサイトアナリティカ|stock
5029|サークレイス|stock
5033|ヌーラボ|stock
5074|テスホールディングス|stock
5103|昭和ホールディングス|stock
5125|ファインズ|stock
5133|テリロジーホールディングス|stock
5138|Ｒｅｂａｓｅ|stock
5139|オープンワーク|stock
5162|朝日ラバー|stock
5194|相模ゴム工業|stock
5202|日本板硝子|stock
5244|ｊｉｇ．ｊｐ|stock
5252|日本ナレッジ|stock
5268|旭コンクリート工業|stock
5269|日本コンクリート工業|stock
5282|ジオスター|stock
5287|イトーヨーギョー|stock
5337|ダントーホールディングス|stock
5341|ＡＳＡＨＩ　ＥＩＴＯホールディングス|stock
5355|日本坩堝|stock
5363|東京窯業|stock
5381|マイポックス|stock
5401|日本製鉄|stock
5408|中山製鋼所|stock
5464|モリ工業|stock
5491|日本金属|stock
5527|ｐｒｏｐｅｒｔｙ　ｔｅｃｈｎｏｌｏｇｉｅｓ|stock
5535|ミガロホールディングス|stock
5542|新報国マテリアル|stock
5563|新日本電工|stock
5570|ジェノバ|stock
5571|エキサイトホールディングス|stock
5578|ＡＲアドバンストテクノロジ|stock
5587|インバウンドプラットフォーム|stock
5588|ファーストアカウンティング|stock
5590|ネットスターズ|stock
5591|ＡＶＩＬＥＮ|stock
5609|日本鋳造|stock
5616|雨風太陽|stock
5618|ナイル|stock
5619|マーソ|stock
5658|日亜鋼業|stock
5697|サンユウ|stock
5698|エンビプロ・ホールディングス|stock
5704|ＪＭＣ|stock
5707|東邦亜鉛|stock
5742|エヌアイシ・オートテック|stock
5820|三ッ星|stock
5852|アーレスティ|stock
5868|ロココ|stock
5870|ナルネットコミュニケーションズ|stock
5884|クラダシ|stock
5900|ダイケン|stock
5906|エムケー精工|stock
5909|コロナ|stock
5928|アルメタックス|stock
5932|三協立山|stock
5936|東洋シヤッター|stock
5940|不二サッシ|stock
5942|日本フイルコン|stock
5950|日本パワーファスニング|stock
5952|アマテイ|stock
5956|トーソー|stock
5957|日東精工|stock
5959|岡部|stock
5967|ＴＯＮＥ|stock
5973|トーアミ|stock
5974|中国工業|stock
5984|兼房|stock
5986|モリテック　スチール|stock
5994|ファインシンター|stock
5997|協立エアテック|stock
6029|アトラグループ|stock
6034|ＭＲＴ|stock
6035|アイ・アールジャパンホールディングス|stock
6038|イード|stock
6040|日本スキー場開発|stock
6047|Ｇｕｎｏｓｙ|stock
6049|イトクロ|stock
6054|リブセンス|stock
6059|ウチヤマホールディングス|stock
6071|ＩＢＪ|stock
6074|ジェイエスエス|stock
6082|ライドオンエクスプレスホールディングス|stock
6088|シグマクシス・ホールディングス|stock
6090|ヒューマン・メタボローム・テクノロジーズ|stock
6091|ウエスコホールディングス|stock
6092|エンバイオ・ホールディングス|stock
6093|ミトラグループ|stock
6099|エラン|stock
6147|ヤマザキ|stock
6155|高松機械工業|stock
6157|日進工具|stock
6158|和井田製作所|stock
6165|パンチ工業|stock
6166|中村超硬|stock
6167|冨士ダイス|stock
6171|土木管理総合試験所|stock
6176|ブランジスタ|stock
6184|鎌倉新書|stock
6185|ＳＭＮ|stock
6186|一蔵|stock
6189|グローバルキッズＣＯＭＰＡＮＹ|stock
6190|フェニックスバイオ|stock
6191|エアトリ|stock
6194|アトラエ|stock
6198|キャリア|stock
6200|インソース|stock
6217|津田駒工業|stock
6218|エンシュウ|stock
6222|島精機製作所|stock
6228|ジェイ・イー・ティ|stock
6233|ＫＬＡＳＳ|stock
6240|ヤマシンフィルタ|stock
6262|ＰＥＧＡＳＵＳ|stock
6276|シリウスビジョン|stock
6279|瑞光|stock
6292|カワタ|stock
6306|日工|stock
6307|サンセイ|stock
6325|タカキタ|stock
6334|明治機械|stock
6347|プラコー|stock
6366|千代田化工建設|stock
6400|不二精機|stock
6424|高見沢サイバネティックス|stock
6425|ユニバーサルエンターテインメント|stock
6428|オーイズミ|stock
6433|ヒーハイスト|stock
6440|ＪＵＫＩ|stock
6444|サンデン|stock
6467|ニチダイ|stock
6472|ＮＴＮ|stock
6482|ＹＵＳＨＩＮ|stock
6488|ヨシタケ|stock
6493|ＮＩＴＴＡＮ|stock
6495|宮入バルブ製作所|stock
6535|アイモバイル|stock
6538|ディスラプターズ|stock
6539|ＭＳ－Ｊａｐａｎ|stock
6545|インターネットインフィニティー|stock
6548|旅工房|stock
6551|ツナググループ・ホールディングス|stock
6552|ＧａｍｅＷｉｔｈ|stock
6555|ＭＳ＆Ｃｏｎｓｕｌｔｉｎｇ|stock
6557|ＡＩＡＩグループ|stock
6558|クックビズ|stock
6561|ＨＡＮＡＴＯＵＲ　ＪＡＰＡＮ|stock
6563|みらいワークス|stock
6572|オープングループ|stock
6574|コンヴァノ|stock
6578|コレックホールディングス|stock
6579|ログリー|stock
6580|ライトアップ|stock
6584|三櫻工業|stock
6612|バルミューダ|stock
6614|シキノハイテック|stock
6615|ユー・エム・シー・エレクトロニクス|stock
6620|宮越ホールディングス|stock
6625|ＪＡＬＣＯホールディングス|stock
6630|ヤーマン|stock
6632|ＪＶＣケンウッド|stock
6633|ＣＧＳホールディングス|stock
6635|大日光・エンジニアリング|stock
6658|シライ電子工業|stock
6662|ユビテック|stock
6663|太洋テクノレックス|stock
6664|オプトエレクトロニクス|stock
6666|リバーエレテック|stock
6694|ズーム|stock
6699|ダイヤモンドエレクトリックホールディングス|stock
6727|ワコム|stock
6742|京三製作所|stock
6743|大同信号|stock
6748|星和電機|stock
6753|シャープ|stock
6757|ＯＳＧコーポレーション|stock
6768|タムラ製作所|stock
6771|池上通信機|stock
6776|天昇電気工業|stock
6778|アルチザネットワークス|stock
6786|ＲＶＨ|stock
6803|ティアック|stock
6819|伊豆シャボテンリゾート|stock
6836|ぷらっとホーム|stock
6840|ＡＫＩＢＡホールディングス|stock
6848|東亜ディーケーケー|stock
6853|共和電業|stock
6858|小野測器|stock
6863|ニレコ|stock
6867|リーダー電子|stock
6888|アクモス|stock
6897|ツインバード|stock
6904|原田工業|stock
6907|ジオマテック|stock
6926|岡谷電機産業|stock
6958|日本シイエムケイ|stock
6962|大真空|stock
6964|サンコー|stock
6966|三井ハイテック|stock
6982|リード|stock
6986|双葉電子工業|stock
7022|サノヤスホールディングス|stock
7031|インバウンドテック|stock
7034|プロレド・パートナーズ|stock
7035|ａｎｄ　ｆａｃｔｏｒｙ|stock
7036|イーエムネットジャパン|stock
7037|テノ．ホールディングス|stock
7038|フロンティア・マネジメント|stock
7040|サン・ライフホールディング|stock
7041|ＣＲＧホールディングス|stock
7042|アクセスグループ・ホールディングス|stock
7043|アルー|stock
7044|ピアラ|stock
7048|ベルトラ|stock
7049|識学|stock
7057|エヌ・シー・エヌ|stock
7059|コプロ・ホールディングス|stock
7060|ギークス|stock
7061|日本ホスピスホールディングス|stock
7062|フレアス|stock
7064|ハウテレビジョン|stock
7065|ユーピーアール|stock
7066|ピアズ|stock
7067|ブランディングテクノロジー|stock
7068|フィードフォースグループ|stock
7069|サイバー・バズ|stock
7071|アンビスホールディングス|stock
7074|トゥエンティーフォーセブンホールディングス|stock
7075|ＱＬＳホールディングス|stock
7078|ＩＮＣＬＵＳＩＶＥ　Ｈｏｌｄｉｎｇｓ|stock
7080|スポーツフィールド|stock
7085|カーブスホールディングス|stock
7090|リグア|stock
7093|アディッシュ|stock
7096|ステムセル研究所|stock
7112|キューブ|stock
7114|フーディソン|stock
7127|一家ホールディングス|stock
7135|ジャパンクラフトホールディングス|stock
7140|ペットゴー|stock
7150|島根銀行|stock
7161|じもとホールディングス|stock
7192|日本モーゲージサービス|stock
7196|Ｃａｓａ|stock
7198|ＳＢＩアルヒ|stock
7212|エフテック|stock
7213|レシップホールディングス|stock
7215|ファルテック|stock
7217|テイン|stock
7222|日産車体|stock
7238|曙ブレーキ工業|stock
7244|市光工業|stock
7246|プレス工業|stock
7247|ミクニ|stock
7254|ユニバンス|stock
7255|桜井製作所|stock
7266|今仙電機製作所|stock
7271|安永|stock
7273|イクヨ|stock
7277|ＴＢＫ|stock
7291|日本プラスト|stock
7294|ヨロズ|stock
7297|カーメイト|stock
7325|アイリックコーポレーション|stock
7345|アイ・パートナーズフィナンシャル|stock
7347|マーキュリアホールディングス|stock
7353|ＫＩＹＯラーニング|stock
7354|ダイレクトマーケティングミックス|stock
7356|Ｒｅｔｔｙ|stock
7360|オンデック|stock
7362|Ｔ．Ｓ．Ｉ|stock
7367|セルム|stock
7369|メイホーホールディングス|stock
7371|Ｚｅｎｋｅｎ|stock
7372|デコルテ・ホールディングス|stock
7399|ナンシン|stock
7416|はるやまホールディングス|stock
7422|東邦レマック|stock
7426|山大|stock
7427|エコートレーディング|stock
7442|中山福|stock
7443|横浜魚類|stock
7461|キムラ|stock
7462|ＣＡＰＩＴＡ|stock
7463|アドヴァングループ|stock
7486|サンリン|stock
7494|コナカ|stock
7512|イオン北海道|stock
7514|ヒマラヤ|stock
7522|ワタミ|stock
7524|マルシェ|stock
7532|パン・パシフィック・インターナショナルホールディングス|stock
7538|大水|stock
7539|アイナボホールディングス|stock
7544|スリーエフ|stock
7551|ウェッズ|stock
7555|大田花き|stock
7561|ハークスレイホールディングス|stock
7567|栄電子|stock
7571|ヤマノホールディングス|stock
7578|ニチリョク|stock
7585|かんなん丸|stock
7590|タカショー|stock
7593|ＶＴホールディングス|stock
7600|日本エム・ディ・エム|stock
7602|レダックス|stock
7604|梅の花グループ|stock
7608|エスケイジャパン|stock
7619|田中商事|stock
7624|ＮａＩＴＯ|stock
7625|グローバルダイニング|stock
7630|壱番屋|stock
7636|ハンズマン|stock
7640|トップカルチャー|stock
7681|レオクラン|stock
7686|ひとまいる|stock
7687|ミクリード|stock
7689|コパ・コーポレーション|stock
7692|アースインフィニティ|stock
7694|いつも|stock
7695|交換できるくん|stock
7702|ＪＭＳ|stock
7709|クボテック|stock
7722|国際計測器|stock
7727|オーバル|stock
7743|シード|stock
7746|岡本硝子|stock
7774|ジャパン・ティッシュエンジニアリング|stock
7775|大研医器|stock
7781|平山ホールディングス|stock
7782|シンシア|stock
7791|ドリームベッド|stock
7794|イーディーピー|stock
7795|ＫＹＯＲＩＴＳＵ|stock
7800|アミファ|stock
7805|プリントネット|stock
7807|幸和製作所|stock
7810|クロスフォー|stock
7813|プラッツ|stock
7814|日本創発グループ|stock
7819|粧美堂|stock
7820|ニホンフラッシュ|stock
7822|永大産業|stock
7823|アートネイチャー|stock
7833|アイフィスジャパン|stock
7836|アビックス|stock
7837|アールシーコア|stock
7844|マーベラス|stock
7847|グラファイトデザイン|stock
7850|総合商研|stock
7851|カワセコンピュータサプライ|stock
7859|アルメディオ|stock
7863|平賀|stock
7865|ピープル|stock
7868|広済堂ホールディングス|stock
7871|フクビ化学工業|stock
7872|エステールホールディングス|stock
7874|レック|stock
7875|竹田ｉＰホールディングス|stock
7879|ノダ|stock
7883|サンメッセ|stock
7886|ヤマト　モビリティ　＆　Ｍｆｇ．|stock
7888|三光合成|stock
7896|セブン工業|stock
7897|ホクシン|stock
7898|ウッドワン|stock
7901|マツモト|stock
7908|きもと|stock
7918|ヴィア・ホールディングス|stock
7919|野崎印刷紙業|stock
7928|旭化学工業|stock
7939|研創|stock
7946|光陽社|stock
7953|菊水化学工業|stock
7955|クリナップ|stock
7962|キングジム|stock
7971|東リ|stock
7980|重松製作所|stock
7984|コクヨ|stock
7985|ネポン|stock
7987|ナカバヤシ|stock
7992|セーラー万年筆|stock
8007|高島|stock
8013|ナイガイ|stock
8016|オンワードホールディングス|stock
8018|三共生興|stock
8023|ＤＡＩＫＯ　ＸＴＥＣＨ|stock
8046|丸藤シートパイル|stock
8070|東京産業|stock
8077|トルク|stock
8095|アステナホールディングス|stock
8103|明和産業|stock
8104|クワザワホールディングス|stock
8113|ユニ・チャーム|stock
8119|三栄コーポレーション|stock
8127|ヤマトインターナショナル|stock
8135|ゼット|stock
8143|ラピーヌ|stock
8165|千趣会|stock
8166|タカキュー|stock
8185|チヨダ|stock
8203|ＭｒＭａｘＨＤ|stock
8207|テンアライド|stock
8217|オークワ|stock
8219|青山商事|stock
8226|理経|stock
8230|はせがわ|stock
8247|大和|stock
8260|井筒屋|stock
8273|イズミ|stock
8275|フォーバル|stock
8285|三谷産業|stock
8291|日産東京販売ホールディングス|stock
8338|筑波銀行|stock
8346|東邦銀行|stock
8410|セブン銀行|stock
8508|Ｊトラスト|stock
8518|日本アジア投資|stock
8562|福島銀行|stock
8572|アコム|stock
8585|オリエントコーポレーション|stock
8614|東洋証券|stock
8616|東海東京フィナンシャル・ホールディングス|stock
8617|光世証券|stock
8622|水戸証券|stock
8698|マネックスグループ|stock
8705|日産証券グループ|stock
8729|ソニーフィナンシャルグループ|stock
8737|あかつき本社|stock
8742|小林洋行|stock
8769|アドバンテッジリスクマネジメント|stock
8772|アサックス|stock
8835|太平洋興発|stock
8836|ＲＩＳＥ|stock
8841|テーオーシー|stock
8848|レオパレス２１|stock
8860|フジ住宅|stock
8864|空港施設|stock
8869|明和地所|stock
8881|日神グループホールディングス|stock
8887|シーラホールディングス|stock
8897|ＭＩＲＡＲＴＨホールディングス|stock
8904|ＡＶＡＮＴＩＡ|stock
8908|毎日コムネット|stock
8912|エリアクエスト|stock
8914|エリアリンク|stock
8920|東祥|stock
8927|明豊エンタープライズ|stock
8938|グローム・ホールディングス|stock
8944|ランドビジネス|stock
8999|グランディハウス|stock
9008|京王電鉄|stock
9033|広島電鉄|stock
9059|カンダホールディングス|stock
9090|ＡＺ－ＣＯＭ丸和ホールディングス|stock
9115|明海グループ|stock
9145|ビーイングホールディングス|stock
9158|シーユーシー|stock
9160|オンザページ|stock
9162|ブリーチ|stock
9168|ライズ・コンサルティング・グループ|stock
9193|東京汽船|stock
9212|Ｇｒｅｅｎ　Ｅａｒｔｈ　Ｉｎｓｔｉｔｕｔｅ|stock
9215|ＣａＳｙ|stock
9218|メンタルヘルステクノロジーズ|stock
9219|ギックス|stock
9223|ＡＳＮＯＶＡ|stock
9225|ブリッジコンサルティンググループ|stock
9235|売れるネット広告社グループ|stock
9237|笑美面|stock
9238|バリュークリエーション|stock
9240|デリバリーコンサルティング|stock
9250|ＧＲＣＳ|stock
9253|スローガン|stock
9258|ＣＳ－Ｃ|stock
9259|タカヨシホールディングス|stock
9262|シルバーライフ|stock
9268|オプティマスグループ|stock
9273|コーア商事ホールディングス|stock
9307|杉村倉庫|stock
9327|イー・ロジット|stock
9330|揚羽|stock
9331|キャスター|stock
9332|ＮＩＳＳＯホールディングス|stock
9340|アソインターナショナル|stock
9341|ＧＥＮＯＶＡ|stock
9342|スマサポ|stock
9343|アイビス|stock
9344|アクシスコンサルティング|stock
9345|ビズメイツ|stock
9363|大運|stock
9368|キムラユニティー|stock
9376|ユーラシア旅行社|stock
9380|東海運|stock
9385|ショーエイコーポレーション|stock
9405|朝日放送グループホールディングス|stock
9414|日本ＢＳ放送|stock
9417|スマートバリュー|stock
9419|ワイヤレスゲート|stock
9421|エヌジェイホールディングス|stock
9423|フォーバル・リアルストレート|stock
9432|ＮＴＴ|stock
9434|ソフトバンク|stock
9438|エムティーアイ|stock
9445|フォーバルテレコム|stock
9446|サカイホールディングス|stock
9450|ファイバーゲート|stock
9466|アイドママーケティングコミュニケーション|stock
9470|学研ホールディングス|stock
9474|ゼンリン|stock
9475|昭文社ホールディングス|stock
9476|中央経済社ホールディングス|stock
9478|ＳＥホールディングス・アンド・インキュベーションズ|stock
9501|東京電力ホールディングス|stock
9504|中国電力|stock
9505|北陸電力|stock
9517|イーレックス|stock
9519|レノバ|stock
9534|北海道瓦斯|stock
9535|広島ガス|stock
9552|クオンツ総研ホールディングス|stock
9553|マイクロアド|stock
9562|ビジネスコーチ|stock
9563|Ａｔｌａｓ　Ｔｅｃｈｎｏｌｏｇｉｅｓ|stock
9564|ＦＣＥ|stock
9625|セレスポ|stock
9644|タナベコンサルティンググループ|stock
9656|グリーンランドリゾート|stock
9685|ＫＹＣＯＭホールディングス|stock
9704|アゴーラ　ホスピタリティー　グループ|stock
9708|帝国ホテル|stock
9713|ロイヤルホテル|stock
9723|京都ホテル|stock
9760|進学会ホールディングス|stock
9780|ハリマビステム|stock
9788|ナック|stock
9799|旭情報サービス|stock
9812|テーオーホールディングス|stock
9816|ストライダーズ|stock
9827|リリカラ|stock
9831|ヤマダホールディングス|stock
9835|ジュンテンドー|stock
9850|グルメ杵屋|stock
9853|銀座ルノアール|stock
9872|北恵|stock
9876|コックス|stock
9878|セキド|stock
9885|シャルレ|stock
9903|カンセキ|stock
9904|ベリテ|stock
9914|植松商会|stock
9929|平和紙業|stock
9930|北沢産業|stock
9969|ショクブン|stock
9972|アルテック|stock
9978|文教堂グループホールディングス|stock
9980|ＭＲＫホールディングス|stock
9990|サックスバー　ホールディングス|stock
9997|ベルーナ|stock
1332|ニッスイ|stock
1333|Ｕｍｉｏｓ|stock
1375|ユキグニファクトリー|stock
1376|カネコ種苗|stock
1379|ホクト|stock
1401|エムビーエス|stock
1414|ショーボンドホールディングス|stock
1433|ベステラ|stock
1450|ＴＡＮＡＫＥＮ|stock
1662|石油資源開発|stock
1663|Ｋ＆Ｏエナジーグループ|stock
1719|安藤・間|stock
1720|東急建設|stock
1768|ソネック|stock
1780|ヤマウラ|stock
1798|守谷商会|stock
1807|佐藤渡辺|stock
1810|松井建設|stock
1826|佐田建設|stock
1860|戸田建設|stock
1861|熊谷組|stock
1866|北野建設|stock
1870|矢作建設工業|stock
1882|東亜道路工業|stock
1898|世紀東急工業|stock
1905|テノックス|stock
1911|住友林業|stock
1929|日特建設|stock
1930|北陸電気工事|stock
1960|サンテック|stock
1972|三晃金属工業|stock
1976|明星工業|stock
1981|協和日成|stock
2002|日清製粉グループ本社|stock
2003|日東富士製粉|stock
2009|鳥越製粉|stock
2053|中部飼料|stock
2060|フィード・ワン|stock
2122|インタースペース|stock
2136|ヒップ|stock
2148|アイティメディア|stock
2152|幼児活動研究会|stock
2153|Ｅ・Ｊホールディングス|stock
2154|オープンアップグループ|stock
2157|コシダカホールディングス|stock
2168|パソナグループ|stock
2169|ＣＤＳ|stock
2180|サニーサイドアップグループ|stock
2185|シイエム・シイ|stock
2216|カンロ|stock
2217|モロゾフ|stock
2220|亀田製菓|stock
2264|森永乳業|stock
2266|六甲バター|stock
2301|学情|stock
2305|スタジオアリス|stock
2331|ＡＬＳＯＫ|stock
2332|クエスト|stock
2335|キューブシステム|stock
2354|ＹＥ　ＤＩＧＩＴＡＬ|stock
2378|ルネサンス|stock
2391|プラネット|stock
2413|エムスリー|stock
2415|ヒューマンホールディングス|stock
2433|博報堂ＤＹホールディングス|stock
2449|プラップジャパン|stock
2462|ライク|stock
2475|ＷＤＢホールディングス|stock
2480|システム・ロケーション|stock
2488|ＪＴＰ|stock
2501|サッポロビール|stock
2502|アサヒグループホールディングス|stock
2585|ライフドリンク　カンパニー|stock
2594|キーコーヒー|stock
2597|ユニカフェ|stock
2602|日清オイリオグループ|stock
2612|かどや製油|stock
2668|タビオ|stock
2678|アスクル|stock
2683|魚喜|stock
2689|オルバヘルスケアホールディングス|stock
2695|くら寿司|stock
2700|木徳神糧|stock
2708|久世|stock
2726|パルグループホールディングス|stock
2734|サーラコーポレーション|stock
2750|石光商事|stock
2752|フジオフードグループ本社|stock
2753|あみやき亭|stock
2801|キッコーマン|stock
2804|ブルドックソース|stock
2806|ユタカフーズ|stock
2816|ダイショー|stock
2818|ピエトロ|stock
2872|セイヒョー|stock
2883|大冷|stock
2903|シノブフーズ|stock
2907|あじかん|stock
2908|フジッコ|stock
2910|ロック・フィールド|stock
2915|ケンコーマヨネーズ|stock
2922|なとり|stock
2924|イフジ産業|stock
2932|ＳＴＩフードホールディングス|stock
2933|紀文食品|stock
2935|ピックルスホールディングス|stock
2937|サンクゼール|stock
2938|オカムラ食品工業|stock
2961|日本調理機|stock
2962|テクニスコ|stock
2975|スター・マイカ・ホールディングス|stock
2983|アールプランナー|stock
2997|ストレージ王|stock
3003|ヒューリック|stock
3021|パシフィックネット|stock
3024|クリエイト|stock
3040|ソリトンシステムズ|stock
3045|カワサキ|stock
3048|ビックカメラ|stock
3050|ＤＣＭホールディングス|stock
3063|ジェイグループホールディングス|stock
3064|ＭｏｎｏｔａＲＯ|stock
3065|ライフフーズ|stock
3075|銚子丸|stock
3089|テクノアルファ|stock
3092|ＺＯＺＯ|stock
3096|オーシャンシステム|stock
3101|東洋紡|stock
3135|マーケットエンタープライズ|stock
3138|富士山マガジンサービス|stock
3140|ＢＲＵＮＯ|stock
3151|バイタルケーエスケー・ホールディングス|stock
3157|ジオリーブグループ|stock
3166|ＯＣＨＩホールディングス|stock
3167|ＴＯＫＡＩホールディングス|stock
3172|ティーライフ|stock
3173|Ｃｏｍｉｎｉｘ|stock
3178|チムニー|stock
3179|シュッピン|stock
3180|ビューティガレージ|stock
3181|買取王国|stock
3182|オイシックス|stock
3183|ウイン・パートナーズ|stock
3193|エターナルホスピタリティグループ|stock
3196|ホットランドホールディングス|stock
3199|綿半ホールディングス|stock
3201|日本毛織|stock
3297|東武住販|stock
3299|ムゲンエステート|stock
3317|フライングガーデン|stock
3320|クロスプラス|stock
3321|ミタチ産業|stock
3352|バッファロー|stock
3355|クリヤマホールディングス|stock
3371|ソフトクリエイトホールディングス|stock
3375|ＺＯＡ|stock
3382|セブン＆アイ・ホールディングス|stock
3401|帝人|stock
3402|東レ|stock
3405|クラレ|stock
3407|旭化成|stock
3417|大木ヘルスケアホールディングス|stock
3420|ケー・エフ・シー|stock
3421|稲葉製作所|stock
3426|アトムリビンテック|stock
3431|宮地エンジニアリンググループ|stock
3434|アルファＣｏ|stock
3435|サンコーテクノ|stock
3443|川田テクノロジーズ|stock
3447|信和|stock
3479|ＴＫＰ|stock
3484|イノベーションホールディングス|stock
3491|ＧＡ　ｔｅｃｈｎｏｌｏｇｉｅｓ|stock
3501|ＳＵＭＩＮＯＥ|stock
3524|日東製網|stock
3537|昭栄薬品|stock
3539|ＪＭホールディングス|stock
3542|ベガコーポレーション|stock
3544|サツドラホールディングス|stock
3547|ユニシアホールディングス|stock
3551|ダイニック|stock
3583|オーベクス|stock
3600|フジックス|stock
3608|ＴＳＩホールディングス|stock
3633|ＧＭＯペパボ|stock
3635|コーエーテクモホールディングス|stock
3648|ＡＧＳ|stock
3663|セルシス|stock
3670|協立情報通信|stock
3683|サイバーリンクス|stock
3695|ＧＭＯプロダクトプラットフォーム|stock
3763|プロシップ|stock
3766|システムズ・デザイン|stock
3771|システムリサーチ|stock
3772|ウェルス・マネジメント|stock
3799|キーウェアソリューションズ|stock
3800|ユニリタ|stock
3816|大和コンピューター|stock
3841|ジーダット|stock
3844|コムチュア|stock
3851|日本一ソフトウェア|stock
3864|三菱製紙|stock
3892|岡山製紙|stock
3931|バリューゴルフ|stock
3941|レンゴー|stock
3943|大石産業|stock
3948|光ビジネスフォーム|stock
3950|ザ・パック|stock
3964|オークネット|stock
3969|エイトレッド|stock
3989|シェアリングテクノロジー|stock
4008|住友精化|stock
4012|アクシス|stock
4026|神島化学工業|stock
4031|片倉コープアグリ|stock
4045|東亞合成|stock
4046|大阪ソーダ|stock
4060|ｒａｋｕｍｏ|stock
4068|ベイシス|stock
4074|ラキール|stock
4076|シイエヌエス|stock
4082|第一稀元素化学工業|stock
4095|日本パーカライジング|stock
4097|高圧ガス工業|stock
4098|チタン工業|stock
4100|戸田工業|stock
4102|丸尾カルシウム|stock
4116|大日精化工業|stock
4171|グローバルインフォメーション|stock
4177|ｉ‐ｐｌｕｇ|stock
4188|三菱ケミカルグループ|stock
4196|ネオマーケティング|stock
4202|ダイセル|stock
4218|ニチバン|stock
4231|タイガースポリマー|stock
4238|ミライアル|stock
4242|タカギセイコー|stock
4246|ダイキョーニシカワ|stock
4247|ポバール興業|stock
4251|恵和|stock
4262|ニフティライフスタイル|stock
4270|ＢｅｅＸ|stock
4274|細谷火工|stock
4286|ＣＬホールディングス|stock
4299|ハイマックス|stock
4301|アミューズ|stock
4320|ＣＥホールディングス|stock
4323|日本システム技術|stock
4326|インテージホールディングス|stock
4335|ＩＰＳホールディングス|stock
4347|ブロードメディア|stock
4356|応用技術|stock
4361|川口化学工業|stock
4371|コアコンセプト・テクノロジー|stock
4372|ユミルリンク|stock
4373|シンプレクス・ホールディングス|stock
4389|プロパティデータバンク|stock
4391|ロジザード|stock
4396|システムサポートホールディングス|stock
4398|ブロードバンドセキュリティ|stock
4404|ミヨシ油脂|stock
4410|ハリマ化成グループ|stock
4415|ブロードエンタープライズ|stock
4419|Ｆｉｎａｔｅｘｔホールディングス|stock
4430|東海ソフト|stock
4440|ヴィッツ|stock
4441|トビラシステムズ|stock
4445|リビン・テクノロジーズ|stock
4475|ＨＥＮＮＧＥ|stock
4476|ＡＩ　ＣＲＯＳＳ|stock
4495|アイキューブドシステムズ|stock
4536|参天製薬|stock
4539|日本ケミファ|stock
4554|富士製薬工業|stock
4569|杏林製薬|stock
4577|ダイト|stock
4595|ミズホメディー|stock
4611|大日本塗料|stock
4612|日本ペイントホールディングス|stock
4623|アサヒペン|stock
4627|ナトコ|stock
4629|大伸化学|stock
4635|東京インキ|stock
4642|オリジナル設計|stock
4644|イマジニア|stock
4658|日本空調サービス|stock
4662|フォーカスシステムズ|stock
4664|アール・エス・シー|stock
4666|パーク２４|stock
4667|アイサンテクノロジー|stock
4674|クレスコ|stock
4680|ラウンドワン|stock
4681|リゾートトラスト|stock
4709|ＩＤホールディングス|stock
4725|ＣＡＣ　Ｈｏｌｄｉｎｇｓ|stock
4732|ユー・エス・エス|stock
4743|アイティフォー|stock
4751|サイバーエージェント|stock
4752|昭和システムエンジニアリング|stock
4754|トスネット|stock
4760|アルファ|stock
4761|さくらケーシーエス|stock
4763|クリーク・アンド・リバー社|stock
4769|ＩＣ|stock
4792|山田コンサルティンググループ|stock
4800|オリコン|stock
4825|ウェザーニューズ|stock
4828|ビジネスエンジニアリング|stock
4832|ＪＦＥシステムズ|stock
4848|フルキャストホールディングス|stock
4849|エン|stock
4886|あすか製薬ホールディングス|stock
4887|サワイグループホールディングス|stock
4889|レナサイエンス|stock
4912|ライオン|stock
4914|高砂香料工業|stock
4920|日本色材工業研究所|stock
4923|コタ|stock
4925|ハーバー研究所|stock
4926|シーボン|stock
4927|ポーラ・オルビスホールディングス|stock
4931|新日本製薬|stock
4933|Ｉ－ｎｅ|stock
4937|Ｗａｑｏｏ|stock
4951|エステー|stock
4956|コニシ|stock
4976|東洋ドライルーブ|stock
4977|新田ゼラチン|stock
4992|北興化学工業|stock
4997|日本農薬|stock
4998|フマキラー|stock
5019|出光興産|stock
5020|ＥＮＥＯＳホールディングス|stock
5036|日本ビジネスシステムズ|stock
5071|ヴィス|stock
5126|ポーターズ|stock
5142|アキレス|stock
5185|フコク|stock
5187|クリエートメディック|stock
5199|不二ラテックス|stock
5218|オハラ|stock
5237|ノザワ|stock
5250|ＧＭＯプライム・ストラテジー|stock
5262|日本ヒューム|stock
5273|三谷セキサン|stock
5279|日本興業|stock
5285|ヤマックス|stock
5288|アジアパイルホールディングス|stock
5290|ベルテクスコーポレーション|stock
5301|東海カーボン|stock
5356|美濃窯業|stock
5357|ヨータイ|stock
5367|ニッカトー|stock
5368|日本インシュレーション|stock
5380|新東|stock
5388|クニミネ工業|stock
5391|エーアンドエーマテリアル|stock
5406|神戸製鋼所|stock
5411|ＪＦＥホールディングス|stock
5423|東京製鐵|stock
5440|共英製鋼|stock
5445|東京鐵鋼|stock
5446|北越メタル|stock
5451|ヨドコウ|stock
5458|高砂鐵工|stock
5463|丸一鋼管|stock
5575|Ｇｌｏｂｅｅ|stock
5580|プロディライト|stock
5599|Ｓ＆Ｊ|stock
5602|栗本鐵工所|stock
5603|虹技|stock
5612|日本鋳鉄管|stock
5621|ヒューマンテクノロジーズ|stock
5659|日本精線|stock
5660|神鋼鋼線工業|stock
5699|イボキン|stock
5702|大紀アルミニウム工業所|stock
5729|日本精鉱|stock
5816|オーナンバ|stock
5817|ＪＭＡＣＳ|stock
5819|カナレ電気|stock
5845|全保連|stock
5858|ＳＴＧ|stock
5867|エスネットワークス|stock
5869|早稲田学習研究会|stock
5871|ＳＯＬＩＺＥ　Ｈｏｌｄｉｎｇｓ|stock
5891|ＳＡＫＩＧＡＫＥホールディングス|stock
5905|日本製罐|stock
5923|高田機工|stock
5930|文化シヤッター|stock
5933|アルインコ|stock
5938|ＬＩＸＩＬ|stock
5949|ユニプレス|stock
5951|ダイニチ工業|stock
5965|フジマック|stock
5969|ロブテックス|stock
5976|高周波熱錬|stock
5985|サンコール|stock
5987|オーネックス|stock
5988|パイオラックス|stock
5989|エイチワン|stock
5990|スーパーツール|stock
6030|アドベンチャー|stock
6037|楽待|stock
6039|日本動物高度医療センター|stock
6044|三機サービス|stock
6045|レントラックス|stock
6050|イー・ガーディアン|stock
6058|ベクトル|stock
6062|チャーム・ケア・コーポレーション|stock
6063|日本エマージェンシーアシスタンス|stock
6073|アサンテ|stock
6078|バリューＨＲ|stock
6083|ＥＲＩホールディングス|stock
6086|シンメンテホールディングス|stock
6089|ウィルグループ|stock
6118|アイダエンジニアリング|stock
6137|小池酸素工業|stock
6138|ダイジェット工業|stock
6140|旭ダイヤモンド工業|stock
6143|ソディック|stock
6151|日東工器|stock
6156|エーワン精密|stock
6159|ミクロン精密|stock
6161|エスティック|stock
6183|ベルシステム２４ホールディングス|stock
6193|バーチャレクス・ホールディングス|stock
6196|ストライクグループ|stock
6197|ソラスト|stock
6199|セラク|stock
6203|豊和工業|stock
6224|ＪＲＣ|stock
6229|オーケーエム|stock
6232|ＡＣＳＬ|stock
6238|フリュー|stock
6239|ナガオカ|stock
6245|ヒラノテクシード|stock
6246|テクノスマート|stock
6247|日阪製作所|stock
6248|横田製作所|stock
6257|藤商事|stock
6272|レオン自動機|stock
6286|靜甲|stock
6289|技研製作所|stock
6291|日本エアーテック|stock
6294|オカダアイヨン|stock
6298|ワイエイシイホールディングス|stock
6309|巴工業|stock
6310|井関農機|stock
6317|北川鉄工所|stock
6322|タクミナ|stock
6336|石井表記|stock
6339|新東工業|stock
6345|アイチ　コーポレーション|stock
6349|小森コーポレーション|stock
6356|日本ギア工業|stock
6378|木村化工機|stock
6381|アネスト岩田|stock
6382|トリニティ工業|stock
6384|昭和真空|stock
6390|加藤製作所|stock
6395|タダノ|stock
6402|兼松エンジニアリング|stock
6405|鈴茂器工|stock
6413|理想科学工業|stock
6417|ＳＡＮＫＹＯ|stock
6418|日本金銭機械|stock
6445|ジャノメ|stock
6454|マックス|stock
6458|新晃工業|stock
6459|だいわ|stock
6463|ＴＰＲ|stock
6470|大豊工業|stock
6471|日本精工|stock
6485|前澤給装工業|stock
6497|ハマイ|stock
6513|オリジン|stock
6523|ＰＨＣホールディングス|stock
6533|Ｏｒｃｈｅｓｔｒａ　Ｈｏｌｄｉｎｇｓ|stock
6540|船場|stock
6543|日宣|stock
6544|ジャパンエレベーターサービスホールディングス|stock
6546|フルテック|stock
6549|ディーエムソリューションズ|stock
6554|エスユーエス|stock
6560|エル・ティー・エス|stock
6562|ジーニー|stock
6566|要興業|stock
6568|神戸天然物化学|stock
6571|キュービーネットホールディングス|stock
6577|ベストワンドットコム|stock
6592|マブチモーター|stock
6629|テクノホライゾン|stock
6644|大崎電気工業|stock
6648|かわでん|stock
6654|不二電機工業|stock
6656|インスペック|stock
6678|テクノメディカ|stock
6730|アクセル|stock
6741|日本信号|stock
6750|エレコム|stock
6769|ザインエレクトロニクス|stock
6772|東京コスモス電機|stock
6797|名古屋電機工業|stock
6809|ＴＯＡ|stock
6817|スミダコーポレーション|stock
6838|多摩川ホールディングス|stock
6845|アズビル|stock
6849|日本光電工業|stock
6850|チノー|stock
6864|エヌエフホールディングス|stock
6869|シスメックス|stock
6882|三社電機製作所|stock
6902|デンソー|stock
6905|コーセル|stock
6919|ケル|stock
6942|ソフィアホールディングス|stock
6969|松尾電機|stock
6977|日本抵抗器製作所|stock
6994|指月電機製作所|stock
7004|カナデビア|stock
7030|スプリックス|stock
7033|マネジメントソリューションズ|stock
7039|ブリッジインターナショナルグループ|stock
7046|ＴＤＳＥ|stock
7050|フロンティアインターナショナル|stock
7077|ＡＬｉＮＫインターネット|stock
7081|コーユーレンティア|stock
7082|ジモティー|stock
7087|ウイルテック|stock
7089|フォースタートアップス|stock
7091|リビングプラットフォーム|stock
7095|Ｍａｃｂｅｅ　Ｐｌａｎｅｔ|stock
7110|クラシコム|stock
7115|アルファパーチェス|stock
7119|ハルメクホールディングス|stock
7120|ＳＨＩＮＫＯ|stock
7126|グローバルスタイル|stock
7129|ミアヘルサホールディングス|stock
7133|ＨＹＵＧＡ　ＰＲＩＭＡＲＹ　ＣＡＲＥ|stock
7134|アップガレージグループ|stock
7148|ＦＰＧ|stock
7157|ライフネット生命保険|stock
7167|めぶきフィナンシャルグループ|stock
7173|東京きらぼしフィナンシャルグループ|stock
7175|今村証券|stock
7177|ＧＭＯフィナンシャルホールディングス|stock
7180|九州フィナンシャルグループ|stock
7181|かんぽ生命保険|stock
7186|横浜フィナンシャルグループ|stock
7191|イントラスト|stock
7208|カネミツ|stock
7214|ＧＭＢ|stock
7218|田中精密工業|stock
7224|新明和工業|stock
7235|東京ラヂエーター製造|stock
7236|ティラド|stock
7241|フタバ産業|stock
7245|大同メタル工業|stock
7261|マツダ|stock
7264|ムロコーポレーション|stock
7267|本田技研工業|stock
7269|スズキ|stock
7272|ヤマハ発動機|stock
7280|ミツバ|stock
7284|盟和産業|stock
7299|フジオーゼックス|stock
7313|テイ・エス　テック|stock
7314|小田原機器|stock
7320|Ｓｏｌｖｖｙ|stock
7322|三十三フィナンシャルグループ|stock
7343|ブロードマインド|stock
7357|ジオコード|stock
7358|ポピンズ|stock
7361|ヒューマンクリエイションホールディングス|stock
7363|ベビーカレンダー|stock
7366|ＬＩＴＡＬＩＣＯ|stock
7368|表示灯|stock
7374|コンフィデンス・インターワークス|stock
7376|ＢＣＣ|stock
7377|ＤＮホールディングス|stock
7381|ＣＣＩグループ|stock
7389|あいちフィナンシャルグループ|stock
7409|ＡｅｒｏＥｄｇｅ|stock
7414|小野建|stock
7417|南陽|stock
7419|ノジマ|stock
7421|カッパ・クリエイト|stock
7425|初穂商事|stock
7434|オータケ|stock
7435|ナ・デックス|stock
7438|コンドーテック|stock
7444|ハリマ共和物産|stock
7447|ナガイレーベン|stock
7458|第一興商|stock
7460|ヤギ|stock
7464|セフテック|stock
7466|ＳＰＫ|stock
7477|ムラキ|stock
7482|シモジマ|stock
7487|小津産業|stock
7501|ティムコ|stock
7502|プラザホールディングス|stock
7506|ハウス　オブ　ローゼ|stock
7508|Ｇ‐７ホールディングス|stock
7513|コジマ|stock
7523|アールビバン|stock
7531|清和中央ホールディングス|stock
7537|丸文|stock
7545|西松屋チェーン|stock
7554|幸楽苑|stock
7570|橋本総業ホールディングス|stock
7575|日本ライフライン|stock
7595|アルゴグラフィックス|stock
7599|ＩＤＯＭ|stock
7613|シークス|stock
7614|オーエムツーネットワーク|stock
7616|コロワイド|stock
7628|オーハシテクニカ|stock
7638|ＮＥＷ　ＡＲＴ　ＨＯＬＤＩＮＧＳ|stock
7643|ダイイチ|stock
7646|ＰＬＡＮＴ|stock
7670|オーウエル|stock
7673|ダイコー通産|stock
7679|薬王堂ホールディングス|stock
7683|ダブルエー|stock
7725|インターアクション|stock
7726|黒田精工|stock
7730|マニー|stock
7731|ニコン|stock
7733|オリンパス|stock
7740|タムロン|stock
7752|リコー|stock
7780|メニコン|stock
7792|コラントッテ|stock
7793|イメージ・マジック|stock
7809|壽屋|stock
7811|中本パックス|stock
7818|トランザクション|stock
7821|前田工繊|stock
7827|オービス|stock
7839|ＳＨＯＥＩ|stock
7840|フランスベッドホールディングス|stock
7841|遠藤製作所|stock
7846|パイロットコーポレーション|stock
7856|萩原工業|stock
7857|セキ|stock
7860|エイベックス|stock
7878|光・彩|stock
7885|タカノ|stock
7887|南海プライウッド|stock
7893|プロネクサス|stock
7902|ソノコム|stock
7914|共同印刷|stock
7915|ＮＩＳＳＨＡ|stock
7916|光村印刷|stock
7917|ＺＡＣＲＯＳ|stock
7951|ヤマハ|stock
7956|ピジョン|stock
7957|フジコピアン|stock
7963|興研|stock
7965|象印マホービン|stock
7975|リヒトラブ|stock
7983|ミロク|stock
7986|日本アイ・エス・ケイ|stock
7991|マミヤ・オーピー|stock
7997|くろがね工作所|stock
8001|伊藤忠商事|stock
8005|スクロール|stock
8006|ユアサ・フナショク|stock
8012|長瀬産業|stock
8025|ツカモトコーポレーション|stock
8032|日本紙パルプ商事|stock
8040|東京ソワール|stock
8043|スターゼン|stock
8045|横浜丸魚|stock
8051|山善|stock
8053|住友商事|stock
8078|阪和興業|stock
8086|ニプロ|stock
8089|ナイス|stock
8093|極東貿易|stock
8115|ムーンバット|stock
8118|キング|stock
8123|川辺|stock
8125|ワキタ|stock
8136|サンリオ|stock
8141|新光商事|stock
8142|トーホー|stock
8144|デンキョーグループホールディングス|stock
8147|トミタ|stock
8158|ソーダニッカ|stock
8163|ＳＲＳホールディングス|stock
8167|リテールパートナーズ|stock
8179|ロイヤルホールディングス|stock
8181|東天紅|stock
8214|ＡＯＫＩホールディングス|stock
8244|近鉄百貨店|stock
8255|アクシアル　リテイリング|stock
8267|イオン|stock
8278|フジ|stock
8281|ゼビオホールディングス|stock
8282|ケーズホールディングス|stock
8303|ＳＢＩ新生銀行|stock
8309|三井住友トラストグループ|stock
8349|東北銀行|stock
8367|南都銀行|stock
8383|鳥取銀行|stock
8416|高知銀行|stock
8425|みずほリース|stock
8524|北洋銀行|stock
8542|トマト銀行|stock
8550|栃木銀行|stock
8558|東和銀行|stock
8563|大東銀行|stock
8570|イオンフィナンシャルサービス|stock
8593|三菱ＨＣキャピタル|stock
8596|九州リースサービス|stock
8600|トモニホールディングス|stock
8601|大和証券グループ本社|stock
8604|野村ホールディングス|stock
8609|岡三証券グループ|stock
8624|いちよし証券|stock
8628|松井証券|stock
8699|ＨＳホールディングス|stock
8700|丸八証券|stock
8706|極東証券|stock
8708|アイザワ証券グループ|stock
8714|池田泉州ホールディングス|stock
8715|アニコム　ホールディングス|stock
8750|第一ライフグループ|stock
8771|イー・ギャランティ|stock
8801|三井不動産|stock
8818|京阪神ビルディング|stock
8844|コスモスイニシア|stock
8876|リログループ|stock
8892|エスコン|stock
8898|センチュリー２１・ジャパン|stock
8917|ファースト住建|stock
8923|トーセイ|stock
8929|青山財産ネットワークス|stock
8931|和田興産|stock
8935|ＦＪネクストホールディングス|stock
8945|サンネクスタグループ|stock
8995|誠建設工業|stock
8996|ハウスフリーダム|stock
9005|東急|stock
9006|京浜急行電鉄|stock
9007|小田急電鉄|stock
9009|京成電鉄|stock
9017|新潟交通|stock
9023|東京地下鉄|stock
9029|ヒガシホールディングス|stock
9034|南総通運|stock
9036|東部ネットワーク|stock
9037|ハマキョウレックス|stock
9048|名古屋鉄道|stock
9051|センコン物流|stock
9052|山陽電気鉄道|stock
9064|ヤマトホールディングス|stock
9073|京極運輸商事|stock
9082|大和自動車交通|stock
9083|神姫バス|stock
9087|タカセ|stock
9119|飯野海運|stock
9130|共栄タンカー|stock
9143|ＳＧホールディングス|stock
9159|Ｗ　ＴＯＫＹＯ|stock
9165|クオルテック|stock
9171|栗林商船|stock
9206|スターフライヤー|stock
9211|エフ・コード|stock
9213|セイファート|stock
9214|Ｒｅｃｏｖｅｒｙ　Ｉｎｔｅｒｎａｔｉｏｎａｌ|stock
9216|ビーウィズ|stock
9220|エフビー介護サービス|stock
9221|フルハシＥＰＯ|stock
9233|アジア航測|stock
9236|ジャパンＭ＆Ａソリューション|stock
9241|フューチャーリンクネットワーク|stock
9242|メディア総研|stock
9244|デジタリフト|stock
9248|人・夢・技術グループ|stock
9249|日本エコシステム|stock
9251|ＡＢ＆Ｃｏｍｐａｎｙ|stock
9254|ラバブルマーケティンググループ|stock
9256|サクシード|stock
9264|ポエック|stock
9270|バリュエンスホールディングス|stock
9271|和心|stock
9272|ブティックス|stock
9274|ＫＰＰグループホールディングス|stock
9301|三菱倉庫|stock
9304|澁澤倉庫|stock
9308|乾汽船|stock
9310|日本トランスシティ|stock
9313|丸八倉庫|stock
9319|中央倉庫|stock
9325|ファイズホールディングス|stock
9337|トリドリ|stock
9339|コーチ・エィ|stock
9346|ココルポート|stock
9351|東洋埠頭|stock
9365|トレーディア|stock
9366|サンリツ|stock
9367|大東港運|stock
9418|Ｕ－ＮＥＸＴ　ＨＯＬＤＩＮＧＳ|stock
9428|クロップス|stock
9467|アルファポリス|stock
9506|東北電力|stock
9507|四国電力|stock
9508|九州電力|stock
9509|北海道電力|stock
9511|沖縄電力|stock
9533|東邦瓦斯|stock
9539|京葉瓦斯|stock
9543|静岡ガス|stock
9554|ＡＶｉＣ|stock
9558|ジャパニアス|stock
9602|東宝|stock
9603|エイチ・アイ・エス|stock
9612|ラックランド|stock
9622|スペース|stock
9628|燦ホールディングス|stock
9629|ピー・シー・エー|stock
9633|東京テアトル|stock
9658|ビジネスブレイン太田昭和|stock
9682|ＤＴＳ|stock
9686|東洋テック|stock
9698|クレオ|stock
9709|ＮＣＳ＆Ａ|stock
9716|乃村工藝社|stock
9722|藤田観光|stock
9726|ＫＮＴ－ＣＴホールディングス|stock
9743|丹青社|stock
9753|アイエックス・ナレッジ|stock
9757|船井総研ホールディングス|stock
9763|丸建リース|stock
9765|オオバ|stock
9767|日建工学|stock
9791|ビケンテクノ|stock
9818|大丸エナウィン|stock
9823|マミーマートホールディングス|stock
9832|オートバックスセブン|stock
9837|モリト|stock
9842|アークランズ|stock
9845|パーカーコーポレーション|stock
9846|天満屋ストア|stock
9856|ケーユーホールディングス|stock
9882|イエローハット|stock
9888|ＵＥＸ|stock
9889|ＪＢＣＣホールディングス|stock
9890|マキヤ|stock
9895|コンセック|stock
9896|ＪＫホールディングス|stock
9928|ミロク情報サービス|stock
9932|杉本商事|stock
9941|太洋物産|stock
9946|ミニストップ|stock
9959|アシードホールディングス|stock
9976|セキチュー|stock
9979|大庄|stock
9991|ジェコス|stock
9993|ヤマザワ|stock
`;

const TARGETS = RAW_TARGETS.trim()
  .split("\n")
  .map((line) => {
    const [code, name, kind] = line.split("|");
    return { code: code.trim(), name: name.trim(), kind: kind.trim() };
  })
  .filter((x, i, arr) => arr.findIndex((y) => y.code === x.code) === i)
  .filter((target) => target.kind !== "stock" || target.code !== "");

const TABS = [
  "💥爆上げ本命",
  "💥暴落本命",
  "💥爆上げ週月",
  "💥暴落週月",
  "💥爆上げ月足",
  "💥爆上げ週足",
  "👑超本命",
  "👑超本命売り",
  "🚀タートル速攻",
  "🚀タートル速攻売り",
  "FX買い(週足/月足)",
  "FX売り(週足/月足)",
  "🐉ドラゴン複合",
];
const DAILY_SCAN_TASK = "project-sh-daily-scan";

  // 貸借銘柄コード
const LENDING_CODES = new Set([
  "1514",
  "2586",
  "2926",
  "3133",
  "3350",
  "3660",
  "3778",
  "3903",
  "3993",
  "4165",
  "4344",
  "4477",
  "4506",
  "4565",
  "4568",
  "4587",
  "4592",
  "5803",
  "6619",
  "7014",
  "7201",
  "7211",
  "8304",
  "8704",
  "9166",
  "9348",
  "9424",
]);

function isLendingStock(code) {
  return LENDING_CODES.has(String(code));
}

// 貸借銘柄コード
// まずは監視したい貸借銘柄をここへ追加する




function parseNumber(v) {
  const n = Number(String(v ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function sma(values, period) {
  if (!values || values.length < period) return null;
  const arr = values.slice(-period);
  return arr.reduce((a, b) => a + b, 0) / period;
}
function calcBollingerUpper(closes, period = 20, mult = 2) {
  if (!closes || closes.length < period) return null;

  const values = closes.slice(-period);
  const mean = values.reduce((a, b) => a + b, 0) / period;

  const variance =
    values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    period;

  const stdDev = Math.sqrt(variance);

  return mean + stdDev * mult;
}
// Wilder方式(RMA平滑化)。TradingViewのRSIおよびcalcRSISeriesWilderと同じ計算式に統一済み
// (以前は単純平均のRSIだったため、表示RSIとheartBuy等の判定RSIが食い違っていた)
function calcRSI(closes, period = 14) {
  if (!closes || closes.length < period + 1) return null;

  let avgGain = 0;
  let avgLoss = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) avgGain += diff;
    else avgLoss += Math.abs(diff);
  }
  avgGain /= period;
  avgLoss /= period;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? Math.abs(diff) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}
function calcRCI(closes, period = 9) {
  if (!Array.isArray(closes) || closes.length < period) return null;

  const values = closes.slice(-period);
  const ranks = values.map((value, index) => {
    const lower = values.filter((v) => v < value).length;
    const sameBefore = values
      .slice(0, index)
      .filter((v) => v === value).length;
    return lower + 1 + sameBefore;
  });

  let sumD2 = 0;
  for (let i = 0; i < period; i += 1) {
    const d = i + 1 - ranks[i];
    sumD2 += d * d;
  }

  return (1 - (6 * sumD2) / (period * (period * period - 1))) * 100;
}
function calcATR(rows, period = 14) {
  if (!rows || rows.length < period + 1) return null;

  const trs = [];

  for (let i = rows.length - period; i < rows.length; i++) {
    const high = rows[i].high;
    const low = rows[i].low;
    const prevClose = rows[i - 1].close;

    if (!high || !low || !prevClose) continue;

    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );

    trs.push(tr);
  }

  if (!trs.length) return null;
  return trs.reduce((a, b) => a + b, 0) / trs.length;
}

// =====================
// UTボット（TradingViewのPineロジックをJSで再現）
// 追加するだけで、まだどこからも呼び出しません
// =====================
function calcATRSeriesWilder(rows, period = 10) {
  const n = rows.length;
  const tr = new Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    if (i === 0) {
      tr[i] = rows[i].high - rows[i].low;
    } else {
      tr[i] = Math.max(
        rows[i].high - rows[i].low,
        Math.abs(rows[i].high - rows[i - 1].close),
        Math.abs(rows[i].low - rows[i - 1].close)
      );
    }
  }

  const atr = new Array(n).fill(null);
  if (n < period) return atr;

  let sum = 0;
  for (let i = 0; i < period; i++) sum += tr[i];
  atr[period - 1] = sum / period;

  for (let i = period; i < n; i++) {
    atr[i] = (atr[i - 1] * (period - 1) + tr[i]) / period;
  }

  return atr;
}

// オーダーブロック検出(Pine Scriptのららまるコンボと同じロジック): 強い陽線/陰線の直前の反対色ローソク足のゾーンに、
// 現在価格が重なってるかどうかを判定する
function detectOrderBlock(rows, lookback = 15, atrMult = 1.5) {
  const n = rows.length;
  if (n < 20) return { inBullOB: false, inBearOB: false };

  const atrSeries = calcATRSeriesWilder(rows, 14);

  let bullOB = null;
  let bearOB = null;

  for (let i = 1; i < n; i++) {
    const atr = atrSeries[i];
    if (atr === null) continue;

    const body = rows[i].close - rows[i].open;
    const strongUpMove = rows[i].close > rows[i - 1].high && body > atr * atrMult;
    const strongDownMove = rows[i].close < rows[i - 1].low && -body > atr * atrMult;

    if (strongUpMove) {
      let obIdx = i - 1;
      for (let k = 1; k <= lookback && i - k >= 0; k++) {
        const j = i - k;
        if (rows[j].close < rows[j].open) {
          obIdx = j;
          break;
        }
      }
      bullOB = { top: rows[obIdx].high, bottom: rows[obIdx].low };
    }

    if (strongDownMove) {
      let obIdx = i - 1;
      for (let k = 1; k <= lookback && i - k >= 0; k++) {
        const j = i - k;
        if (rows[j].close > rows[j].open) {
          obIdx = j;
          break;
        }
      }
      bearOB = { top: rows[obIdx].high, bottom: rows[obIdx].low };
    }

    if (bullOB && rows[i].close < bullOB.bottom) bullOB = null;
    if (bearOB && rows[i].close > bearOB.top) bearOB = null;
  }

  const last = rows[n - 1];
  const inBullOB = Boolean(bullOB && last.low <= bullOB.top && last.high >= bullOB.bottom);
  const inBearOB = Boolean(bearOB && last.low <= bearOB.top && last.high >= bearOB.bottom);

  return { inBullOB, inBearOB };
}

// 高値から大きく下げた後、一度23.6%まで戻った実績があり、そこから再び安値付近まで
// 押し目に来ているかを検出する(そこにBu-OBが重なれば買い場、という2段階の考え方)。
// 「これが本物の底かどうか」までは自動判定せず、下落率・戻り具合・維持日数を出すだけに留める。
function detectFibBounceFromBottom(rows, { lookback = 500, minDeclinePct = 60 } = {}) {
  const n = rows.length;
  if (n < 60) return { fibMatch: false };

  const window = rows.slice(-Math.min(lookback, n));

  let highIdx = 0;
  for (let i = 1; i < window.length; i += 1) {
    if (window[i].high > window[highIdx].high) highIdx = i;
  }
  const highPrice = window[highIdx].high;

  let lowIdx = highIdx;
  for (let i = highIdx; i < window.length; i += 1) {
    if (window[i].low < window[lowIdx].low) lowIdx = i;
  }
  const lowPrice = window[lowIdx].low;

  if (!highPrice || !lowPrice || highPrice <= lowPrice) return { fibMatch: false };

  const declinePct = ((highPrice - lowPrice) / highPrice) * 100;
  if (declinePct < minDeclinePct) return { fibMatch: false };

  const range = highPrice - lowPrice;
  const fib236 = lowPrice + range * 0.236;
  const fib382 = lowPrice + range * 0.382;

  const lastClose = window[window.length - 1].close;

  // 安値をつけた後、一度でも23.6%まで戻ったことがあるか(だまし戻しも含めて「経験済み」とみなす)
  let touchedFib236 = false;
  for (let i = lowIdx + 1; i < window.length; i += 1) {
    if (window[i].close >= fib236) {
      touchedFib236 = true
      break;
    }
  }

  // 23.6%を経験した後、再び安値付近まで戻ってきているか(=押し目の再テスト)
  const retestTolerance = lowPrice * 1.1;
  const isRetestingLow = touchedFib236 && lastClose <= retestTolerance;

  const nearFib236 = isRetestingLow;

  // 安値からfib236付近を維持できてる本数(直近から遡って、水準を割ってないか)
  let barsHoldingAboveTarget = 0;
  for (let i = window.length - 1; i > lowIdx; i -= 1) {
    if (window[i].close >= fib236 * 0.97) {
      barsHoldingAboveTarget += 1;
    } else {
      break;
    }
  }

  // ボリンジャーバンドが収縮(スクイーズ)しているか
  const windowCloses = window.map((r) => r.close);
  const bb = calcBollingerBands(windowCloses, 20, 2);
  const lastIdx = windowCloses.length - 1;
  const bbUpperLast = bb.upper[lastIdx];
  const bbLowerLast = bb.lower[lastIdx];
  const bbWidthPct =
    bbUpperLast !== null && bbLowerLast !== null && lastClose
      ? ((bbUpperLast - bbLowerLast) / lastClose) * 100
      : null;
  const bbSqueeze = bbWidthPct !== null && bbWidthPct <= 15;

  // 一目均衡表(月足): 雲が薄いか、雲抜け寸前か
  const ichiHighs = window.map((r) => r.high);
  const ichiLows = window.map((r) => r.low);
  const highest9 = calcRollingHighest(ichiHighs, 9);
  const lowest9 = calcRollingLowest(ichiLows, 9);
  const highest26 = calcRollingHighest(ichiHighs, 26);
  const lowest26 = calcRollingLowest(ichiLows, 26);
  const highest52 = calcRollingHighest(ichiHighs, 52);
  const lowest52 = calcRollingLowest(ichiLows, 52);
  const ii = window.length - 1;
  let cloudThin = false;
  let nearCloudBreak = false;
  if (
    highest9[ii] !== null && lowest9[ii] !== null &&
    highest26[ii] !== null && lowest26[ii] !== null &&
    highest52[ii] !== null && lowest52[ii] !== null &&
    lastClose
  ) {
    const tenkan = (highest9[ii] + lowest9[ii]) / 2;
    const kijun = (highest26[ii] + lowest26[ii]) / 2;
    const senkouA = (tenkan + kijun) / 2;
    const senkouB = (highest52[ii] + lowest52[ii]) / 2;
    const cloudTop = Math.max(senkouA, senkouB);
    const cloudBottom = Math.min(senkouA, senkouB);
    cloudThin = ((cloudTop - cloudBottom) / lastClose) * 100 <= 10;
    nearCloudBreak = lastClose < cloudTop && ((cloudTop - lastClose) / lastClose) * 100 <= 10;
  }

  return {
    fibMatch: nearFib236,
    fibDeclinePct: declinePct,
    fibHigh: highPrice,
    fibLow: lowPrice,
    fibTarget236: fib236,
    fibTarget382: fib382,
    fibBarsSinceLow: window.length - 1 - lowIdx,
    fibBarsHoldingAboveTarget: barsHoldingAboveTarget,
    fibBbSqueeze: bbSqueeze,
    fibCloudThin: cloudThin,
    fibNearCloudBreak: nearCloudBreak,
  };
}

// 日足フィボ61.8%抜け後の調整判定:
// 直近の安値からの戻りが61.8%ラインを上に抜けたあと、高値から1〜8%ほど押している状況
function detectFib618Pullback(rows, { lookback = 90 } = {}) {
  const window = rows.slice(-lookback);
  if (window.length < 20) return false;

  const lows = window.map((r) => r.low);
  const highs = window.map((r) => r.high);

  let lowIdx = 0;
  let lowVal = Infinity;
  lows.forEach((v, idx) => {
    if (v < lowVal) {
      lowVal = v;
      lowIdx = idx;
    }
  });

  if (lowIdx >= window.length - 3) return false;

  let highVal = -Infinity;
  for (let k = lowIdx; k < window.length; k += 1) {
    if (highs[k] > highVal) highVal = highs[k];
  }

  const range = highVal - lowVal;
  if (range <= 0) return false;

  const level618 = lowVal + range * 0.618;
  const lastClose = window[window.length - 1].close;
  const pullbackPct = ((highVal - lastClose) / highVal) * 100;

  const brokeLevel618 = highVal > level618;
  const pulledBack = pullbackPct >= 1 && pullbackPct <= 8;
  const stillAboveLevel = lastClose >= level618;

  return brokeLevel618 && pulledBack && stillAboveLevel;
}

// タートル流ブレイクアウト買い(ららまるコンボ移植): 200日SMAより上で、
// 直近を除く20日高値を今日上抜けした(ta.crossover相当)
function detectTurtleBuy(rows) {
  const n = rows.length;
  if (n < 77) return false;
  const closes = rows.map((r) => r.close);
  const highs = rows.map((r) => r.high);
  // トレンドフィルターは75日MA(検証済み: 200日MAより機会が21%増え、成績もわずかに向上)
  const smaSeries = calcSMASeriesRolling(closes, 75);
  const highestSeries = calcRollingHighest(highs, 20);

  const i = n - 1;
  const prev = n - 2;
  if (
    smaSeries[i] == null ||
    highestSeries[prev] == null ||
    highestSeries[prev - 1] == null
  ) {
    return false;
  }

  const entryLevelNow = highestSeries[prev];
  const entryLevelPrev = highestSeries[prev - 1];
  const crossedAbove = closes[i] > entryLevelNow && closes[prev] <= entryLevelPrev;
  const aboveSma = closes[i] > smaSeries[i];

  return aboveSma && crossedAbove;
}

// タートル流ブレイクアウト売り(detectTurtleBuyのミラー): 200日SMAより下で、
// 直近を除く20日安値を今日下抜けした(ta.crossunder相当)
function detectTurtleSell(rows) {
  const n = rows.length;
  if (n < 77) return false;
  const closes = rows.map((r) => r.close);
  const lows = rows.map((r) => r.low);
  // トレンドフィルターは75日MA(detectTurtleBuyと同じ理由で統一)
  const smaSeries = calcSMASeriesRolling(closes, 75);
  const lowestSeries = calcRollingLowest(lows, 20);

  const i = n - 1;
  const prev = n - 2;
  if (
    smaSeries[i] == null ||
    lowestSeries[prev] == null ||
    lowestSeries[prev - 1] == null
  ) {
    return false;
  }

  const exitLevelNow = lowestSeries[prev];
  const exitLevelPrev = lowestSeries[prev - 1];
  const crossedBelow = closes[i] < exitLevelNow && closes[prev] >= exitLevelPrev;
  const belowSma = closes[i] < smaSeries[i];

  return belowSma && crossedBelow;
}

// タートル売り否定: 直近のタートル売り確定の高値を、後で終値が上抜けたら「否定」(4コンボ用)
function detectTurtleSellDenied(rows) {
  const n = rows.length;
  if (n < 78) return false;
  let denyHigh = null;
  for (let k = 1; k <= 60; k += 1) {
    const end = n - 1 - k;
    if (end < 77) break;
    if (detectTurtleSell(rows.slice(0, end + 1))) {
      denyHigh = rows[end].high;
      break;
    }
  }
  if (denyHigh == null) return false;
  const closes = rows.map((r) => r.close);
  const i = n - 1;
  const prev = n - 2;
  return closes[i] > denyHigh && closes[prev] <= denyHigh;
}

// detectTurtleSellDeniedのミラー(買い側の否定)。売りcombo(超本命の売り版)の追加条件用
function detectTurtleBuyDenied(rows) {
  const n = rows.length;
  if (n < 78) return false;
  let denyLow = null;
  for (let k = 1; k <= 60; k += 1) {
    const end = n - 1 - k;
    if (end < 77) break;
    if (detectTurtleBuy(rows.slice(0, end + 1))) {
      denyLow = rows[end].low;
      break;
    }
  }
  if (denyLow == null) return false;
  const closes = rows.map((r) => r.close);
  const i = n - 1;
  const prev = n - 2;
  return closes[i] < denyLow && closes[prev] >= denyLow;
}

// 指定した検出関数が、直近window本以内のどこかでtrueだったか(Pineのta.barssince<=window相当)
function wasTrueRecently(rows, detectFn, window = 3) {
  const n = rows.length;
  for (let k = 0; k <= window; k += 1) {
    const end = n - k;
    if (end < 1) break;
    if (detectFn(rows.slice(0, end))) return true;
  }
  return false;
}

// その週の月曜日(0時)を返す。週の第1営業日かどうかの判定に使う
function mondayOfWeek(dateStr) {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  return d.getTime();
}

// 最新行が「週の1本目(前の営業日と週が変わっている)」かどうか
function isFirstTradingDayOfWeek(rows) {
  const n = rows.length;
  if (n < 2) return false;
  return mondayOfWeek(rows[n - 1].date) !== mondayOfWeek(rows[n - 2].date);
}

// 最新行が「月の1本目(前の営業日と月が変わっている)」かどうか
function isFirstTradingDayOfMonth(rows) {
  const n = rows.length;
  if (n < 2) return false;
  const cur = new Date(rows[n - 1].date);
  const prev = new Date(rows[n - 2].date);
  return cur.getFullYear() !== prev.getFullYear() || cur.getMonth() !== prev.getMonth();
}

// 任意の時間足のrowsに対して「タートル買い(直近4本以内)＋heartBuy相当＋Bu-OB」が
// 全部揃ってるか判定する(本命/キターキターのタイムフレーム集計用)
function checkTimeframeBuySet(tfRows) {
  if (!Array.isArray(tfRows) || tfRows.length < 20) return false;
  const closes = tfRows.map((r) => r.close);
  const pos = calcUTBotPosition(tfRows, 2.0, 10);
  const lastIdx = pos.length - 1;

  const rsiSeries = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const startIdx = Math.max(2, lastIdx - 7);
  let recentStrongBuyTrigger = false;
  for (let i = startIdx; i <= lastIdx; i += 1) {
    if (isRsiRecover30(rsiSeries, i) || isHistTurnUp(hist, i)) recentStrongBuyTrigger = true;
  }
  const rsiNow = rsiSeries[lastIdx];
  const rsiPrev = rsiSeries[lastIdx - 1];
  const rsiBuyNowStrong = Number.isFinite(rsiNow) && Number.isFinite(rsiPrev) && rsiNow > rsiPrev && rsiNow <= 50;
  const heartMatch = lastIdx >= 0 && pos[lastIdx] === 1 && (recentStrongBuyTrigger || rsiBuyNowStrong);

  const turtleMatch = wasTrueRecently(tfRows, detectTurtleBuy, 4);
  const { inBullOB } = detectOrderBlock(tfRows);

  return turtleMatch && heartMatch && inBullOB;
}

// checkTimeframeBuySetの売り版ミラー
function checkTimeframeSellSet(tfRows) {
  if (!Array.isArray(tfRows) || tfRows.length < 20) return false;
  const closes = tfRows.map((r) => r.close);
  const pos = calcUTBotPosition(tfRows, 2.0, 10);
  const lastIdx = pos.length - 1;

  const rsiSeries = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const startIdx = Math.max(2, lastIdx - 7);
  let recentStrongSellTrigger = false;
  for (let i = startIdx; i <= lastIdx; i += 1) {
    if (isRsiHotDown70(rsiSeries, i) || isHistTurnDown(hist, i)) recentStrongSellTrigger = true;
  }
  const rsiNow = rsiSeries[lastIdx];
  const rsiPrev = rsiSeries[lastIdx - 1];
  const rsiSellNowStrong = Number.isFinite(rsiNow) && Number.isFinite(rsiPrev) && rsiNow < rsiPrev && rsiNow >= 50;
  const heartMatch = lastIdx >= 0 && pos[lastIdx] === -1 && (recentStrongSellTrigger || rsiSellNowStrong);

  const turtleMatch = wasTrueRecently(tfRows, detectTurtleSell, 4);
  const { inBearOB } = detectOrderBlock(tfRows);

  return turtleMatch && heartMatch && inBearOB;
}

// タートル(直近4本以内)＋Bu-OB(Be-OB)だけが揃ってるか(heartBuyは見ない)。
// キター/キタキタ〜の大前提(4Hと日足の両方で必須)として使う
function checkTimeframeTurtleOB(tfRows, isSell) {
  if (!Array.isArray(tfRows) || tfRows.length < 20) return false;
  const turtleMatch = wasTrueRecently(tfRows, isSell ? detectTurtleSell : detectTurtleBuy, 4);
  const { inBullOB, inBearOB } = detectOrderBlock(tfRows);
  return turtleMatch && (isSell ? inBearOB : inBullOB);
}

// 💥爆上げ本命(日足版)と同じ「タートル否定・heartBuy相当・UTフリップ・ロケット・本命・超本命の
// うち3つ以上+OB」判定を、任意の時間足(週足/月足)のrowsに対して行う。
function f_megaBreakoutBuyOnTF(tfRows) {
  if (!Array.isArray(tfRows) || tfRows.length < 40) return false;
  const closes = tfRows.map((r) => r.close);
  const pos = calcUTBotPosition(tfRows, 2.0, 10);
  const lastIdx = pos.length - 1;
  const rsiSeries = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const startIdx = Math.max(2, lastIdx - 7);
  let recentStrongBuyTrigger = false;
  for (let i = startIdx; i <= lastIdx; i += 1) {
    if (isRsiRecover30(rsiSeries, i) || isHistTurnUp(hist, i)) recentStrongBuyTrigger = true;
  }
  const rsiNow = rsiSeries[lastIdx];
  const rsiPrev = rsiSeries[lastIdx - 1];
  const rsiBuyNowStrong = Number.isFinite(rsiNow) && Number.isFinite(rsiPrev) && rsiNow > rsiPrev && rsiNow <= 50;
  const heartBuyEq = lastIdx >= 0 && pos[lastIdx] === 1 && (recentStrongBuyTrigger || rsiBuyNowStrong);
  let barsSinceBuy = Infinity;
  for (let i = pos.length - 1; i >= 1; i -= 1) {
    if (pos[i] === 1 && pos[i - 1] === -1) {
      barsSinceBuy = pos.length - 1 - i;
      break;
    }
  }
  const utBuyRecentEq = lastIdx >= 1 && barsSinceBuy <= 4;
  const rocketRecentEq = Boolean(findRocketBuy(tfRows, 4));
  const turtleOBRecentEq = wasTrueRecently(tfRows, detectTurtleBuy, 4) && detectOrderBlock(tfRows).inBullOB;
  const rocketTurtleComboEq = rocketRecentEq && turtleOBRecentEq;
  const turtleSellDeniedRecentEq = wasTrueRecently(tfRows, detectTurtleSellDenied, 4);
  const superComboEq = rocketTurtleComboEq && turtleSellDeniedRecentEq;
  const count =
    (turtleSellDeniedRecentEq ? 1 : 0) +
    (heartBuyEq ? 1 : 0) +
    (utBuyRecentEq ? 1 : 0) +
    (rocketRecentEq ? 1 : 0) +
    (rocketTurtleComboEq ? 1 : 0) +
    (superComboEq ? 1 : 0);
  return count >= 3 && detectOrderBlock(tfRows).inBullOB;
}

// f_megaBreakoutBuyOnTFの売り版ミラー(💥暴落本命相当)
function f_megaBreakoutSellOnTF(tfRows) {
  if (!Array.isArray(tfRows) || tfRows.length < 40) return false;
  const closes = tfRows.map((r) => r.close);
  const pos = calcUTBotPosition(tfRows, 2.0, 10);
  const lastIdx = pos.length - 1;
  const rsiSeries = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const startIdx = Math.max(2, lastIdx - 7);
  let recentStrongSellTrigger = false;
  for (let i = startIdx; i <= lastIdx; i += 1) {
    if (isRsiHotDown70(rsiSeries, i) || isHistTurnDown(hist, i)) recentStrongSellTrigger = true;
  }
  const rsiNow = rsiSeries[lastIdx];
  const rsiPrev = rsiSeries[lastIdx - 1];
  const rsiSellNowStrong = Number.isFinite(rsiNow) && Number.isFinite(rsiPrev) && rsiNow < rsiPrev && rsiNow >= 50;
  const heartSellEq = lastIdx >= 0 && pos[lastIdx] === -1 && (recentStrongSellTrigger || rsiSellNowStrong);
  let barsSinceSell = Infinity;
  for (let i = pos.length - 1; i >= 1; i -= 1) {
    if (pos[i] === -1 && pos[i - 1] === 1) {
      barsSinceSell = pos.length - 1 - i;
      break;
    }
  }
  const utSellRecentEq = lastIdx >= 1 && barsSinceSell <= 4;
  const rocketSellRecentEq = Boolean(findRocketSell(tfRows, 4));
  const turtleOBSellRecentEq = wasTrueRecently(tfRows, detectTurtleSell, 4) && detectOrderBlock(tfRows).inBearOB;
  const rocketTurtleComboSellEq = rocketSellRecentEq && turtleOBSellRecentEq;
  const turtleBuyDeniedRecentEq = wasTrueRecently(tfRows, detectTurtleBuyDenied, 4);
  const superComboSellEq = rocketTurtleComboSellEq && turtleBuyDeniedRecentEq;
  const count =
    (turtleBuyDeniedRecentEq ? 1 : 0) +
    (heartSellEq ? 1 : 0) +
    (utSellRecentEq ? 1 : 0) +
    (rocketSellRecentEq ? 1 : 0) +
    (rocketTurtleComboSellEq ? 1 : 0) +
    (superComboSellEq ? 1 : 0);
  return count >= 3 && detectOrderBlock(tfRows).inBearOB;
}

// 直近nBars本(週足/月足)のどこかで一度でもf_megaBreakoutBuyOnTF/SellOnTFが成立していたか
// (「6か月以内に爆上げが月足で点灯した」のような過去の履歴チェック用)
function wasMegaBreakoutWithinLastN(tfRows, nBars, isBuy) {
  if (!Array.isArray(tfRows) || tfRows.length < 40) return false;
  const checkFn = isBuy ? f_megaBreakoutBuyOnTF : f_megaBreakoutSellOnTF;
  const start = Math.max(40, tfRows.length - nBars + 1);
  for (let i = start; i <= tfRows.length; i += 1) {
    if (checkFn(tfRows.slice(0, i))) return true;
  }
  return false;
}

// 過去のタートル売り(200日SMA割れ+20日安値割れ)が出た価格を、直近の抵抗帯として拾う
// (そこを上に抜け返すのが強い初動になりやすい、という考え方)
function findRecentTurtleSellLevel(rows, { lookbackBars = 200 } = {}) {
  const n = rows.length;
  if (n < 77) return null;
  const closes = rows.map((r) => r.close);
  // トレンドフィルターはdetectTurtleBuy/detectTurtleSellと同じ75日MAに統一
  // (以前はここだけ200日MAのままで、初動候補タブの抵抗帯が他のタートル判定とズレていた)
  const smaSeries = calcSMASeriesRolling(closes, 75);
  const lowestSeries = calcRollingLowest(rows.map((r) => r.low), 20);

  const start = Math.max(77, n - lookbackBars);
  let level = null;
  for (let i = start; i < n; i += 1) {
    if (
      smaSeries[i] == null ||
      lowestSeries[i - 1] == null ||
      lowestSeries[i - 2] == null
    ) {
      continue;
    }
    const exitLevelNow = lowestSeries[i - 1];
    const exitLevelPrev = lowestSeries[i - 2];
    const crossedBelow = closes[i] < exitLevelNow && closes[i - 1] >= exitLevelPrev;
    const belowSma = closes[i] < smaSeries[i];
    if (belowSma && crossedBelow) {
      level = closes[i];
    }
  }
  return level;
}

// GC20/75が直近N本以内に発生したか(同日だけでなく、少し前のクロスも拾う)
// 株ドラゴン(kabudragon.com)のローソク足パターン screening を参考に移植。
// とんぼ(トンボ): 実体が小さく下ヒゲが長い、上ヒゲはほぼ無い→反発サイン
function detectTonbo(rows) {
  if (!Array.isArray(rows) || rows.length < 1) return false;
  const r = rows[rows.length - 1];
  const range = r.high - r.low;
  if (!range || range <= 0) return false;
  const body = Math.abs(r.close - r.open);
  const upperWick = r.high - Math.max(r.open, r.close);
  const lowerWick = Math.min(r.open, r.close) - r.low;
  return body <= range * 0.1 && upperWick <= range * 0.1 && lowerWick >= range * 0.6;
}

// とうば(トウバ): 実体が小さく上ヒゲが長い、下ヒゲはほぼ無い→反落サイン
function detectTouba(rows) {
  if (!Array.isArray(rows) || rows.length < 1) return false;
  const r = rows[rows.length - 1];
  const range = r.high - r.low;
  if (!range || range <= 0) return false;
  const body = Math.abs(r.close - r.open);
  const upperWick = r.high - Math.max(r.open, r.close);
  const lowerWick = Math.min(r.open, r.close) - r.low;
  return body <= range * 0.1 && lowerWick <= range * 0.1 && upperWick >= range * 0.6;
}

// 三空踏み上げ: 直近の一定期間内に上に窓を開けた足(前足の高値を上抜けてスタート)が3回以上ある
function detectSankuFumiage(rows, lookback = 10) {
  if (!Array.isArray(rows) || rows.length < 4) return false;
  const n = rows.length;
  let gapCount = 0;
  for (let i = Math.max(1, n - lookback); i < n; i += 1) {
    if (rows[i].low > rows[i - 1].high) gapCount += 1;
  }
  return gapCount >= 3;
}

function detectGc20_75Recent(closes, { lookback = 5 } = {}) {
  const ema20Series = calcEMASeries(closes, 20);
  const n = closes.length;
  for (let k = 0; k < lookback; k += 1) {
    const i = n - 1 - k;
    if (i < 1) break;
    const emaNow = ema20Series[i];
    const emaPrev = ema20Series[i - 1];
    if (emaNow == null || emaPrev == null) continue;
    const smaNow = sma(closes.slice(0, i + 1), 75);
    const smaPrev = sma(closes.slice(0, i), 75);
    if (smaNow == null || smaPrev == null) continue;
    if (emaPrev <= smaPrev && emaNow > smaNow) return true;
  }
  return false;
}

// MA(25日 or 75日)が横ばい/下向きから上向きに転換したばかりか(初動判定)
function detectMaTurningUp(closes) {
  const check = (period) => {
    const series = calcSMASeriesRolling(closes, period);
    const n = series.length;
    if (n < period + 6) return false;
    const now = series[n - 1];
    const mid = series[n - 4];
    const prev = series[n - 7];
    if (now == null || mid == null || prev == null) return false;
    return now - mid > 0 && mid - prev <= 0;
  };
  return check(25) || check(75);
}

function calcUTBotPosition(rows, kv = 2.0, atrPeriod = 10) {
  const n = rows.length;
  const atr = calcATRSeriesWilder(rows, atrPeriod);
  const nLoss = new Array(n).fill(null);
  const pos = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (atr[i] === null) continue;

    const xLoss = kv * atr[i];
    const close = rows[i].close;
    const prevClose = i > 0 ? rows[i - 1].close : close;
    const prevNLoss = i > 0 ? nLoss[i - 1] : null;

    if (prevNLoss === null) {
      nLoss[i] = close - xLoss;
    } else if (close > prevNLoss && prevClose > prevNLoss) {
      nLoss[i] = Math.max(prevNLoss, close - xLoss);
    } else if (close < prevNLoss && prevClose < prevNLoss) {
      nLoss[i] = Math.min(prevNLoss, close + xLoss);
    } else if (close > prevNLoss) {
      nLoss[i] = close - xLoss;
    } else {
      nLoss[i] = close + xLoss;
    }

    const prevPos = i > 0 ? pos[i - 1] : 0;

    if (prevNLoss !== null && close > prevNLoss && prevClose < prevNLoss) {
      pos[i] = 1;
    } else if (prevNLoss !== null && close < prevNLoss && prevClose > prevNLoss) {
      pos[i] = -1;
    } else {
      pos[i] = prevPos;
    }
  }

  return pos;
}

// =====================
// MACD・RSI 転換判定（TradingViewのPineロジックをJSで再現）
// 追加するだけで、まだどこからも呼び出しません
// =====================
function calcEMASeries(values, period) {
  const n = values.length;
  const ema = new Array(n).fill(null);
  if (n === 0) return ema;

  const k = 2 / (period + 1);
  ema[0] = values[0];

  for (let i = 1; i < n; i++) {
    ema[i] = values[i] * k + ema[i - 1] * (1 - k);
  }

  return ema;
}

function calcMACDSeries(closes, fast = 12, slow = 26, signal = 9) {
  const emaFast = calcEMASeries(closes, fast);
  const emaSlow = calcEMASeries(closes, slow);
  const n = closes.length;

  const macdLine = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    macdLine[i] = emaFast[i] - emaSlow[i];
  }

  const signalLine = calcEMASeries(macdLine, signal);

  const hist = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    hist[i] = macdLine[i] - signalLine[i];
  }

  return { macdLine, signalLine, hist };
}

function calcRSISeriesWilder(closes, period = 14) {
  const n = closes.length;
  const rsi = new Array(n).fill(null);
  if (n < period + 1) return rsi;

  let gainSum = 0;
  let lossSum = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gainSum += diff;
    else lossSum += Math.abs(diff);
  }

  let avgGain = gainSum / period;
  let avgLoss = lossSum / period;

  rsi[period] =
    avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

  for (let i = period + 1; i < n; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? Math.abs(diff) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    rsi[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }

  return rsi;
}

// MACDヒストグラムが下向き→上向きに転換した地点かどうか(Pineのhistturnup相当)
function isHistTurnUp(hist, i) {
  if (i < 2) return false;
  if (hist[i] === null || hist[i - 1] === null || hist[i - 2] === null) return false;
  return hist[i] > hist[i - 1] && hist[i - 1] < hist[i - 2];
}

function isHistTurnDown(hist, i) {
  if (i < 2) return false;
  if (hist[i] === null || hist[i - 1] === null || hist[i - 2] === null) return false;
  return hist[i] < hist[i - 1] && hist[i - 1] > hist[i - 2];
}

// RSIが30を上抜け(Pineのrsi30回復 = ta.crossover(rsi,30)相当)
function isRsiRecover30(rsi, i) {
  if (i < 1) return false;
  if (rsi[i] === null || rsi[i - 1] === null) return false;
  return rsi[i - 1] < 30 && rsi[i] >= 30;
}

// RSIが70を下抜け(Pineのrsi70割れ = ta.crossunder(rsi,70)相当)
function isRsiHotDown70(rsi, i) {
  if (i < 1) return false;
  if (rsi[i] === null || rsi[i - 1] === null) return false;
  return rsi[i - 1] > 70 && rsi[i] <= 70;
}

function calcDeviation(price, ma) {
  if (!price || !ma) return null;
  return ((price - ma) / ma) * 100;
}
// 東証の値幅制限(基準値段による階段状のストップ高幅)。以前は全価格帯で30円固定になっており、
// 例えば800円の銘柄が+30円(3.75%)動いただけでもストップ高扱いになってしまっていた。
const LIMIT_UP_WIDTH_TIERS = [
  [100, 30],
  [200, 50],
  [500, 80],
  [700, 100],
  [1000, 150],
  [1500, 300],
  [2000, 400],
  [3000, 500],
  [5000, 700],
  [7000, 1000],
  [10000, 1500],
  [15000, 3000],
  [20000, 4000],
  [30000, 5000],
  [50000, 7000],
  [70000, 10000],
  [100000, 15000],
];

function getLimitUpWidth(price) {
  for (const [upperBound, width] of LIMIT_UP_WIDTH_TIERS) {
    if (price < upperBound) return width;
  }
  return 30000;
}
function countStopHigh(rows, lookback = 10) {
  if (!rows || rows.length < 2) return 0;

  const recent = rows.slice(-lookback);
  let count = 0;

  for (let i = 1; i < recent.length; i++) {
    const today = recent[i];
    const prev = recent[i - 1];

    if (!today || !prev || !today.close || !prev.close || !today.high) continue;

  const limitUpWidth = getLimitUpWidth(prev.close);
const limitUpPrice = prev.close + limitUpWidth;

if (today.high >= limitUpPrice) {
  count += 1;
}
}
  return count;
}

function candleSignal(rows) {
  if (!rows || rows.length < 3) {
    return {
      name: "判定なし",
      buyPoint: 0,
      shortPoint: 0,
      memo: "ローソク足情報不足",
    };
  }

  const a = rows[rows.length - 3];
  const b = rows[rows.length - 2];
  const c = rows[rows.length - 1];

  const body = Math.abs(c.close - c.open);
  const range = Math.max(c.high - c.low, 0.0001);
  const upperWick = c.high - Math.max(c.open, c.close);
  const lowerWick = Math.min(c.open, c.close) - c.low;

  const isBull = c.close > c.open;
  const isBear = c.close < c.open;
  const prevBull = b.close > b.open;
  const prevBear = b.close < b.open;

  const upperWickRate = upperWick / range;
  const lowerWickRate = lowerWick / range;
  const bodyRate = body / range;

  const bullishEngulf =
    prevBear && isBull && c.open <= b.close && c.close >= b.open;

  const bearishEngulf =
    prevBull && isBear && c.open >= b.close && c.close <= b.open;

  const redThree =
    a.close > a.open &&
    b.close > b.open &&
    c.close > c.open &&
    b.close > a.close &&
    c.close > b.close;

  const blackThree =
    a.close < a.open &&
    b.close < b.open &&
    c.close < c.open &&
    b.close < a.close &&
    c.close < b.close;

  const longLower = lowerWickRate >= 0.45 && bodyRate <= 0.45;
  const longUpper = upperWickRate >= 0.45 && bodyRate <= 0.45;

  const morningStar =
    a.close < a.open &&
    Math.abs(b.close - b.open) < Math.abs(a.close - a.open) * 0.5 &&
    c.close > c.open &&
    c.close > (a.open + a.close) / 2;

  const eveningStar =
    a.close > a.open &&
    Math.abs(b.close - b.open) < Math.abs(a.close - a.open) * 0.5 &&
    c.close < c.open &&
    c.close < (a.open + a.close) / 2;

  if (morningStar) {
    return {
      name: "明けの明星",
      buyPoint: 10,
      shortPoint: -8,
      memo: "底打ち反転候補",
    };
  }

  if (eveningStar) {
    return {
      name: "宵の明星",
      buyPoint: -8,
      shortPoint: 10,
      memo: "天井反転候補",
    };
  }

  if (bullishEngulf) {
    return {
      name: "陽の包み足",
      buyPoint: 9,
      shortPoint: -6,
      memo: "買い転換候補",
    };
  }

  if (bearishEngulf) {
    return {
      name: "陰の包み足",
      buyPoint: -6,
      shortPoint: 9,
      memo: "売り転換候補",
    };
  }

  if (redThree) {
    return {
      name: "赤三兵",
      buyPoint: 8,
      shortPoint: -5,
      memo: "上昇継続候補",
    };
  }

  if (blackThree) {
    return {
      name: "三羽烏",
      buyPoint: -5,
      shortPoint: 8,
      memo: "下落継続候補",
    };
  }

  if (longLower && isBull) {
    return {
      name: "たくり線",
      buyPoint: 7,
      shortPoint: -4,
      memo: "下げ止まり候補",
    };
  }

  if (longUpper) {
    return {
      name: "上ヒゲ",
      buyPoint: -6,
      shortPoint: 7,
      memo: "利確警戒",
    };
  }

  if (longLower && isBear) {
    return {
      name: "首吊り線",
      buyPoint: -5,
      shortPoint: 6,
      memo: "高値圏なら警戒",
    };
  }

  return {
    name: isBull ? "陽線" : isBear ? "陰線" : "十字線",
    buyPoint: isBull ? 3 : 0,
    shortPoint: isBear ? 3 : 0,
    memo: isBull ? "買い優勢" : isBear ? "売り優勢" : "迷い",
  };
}

function rankFromScore(score) {
  if (score >= 98) return "SS";
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 85) return "B";
  if (score >= 81) return "C";
  return "非表示";
}

function yen(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "-";
  return `${Math.round(n).toLocaleString()}円`;
}

function pct(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "-";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

function compact(n) {
  if (typeof n !== "number" || !Number.isFinite(n)) return "-";
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億`;
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return `${Math.round(n).toLocaleString()}`;
}

function normalizeRows(rows) {
  return rows
    .filter(
      (r) =>
        r &&
        typeof r.close === "number" &&
        typeof r.high === "number" &&
        typeof r.low === "number" &&
        typeof r.volume === "number"
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getYahooSymbol(target) {
  if (!target) return null;
  // 1357などのETFはkindが"index"のまま登録されているが、東証銘柄なので.Tが必要
  const isTseNumericCode = /^\d{4}$/.test(target.code);
  if (target.kind === "stock" || (target.kind === "index" && isTseNumericCode)) {
    return `${target.code}.T`;
  }
  return target.code;
}

function parseStooqCsv(csv) {
  const lines = String(csv || "").trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 6) continue;

    const [date, open, high, low, close, volume] = cols;
    const c = parseNumber(close);
    const h = parseNumber(high);
    const l = parseNumber(low);
    const o = parseNumber(open);
    const v = parseNumber(volume);

    if (c && h && l && v !== null) {
      rows.push({
        date,
        open: o ?? c,
        high: h,
        low: l,
        close: c,
        volume: v,
      });
    }
  }

  return normalizeRows(rows);
}

function getProxyUrl(url, attempt = 1) {
  if (attempt === 1) {
    try {
      const yahooUrl = new URL(url);
      

      if (
        yahooUrl.hostname.includes("finance.yahoo.com") &&
        yahooUrl.pathname.includes("/v8/finance/chart/")
      ) {
        const symbol = yahooUrl.pathname.split("/").pop();
        const range = yahooUrl.searchParams.get("range") || "max";
        const interval = yahooUrl.searchParams.get("interval") || "1d";

        return (
          `https://raramaru.onrender.com/chart?symbol=${encodeURIComponent(symbol)}` +
          `&range=${encodeURIComponent(range)}` +
          `&interval=${encodeURIComponent(interval)}`
        );
      }
    } catch (e) {
      console.warn("ローカルプロキシURL変換失敗:", e);
    }

    return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  }

  if (attempt === 2) {
    return `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
  }

  return url;
}

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json,text/plain,*/*",
};

// App.js(ブラウザ/RN)とserver.js(Node)の両方から使うため、react-nativeのPlatformには依存しない。
// App.js側は起動時にsetRuntimeOS(Platform.OS)を呼んで実際の環境を教える。デフォルトは"server"。
let RUNTIME_OS = "server";
function setRuntimeOS(os) {
  RUNTIME_OS = os;
}

async function safeFetch(url, options = {}, retries = 2) {
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const fetchUrl = RUNTIME_OS === "web" && attempt > 0 ? getProxyUrl(url, attempt) : url;
    try {
      const res = await fetch(fetchUrl, {
        ...options,
        headers: { ...BROWSER_HEADERS, ...(options.headers || {}) },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      lastError = e;
      if (attempt >= retries) break;
      await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
  }
  console.warn(`[調査ログ] safeFetch最終失敗: ${url} ->`, lastError?.message || lastError);
  throw lastError;
}

async function fetchFromStooq(code) {
  const urls = [
    `https://stooq.com/q/d/l/?s=${code}.jp&i=d`,
    `https://stooq.com/q/d/?s=${code}.jp&i=d`,
  ];

  for (const url of urls) {
    try {
      const res = await safeFetch(url, {}, 2);
      
      const text = await res.text();
      const rows = parseStooqCsv(text);
      if (rows.length >= 40) return rows;
      if (rows.length > 0) return rows;
    } catch (e) {
      // ignore and try next URL
    }
  }

  return [];
}

async function fetchFromYahoo(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=10y&interval=1d`;
    const res = await safeFetch(url, {}, 2);
    const json = await res.json();

    const result = json?.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const quote = result?.indicators?.quote?.[0];

    if (!timestamps.length || !quote) return [];

    const rows = timestamps.map((t, i) => ({
      date: new Date(t * 1000).toISOString().slice(0, 10),
      open: quote.open?.[i],
      high: quote.high?.[i],
      low: quote.low?.[i],
      close: quote.close?.[i],
      volume: quote.volume?.[i],
    }));

    return normalizeRows(rows);
  } catch (e) {
    console.warn(`[調査ログ] ${symbol} 取得失敗:`, e?.message || e);
    return [];
  }
}

async function fetchHourlyFromYahoo(symbol) {
  try {
const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=6mo&interval=1h`;
    const res = await safeFetch(url, {}, 2);
    const json = await res.json();

    const result = json?.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const quote = result?.indicators?.quote?.[0];

    if (!timestamps.length || !quote) return [];

    const rows = timestamps
      .map((t, i) => ({
        time: t * 1000,
        open: quote.open?.[i],
        high: quote.high?.[i],
        low: quote.low?.[i],
        close: quote.close?.[i],
        volume: quote.volume?.[i] || 0,
      }))
      .filter((r) =>
        typeof r.open === "number" &&
        typeof r.high === "number" &&
        typeof r.low === "number" &&
        typeof r.close === "number"
      );

    return rows.slice(0, -1);
  } catch (e) {
    return [];
  }
}
// =====================
// 1時間足を4時間足へまとめる
// 日本株：9時開始を基準に 9〜12時 / 13時以降で集約
// =====================
function toFourHourRows(hourlyRows) {
  if (!Array.isArray(hourlyRows) || hourlyRows.length === 0) {
    return [];
  }

  const grouped = new Map();

  for (const row of hourlyRows) {
    if (
      !row ||
      typeof row.time !== "number" ||
      typeof row.open !== "number" ||
      typeof row.high !== "number" ||
      typeof row.low !== "number" ||
      typeof row.close !== "number"
    ) {
      continue;
    }

    // Yahooの時刻を日本時間へ変換
    const jstDate = new Date(row.time + 9 * 60 * 60 * 1000);

    const year = jstDate.getUTCFullYear();
    const month = String(jstDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(jstDate.getUTCDate()).padStart(2, "0");
    const hour = jstDate.getUTCHours();

    const dateKey = `${year}-${month}-${day}`;

    // 9:00〜12:59を前半、13:00以降を後半の4H足として扱う
    const sessionBucket = hour < 13 ? 0 : 1;
    const key = `${dateKey}-${sessionBucket}`;

    const current = grouped.get(key);

    if (!current) {
      grouped.set(key, {
        time: row.time,
        date: dateKey,
        open: row.open,
        high: row.high,
        low: row.low,
        close: row.close,
        volume: row.volume || 0,
      });
    } else {
      current.high = Math.max(current.high, row.high);
      current.low = Math.min(current.low, row.low);
      current.close = row.close;
      current.volume += row.volume || 0;
    }
  }

  return Array.from(grouped.values()).sort(
    (a, b) => a.time - b.time
  );
}

async function fetchTodayFromYahoo(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=5m`;
    const res = await safeFetch(url, {}, 2);
    const json = await res.json();

    const result = json?.chart?.result?.[0];
    const timestamps = result?.timestamp || [];
    const quote = result?.indicators?.quote?.[0];

    if (!timestamps.length || !quote) return null;

    for (let i = timestamps.length - 1; i >= 0; i--) {
      const close = quote.close?.[i];
      const high = quote.high?.[i];
      const low = quote.low?.[i];
      const open = quote.open?.[i];
      const volume = quote.volume?.[i];

      if (
        typeof close === "number" &&
        typeof high === "number" &&
        typeof low === "number"
      ) {
        return {
          date: new Date(timestamps[i] * 1000).toISOString().slice(0, 10),
          open: typeof open === "number" ? open : close,
          high,
          low,
          close,
          volume: typeof volume === "number" ? volume : 0,
          isIntraday: true,
        };
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}

async function fetchRows(target) {
  const symbol = getYahooSymbol(target);

  // まずYahooの日足だけ取得
  let rows = await fetchFromYahoo(symbol);

  // Yahooで取れなかった日本株だけStooqを予備で使う
  if (rows.length < 10 && target.kind === "stock") {
    rows = await fetchFromStooq(target.code);
  }

  return rows;
}
// =====================
// 3波判定エンジン（TradingViewのPineロジックに近づけた版）
// UTボット・MACD・RSIの部品を使って、1波→2波調整→3波準備→3波確定を追跡する
// =====================
function runWave3StateMachine(rows) {
  const closes = rows.map((r) => r.close);
  
  const pos = calcUTBotPosition(rows, 2.0, 10);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const n = rows.length;

  let buyArmed = false, buyCorrection = false, buyPrepared = false;
  let buyOriginLow = null, buyStartIdx = null, buyCorrectionHigh = null;

  let sellArmed = false, sellCorrection = false, sellPrepared = false;
  let sellOriginHigh = null, sellStartIdx = null, sellCorrectionLow = null;

  let lastBuyConfirmed = null;
  let lastSellConfirmed = null;

  for (let i = 1; i < n; i++) {
    const buySignal = pos[i] === 1 && pos[i - 1] === -1;
    const sellSignal = pos[i] === -1 && pos[i - 1] === 1;
    const macdUp = isHistTurnUp(hist, i);
    const macdDown = isHistTurnDown(hist, i);

    // 期限切れ・崩れチェック（BUY）
    if (buyArmed && buyStartIdx !== null) {
      const daysPassed =
        (new Date(rows[i].date) - new Date(rows[buyStartIdx].date)) / 86400000;
      if (daysPassed > 60 || (buyOriginLow !== null && rows[i].low < buyOriginLow * 0.99)) {
        buyArmed = false;
        buyCorrection = false;
        buyPrepared = false;
        buyOriginLow = null;
        buyStartIdx = null;
        buyCorrectionHigh = null;
      }
    }

    // 期限切れ・崩れチェック（SELL）
    if (sellArmed && sellStartIdx !== null) {
      const daysPassed =
        (new Date(rows[i].date) - new Date(rows[sellStartIdx].date)) / 86400000;
      if (daysPassed > 60 || (sellOriginHigh !== null && rows[i].high > sellOriginHigh * 1.01)) {
        sellArmed = false;
        sellCorrection = false;
        sellPrepared = false;
        sellOriginHigh = null;
        sellStartIdx = null;
        sellCorrectionLow = null;
      }
    }

    // 1波の開始（UTボット反転）
    if (buySignal) {
      buyArmed = true;
      buyCorrection = false;
      buyPrepared = false;
      buyStartIdx = i;
      const lookStart = Math.max(0, i - 10);
      buyOriginLow = Math.min(...rows.slice(lookStart, i + 1).map((r) => r.low));
      buyCorrectionHigh = null;
    }

    if (sellSignal) {
      sellArmed = true;
      sellCorrection = false;
      sellPrepared = false;
      sellStartIdx = i;
      const lookStart = Math.max(0, i - 10);
      sellOriginHigh = Math.max(...rows.slice(lookStart, i + 1).map((r) => r.high));
      sellCorrectionLow = null;
    }

    // 2波調整の開始
    if (buyArmed && sellSignal && i !== buyStartIdx) {
      buyCorrection = true;
      buyPrepared = false;
      buyCorrectionHigh = rows[i].high;
    }
    if (sellArmed && buySignal && i !== sellStartIdx) {
      sellCorrection = true;
      sellPrepared = false;
      sellCorrectionLow = rows[i].low;
    }

    // 3波準備（MACD転換 or 否定）
    const buySellDenied =
      buyCorrection && buyCorrectionHigh !== null && rows[i].close > buyCorrectionHigh;
    if (buyArmed && buyCorrection && (macdUp || buySellDenied)) {
      buyPrepared = true;
    }

    const sellBuyDenied =
      sellCorrection && sellCorrectionLow !== null && rows[i].close < sellCorrectionLow;
    if (sellArmed && sellCorrection && (macdDown || sellBuyDenied)) {
      sellPrepared = true;
    }

    // 3波確定（再度のUTボット反転）
    if (buyArmed && buyCorrection && buyPrepared && buySignal && i !== buyStartIdx) {
      const wave1Pct = buyOriginLow
        ? ((rows[buyStartIdx].close - buyOriginLow) / buyOriginLow) * 100
        : null;
      lastBuyConfirmed = { date: rows[i].date, wave1Pct, pullbackPct: null };
      buyArmed = false;
      buyCorrection = false;
      buyPrepared = false;
    }

    if (sellArmed && sellCorrection && sellPrepared && sellSignal && i !== sellStartIdx) {
      const wave1Pct = sellOriginHigh
        ? ((sellOriginHigh - rows[sellStartIdx].close) / sellOriginHigh) * 100
        : null;
      lastSellConfirmed = { date: rows[i].date, wave1Pct, pullbackPct: null };
      sellArmed = false;
      sellCorrection = false;
      sellPrepared = false;
    }
  }

  const lastIdx = n - 1;

  return {
    buyReady:
      buyArmed && buyCorrection && buyPrepared
        ? { date: rows[lastIdx].date, wave1Pct: null, pullbackPct: null }
        : null,
    sellReady:
      sellArmed && sellCorrection && sellPrepared
        ? { date: rows[lastIdx].date, wave1Pct: null, pullbackPct: null }
        : null,
    buyConfirmed: lastBuyConfirmed,
    sellConfirmed: lastSellConfirmed,
  };
}
 // 3波確定：強い1波 → 起点を割らない2波調整 → 1波高値を終値で突破

 function findRecentWave3Confirmed(rows) {
  if (!Array.isArray(rows) || rows.length < 70) return null;

  const state = runWave3StateMachine(rows);
  if (!state.buyConfirmed) return null;

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 3);
  cutoff.setHours(0, 0, 0, 0);

  const confirmedDate = new Date(`${state.buyConfirmed.date}T00:00:00`);
  if (confirmedDate < cutoff) return null;

  return state.buyConfirmed;
}

function findRecentWave3Ready(rows) {
  if (!Array.isArray(rows) || rows.length < 40) return null;

  const state = runWave3StateMachine(rows);
  if (!state.buyReady) return null;

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 3);
  cutoff.setHours(0, 0, 0, 0);

  const readyDate = new Date(`${state.buyReady.date}T00:00:00`);
  if (readyDate < cutoff) return null;

  return state.buyReady;
} 
  

function toWeeklyRows(rows) {
  const weekly = [];
  const byWeek = new Map();

  rows.forEach((row) => {
    const d = new Date(`${row.date}T00:00:00Z`);
    const mondayOffset = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - mondayOffset);
    const key = d.toISOString().slice(0, 10);
    const current = byWeek.get(key);

    if (!current) {
      byWeek.set(key, { ...row, date: key });
    } else {
      current.high = Math.max(current.high, row.high);
      current.low = Math.min(current.low, row.low);
      current.close = row.close;
      current.volume = (current.volume || 0) + (row.volume || 0);
    }
  });

  byWeek.forEach((row) => weekly.push(row));
  return weekly;
}

// =====================
// FX専用：三点山（トリプルトップ）のネックライン割れ→戻りエントリー
// 1点目の山→直後の陰線の終値がネックライン→2・3点目の山（ほぼ同水準）
// →3点目からの下落でネックラインを終値で割る→その後の戻りで検出
// =====================
function findWeeklyPivotHighs(weeklyRows, leftRight = 3) {
  const n = weeklyRows.length;
  const pivots = [];
  for (let i = leftRight; i < n - leftRight; i += 1) {
    const h = weeklyRows[i].high;
    let isPivot = true;
    for (let k = i - leftRight; k <= i + leftRight; k += 1) {
      if (k === i) continue;
      if (weeklyRows[k].high >= h) {
        isPivot = false;
        break;
      }
    }
    if (isPivot) pivots.push(i);
  }
  return pivots;
}

function findTriplePeakNecklineRetest(
  weeklyRows,
  { leftRight = 3, peakTolerancePct = 3, retestTolerancePct = 1.5, necklineSearchBars = 6, maxRetestBarsAgo = 0 } = {}
) {
  if (!Array.isArray(weeklyRows) || weeklyRows.length < 30) return null;

  const n = weeklyRows.length;
  const lastIdx = n - 1;
  const pivotHighIdx = findWeeklyPivotHighs(weeklyRows, leftRight).filter((i) => i >= n - 150);
  if (pivotHighIdx.length < 3) return null;

  for (let end = pivotHighIdx.length - 1; end >= 2; end -= 1) {
    const p3 = pivotHighIdx[end];
    const p2 = pivotHighIdx[end - 1];
    const p1 = pivotHighIdx[end - 2];
    if (p3 <= p2 || p2 <= p1) continue;

    const h1 = weeklyRows[p1].high;
    const h3 = weeklyRows[p3].high;
    // 2点目の山は1・3点目より低く凹んでいてもよい（1点目と3点目が近ければOK）
    const avgHeight = (h1 + h3) / 2;
    const withinTolerance = (Math.abs(h1 - h3) / avgHeight) * 100 <= peakTolerancePct;
    if (!withinTolerance) continue;

    // 1点目の山の直後に出る陰線を探し、その終値をネックラインにする
    let necklineIdx = -1;
    for (let j = p1 + 1; j < Math.min(p2, p1 + 1 + necklineSearchBars); j += 1) {
      if (weeklyRows[j].close < weeklyRows[j].open) {
        necklineIdx = j;
        break;
      }
    }
    if (necklineIdx === -1) continue;
    const necklineLevel = weeklyRows[necklineIdx].close;

    // 3点目の山からの下落で、ネックラインを終値で割ったか確認
    let breakIdx = -1;
    for (let k = p3 + 1; k < n; k += 1) {
      if (weeklyRows[k].close < necklineLevel) {
        breakIdx = k;
        break;
      }
    }
    if (breakIdx === -1) continue;

    // ブレイク後、ネックラインまで戻ってきた（戻り＝直近1回目のタッチ）バーを探す
    let retestIdx = -1;
    for (let m = breakIdx + 1; m < n; m += 1) {
      const high = weeklyRows[m].high;
      const closeM = weeklyRows[m].close;
      const nearNeckline =
        high >= necklineLevel * (1 - retestTolerancePct / 100) &&
        closeM <= necklineLevel * (1 + retestTolerancePct / 100);

      if (nearNeckline) {
        retestIdx = m;
        break;
      }
    }
    if (retestIdx === -1) continue;

    // 戻りが古すぎる（今の場面ではない）場合はスキップして別の山の組み合わせを探す
    if (lastIdx - retestIdx > maxRetestBarsAgo) continue;

    // 損切り：3つの山の一番高い高値の少し上（ここを超えたらパターン否定）
    const stopLoss = Math.max(h1, h3) * 1.005;
    // 利確：山の高さ（山の平均高値とネックラインの差）をネックラインから下に投影
    const patternHeight = (h1 + h3) / 2 - necklineLevel;
    const takeProfit = necklineLevel - patternHeight;

    return {
      peak1Date: weeklyRows[p1].date,
      peak2Date: weeklyRows[p2].date,
      peak3Date: weeklyRows[p3].date,
      necklineDate: weeklyRows[necklineIdx].date,
      necklineLevel,
      breakDate: weeklyRows[breakIdx].date,
      retestDate: weeklyRows[retestIdx].date,
      barsAgo: lastIdx - retestIdx,
      entryRate: necklineLevel,
      stopLoss,
      takeProfit,
    };
  }

  return null;
}

// =====================
// FX専用：三点谷（トリプルボトム）のネックライン抜け→戻りエントリー（買い版）
// 1点目の谷→直後の陽線の終値がネックライン→2・3点目の谷（ほぼ同水準、
// 2点目は1・3点目より浅くてもよい）→3点目からの上昇でネックラインを
// 終値で上抜け→その後の戻り（押し目）で検出
// =====================
function findWeeklyPivotLows(weeklyRows, leftRight = 3) {
  const n = weeklyRows.length;
  const pivots = [];
  for (let i = leftRight; i < n - leftRight; i += 1) {
    const l = weeklyRows[i].low;
    let isPivot = true;
    for (let k = i - leftRight; k <= i + leftRight; k += 1) {
      if (k === i) continue;
      if (weeklyRows[k].low <= l) {
        isPivot = false;
        break;
      }
    }
    if (isPivot) pivots.push(i);
  }
  return pivots;
}

function findTripleBottomNecklineRetest(
  weeklyRows,
  { leftRight = 3, troughTolerancePct = 3, retestTolerancePct = 1.5, necklineSearchBars = 6, maxRetestBarsAgo = 0 } = {}
) {
  if (!Array.isArray(weeklyRows) || weeklyRows.length < 30) return null;

  const n = weeklyRows.length;
  const lastIdx = n - 1;
  const pivotLowIdx = findWeeklyPivotLows(weeklyRows, leftRight).filter((i) => i >= n - 150);
  if (pivotLowIdx.length < 3) return null;

  for (let end = pivotLowIdx.length - 1; end >= 2; end -= 1) {
    const p3 = pivotLowIdx[end];
    const p2 = pivotLowIdx[end - 1];
    const p1 = pivotLowIdx[end - 2];
    if (p3 <= p2 || p2 <= p1) continue;

    const l1 = weeklyRows[p1].low;
    const l3 = weeklyRows[p3].low;
    // 2点目の谷は1・3点目より浅くてもよい（1点目と3点目が近ければOK）
    const avgDepth = (l1 + l3) / 2;
    const withinTolerance = (Math.abs(l1 - l3) / avgDepth) * 100 <= troughTolerancePct;
    if (!withinTolerance) continue;

    // 1点目の谷の直後に出る陽線を探し、その終値をネックラインにする
    let necklineIdx = -1;
    for (let j = p1 + 1; j < Math.min(p2, p1 + 1 + necklineSearchBars); j += 1) {
      if (weeklyRows[j].close > weeklyRows[j].open) {
        necklineIdx = j;
        break;
      }
    }
    if (necklineIdx === -1) continue;
    const necklineLevel = weeklyRows[necklineIdx].close;

    // 3点目の谷からの上昇で、ネックラインを終値で上抜けたか確認
    let breakIdx = -1;
    for (let k = p3 + 1; k < n; k += 1) {
      if (weeklyRows[k].close > necklineLevel) {
        breakIdx = k;
        break;
      }
    }
    if (breakIdx === -1) continue;

    // ブレイク後、ネックラインまで戻ってきた（押し目＝直近1回目のタッチ）バーを探す
    let retestIdx = -1;
    for (let m = breakIdx + 1; m < n; m += 1) {
      const low = weeklyRows[m].low;
      const closeM = weeklyRows[m].close;
      const nearNeckline =
        low <= necklineLevel * (1 + retestTolerancePct / 100) &&
        closeM >= necklineLevel * (1 - retestTolerancePct / 100);

      if (nearNeckline) {
        retestIdx = m;
        break;
      }
    }
    if (retestIdx === -1) continue;

    // 戻りが古すぎる（今の場面ではない）場合はスキップして別の谷の組み合わせを探す
    if (lastIdx - retestIdx > maxRetestBarsAgo) continue;

    // 損切り：3つの谷の一番低い安値の少し下（ここを割ったらパターン否定）
    const stopLoss = Math.min(l1, l3) * 0.995;
    // 利確：谷の深さ（ネックラインと谷の平均安値の差）をネックラインから上に投影
    const patternHeight = necklineLevel - (l1 + l3) / 2;
    const takeProfit = necklineLevel + patternHeight;

    return {
      trough1Date: weeklyRows[p1].date,
      trough2Date: weeklyRows[p2].date,
      trough3Date: weeklyRows[p3].date,
      necklineDate: weeklyRows[necklineIdx].date,
      necklineLevel,
      breakDate: weeklyRows[breakIdx].date,
      retestDate: weeklyRows[retestIdx].date,
      barsAgo: lastIdx - retestIdx,
      entryRate: necklineLevel,
      stopLoss,
      takeProfit,
    };
  }

  return null;
}

function toMonthlyRows(rows) {
  const monthly = [];
  const byMonth = new Map();

  rows.forEach((row) => {
    const key = String(row.date).slice(0, 7);
    const current = byMonth.get(key);

    if (!current) {
      byMonth.set(key, {
        ...row,
        date: `${key}-01`,
      });
    } else {
      current.high = Math.max(current.high, row.high);
      current.low = Math.min(current.low, row.low);
      current.close = row.close;
      current.volume = (current.volume || 0) + (row.volume || 0);
    }
  });

  byMonth.forEach((row) => monthly.push(row));
  return monthly;
}

function findRecentWave3SellConfirmed(rows) {
  if (!Array.isArray(rows) || rows.length < 70) return null;

  let latest = null;

  for (let i = 65; i < rows.length; i += 1) {
    const confirm = rows[i];
    const start = Math.max(0, i - 65);
    const end = i - 16;

    let baseIndex = start;
    for (let j = start + 1; j <= end; j += 1) {
      if (rows[j].high > rows[baseIndex].high) baseIndex = j;
    }

    let troughIndex = -1;
    for (let j = baseIndex + 5; j <= i - 6; j += 1) {
      if (troughIndex === -1 || rows[j].low < rows[troughIndex].low) troughIndex = j;
    }
    if (troughIndex === -1) continue;

    const wave1High = rows[baseIndex].high;
    const wave1Low = rows[troughIndex].low;
    const wave1Pct = ((wave1High - wave1Low) / wave1High) * 100;
    if (wave1Pct < 12) continue;

    let reboundIndex = troughIndex + 2;
    if (reboundIndex > i - 2) continue;

    for (let j = reboundIndex + 1; j <= i - 2; j += 1) {
      if (rows[j].high > rows[reboundIndex].high) reboundIndex = j;
    }

    const reboundHigh = rows[reboundIndex].high;
    const pullbackPct = ((reboundHigh - wave1Low) / (wave1High - wave1Low)) * 100;
    if (pullbackPct < 8 || pullbackPct > 55 || reboundHigh > wave1High * 1.02) continue;

    const closes = rows.slice(0, i + 1).map((r) => r.close);
    const sma5Now = sma(closes, 5);
    const sma20Now = sma(closes, 20);
    const rsiNow = calcRSI(closes.slice(-20), 14);
    const rsiPrev = calcRSI(closes.slice(-21, -1), 14);

    if (
      confirm.close < wave1Low &&
      sma5Now !== null &&
      sma20Now !== null &&
      confirm.close < sma20Now &&
      sma5Now < sma20Now &&
      rsiNow !== null &&
      rsiPrev !== null &&
      rsiNow <= 50 &&
      rsiNow < rsiPrev
    ) {
      latest = { date: confirm.date, wave1Pct, pullbackPct };
    }
  }

  return latest;
}

function findRecentWave3SellReady(rows) {
  if (!Array.isArray(rows) || rows.length < 70) return null;

  const lastIndex = rows.length - 1;
  const current = rows[lastIndex];
  const start = Math.max(0, lastIndex - 65);
  const baseEnd = lastIndex - 18;

  let baseIndex = start;
  for (let i = start + 1; i <= baseEnd; i += 1) {
    if (rows[i].high > rows[baseIndex].high) baseIndex = i;
  }

  let troughIndex = baseIndex + 5;
  for (let i = baseIndex + 6; i <= lastIndex - 3; i += 1) {
    if (rows[i].low < rows[troughIndex].low) troughIndex = i;
  }
  if (troughIndex >= lastIndex - 2) return null;

  let reboundIndex = troughIndex + 1;
  for (let i = troughIndex + 2; i <= lastIndex; i += 1) {
    if (rows[i].high > rows[reboundIndex].high) reboundIndex = i;
  }

  const wave1Pct =
    ((rows[baseIndex].high - rows[troughIndex].low) / rows[baseIndex].high) * 100;

  const pullbackPct =
    ((rows[reboundIndex].high - rows[troughIndex].low) /
      (rows[baseIndex].high - rows[troughIndex].low)) *
    100;

  const declineStarted =
    current.close < rows[lastIndex - 1].close &&
    current.close <= rows[reboundIndex].high * 0.96;

  if (
    wave1Pct < 15 ||
    pullbackPct < 23.6 ||
    pullbackPct > 61.8 ||
    !declineStarted ||
    current.close < rows[troughIndex].low * 0.99
  ) {
    return null;
  }

  return { date: current.date, wave1Pct, pullbackPct };
}

// =====================
// ロケットバイ：売り→横ばい→売り否定（飛行機）→M△→★Buy💚 の流れを検出
// 否定の種類(kind)は 1=通常SELL 2=StrongSELL 3=M▼ の順で強くなる
// =====================
function isSidewaysRange(rows, startIdx, endIdx, maxRangePct = 0.18) {
  if (endIdx - startIdx < 2) return false;
  const base = rows[startIdx].close;
  if (!base) return false;

  let maxHigh = -Infinity;
  let minLow = Infinity;
  for (let i = startIdx; i <= endIdx; i += 1) {
    maxHigh = Math.max(maxHigh, rows[i].high);
    minLow = Math.min(minLow, rows[i].low);
  }

  return (maxHigh - minLow) / base <= maxRangePct;
}

function findRocketBuy(rows, lookbackBars = 1) {
  if (!Array.isArray(rows) || rows.length < 40) return null;

  // 過去数年分の全履歴からではなく、直近の期間だけを対象にする
  const searchWindowBars = 90;

  const closes = rows.map((r) => r.close);
  const pos = calcUTBotPosition(rows, 2.0, 10);
  const rsi = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const n = rows.length;
  const startIdx = Math.max(2, n - searchWindowBars);

  let sellKind = 0;
  let sellHigh = null;
  let sellIdx = null;
  let sellDenied = true;

  let lastDenial = null;
  let lastMacdUpAfterDenial = null;

  for (let i = startIdx; i < n; i += 1) {
    const sellSignalNow = pos[i] === -1 && pos[i - 1] === 1;

    const rsiTurnDownNow =
      Number.isFinite(rsi[i]) &&
      Number.isFinite(rsi[i - 1]) &&
      Number.isFinite(rsi[i - 2]) &&
      rsi[i] < rsi[i - 1] &&
      rsi[i - 1] > rsi[i - 2] &&
      rsi[i - 1] >= 50;

    const strongSellNow =
      pos[i] === -1 && (isRsiHotDown70(rsi, i) || rsiTurnDownNow);

    // ヒストグラムの反転だけでは頻発しすぎるため、下降ポジション中に限定する
    const macdDownNow = pos[i] === -1 && isHistTurnDown(hist, i);

    if (sellSignalNow) {
      sellKind = 1;
      sellHigh = rows[i].high;
      sellIdx = i;
      sellDenied = false;
    }
    if (strongSellNow) {
      sellKind = 2;
      sellHigh = rows[i].high;
      sellIdx = i;
      sellDenied = false;
    }
    if (macdDownNow) {
      sellKind = 3;
      sellHigh = rows[i].high;
      sellIdx = i;
      sellDenied = false;
    }

    if (
      sellKind > 0 &&
      !sellDenied &&
      sellHigh !== null &&
      rows[i].close > sellHigh &&
      pos[i] !== -1
    ) {
      lastDenial = {
        idx: i,
        kind: sellKind,
        sideways: isSidewaysRange(rows, sellIdx, i),
        date: rows[i].date,
      };
      sellDenied = true;
      lastMacdUpAfterDenial = null;
    }

    if (lastDenial && i > lastDenial.idx && isHistTurnUp(hist, i)) {
      lastMacdUpAfterDenial = i;
    }
  }

  if (!lastDenial || lastMacdUpAfterDenial === null) return null;
  if (n - 1 - lastMacdUpAfterDenial > lookbackBars) return null;

  return {
    denialDate: lastDenial.date,
    kind: lastDenial.kind,
    sideways: lastDenial.sideways,
  };
}

// findRocketBuyのミラー(売り版)：買い→横ばい→買い否定→M▽→★Sell💗 の流れを検出
function findRocketSell(rows, lookbackBars = 1) {
  if (!Array.isArray(rows) || rows.length < 40) return null;

  const searchWindowBars = 90;

  const closes = rows.map((r) => r.close);
  const pos = calcUTBotPosition(rows, 2.0, 10);
  const rsi = calcRSISeriesWilder(closes, 14);
  const { hist } = calcMACDSeries(closes, 12, 26, 9);
  const n = rows.length;
  const startIdx = Math.max(2, n - searchWindowBars);

  let buyKind = 0;
  let buyLow = null;
  let buyIdx = null;
  let buyDenied = true;

  let lastDenial = null;
  let lastMacdDownAfterDenial = null;

  for (let i = startIdx; i < n; i += 1) {
    const buySignalNow = pos[i] === 1 && pos[i - 1] === -1;

    const rsiTurnUpNow =
      Number.isFinite(rsi[i]) &&
      Number.isFinite(rsi[i - 1]) &&
      Number.isFinite(rsi[i - 2]) &&
      rsi[i] > rsi[i - 1] &&
      rsi[i - 1] < rsi[i - 2] &&
      rsi[i - 1] <= 50;

    const strongBuyNow =
      pos[i] === 1 && (isRsiRecover30(rsi, i) || rsiTurnUpNow);

    const macdUpNow = pos[i] === 1 && isHistTurnUp(hist, i);

    if (buySignalNow) {
      buyKind = 1;
      buyLow = rows[i].low;
      buyIdx = i;
      buyDenied = false;
    }
    if (strongBuyNow) {
      buyKind = 2;
      buyLow = rows[i].low;
      buyIdx = i;
      buyDenied = false;
    }
    if (macdUpNow) {
      buyKind = 3;
      buyLow = rows[i].low;
      buyIdx = i;
      buyDenied = false;
    }

    if (
      buyKind > 0 &&
      !buyDenied &&
      buyLow !== null &&
      rows[i].close < buyLow &&
      pos[i] !== 1
    ) {
      lastDenial = {
        idx: i,
        kind: buyKind,
        sideways: isSidewaysRange(rows, buyIdx, i),
        date: rows[i].date,
      };
      buyDenied = true;
      lastMacdDownAfterDenial = null;
    }

    if (lastDenial && i > lastDenial.idx && isHistTurnDown(hist, i)) {
      lastMacdDownAfterDenial = i;
    }
  }

  if (!lastDenial || lastMacdDownAfterDenial === null) return null;
  if (n - 1 - lastMacdDownAfterDenial > lookbackBars) return null;

  return {
    denialDate: lastDenial.date,
    kind: lastDenial.kind,
    sideways: lastDenial.sideways,
  };
}

// =====================
// リボン収縮→BUY🚀（Corys Buy and Sellスクリプトの忠実移植）
// EMA(高値,9〜51を3刻み)の15本リボンが収縮している状態から、
// Keltnerベースの改造Supertrendが買いクロスした場面を検出する。
// heartBuy/rocketBuy/wave3BuyConfirmedなど既存シグナルの信頼度を
// 補強するための補助フラグとして使う。
// 収縮しきい値(2.5%)は実データ(BUYクロス直前15本のリボン幅)の
// 下位25%タイル（約2.0%）を基準に設定。
// =====================
function calcSMASeriesRolling(values, period) {
  const n = values.length;
  const out = new Array(n).fill(null);
  let sum = 0;
  for (let i = 0; i < n; i += 1) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}

function calcModifiedSupertrend(rows, { factor = 2.8, keltnerLength = 10 } = {}) {
  const n = rows.length;
  const closes = rows.map((r) => r.close);
  const smaClose = calcSMASeriesRolling(closes, keltnerLength);

  const upperBand = new Array(n).fill(null);
  const lowerBand = new Array(n).fill(null);
  const superTrend = new Array(n).fill(null);

  for (let i = 0; i < n; i += 1) {
    if (smaClose[i] === null) continue;

    const rangec = 2 * (rows[i].high - rows[i].low);
    const rawUpper = closes[i] + factor * rangec;
    const rawLower = closes[i] - factor * rangec;

    const prevLower = i > 0 ? lowerBand[i - 1] : null;
    const prevUpper = i > 0 ? upperBand[i - 1] : null;
    const prevClose = i > 0 ? closes[i - 1] : null;

    let lb = rawLower;
    if (prevLower !== null) {
      lb = rawLower > prevLower || (prevClose !== null && prevClose < prevLower) ? rawLower : prevLower;
    }

    let ub = rawUpper;
    if (prevUpper !== null) {
      ub = rawUpper < prevUpper || (prevClose !== null && prevClose > prevUpper) ? rawUpper : prevUpper;
    }

    upperBand[i] = ub;
    lowerBand[i] = lb;

    const prevSuperTrend = i > 0 ? superTrend[i - 1] : null;
    let dir;
    if (prevSuperTrend === null) {
      dir = 1;
    } else if (prevSuperTrend === prevUpper) {
      dir = closes[i] > ub ? -1 : 1;
    } else {
      dir = closes[i] < lb ? 1 : -1;
    }

    superTrend[i] = dir === -1 ? lb : ub;
  }

  return { superTrend };
}

const RIBBON_HIGH_PERIODS = (() => {
  const periods = [];
  for (let p = 9; p <= 51; p += 3) periods.push(p);
  return periods;
})();

function detectRibbonExpansion(
  rows,
  { squeezeLookback = 15, squeezeMaxWidthPct = 2.5, breakoutWindow = 5 } = {}
) {
  if (!Array.isArray(rows) || rows.length < 60) return null;

  const highs = rows.map((r) => r.high);
  const closes = rows.map((r) => r.close);
  const ribbon = RIBBON_HIGH_PERIODS.map((period) => calcEMASeries(highs, period));
  const { superTrend } = calcModifiedSupertrend(rows);
  const n = rows.length;
  const lastIndex = n - 1;

  const widthPctAt = (i) => {
    const values = ribbon.map((series) => series[i]);
    const price = closes[i];
    if (!price) return null;
    return ((Math.max(...values) - Math.min(...values)) / price) * 100;
  };

  for (let k = lastIndex; k >= Math.max(squeezeLookback + 1, lastIndex - breakoutWindow); k -= 1) {
    if (superTrend[k] === null || superTrend[k - 1] === null) continue;
    const isBuyCross = closes[k - 1] <= superTrend[k - 1] && closes[k] > superTrend[k];
    if (!isBuyCross) continue;

    const widths = [];
    for (let j = Math.max(0, k - 1 - squeezeLookback); j < k; j += 1) {
      const w = widthPctAt(j);
      if (w !== null) widths.push(w);
    }
    if (!widths.length) continue;

    const avgWidth = widths.reduce((a, b) => a + b, 0) / widths.length;
    if (avgWidth > squeezeMaxWidthPct) continue;

    return { date: rows[k].date, barsAgo: lastIndex - k, squeezeWidthPct: avgWidth };
  }

  return null;
}

// リボン収縮→SELL😡（detectRibbonExpansionのミラー、Corys売り版）
function detectRibbonContraction(
  rows,
  { squeezeLookback = 15, squeezeMaxWidthPct = 2.5, breakoutWindow = 5 } = {}
) {
  if (!Array.isArray(rows) || rows.length < 60) return null;

  const lows = rows.map((r) => r.low);
  const closes = rows.map((r) => r.close);
  const ribbon = RIBBON_HIGH_PERIODS.map((period) => calcEMASeries(lows, period));
  const { superTrend } = calcModifiedSupertrend(rows);
  const n = rows.length;
  const lastIndex = n - 1;

  const widthPctAt = (i) => {
    const values = ribbon.map((series) => series[i]);
    const price = closes[i];
    if (!price) return null;
    return ((Math.max(...values) - Math.min(...values)) / price) * 100;
  };

  for (let k = lastIndex; k >= Math.max(squeezeLookback + 1, lastIndex - breakoutWindow); k -= 1) {
    if (superTrend[k] === null || superTrend[k - 1] === null) continue;
    const isSellCross = closes[k - 1] >= superTrend[k - 1] && closes[k] < superTrend[k];
    if (!isSellCross) continue;

    const widths = [];
    for (let j = Math.max(0, k - 1 - squeezeLookback); j < k; j += 1) {
      const w = widthPctAt(j);
      if (w !== null) widths.push(w);
    }
    if (!widths.length) continue;

    const avgWidth = widths.reduce((a, b) => a + b, 0) / widths.length;
    if (avgWidth > squeezeMaxWidthPct) continue;

    return { date: rows[k].date, barsAgo: lastIndex - k, squeezeWidthPct: avgWidth };
  }

  return null;
}

// =====================
// v40「Progress Navigator」Pineスクリプトの追加フィルター群
// (一目均衡表・MAパーフェクトオーダー・BBスクイーズ拡大・200EMA上昇・
//  標準ATR Supertrend) を忠実に移植し、補助スコアとして使う。
// =====================
function calcRollingHighest(values, period) {
  const n = values.length;
  const out = new Array(n).fill(null);
  for (let i = period - 1; i < n; i += 1) {
    let max = -Infinity;
    for (let j = i - period + 1; j <= i; j += 1) if (values[j] > max) max = values[j];
    out[i] = max;
  }
  return out;
}

function calcRollingLowest(values, period) {
  const n = values.length;
  const out = new Array(n).fill(null);
  for (let i = period - 1; i < n; i += 1) {
    let min = Infinity;
    for (let j = i - period + 1; j <= i; j += 1) if (values[j] < min) min = values[j];
    out[i] = min;
  }
  return out;
}

function calcIchimokuBuyFilter(rows) {
  const n = rows.length;
  if (n < 53) return false;
  const highs = rows.map((r) => r.high);
  const lows = rows.map((r) => r.low);
  const closes = rows.map((r) => r.close);

  const highest9 = calcRollingHighest(highs, 9);
  const lowest9 = calcRollingLowest(lows, 9);
  const highest26 = calcRollingHighest(highs, 26);
  const lowest26 = calcRollingLowest(lows, 26);
  const highest52 = calcRollingHighest(highs, 52);
  const lowest52 = calcRollingLowest(lows, 52);

  const i = n - 1;
  if (
    [highest9[i], lowest9[i], highest26[i], lowest26[i], highest52[i], lowest52[i]].some((v) => v === null) ||
    i - 26 < 0
  ) {
    return false;
  }

  const tenkan = (highest9[i] + lowest9[i]) / 2;
  const kijun = (highest26[i] + lowest26[i]) / 2;
  const senkouA = (tenkan + kijun) / 2;
  const senkouB = (highest52[i] + lowest52[i]) / 2;

  return closes[i] > Math.max(senkouA, senkouB) && tenkan > kijun && closes[i] > closes[i - 26];
}

// 雲の薄さ判定: センコウスパンA/Bの幅が価格に対して小さいほど、雲が抵抗/支持として弱く
// ブレイクしやすい。3%未満を「薄い」とみなす(Pine版と同じしきい値)。
function detectThinCloud(rows, thinPct = 3.0) {
  const n = rows.length;
  if (n < 53) return { isThin: false, widthPct: null, aboveCloud: false, belowCloud: false };
  const highs = rows.map((r) => r.high);
  const lows = rows.map((r) => r.low);
  const closes = rows.map((r) => r.close);

  const highest9 = calcRollingHighest(highs, 9);
  const lowest9 = calcRollingLowest(lows, 9);
  const highest26 = calcRollingHighest(highs, 26);
  const lowest26 = calcRollingLowest(lows, 26);
  const highest52 = calcRollingHighest(highs, 52);
  const lowest52 = calcRollingLowest(lows, 52);

  const i = n - 1;
  if ([highest9[i], lowest9[i], highest26[i], lowest26[i], highest52[i], lowest52[i]].some((v) => v === null)) {
    return { isThin: false, widthPct: null, aboveCloud: false, belowCloud: false };
  }

  const tenkan = (highest9[i] + lowest9[i]) / 2;
  const kijun = (highest26[i] + lowest26[i]) / 2;
  const senkouA = (tenkan + kijun) / 2;
  const senkouB = (highest52[i] + lowest52[i]) / 2;
  const price = closes[i];
  if (!price) return { isThin: false, widthPct: null, aboveCloud: false, belowCloud: false };

  const widthPct = (Math.abs(senkouA - senkouB) / price) * 100;
  const isThin = widthPct < thinPct;
  const aboveCloud = price > Math.max(senkouA, senkouB);
  const belowCloud = price < Math.min(senkouA, senkouB);
  return { isThin, widthPct, aboveCloud, belowCloud };
}

function calcBollingerBands(closes, period = 20, mult = 2) {
  const n = closes.length;
  const mid = new Array(n).fill(null);
  const upper = new Array(n).fill(null);
  const lower = new Array(n).fill(null);

  for (let i = period - 1; i < n; i += 1) {
    const window = closes.slice(i - period + 1, i + 1);
    const mean = window.reduce((a, b) => a + b, 0) / period;
    const variance = window.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / period;
    const sd = Math.sqrt(variance);
    mid[i] = mean;
    upper[i] = mean + sd * mult;
    lower[i] = mean - sd * mult;
  }

  return { mid, upper, lower };
}

function calcStandardSupertrendDirection(rows, { factor = 3, period = 10 } = {}) {
  const n = rows.length;
  const atr = calcATRSeriesWilder(rows, period);
  const closes = rows.map((r) => r.close);
  const hl2 = rows.map((r) => (r.high + r.low) / 2);

  const finalUpper = new Array(n).fill(null);
  const finalLower = new Array(n).fill(null);
  const superTrend = new Array(n).fill(null);
  const direction = new Array(n).fill(null);

  for (let i = 0; i < n; i += 1) {
    if (atr[i] === null) continue;

    const basicUpper = hl2[i] + factor * atr[i];
    const basicLower = hl2[i] - factor * atr[i];

    const prevFinalUpper = i > 0 ? finalUpper[i - 1] : null;
    const prevFinalLower = i > 0 ? finalLower[i - 1] : null;
    const prevClose = i > 0 ? closes[i - 1] : null;

    finalUpper[i] =
      prevFinalUpper === null || basicUpper < prevFinalUpper || (prevClose !== null && prevClose > prevFinalUpper)
        ? basicUpper
        : prevFinalUpper;

    finalLower[i] =
      prevFinalLower === null || basicLower > prevFinalLower || (prevClose !== null && prevClose < prevFinalLower)
        ? basicLower
        : prevFinalLower;

    const prevSuperTrend = i > 0 ? superTrend[i - 1] : null;

    if (prevSuperTrend === null) {
      direction[i] = 1;
    } else if (prevSuperTrend === (i > 0 ? finalUpper[i - 1] : null)) {
      direction[i] = closes[i] <= finalUpper[i] ? 1 : -1;
    } else {
      direction[i] = closes[i] >= finalLower[i] ? -1 : 1;
    }

    superTrend[i] = direction[i] === -1 ? finalLower[i] : finalUpper[i];
  }

  return direction[n - 1] ?? null;
}

// 週足/月足レンジの下位ゾーンに価格があるか（上位足も底にあるかの確認用）
function isHigherTfAtBottom(tfRows, lookback) {
  if (!Array.isArray(tfRows) || tfRows.length < 10) return false;
  const recent = tfRows.slice(-lookback);
  const high = Math.max(...recent.map((r) => r.high));
  const low = Math.min(...recent.map((r) => r.low));
  const range = high - low;
  if (range <= 0) return false;
  const price = tfRows[tfRows.length - 1].close;
  return (price - low) / range <= 0.35;
}

function calcV40BuyFilters(rows) {
  if (!Array.isArray(rows) || rows.length < 210) {
    return { ichiBuyFilter: false, maPoBuyFilter: false, bbSqueezeOrExpandUp: false, ema200BuyFilter: false, superBuyFilter: false, filterScore: 0 };
  }

  const closes = rows.map((r) => r.close);
  const last = closes.length - 1;

  const ichiBuyFilter = calcIchimokuBuyFilter(rows);

  const ema20Series = calcEMASeries(closes, 20);
  const ema75Series = calcEMASeries(closes, 75);
  const ema200Series = calcEMASeries(closes, 200);
  const maPoBuyFilter = ema20Series[last] > ema75Series[last] && ema75Series[last] > ema200Series[last];

  const { mid, upper, lower } = calcBollingerBands(closes, 20, 2);
  const bbWidth = mid.map((m, i) => (m !== null && upper[i] !== null && lower[i] !== null ? (upper[i] - lower[i]) / m : null));
  const bbWidthLowest = calcRollingLowest(
    bbWidth.map((w) => (w === null ? Infinity : w)),
    20
  );
  const bbSqueeze = bbWidth[last] !== null && bbWidthLowest[last] !== null && bbWidth[last] <= bbWidthLowest[last] * 1.15;
  const bbExpandUp = bbWidth[last] !== null && bbWidth[last - 1] !== null && bbWidth[last] > bbWidth[last - 1] && closes[last] > mid[last];
  const bbSqueezeOrExpandUp = bbSqueeze || bbExpandUp;

  const ema200BuyFilter = closes[last] > ema200Series[last] && ema200Series[last] >= ema200Series[last - 1];

  const superDirection = calcStandardSupertrendDirection(rows, { factor: 3, period: 10 });
  const superBuyFilter = superDirection === -1;

  const filterScore =
    (ichiBuyFilter ? 1 : 0) +
    (maPoBuyFilter ? 1 : 0) +
    (bbSqueezeOrExpandUp ? 1 : 0) +
    (ema200BuyFilter ? 1 : 0) +
    (superBuyFilter ? 1 : 0);

  return { ichiBuyFilter, maPoBuyFilter, bbSqueezeOrExpandUp, ema200BuyFilter, superBuyFilter, filterScore };
}

function judgeSignal(target, rows, hourlyRows = []){

  if (!rows || rows.length === 0) {
    return {
      ...target,
      signal: "取得失敗",
      direction: "fail",
      rank: "取得失敗",
      score: 0,
      memo: "株価データを取得できませんでした",
    };
  }

  if (rows.length < 10) {
    const last = rows[rows.length - 1];
    return {
      ...target,
      date: last.date,
      price: last.close,
      changePct: 0,
      volume: last.volume,
      volRatio: 0,
      rsi: null,
      position: 0.5,
      low60: last.low,
      high60: last.high,
      score: 40,
      rank: "監視",
      direction: "watch",
      signal: "データ不足",
      entryOk: "待ち",
      memo: "履歴が少ないため簡易表示",
      stopLoss: last.close,
      stopRiskPct: 0,
      targetText: "",
      shortScore: 0,
      dev25: null,
      dev75: null,
      stopHighCount: 0,
      candleName: "",
      candleMemo: "",
    };
  }

  const last = rows[rows.length - 1];
  const prev = rows[rows.length - 2];

const weeklyRows =
  target.kind === "stock" || target.kind === "forex" ? toWeeklyRows(rows) : [];

const monthlyRows =
  target.kind === "stock" || target.kind === "forex" ? toMonthlyRows(rows) : [];

const weeklyBuyPos = calcUTBotPosition(weeklyRows, 2.0, 10);
const monthlyBuyPos = calcUTBotPosition(monthlyRows, 2.0, 10);
const weeklyUp =
  weeklyBuyPos.length > 0 &&
  weeklyBuyPos[weeklyBuyPos.length - 1] === 1;

const monthlyUp =
  monthlyBuyPos.length > 0 &&
  monthlyBuyPos[monthlyBuyPos.length - 1] === 1;

const barsSinceRecentBuy = (positions) => {
  for (let i = positions.length - 1; i >= 1; i -= 1) {
    if (
      positions[i] === 1 &&
      positions[i - 1] === -1
    ) {
      return positions.length - 1 - i;
    }
  }

  return Infinity;
};

const barsSinceRecentSell = (positions) => {
  for (let i = positions.length - 1; i >= 1; i -= 1) {
    if (
      positions[i] === -1 &&
      positions[i - 1] === 1
    ) {
      return positions.length - 1 - i;
    }
  }

  return Infinity;
};

const weeklyBuyRecent =
  weeklyBuyPos.length >= 2 &&
  weeklyBuyPos[weeklyBuyPos.length - 1] === 1 &&
  barsSinceRecentBuy(weeklyBuyPos) <= 1;

const monthlyBuyRecent =
  monthlyBuyPos.length >= 2 &&
  monthlyBuyPos[monthlyBuyPos.length - 1] === 1 &&
  barsSinceRecentBuy(monthlyBuyPos) <= 1;
const wave3BuyConfirmed = target.kind === "stock" ? findRecentWave3Confirmed(rows) : null;
const wave3BuyReady = target.kind === "stock" ? findRecentWave3Ready(weeklyRows) : null;
const wave3SellConfirmed = target.kind === "stock" ? findRecentWave3SellConfirmed(rows) : null;
const wave3SellReady = target.kind === "stock" ? findRecentWave3SellReady(weeklyRows) : null;
const { inBullOB, inBearOB } = target.kind === "stock" ? detectOrderBlock(rows) : { inBullOB: false, inBearOB: false };
// 高値からの下落率・23.6%戻りは月足で見ないと意味がないため、monthlyRowsを使う
const fibBounce = target.kind === "stock" ? detectFibBounceFromBottom(monthlyRows) : { fibMatch: false };
  const closes = rows.map((r) => r.close);
  const bbUpper = calcBollingerUpper(closes, 20, 2);
const weeklyCloses = weeklyRows.map((r) => r.close);
const weeklyRsi = calcRSI(weeklyCloses, 14);
const weeklyRsi90 = weeklyRsi !== null && weeklyRsi >= 90;
const monthlyClosesForRsi = monthlyRows.map((r) => r.close);
const monthlyRsi = calcRSI(monthlyClosesForRsi, 14);
const monthlyRsi80 = monthlyRsi !== null && monthlyRsi >= 80;

// ロック: ①週足MACD△→②週足RSI△→③Buy、のバックテストで有効性確認済みの必須条件。
// ユーザー指示により、この条件(定義・要否とも)は無断で変更しないこと。
const weeklyMacdSeriesForTurnUp = calcMACDSeries(weeklyCloses, 12, 26, 9);
const weeklyMacdTurnUp = isHistTurnUp(
  weeklyMacdSeriesForTurnUp.hist,
  weeklyMacdSeriesForTurnUp.hist.length - 1
);
const weeklyRsiSeriesForTurnUp = calcRSISeriesWilder(weeklyCloses, 14);
const weeklyRsiTurnUpLastIdx = weeklyRsiSeriesForTurnUp.length - 1;
const weeklyRsiTurnUp =
  weeklyRsiTurnUpLastIdx >= 1 &&
  weeklyRsiSeriesForTurnUp[weeklyRsiTurnUpLastIdx] !== null &&
  weeklyRsiSeriesForTurnUp[weeklyRsiTurnUpLastIdx - 1] !== null &&
  weeklyRsiSeriesForTurnUp[weeklyRsiTurnUpLastIdx] > weeklyRsiSeriesForTurnUp[weeklyRsiTurnUpLastIdx - 1];
const weeklyMacdRsiBuyGate = weeklyMacdTurnUp && weeklyRsiTurnUp;
const hourlyCloses = hourlyRows.map((r) => r.close);
const hourlySma75 = sma(hourlyCloses, 75);

const hourly75Support =
  hourlyRows.length >= 75 &&
  hourlySma75 !== null &&
  hourlyRows[hourlyRows.length - 1].low <= hourlySma75 * 1.01 &&
  hourlyRows[hourlyRows.length - 1].close > hourlySma75;
  const highs = rows.map((r) => r.high);
  const lows = rows.map((r) => r.low);
  const volumes = rows.map((r) => r.volume);

  const price = last.close;
  const isAboveBBUpper = bbUpper !== null && price > bbUpper;
  const prevClose = prev.close;
  const changePct = ((price - prevClose) / prevClose) * 100;

  const sma5 = sma(closes, 5);
  const sma20 = sma(closes, 20);
  const sma25 = sma(closes, 25);
  const sma75 = sma(closes, 75);
    const sma200 = sma(closes, 200);
  const prevSma75 = sma(closes.slice(0, -1), 75);
  const prevSma200 = sma(closes.slice(0, -1), 200);

  const ema20Series = calcEMASeries(closes, 20);
  const ema20 = ema20Series[ema20Series.length - 1];
  const prevEma20 = ema20Series[ema20Series.length - 2];

  const gc20_75 =
    prevEma20 !== null &&
    prevSma75 !== null &&
    ema20 !== null &&
    sma75 !== null &&
    prevEma20 <= prevSma75 &&
    ema20 > sma75;

  // 「75/200週Buy」タブ用：週足の75週線・200週線のゴールデンクロス
  const weeklySma75 = sma(weeklyCloses, 75);
  const weeklySma200 = sma(weeklyCloses, 200);
  const prevWeeklySma75 = sma(weeklyCloses.slice(0, -1), 75);
  const prevWeeklySma200 = sma(weeklyCloses.slice(0, -1), 200);
  const weeklyCloseNow = weeklyCloses[weeklyCloses.length - 1] ?? null;
  const weeklyCloseNowPrev = weeklyCloses[weeklyCloses.length - 2] ?? null;

  // 週足75/200MAが接近中（まだクロスしていない）
  const weekly75_200Approaching =
    weeklySma75 !== null &&
    weeklySma200 !== null &&
    weeklySma75 < weeklySma200 &&
    (weeklySma200 - weeklySma75) / weeklySma200 <= 0.08;

  // 価格が週足75MAを上抜けた（直近4週間以内でOK）
  const weeklySma75Series = (() => {
    const arr = [];
    for (let i = 0; i < weeklyCloses.length; i += 1) {
      arr.push(sma(weeklyCloses.slice(0, i + 1), 75));
    }
    return arr;
  })();

  let weekly75MaBreak = false;
  const breakLookback = 4;
  for (
    let i = Math.max(1, weeklyCloses.length - breakLookback);
    i < weeklyCloses.length;
    i += 1
  ) {
    const smaAtI = weeklySma75Series[i];
    const smaAtPrev = weeklySma75Series[i - 1];
    if (smaAtI === null || smaAtPrev === null) continue;
    if (weeklyCloses[i - 1] <= smaAtPrev && weeklyCloses[i] > smaAtI) {
      weekly75MaBreak = true;
      break;
    }
  }

  const gc75_200 = weekly75_200Approaching && weekly75MaBreak;

  const dev25 = calcDeviation(price, sma25);
  const dev75 = calcDeviation(price, sma75);

  // =====================
  // ショート3タイプ用：M▼・RCI▼・BB＋2σ
  // =====================
  const { macdLine: shortMacdLine } = calcMACDSeries(
    closes,
    12,
    26,
    9
  );

  const shortLastIndex = closes.length - 1;

  // M▼：MACDラインが山を作って下向きへ転換
  const mDownNow =
    shortLastIndex >= 2 &&
    Number.isFinite(shortMacdLine[shortLastIndex]) &&
    Number.isFinite(shortMacdLine[shortLastIndex - 1]) &&
    Number.isFinite(shortMacdLine[shortLastIndex - 2]) &&
    shortMacdLine[shortLastIndex] <
      shortMacdLine[shortLastIndex - 1] &&
    shortMacdLine[shortLastIndex - 1] >
      shortMacdLine[shortLastIndex - 2];

  // RCI▼：9・26・52が売り並びへ切り替わった最初の足
  const prevShortCloses = closes.slice(0, -1);

  const rciSNow = calcRCI(closes, 9);
  const rciMNow = calcRCI(closes, 26);
  const rciLNow = calcRCI(closes, 52);

  const rciSPrev = calcRCI(prevShortCloses, 9);
  const rciMPrev = calcRCI(prevShortCloses, 26);
  const rciLPrev = calcRCI(prevShortCloses, 52);

  const rciSellStateNow =
    Number.isFinite(rciSNow) &&
    Number.isFinite(rciMNow) &&
    Number.isFinite(rciLNow) &&
    rciSNow < rciMNow &&
    rciMNow < rciLNow &&
    rciLNow < rciLPrev;

  const rciSellStatePrev =
    Number.isFinite(rciSPrev) &&
    Number.isFinite(rciMPrev) &&
    Number.isFinite(rciLPrev) &&
    rciSPrev < rciMPrev &&
    rciMPrev < rciLPrev;

  const rciDownNow =
    rciSellStateNow && !rciSellStatePrev;

  // 直近3本以内に高値がBB＋2σを突破
  const calcBbUpperAt = (index) => {
    if (index < 19) return null;

    const window = closes.slice(index - 19, index + 1);
    const middle =
      window.reduce((sum, value) => sum + value, 0) /
      window.length;

    const variance =
      window.reduce(
        (sum, value) =>
          sum + Math.pow(value - middle, 2),
        0
      ) / window.length;

    return middle + 2 * Math.sqrt(variance);
  };

  const bbUpperBreakRecent = [0, 1, 2].some(
    (offset) => {
      const index = shortLastIndex - offset;
      const bbUpper = calcBbUpperAt(index);

      return (
        index >= 0 &&
        bbUpper !== null &&
        Number.isFinite(highs[index]) &&
        highs[index] > bbUpper
      );
    }
  );

    const shortType1 =
    target.kind === "stock" &&
    isLendingStock(target.code) &&
    price <= TARGET_PRICE_LIMIT &&
    dev75 !== null &&
    dev75 >= 100 &&
    mDownNow;

  const shortType2 =
    target.kind === "stock" &&
    isLendingStock(target.code) &&
    price <= TARGET_PRICE_LIMIT &&
    bbUpperBreakRecent &&
    mDownNow &&
    rciDownNow;
  // =====================
  // ★S2：日足SELL点灯＋4H SELLが直近1本以内
  // =====================
  const fourHourRows = toFourHourRows(hourlyRows);
  // 4Hタートル買い（✫Buy💚の絞り込み用：日足タートル＋4Hタートル＋日足Bu-OBが同時に揃うか）
  const turtleBuy4H = target.kind === "stock" ? detectTurtleBuy(fourHourRows) : false;
  // 4H 75EMA・75MAのDC履歴を確認
const fourHourCloses = fourHourRows.map((r) => r.close);
const fourHourEma75Series = calcEMASeries(fourHourCloses, 75);

// 4H 75EMAが75MAに接近中（ゴールデンクロス手前）かどうか
const fourHourEma75Now = fourHourEma75Series[fourHourEma75Series.length - 1] ?? null;
const fourHourSma75Now = sma(fourHourCloses, 75);
const fourHourGcApproaching =
  fourHourEma75Now !== null &&
  fourHourSma75Now !== null &&
  fourHourEma75Now < fourHourSma75Now &&
  (fourHourSma75Now - fourHourEma75Now) / fourHourSma75Now <= 0.02;

let fourHour75DcRecent = false;
let fourHour75DcBarsAgo = null;

if (fourHourCloses.length >= 30) {
const searchStart = Math.max(1, fourHourCloses.length - 60);

  for (let i = fourHourCloses.length - 1; i >= searchStart; i -= 1) {
    const currentSma75 = sma(fourHourCloses.slice(0, i + 1), 75);
    const previousSma75 = sma(fourHourCloses.slice(0, i), 75);

    const currentEma75 = fourHourEma75Series[i];
    const previousEma75 = fourHourEma75Series[i - 1];

    const dc75 =
      previousEma75 !== null &&
      currentEma75 !== null &&
      previousSma75 !== null &&
      currentSma75 !== null &&
      previousEma75 >= previousSma75 &&
      currentEma75 < currentSma75;

    if (dc75) {
      fourHour75DcRecent = true;
      fourHour75DcBarsAgo = fourHourCloses.length - 1 - i;
      break;
    }
  }
}

const dayPos = calcUTBotPosition(rows, 2.0, 10);
const fourHourPos = calcUTBotPosition(fourHourRows, 2.0, 10);


  const lastDayIndex = dayPos.length - 1;
  const lastFourHourIndex = fourHourPos.length - 1;

  const daySellNow =
    lastDayIndex >= 1 &&
    dayPos[lastDayIndex] === -1 &&
    dayPos[lastDayIndex - 1] === 1;

  const barsSinceLastSell = (positions) => {
    for (let i = positions.length - 1; i >= 1; i -= 1) {
      if (
        positions[i] === -1 &&
        positions[i - 1] === 1
      ) {
        return positions.length - 1 - i;
      }
    }

    return Infinity;
  };

  const fourHourSellBars =
    barsSinceLastSell(fourHourPos);

  const syncSell2 =
    daySellNow &&
    lastFourHourIndex >= 0 &&
    fourHourPos[lastFourHourIndex] === -1 &&
    fourHourSellBars <= 1;

  const shortType3 =
    target.kind === "stock" &&
    isLendingStock(target.code) &&
    price <= TARGET_PRICE_LIMIT &&
    bbUpperBreakRecent &&
    syncSell2 &&
    mDownNow &&
    rciDownNow;
  const shortSignalLabels = [];

  if (shortType1) {
    shortSignalLabels.push("① 75乖離100＋M▽");
  }

  if (shortType2) {
    shortSignalLabels.push("② 2σ＋M▽＋RCI▽");
  }
  if (shortType3) {
  shortSignalLabels.push("③ 2σ＋★S2＋M▽＋RCI▽");
}

  // 三点山のネックライン割れ→戻り（この手法は時間足・銘柄種別を問わず成立するため、日足・週足・月足すべてで確認）
  const triplePatternApplies = target.kind === "forex" || target.kind === "stock";
  const fxTriplePeakInfoDaily = triplePatternApplies ? findTriplePeakNecklineRetest(rows) : null;
  const fxTriplePeakInfoWeekly = triplePatternApplies ? findTriplePeakNecklineRetest(weeklyRows) : null;
  const fxTriplePeakInfoMonthly = triplePatternApplies ? findTriplePeakNecklineRetest(monthlyRows) : null;
  const fxTriplePeakInfo = fxTriplePeakInfoDaily || fxTriplePeakInfoWeekly || fxTriplePeakInfoMonthly;
  if (target.kind === "forex" && fxTriplePeakInfoDaily) {
    shortSignalLabels.push("三点山ネックライン戻り売り(日足)");
  }
  if (target.kind === "forex" && fxTriplePeakInfoWeekly) {
    shortSignalLabels.push("三点山ネックライン戻り売り(週足)");
  }
  if (target.kind === "forex" && fxTriplePeakInfoMonthly) {
    shortSignalLabels.push("三点山ネックライン戻り売り(月足)");
  }

  // 三点谷のネックライン上抜け→戻り（日足・週足・月足すべてで確認）
  const fxTripleBottomInfoDaily = triplePatternApplies ? findTripleBottomNecklineRetest(rows) : null;
  const fxTripleBottomInfoWeekly = triplePatternApplies ? findTripleBottomNecklineRetest(weeklyRows) : null;
  const fxTripleBottomInfoMonthly = triplePatternApplies ? findTripleBottomNecklineRetest(monthlyRows) : null;
  const fxTripleBottomInfo = fxTripleBottomInfoDaily || fxTripleBottomInfoWeekly || fxTripleBottomInfoMonthly;

  const vol20 = sma(volumes, 20);
  const volRatio = vol20 ? last.volume / vol20 : 0;

  const rsiNow = calcRSI(closes.slice(-20), 14);
const rsiPrev = calcRSI(closes.slice(-21, -1), 14);
  const high60 = Math.max(...highs.slice(-60));
  const low60 = Math.min(...lows.slice(-60));
  const range60 = high60 - low60;
  const position = range60 > 0 ? (price - low60) / range60 : 0.5;

  const atr = calcATR(rows, 14);

  const isBull = last.close > last.open;
  const isBear = last.close < last.open;

  const closeAbove5 = sma5 && price > sma5;
  const closeBelow5 = sma5 && price < sma5;
  const closeAbove20 = sma20 && price > sma20;
  const closeBelow20 = sma20 && price < sma20;

  const rsiUp = rsiNow !== null && rsiPrev !== null && rsiNow > rsiPrev;
  const rsiDown = rsiNow !== null && rsiPrev !== null && rsiNow < rsiPrev;
// B3用：直近60本のどこかでRSI30以下に到達したか確認
// =====================
// ★Buy💚 / ★Sell❤️（TradingView Strong相当）
// =====================
const strongRsiSeries = calcRSISeriesWilder(closes, 14);
const { hist: strongHist } = calcMACDSeries(closes, 12, 26, 9);

const strongLastIndex = closes.length - 1;
const strongStartIndex = Math.max(2, strongLastIndex - 7);

let recentStrongBuyTrigger = false;
let recentStrongSellTrigger = false;

for (let i = strongStartIndex; i <= strongLastIndex; i += 1) {
  const rsi0 = strongRsiSeries[i];
  const rsi1 = strongRsiSeries[i - 1];
  const rsi2 = strongRsiSeries[i - 2];

  const rsiTurnUp =
    Number.isFinite(rsi0) &&
    Number.isFinite(rsi1) &&
    Number.isFinite(rsi2) &&
    rsi0 > rsi1 &&
    rsi1 < rsi2 &&
    rsi1 <= 50;

  const rsiTurnDown =
    Number.isFinite(rsi0) &&
    Number.isFinite(rsi1) &&
    Number.isFinite(rsi2) &&
    rsi0 < rsi1 &&
    rsi1 > rsi2 &&
    rsi1 >= 50;

  const macdTurnUp =
    Number.isFinite(shortMacdLine[i]) &&
    Number.isFinite(shortMacdLine[i - 1]) &&
    Number.isFinite(shortMacdLine[i - 2]) &&
    shortMacdLine[i] > shortMacdLine[i - 1] &&
    shortMacdLine[i - 1] < shortMacdLine[i - 2];

  const macdTurnDown =
    Number.isFinite(shortMacdLine[i]) &&
    Number.isFinite(shortMacdLine[i - 1]) &&
    Number.isFinite(shortMacdLine[i - 2]) &&
    shortMacdLine[i] < shortMacdLine[i - 1] &&
    shortMacdLine[i - 1] > shortMacdLine[i - 2];

  if (
    isRsiRecover30(strongRsiSeries, i) ||
    rsiTurnUp ||
    macdTurnUp ||
    isHistTurnUp(strongHist, i)
  ) {
    recentStrongBuyTrigger = true;
  }

  if (
    isRsiHotDown70(strongRsiSeries, i) ||
    rsiTurnDown ||
    macdTurnDown ||
    isHistTurnDown(strongHist, i)
  ) {
    recentStrongSellTrigger = true;
  }
}

const strongRsiNow = strongRsiSeries[strongLastIndex];
const strongRsiPrev = strongRsiSeries[strongLastIndex - 1];

const rsiBuyNowStrong =
  Number.isFinite(strongRsiNow) &&
  Number.isFinite(strongRsiPrev) &&
  strongRsiNow > strongRsiPrev &&
  strongRsiNow <= 50;

const rsiSellNowStrong =
  Number.isFinite(strongRsiNow) &&
  Number.isFinite(strongRsiPrev) &&
  strongRsiNow < strongRsiPrev &&
  strongRsiNow >= 50;

// 日足UTボットが今回買いへ転換して1本目（当日〜翌日まで許容）
const freshDayBuy =
  target.kind === "stock" &&
  lastDayIndex >= 1 &&
  dayPos[lastDayIndex] === 1 &&
  barsSinceRecentBuy(dayPos) <= 1;

const heartBuy =
  target.kind === "stock" &&
  lastDayIndex >= 0 &&
  dayPos[lastDayIndex] === 1 &&
  (recentStrongBuyTrigger || rsiBuyNowStrong);

// ★Buy💚＋通常BUYが同時に出て、かつ4H20MAが75MAに接近中（GC手前）
const fourHSignalReady = heartBuy && freshDayBuy && fourHourGcApproaching;

// 売り→横ばい→売り否定（飛行機）→M△→★Buy💚 の一連の流れ
const rocketBuyInfo = target.kind === "stock" ? findRocketBuy(rows) : null;
const rocketBuy = Boolean(rocketBuyInfo) && rocketBuyInfo.sideways && heartBuy;
const rocketBuyKind = rocketBuyInfo?.kind || null;
// 横ばい判定は問わず、直近に売りシグナル否定(飛行機)が出たかどうか
const sellDeniedRecent = Boolean(rocketBuyInfo);

// 「日足強い買い転換」の絞り込み強化用: MA初動 / フィボ61.8%抜け後の調整
const maAngleUp = target.kind === "stock" ? detectMaTurningUp(rows.map((r) => r.close)) : false;
const fib618Pullback = target.kind === "stock" ? detectFib618Pullback(rows) : false;

// ✫Buy💚ドッキング用: タートル流ブレイクアウト買い
const turtleBuy = target.kind === "stock" ? detectTurtleBuy(rows) : false;
const turtleSell = target.kind === "stock" ? detectTurtleSell(rows) : false;

// ✫Buy💚のさらなる絞り込み用: 日足タートル＋4Hタートル＋日足Bu-OBが同時に揃う銘柄だけ
const turtleMultiTF = target.kind === "stock" && turtleBuy && turtleBuy4H && inBullOB;

// ロック: 「ロケットバイ＋タートル+BuOB」の組み合わせ。10年バックテストで検証済み
// (20営業日以内+20%到達率19.9%、タートル+BuOB単体15.8%・ロケット単体10.0%より速い)。
// heartBuyを足すと逆に成績が落ちるため意図的に含めていない。ユーザー指示により無断で変更しないこと。
const rocketRecentForCombo = target.kind === "stock" ? Boolean(findRocketBuy(rows, 4)) : false;
const turtleOBRecent = target.kind === "stock" && wasTrueRecently(rows, detectTurtleBuy, 4) && inBullOB;
const rocketTurtleCombo = rocketRecentForCombo && turtleOBRecent;

// 4コンボ(超本命): 3コンボ(rocketTurtleCombo)に加えて、直近でタートル売りが否定された(逆方向の否定)場合。
// 3コンボ自体の定義は一切変更していない、追加のOR/AND条件として乗せただけ。
const turtleSellDeniedRecent = target.kind === "stock" && wasTrueRecently(rows, detectTurtleSellDenied, 4);
const superCombo = rocketTurtleCombo && turtleSellDeniedRecent;

// ↓↓↓ 以下、rocketTurtleCombo/superComboの売り版・FX/指数版。上記ロック済みの2行は一切変更していない、追加フィールドのみ ↓↓↓

// 🚀タートル速攻(売り): ロケットセル＋タートル売り+Be-OBの組み合わせ(ロング版のミラー)
const rocketSellRecentForCombo = target.kind === "stock" ? Boolean(findRocketSell(rows, 4)) : false;
const turtleOBRecentSell = target.kind === "stock" && wasTrueRecently(rows, detectTurtleSell, 4) && inBearOB;
const rocketTurtleComboSell = rocketSellRecentForCombo && turtleOBRecentSell;

// 👑超本命(売り): 3コンボ(売り)に加えて、直近でタートル買いが否定された場合
const turtleBuyDeniedRecent = target.kind === "stock" && wasTrueRecently(rows, detectTurtleBuyDenied, 4);
const superComboSell = rocketTurtleComboSell && turtleBuyDeniedRecent;

// ==== FX/暗号資産/指数版のcombo (turtle+rocket+OB方式) ====
// stock版(上記のrocketTurtleCombo/superCombo/rocketTurtleComboSell/superComboSell)とは完全に別フィールド。
// target.kindの制限を外しただけで、判定ロジック自体はstock版と同一。
const fxIdxKind = target.kind === "forex" || target.kind === "crypto" || target.kind === "index";
const fxIdxOB = fxIdxKind ? detectOrderBlock(rows) : { inBullOB: false, inBearOB: false };

const fxIdxRocketBuyRecent = fxIdxKind ? Boolean(findRocketBuy(rows, 4)) : false;
const fxIdxTurtleBuyOBRecent = fxIdxKind && wasTrueRecently(rows, detectTurtleBuy, 4) && fxIdxOB.inBullOB;
const rocketTurtleComboFx = fxIdxRocketBuyRecent && fxIdxTurtleBuyOBRecent;
const fxIdxTurtleSellDeniedRecent = fxIdxKind && wasTrueRecently(rows, detectTurtleSellDenied, 4);
const superComboFx = rocketTurtleComboFx && fxIdxTurtleSellDeniedRecent;

const fxIdxRocketSellRecent = fxIdxKind ? Boolean(findRocketSell(rows, 4)) : false;
const fxIdxTurtleSellOBRecent = fxIdxKind && wasTrueRecently(rows, detectTurtleSell, 4) && fxIdxOB.inBearOB;
const rocketTurtleComboSellFx = fxIdxRocketSellRecent && fxIdxTurtleSellOBRecent;
const fxIdxTurtleBuyDeniedRecent = fxIdxKind && wasTrueRecently(rows, detectTurtleBuyDenied, 4);
const superComboSellFx = rocketTurtleComboSellFx && fxIdxTurtleBuyDeniedRecent;

// FX週足/月足版: 日足の「ロケット+タートル+OB全部揃う」ANDだと厳しすぎて検索に出ないため、
// 週足・月足それぞれで「ロケットバイ」or「タートル+OB」のどちらか一方でも成立していれば対象にする(OR方式)。
// weeklyRows/monthlyRowsはforex以外(crypto/index)では空配列になるため、実質forexのみが対象になる。
const fxWeeklyRocketBuy = Boolean(findRocketBuy(weeklyRows, 4));
const fxWeeklyTurtleObBuy = wasTrueRecently(weeklyRows, detectTurtleBuy, 4) && detectOrderBlock(weeklyRows).inBullOB;
const fxMonthlyRocketBuy = Boolean(findRocketBuy(monthlyRows, 4));
const fxMonthlyTurtleObBuy = wasTrueRecently(monthlyRows, detectTurtleBuy, 4) && detectOrderBlock(monthlyRows).inBullOB;
const fxWeeklyBuyHit = fxWeeklyRocketBuy || fxWeeklyTurtleObBuy;
const fxMonthlyBuyHit = fxMonthlyRocketBuy || fxMonthlyTurtleObBuy;
const fxWmBuy = fxIdxKind && (fxWeeklyBuyHit || fxMonthlyBuyHit);
const fxWmBuyFrame = !fxWmBuy ? null : fxWeeklyBuyHit && fxMonthlyBuyHit ? "週+月" : fxWeeklyBuyHit ? "週" : "月";

const fxWeeklyRocketSell = Boolean(findRocketSell(weeklyRows, 4));
const fxWeeklyTurtleObSell = wasTrueRecently(weeklyRows, detectTurtleSell, 4) && detectOrderBlock(weeklyRows).inBearOB;
const fxMonthlyRocketSell = Boolean(findRocketSell(monthlyRows, 4));
const fxMonthlyTurtleObSell = wasTrueRecently(monthlyRows, detectTurtleSell, 4) && detectOrderBlock(monthlyRows).inBearOB;
const fxWeeklySellHit = fxWeeklyRocketSell || fxWeeklyTurtleObSell;
const fxMonthlySellHit = fxMonthlyRocketSell || fxMonthlyTurtleObSell;
const fxWmSell = fxIdxKind && (fxWeeklySellHit || fxMonthlySellHit);
const fxWmSellFrame = !fxWmSell ? null : fxWeeklySellHit && fxMonthlySellHit ? "週+月" : fxWeeklySellHit ? "週" : "月";

// 雲が薄い(センコウスパンA/B幅3%未満)＋雲の上/下にいるかどうか
const thinCloudInfo = target.kind === "stock" ? detectThinCloud(rows) : { isThin: false, widthPct: null, aboveCloud: false, belowCloud: false };
const thinCloudBuy = thinCloudInfo.isThin && thinCloudInfo.aboveCloud;
const thinCloudSell = thinCloudInfo.isThin && thinCloudInfo.belowCloud;

// 日足/週足/月足のうち2つ以上が同時に三役好転しているか
const weeklyIchimokuBuy = target.kind === "stock" ? calcIchimokuBuyFilter(weeklyRows) : false;
const monthlyIchimokuBuy = target.kind === "stock" ? calcIchimokuBuyFilter(monthlyRows) : false;
const dailyIchimokuBuy = target.kind === "stock" ? calcIchimokuBuyFilter(rows) : false;
const ichimokuMultiTFCount = (dailyIchimokuBuy ? 1 : 0) + (weeklyIchimokuBuy ? 1 : 0) + (monthlyIchimokuBuy ? 1 : 0);

// 一目(2タイムフレーム以上で三役好転)＋月足フィボ23.6%戻り＋タートルコンボ(ロケット+タートル+Bu-OB)の複合シグナル。
// 「週足月足三役好転」「ロケット三役コンボ」を統合する形で新設。まだ実績のバックテストはしていない。
const ichiFibTurtleCombo =
  target.kind === "stock" &&
  ichimokuMultiTFCount >= 2 &&
  fibBounce.fibMatch === true &&
  rocketTurtleCombo === true;

// キタ2: 4時間足・日足・週足・月足の4つすべてが今同じ方向で揃っている状態(既存のキター/キタキタ〜とは別枠)。
// AIの総合判定(direction)がSHORTやhiddenになっていても、この4本足の状態だけで判定するため無関係に表示する。
const kita2Buy =
  target.kind === "stock" &&
  fourHourPos.length > 0 &&
  fourHourPos[fourHourPos.length - 1] === 1 &&
  lastDayIndex >= 0 &&
  dayPos[lastDayIndex] === 1 &&
  weeklyUp === true &&
  monthlyUp === true;
const kita2Sell =
  target.kind === "stock" &&
  fourHourPos.length > 0 &&
  fourHourPos[fourHourPos.length - 1] === -1 &&
  lastDayIndex >= 0 &&
  dayPos[lastDayIndex] === -1 &&
  weeklyBuyPos.length > 0 &&
  weeklyBuyPos[weeklyBuyPos.length - 1] === -1 &&
  monthlyBuyPos.length > 0 &&
  monthlyBuyPos[monthlyBuyPos.length - 1] === -1;

// 初動候補: 過去のタートル売り抵抗帯にあと5%以内まで接近中 かつ 直近5本以内にGC20/75発生済み
const turtleSellLevel = target.kind === "stock" ? findRecentTurtleSellLevel(rows) : null;
const nearTurtleSellResistance =
  target.kind === "stock" &&
  turtleSellLevel !== null &&
  price < turtleSellLevel &&
  ((turtleSellLevel - price) / price) * 100 <= 5;
const gc20_75Recent = target.kind === "stock" ? detectGc20_75Recent(closes) : false;
const shodouCandidate = target.kind === "stock" && nearTurtleSellResistance && gc20_75Recent;

// リボン収縮→BUY🚀（Corysスクリプト忠実移植）：既存の買いシグナルの信頼度を補強する補助フラグ
const ribbonExpansionInfo = target.kind === "stock" ? detectRibbonExpansion(rows) : null;
const ribbonExpansion = Boolean(ribbonExpansionInfo);
const ribbonContractionInfo = target.kind === "stock" ? detectRibbonContraction(rows) : null;
const ribbonContraction = Boolean(ribbonContractionInfo);

// v40「Progress Navigator」の追加フィルター群（一目・パーフェクトオーダー・BB・200EMA・Supertrend）
const v40Filters = target.kind === "stock" ? calcV40BuyFilters(rows) : null;
const v40FilterScore = v40Filters?.filterScore ?? 0;

// 上位足（週足・月足）も底値ゾーンにあるか（日足だけの底ではないことを確認）
const weeklyLowZone = target.kind === "stock" ? isHigherTfAtBottom(weeklyRows, 52) : false;
const monthlyLowZone = target.kind === "stock" ? isHigherTfAtBottom(monthlyRows, 36) : false;
const higherTfAtBottom = weeklyLowZone || monthlyLowZone;

const heartSell =
  target.kind === "stock" &&
  lastDayIndex >= 0 &&
  dayPos[lastDayIndex] === -1 &&
  (recentStrongSellTrigger || rsiSellNowStrong);

// 株ドラゴンのローソク足パターンを参考にしたシンプルな単発判定(株・FX・暗号資産・指数すべて対象)
const tonbo = detectTonbo(rows);
const touba = detectTouba(rows);
const sankuFumiage = detectSankuFumiage(rows);

// 株ドラゴンだと1個ずつしかフィルターを組み合わせられないため、
// 「25日線乖離プラス+75日線乖離プラス+貸借銘柄+三空踏み上げ+月足RSI80以上」を全部同時に満たす銘柄だけを出す複合タブ
const kabudragonCombo =
  target.kind === "stock" &&
  typeof dev25 === "number" &&
  dev25 > 0 &&
  typeof dev75 === "number" &&
  dev75 > 0 &&
  isLendingStock(target.code) &&
  sankuFumiage &&
  monthlyRsi80;

// 💥爆上げ本命/💥暴落本命(くみちゃんの経験則v1に戻した): タートル否定・★Buy💚(heartBuy)・UTフリップ・
// ロケット・本命(rocketTurtleCombo)・超本命(superCombo)のうち3つ以上が直近(4本以内)で点灯していて、
// かつBu-OB/Be-OBの中にいる時。週足・月足の実combo必須(v2)や「週/月の1本目」限定は
// ほぼ0件になってしまうため外し、カウント+OBのみに戻した。
const utBuyRecent = target.kind === "stock" && lastDayIndex >= 1 && barsSinceRecentBuy(dayPos) <= 4;
const utSellRecent = target.kind === "stock" && lastDayIndex >= 1 && barsSinceRecentSell(dayPos) <= 4;

const megaBuyCount =
  (turtleSellDeniedRecent ? 1 : 0) +
  (heartBuy ? 1 : 0) +
  (utBuyRecent ? 1 : 0) +
  (rocketRecentForCombo ? 1 : 0) +
  (rocketTurtleCombo ? 1 : 0) +
  (superCombo ? 1 : 0);
const megaBuyBreakout = target.kind === "stock" && megaBuyCount >= 3 && inBullOB;

const megaSellCount =
  (turtleBuyDeniedRecent ? 1 : 0) +
  (heartSell ? 1 : 0) +
  (utSellRecent ? 1 : 0) +
  (rocketSellRecentForCombo ? 1 : 0) +
  (rocketTurtleComboSell ? 1 : 0) +
  (superComboSell ? 1 : 0);
const megaSellBreakout = target.kind === "stock" && megaSellCount >= 3 && inBearOB;

// 💥爆上げ週月/💥暴落週月: 上の💥爆上げ本命/暴落本命(カウント方式)とは別枠の、より厳しい追加版。
// 週足・月足それぞれで本命/超本命(ロケット+タートル+OB)が実際に成立していて(大きい波の途中である確認)、
// かつ日足で本命・超本命・★Buy💚のどれかが出た時に成立とする。
function f_weeklyMonthlyComboBuy(tfRows) {
  if (target.kind !== "stock" || !Array.isArray(tfRows) || tfRows.length < 40) return false;
  const rocketRecent = Boolean(findRocketBuy(tfRows, 4));
  const turtleObRecent = wasTrueRecently(tfRows, detectTurtleBuy, 4) && detectOrderBlock(tfRows).inBullOB;
  return rocketRecent && turtleObRecent;
}
function f_weeklyMonthlyComboSell(tfRows) {
  if (target.kind !== "stock" || !Array.isArray(tfRows) || tfRows.length < 40) return false;
  const rocketRecent = Boolean(findRocketSell(tfRows, 4));
  const turtleObRecent = wasTrueRecently(tfRows, detectTurtleSell, 4) && detectOrderBlock(tfRows).inBearOB;
  return rocketRecent && turtleObRecent;
}

const weeklyComboBuy = f_weeklyMonthlyComboBuy(weeklyRows);
const monthlyComboBuy = f_weeklyMonthlyComboBuy(monthlyRows);
const dailyBullishSignal = rocketTurtleCombo || superCombo || heartBuy;
// 週足・月足どちらか一方でも実comboが成立してれば対象にする(両方必須だとほぼ0件になるため)
const megaBuyBreakoutWM = target.kind === "stock" && (weeklyComboBuy || monthlyComboBuy) && dailyBullishSignal;
// どちらのフレームで成立したかを見た目で分かるようにラベル化(週/月/週+月)
const megaBuyBreakoutWMFrame = !megaBuyBreakoutWM
  ? null
  : weeklyComboBuy && monthlyComboBuy
  ? "週+月"
  : weeklyComboBuy
  ? "週"
  : "月";

const weeklyComboSell = f_weeklyMonthlyComboSell(weeklyRows);
const monthlyComboSell = f_weeklyMonthlyComboSell(monthlyRows);
const dailyBearishSignal = rocketTurtleComboSell || superComboSell || heartSell;
const megaSellBreakoutWM = target.kind === "stock" && (weeklyComboSell || monthlyComboSell) && dailyBearishSignal;
const megaSellBreakoutWMFrame = !megaSellBreakoutWM
  ? null
  : weeklyComboSell && monthlyComboSell
  ? "週+月"
  : weeklyComboSell
  ? "週"
  : "月";

// 💥爆上げ月足/週足(直近6本以内に一度でも点灯): 💥爆上げ本命と全く同じ「6シグナルのうち3つ以上+OB」判定を、
// 日足ではなく週足/月足のrows自体に対して行い、直近6本のどこかで一度でも成立していたか見る。
const monthlyMegaBreakoutBuyRecent =
  target.kind === "stock" && wasMegaBreakoutWithinLastN(monthlyRows, 6, true);
const weeklyMegaBreakoutBuyRecent =
  target.kind === "stock" && wasMegaBreakoutWithinLastN(weeklyRows, 6, true);
const monthlyMegaBreakoutSellRecent =
  target.kind === "stock" && wasMegaBreakoutWithinLastN(monthlyRows, 6, false);
const weeklyMegaBreakoutSellRecent =
  target.kind === "stock" && wasMegaBreakoutWithinLastN(weeklyRows, 6, false);

// キター/キタキタ〜判定: タートル＋Bu-OB(Be-OB)が4Hと日足の両方で揃ってることが大前提。
// そこにheartBuy(★Buy💚相当)とCorys相当(リボン収縮)がいくつ追加で揃うかで、1つでキター、2つでキタキタ〜
const buyBaseGate =
  target.kind === "stock" &&
  checkTimeframeTurtleOB(fourHourRows, false) &&
  checkTimeframeTurtleOB(rows, false);
const buyAddCount = (heartBuy ? 1 : 0) + (ribbonExpansion ? 1 : 0);
const honmeiBuy = target.kind === "stock" && buyBaseGate && buyAddCount >= 1;
const superHonmeiBuy = target.kind === "stock" && buyBaseGate && buyAddCount === 2;

const sellBaseGate =
  target.kind === "stock" &&
  checkTimeframeTurtleOB(fourHourRows, true) &&
  checkTimeframeTurtleOB(rows, true);
const sellAddCount = (heartSell ? 1 : 0) + (ribbonContraction ? 1 : 0);
const honmeiSell = target.kind === "stock" && sellBaseGate && sellAddCount >= 1;
const superHonmeiSell = target.kind === "stock" && sellBaseGate && sellAddCount === 2;

const b3OversoldLine = 30;
const b3RecoverLine = 35;
const b3Lookback = Math.min(60, closes.length - 15);

const recentRsiForB3 = [];

for (let i = 0; i < b3Lookback; i++) {
  const end = closes.length - i;
  const start = Math.max(0, end - 20);
  const r = calcRSI(closes.slice(start, end), 14);

  if (r !== null && Number.isFinite(r)) {
    recentRsiForB3.push(r);
  }
}

const hadB3Rsi30 = recentRsiForB3.some(v => v <= b3OversoldLine);

const b3RsiRecovered =
  hadB3Rsi30 &&
  rsiNow !== null &&
  rsiPrev !== null &&
  rsiNow >= b3RecoverLine &&
  rsiNow > rsiPrev;

const b3PriceOk =
  closes.length >= 2 &&
  price >= closes[closes.length - 2] * 0.97;

const b3BuySignal =
  b3RsiRecovered &&
  b3PriceOk;
  const lowZone = position <= 0.35;
  const veryLowZone = position <= 0.22;
  const highZone = position >= 0.62;
  const veryHighZone = position >= 0.78;

  const volumeHot = volRatio >= 1.5;
  const volumeGood = volRatio >= 1.15;

  const candle = candleSignal(rows);
 const stopHighCount = countStopHigh(rows, 60);

  const stopBuyBase = Math.max(low60, price - (atr || price * 0.06) * 1.2);
  const stopShortBase = Math.min(high60, price + (atr || price * 0.06) * 1.2);

  const buyRiskPct = ((price - stopBuyBase) / price) * 100;
  const shortRiskPct = ((stopShortBase - price) / price) * 100;

  const upsidePct = high60 > price ? ((high60 - price) / price) * 100 : 0;
  const downsidePct = price > low60 ? ((price - low60) / price) * 100 : 0;

  const overHeatBuy =
    (dev25 !== null && dev25 >= 25) ||
    (dev75 !== null && dev75 >= 60) ||
    stopHighCount >= 3;

  const shortOverHeat =
    (dev25 !== null && dev25 >= 20) ||
    (dev75 !== null && dev75 >= 45) ||
    stopHighCount >= 2;

  let buyScore = 0;
  let shortScore = 0;

  const buyReasons = [];
  const shortReasons = [];
if (b3BuySignal) {
  buyScore += 24;
  buyReasons.unshift("B3:RSI30後回復");
} else if (hadB3Rsi30) {
  buyReasons.push("B3待ち:RSI30到達済み");
}

if (ribbonExpansion) {
  buyScore += 15;
  buyReasons.unshift("リボン収縮後BUY🚀");

  if (heartBuy || rocketBuy || Boolean(wave3BuyConfirmed)) {
    buyScore += 10;
    buyReasons.unshift("リボン収縮×既存買いシグナル一致");
  }
}

if (v40FilterScore >= 2) {
  buyScore += v40FilterScore * 3;
  buyReasons.push(`v40フィルター一致${v40FilterScore}/5`);

  if (ribbonExpansion) {
    buyScore += 15;
    buyReasons.unshift(`リボン収縮+v40フィルター${v40FilterScore}/5一致`);

    if (higherTfAtBottom) {
      buyScore += 15;
      buyReasons.unshift(
        `ベスト条件：リボン収縮+v40フィルター一致+上位足(${weeklyLowZone ? "週足" : "月足"})も底値圏`
      );
    }
  }
}
  if (veryLowZone) {
    buyScore += 22;
    buyReasons.push("安値圏");
  } else if (lowZone) {
    buyScore += 16;
    buyReasons.push("低い位置");
  }

  if (closeAbove5) {
    buyScore += 16;
    buyReasons.push("5日線上");
  }

  if (closeAbove20) {
    buyScore += 10;
    buyReasons.push("20日線上");
  }

  if (isBull) {
    buyScore += 12;
    buyReasons.push("陽線");
  }

  if (rsiUp) {
    buyScore += 14;
    buyReasons.push("RSI上向き");
  }

  if (rsiNow !== null && rsiNow >= 35 && rsiNow <= 65) {
    buyScore += 8;
    buyReasons.push("RSI良好");
  }

  if (volumeHot) {
    buyScore += 18;
    buyReasons.push(`出来高${volRatio.toFixed(1)}倍`);
  } else if (volumeGood) {
    buyScore += 10;
    buyReasons.push(`出来高${volRatio.toFixed(1)}倍`);
  }

  if (buyRiskPct > 0 && buyRiskPct <= 8) {
    buyScore += 12;
    buyReasons.push("損切り近い");
  } else if (buyRiskPct <= 12) {
    buyScore += 5;
  } else {
    buyScore -= 12;
    buyReasons.push("損切り遠い");
  }

  if (upsidePct >= 12) {
    buyScore += 10;
    buyReasons.push("上値余地あり");
  }

  if (dev25 !== null && dev25 >= 0 && dev25 <= 15) {
    buyScore += 8;
    buyReasons.push(`25日乖離${dev25.toFixed(1)}%`);
  } else if (dev25 !== null && dev25 > 25) {
    buyScore -= 18;
    buyReasons.push(`25日乖離過熱${dev25.toFixed(1)}%`);
  }

  if (dev75 !== null && dev75 >= -5 && dev75 <= 35) {
    buyScore += 6;
    buyReasons.push(`75日乖離${dev75.toFixed(1)}%`);
  } else if (dev75 !== null && dev75 > 60) {
    buyScore -= 18;
    buyReasons.push(`75日乖離過熱${dev75.toFixed(1)}%`);
  }

  if (stopHighCount === 1) {
    buyScore += 6;
    buyReasons.push("S高1回");
  } else if (stopHighCount === 2) {
    buyScore -= 4;
    buyReasons.push("S高2回・過熱注意");
  } else if (stopHighCount >= 3) {
    buyScore -= 22;
    buyReasons.push(`S高${stopHighCount}回・買い過熱`);
  }

  buyScore += candle.buyPoint;

  if (candle.buyPoint > 0) {
    buyReasons.push(`足:${candle.name}`);
  }

  if (!lowZone) buyScore -= 14;
  if (!closeAbove5) buyScore -= 10;
  if (!volumeGood) buyScore -= 10;

  if (overHeatBuy) {
    buyScore = Math.min(buyScore, 94);
    buyReasons.push("過熱のためSS除外");
  }

  if (target.kind === "stock" && price > TARGET_PRICE_LIMIT) {
    buyScore = 0;
  }

  if (veryHighZone) {
    shortScore += 22;
    shortReasons.push("高値圏");
  } else if (highZone) {
    shortScore += 16;
    shortReasons.push("高い位置");
  }

  if (closeBelow5) {
    shortScore += 18;
    shortReasons.push("5日線割れ");
  }

  if (closeBelow20) {
    shortScore += 10;
    shortReasons.push("20日線下");
  }

  if (isBear) {
    shortScore += 12;
    shortReasons.push("陰線");
  }

  if (rsiDown) {
    shortScore += 14;
    shortReasons.push("RSI下向き");
  }

  if (rsiNow !== null && rsiNow >= 47) {
    shortScore += 8;
    shortReasons.push("戻り売り圏");
  }

  if (volumeHot) {
    shortScore += 18;
    shortReasons.push(`出来高${volRatio.toFixed(1)}倍`);
  } else if (volumeGood) {
    shortScore += 10;
    shortReasons.push(`出来高${volRatio.toFixed(1)}倍`);
  }

  if (shortRiskPct > 0 && shortRiskPct <= 8) {
    shortScore += 12;
    shortReasons.push("損切り近い");
  } else if (shortRiskPct <= 12) {
    shortScore += 5;
  } else {
    shortScore -= 12;
    shortReasons.push("損切り遠い");
  }

  if (downsidePct >= 12) {
    shortScore += 10;
    shortReasons.push("下値余地あり");
  }

  if (dev25 !== null && dev25 >= 20) {
    shortScore += 10;
    shortReasons.push(`25日乖離過熱${dev25.toFixed(1)}%`);
  }

  if (dev75 !== null && dev75 >= 45) {
    shortScore += 8;
    shortReasons.push(`75日乖離過熱${dev75.toFixed(1)}%`);
  }

  if (stopHighCount >= 2) {
    shortScore += 8;
    shortReasons.push(`S高${stopHighCount}回`);
  }

  shortScore += candle.shortPoint;

  if (candle.shortPoint > 0) {
    shortReasons.push(`足:${candle.name}`);
  }

  if (shortOverHeat && isBear && closeBelow5) {
    shortScore += 8;
    shortReasons.push("過熱後の失速");
  }

  if (shortOverHeat && !isBear) {
    shortScore -= 8;
    shortReasons.push("過熱中だが未崩れ");
  }

  if (!highZone) shortScore -= 8;
  if (!closeBelow5) shortScore -= 8;
  if (!volumeGood) shortScore -= 8;

  if (target.kind === "stock" && price > TARGET_PRICE_LIMIT) {
    shortScore = 0;
  }

  buyScore = Math.max(0, Math.min(100, Math.round(buyScore)));
  shortScore = Math.max(0, Math.min(100, Math.round(shortScore)));

  let direction = "hidden";
  let score = Math.max(buyScore, shortScore);
  let reasons = ["80点以下のため非表示"];
  let signal = "非表示";
  let stopLoss = null;
  let stopRiskPct = null;
  let targetText = "-";

  if (shortScore > buyScore && shortScore >= MIN_DISPLAY_SCORE) {
    direction = "short";
    score = shortScore;
    reasons = shortReasons;
    stopLoss = stopShortBase;
    stopRiskPct = shortRiskPct;
    targetText = `下値目安 ${yen(low60)} / 余地 ${pct(-downsidePct)}`;
    signal = "SHORT";
  } else if (buyScore >= MIN_DISPLAY_SCORE && weeklyMacdRsiBuyGate) {
    direction = "buy";
    score = buyScore;
    reasons = buyReasons;
    stopLoss = stopBuyBase;
    stopRiskPct = buyRiskPct;
    targetText = `上値目安 ${yen(high60)} / 余地 ${pct(upsidePct)}`;
    signal = "BUY";
  }
if (
  target.kind === "stock" &&
  typeof price === "number" &&
  price <= TARGET_PRICE_LIMIT &&
  stopHighCount >= 3
) {
  direction = "buy";
  score = Math.max(score, 72);
  reasons = [
    `直近2ヶ月S高${stopHighCount}回`,
    `25MA乖離${dev25 !== null ? dev25.toFixed(1) : "-"}%`,
    `75MA乖離${dev75 !== null ? dev75.toFixed(1) : "-"}%`,
    "S高3回候補",
  ];
  
  stopLoss = stopBuyBase;
  stopRiskPct = buyRiskPct;
  targetText = `上値目安 ${yen(high60)} / 余地 ${pct(upsidePct)}`;
  signal = "S高3回候補";
}
if (shortSignalLabels.length > 0) {
  direction = "short";
  score = 100;
  reasons = [
    ...(target.kind === "stock" ? ["貸借銘柄"] : []),
    ...shortSignalLabels,
  ];
  if (fxTriplePeakInfo) {
    stopLoss = fxTriplePeakInfo.stopLoss;
    stopRiskPct = ((fxTriplePeakInfo.stopLoss - price) / price) * 100;
    targetText = `エントリー目安 ${fxTriplePeakInfo.entryRate.toFixed(3)} / 利確目安 ${fxTriplePeakInfo.takeProfit.toFixed(3)} / 損切り ${fxTriplePeakInfo.stopLoss.toFixed(3)}`;
  } else {
    stopLoss = stopShortBase;
    stopRiskPct = shortRiskPct;
    targetText = `下値目安 ${yen(low60)} / 余地 ${pct(-downsidePct)}`;
  }
  signal = shortSignalLabels.join("｜");
}
if (fxTripleBottomInfo) {
  const fxTripleBottomTimeframes = [
    fxTripleBottomInfoDaily && "日足",
    fxTripleBottomInfoWeekly && "週足",
    fxTripleBottomInfoMonthly && "月足",
  ].filter(Boolean);

  direction = "buy";
  score = 100;
  reasons = fxTripleBottomTimeframes.map((tf) => `三点谷ネックライン戻り買い(${tf})`);
  stopLoss = fxTripleBottomInfo.stopLoss;
  stopRiskPct = ((price - fxTripleBottomInfo.stopLoss) / price) * 100;
  targetText = `エントリー目安 ${fxTripleBottomInfo.entryRate.toFixed(3)} / 利確目安 ${fxTripleBottomInfo.takeProfit.toFixed(3)} / 損切り ${fxTripleBottomInfo.stopLoss.toFixed(3)}`;
  signal = reasons.join("｜");
}
  // 指数もstock/forexと同じbuy/shortの点数比較をそのまま使う
  // （以前は指数だけ別ロジックでラベルが買い/売りと逆になっていたため廃止）
  // =========================
  // 値動きの段階分類
  // 初動・熟成・再点火・急騰中
  // =========================
  const prevSma20 =
    closes.length >= 21
      ? sma(closes.slice(0, -1), 20)
      : null;

  const crossedAbove20 =
    sma20 !== null &&
    prevSma20 !== null &&
    prevClose <= prevSma20 &&
    price > sma20;

  const crossedBelow20 =
    sma20 !== null &&
    prevSma20 !== null &&
    prevClose >= prevSma20 &&
    price < sma20;

  const surgedUp =
    changePct >= 10 ||
    stopHighCount >= 1 ||
    (
      dev25 !== null &&
      dev25 >= 15 &&
      volRatio >= 1.5
    );

  const surgedDown =
    changePct <= -10 ||
    (
      dev25 !== null &&
      dev25 <= -15 &&
      volRatio >= 1.5
    );

  let stage = "監視";

  if (direction === "buy") {
    if (surgedUp) {
      stage = "急騰中";
    } else if (crossedAbove20) {
      stage = "熟成";
    } else if (
      closeAbove20 &&
      rsiUp &&
      volumeGood
    ) {
      stage = "再点火";
    } else {
      stage = "初動";
    }
  }

  if (direction === "short") {
    if (surgedDown) {
      stage = "急落中";
    } else if (crossedBelow20) {
      stage = "熟成SELL";
    } else if (
      closeBelow20 &&
      rsiDown &&
      volumeGood
    ) {
      stage = "再下落";
    } else {
      stage = "初動SELL";
    }
  }
  const entryOk = score >= 98 ? "OK" : "待ち";

  const heatTextParts = [];

  if (dev25 !== null) heatTextParts.push(`25日${dev25.toFixed(1)}%`);
  if (dev75 !== null) heatTextParts.push(`75日${dev75.toFixed(1)}%`);
  if (stopHighCount > 0) heatTextParts.push(`S高${stopHighCount}回`);

  const heatText = heatTextParts.length ? heatTextParts.join(" / ") : "過熱なし";

  return {
    ...target,
    isLending: target.kind === "stock" && isLendingStock(target.code),
    inBullOB,
    inBearOB,
    honmeiBuy,
    honmeiSell,
    superHonmeiBuy,
    superHonmeiSell,
    ribbonContraction,
    fibMatch: fibBounce.fibMatch,
    fibDeclinePct: fibBounce.fibDeclinePct ?? null,
    fibHigh: fibBounce.fibHigh ?? null,
    fibLow: fibBounce.fibLow ?? null,
    fibTarget236: fibBounce.fibTarget236 ?? null,
    fibBarsSinceLow: fibBounce.fibBarsSinceLow ?? null,
    fibBarsHoldingAboveTarget: fibBounce.fibBarsHoldingAboveTarget ?? null,
    fibBbSqueeze: fibBounce.fibBbSqueeze ?? false,
    fibCloudThin: fibBounce.fibCloudThin ?? false,
    fibNearCloudBreak: fibBounce.fibNearCloudBreak ?? false,
    maAngleUp,
    fib618Pullback,
    turtleBuy,
    turtleBuy4H,
    turtleMultiTF,
    rocketTurtleCombo,
    superCombo,
    rocketTurtleComboSell,
    superComboSell,
    rocketTurtleComboFx,
    superComboFx,
    rocketTurtleComboSellFx,
    superComboSellFx,
    fxWmBuy,
    fxWmBuyFrame,
    fxWmSell,
    fxWmSellFrame,
    megaBuyBreakout,
    megaSellBreakout,
    megaBuyBreakoutWM,
    megaSellBreakoutWM,
    megaBuyBreakoutWMFrame,
    megaSellBreakoutWMFrame,
    monthlyMegaBreakoutBuyRecent,
    weeklyMegaBreakoutBuyRecent,
    monthlyMegaBreakoutSellRecent,
    weeklyMegaBreakoutSellRecent,
    tonbo,
    touba,
    sankuFumiage,
    monthlyRsi80,
    kabudragonCombo,
    thinCloudBuy,
    thinCloudSell,
    ichiFibTurtleCombo,
    kita2Buy,
    kita2Sell,
    turtleSellLevel,
    nearTurtleSellResistance,
    gc20_75Recent,
    shodouCandidate,
    date: last.date,
    price,
    changePct,
    volume: last.volume,
    volRatio,
    rsi: rsiNow,
    position,
    low60,
    high60,
    score,
    rank: score,
    direction,
    signal,
    entryOk,
 memo: reasons.slice(0, 6).join(" / "),
    stopLoss,
    stopRiskPct,
    targetText,
    shortScore,
    dev25,
    dev75,
    isAboveBBUpper,
    weeklyRsi90,
    weeklyMacdTurnUp,
    weeklyRsiTurnUp,
    weeklyMacdRsiBuyGate,
    hourly75Support,
    weeklyUp,
monthlyUp,
    gc20_75,
gc75_200,
fourHour75DcRecent,
fourHour75DcBarsAgo,
heartBuy,
heartSell,
freshDayBuy,
fourHourGcApproaching,
fourHSignalReady,
rocketBuy,
rocketBuyKind,
sellDeniedRecent,
ribbonExpansion,
ribbonExpansionBarsAgo: ribbonExpansionInfo?.barsAgo ?? null,
v40FilterScore,
v40Ichimoku: v40Filters?.ichiBuyFilter ?? false,
v40MaPerfectOrder: v40Filters?.maPoBuyFilter ?? false,
v40BbSqueezeOrExpand: v40Filters?.bbSqueezeOrExpandUp ?? false,
v40Ema200Rising: v40Filters?.ema200BuyFilter ?? false,
v40Supertrend: v40Filters?.superBuyFilter ?? false,
weeklyLowZone,
monthlyLowZone,
higherTfAtBottom,
bestCombo: ribbonExpansion && v40FilterScore >= 2 && higherTfAtBottom,
fxTriplePeakShort: Boolean(fxTriplePeakInfo),
fxTriplePeakInfo: fxTriplePeakInfo || null,
fxTriplePeakDaily: Boolean(fxTriplePeakInfoDaily),
fxTriplePeakWeekly: Boolean(fxTriplePeakInfoWeekly),
fxTriplePeakMonthly: Boolean(fxTriplePeakInfoMonthly),
fxTripleBottomBuy: Boolean(fxTripleBottomInfo),
fxTripleBottomInfo: fxTripleBottomInfo || null,
fxTripleBottomDaily: Boolean(fxTripleBottomInfoDaily),
fxTripleBottomWeekly: Boolean(fxTripleBottomInfoWeekly),
fxTripleBottomMonthly: Boolean(fxTripleBottomInfoMonthly),
weeklyBuyRecent,
monthlyBuyRecent,
    stopHighCount,
    candleName: candle.name,
    candleMemo: candle.memo,
    wave3Confirmed: Boolean(wave3BuyConfirmed),
wave3Ready: Boolean(wave3BuyReady),
buyWave3Ready: Boolean(wave3BuyReady),
buyWave3Confirmed: Boolean(wave3BuyConfirmed),
sellWave3Ready: Boolean(wave3SellReady),
sellWave3Confirmed: Boolean(wave3SellConfirmed),
wave3ReadyDate: wave3BuyReady?.date || null,
wave3ReadyWave1Pct: wave3BuyReady?.wave1Pct || null,
wave3ReadyPullbackPct: wave3BuyReady?.pullbackPct || null,
wave3ConfirmedDate: wave3BuyConfirmed?.date || null,
wave3Wave1Pct: wave3BuyConfirmed?.wave1Pct || null,
wave3PullbackPct: wave3BuyConfirmed?.pullbackPct || null,
sellWave3ReadyDate: wave3SellReady?.date || null,
sellWave3ConfirmedDate: wave3SellConfirmed?.date || null,
  };
}

async function runInBatches(items, batchSize, callback, onProgress) {
  const results = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map(async (item) => {
        try {
          return await callback(item);
        } catch (e) {
          console.warn(`[調査ログ] judgeSignal例外: ${item.code}`, e?.message || e, e?.stack);
          return {
            ...item,
            signal: "取得失敗",
            direction: "fail",
            rank: "取得失敗",
            score: 0,
            memo: "通信エラー",
          };
        }
      })
    );

    results.push(...batchResults);

    if (onProgress) {
      onProgress(results.length, items.length);
    }

    if (i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  return results;
}

async function scanTargets({ onProgress } = {}) {
  const results = await runInBatches(
    TARGETS,
    BATCH_SIZE,
    async (target) => {
      // 日足と4H用の1時間足を並列取得(直列だと1銘柄あたりの待ち時間が倍になっていた)
      const [rows, hourlyRows] = await Promise.all([
        fetchRows(target),
        target.kind === "stock" ? fetchHourlyFromYahoo(getYahooSymbol(target)) : Promise.resolve([]),
      ]);
      return judgeSignal(target, rows, hourlyRows);
    },
    (done, total) => {
      onProgress?.(done, total);
    }
  );

  const stockResults = results.filter((x) => x.kind === "stock" && x.direction !== "fail");
  console.warn(
    `[調査ログ] 株集計: 取得成功=${stockResults.length} / heartBuy=${stockResults.filter((x) => x.heartBuy).length} / heartSell=${stockResults.filter((x) => x.heartSell).length} / direction=buy=${stockResults.filter((x) => x.direction === "buy").length} / direction=short=${stockResults.filter((x) => x.direction === "short").length} / gc75_200=${stockResults.filter((x) => x.gc75_200).length}`
  );

  const failCount = results.filter((x) => x.direction === "fail").length;
  const overCount = results.filter(
    (x) => x.kind === "stock" && typeof x.price === "number" && x.price > TARGET_PRICE_LIMIT
  ).length;
  const displayCount = results.filter(
    (x) =>
      x.kind !== "index" &&
      x.direction !== "fail" &&
      x.direction !== "hidden" &&
      x.score >= MIN_DISPLAY_SCORE &&
      (x.kind !== "stock" || (typeof x.price === "number" && x.price <= TARGET_PRICE_LIMIT))
  ).length;
  const ssCount = results.filter((x) => x.kind !== "index" && x.score >= 98).length;
  const indexCount = results.filter(
    (x) => x.kind === "index" && x.score >= MIN_DISPLAY_SCORE
  ).length;

  return {
    results,
    message: `取得完了：${results.length}銘柄 / 表示 ${displayCount} / SS ${ssCount} / 指数 ${indexCount} / 2000円超 ${overCount} / 失敗 ${failCount}`,
  };
}

module.exports = {
  TARGETS,
  TABS,
  MAX_PRICE,
  MIN_DISPLAY_SCORE,
  TARGET_PRICE_LIMIT,
  DISPLAY_LIMIT,
  DAILY_SCAN_TASK,
  BATCH_SIZE,
  BATCH_DELAY_MS,
  setRuntimeOS,
  judgeSignal,
  scanTargets,
  runInBatches,
  fetchRows,
  fetchHourlyFromYahoo,
  getYahooSymbol,
  yen,
  pct,
  compact,
};
