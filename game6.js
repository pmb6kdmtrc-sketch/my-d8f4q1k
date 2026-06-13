
// ══════════════════════════════
// 予備試験RPG - game.js
// ══════════════════════════════
'use strict';

const WEEKLY_PLAN={0:[{type:"暗記",text:"📚 1時間目：論証集を読んだ",mins:60},{type:"論文",text:"📚 2時間目：重問を解いた",mins:60},{type:"短答",text:"📚 3時間目：短答を解いた",mins:60},{type:"暗記",text:"📚 4時間目：復習した",mins:60}],1:[{type:"短答",text:"📚 1時間目：勉強した",mins:60},{type:"論文",text:"📚 2時間目：勉強した",mins:60},{type:"暗記",text:"📚 3時間目：勉強した",mins:60}],2:[{type:"暗記",text:"📚 1時間目：勉強した",mins:60},{type:"論文",text:"📚 2時間目：勉強した",mins:60},{type:"短答",text:"📚 3時間目：勉強した",mins:60}],3:[{type:"短答",text:"📚 1時間目：勉強した",mins:60},{type:"論文",text:"📚 2時間目：勉強した",mins:60},{type:"暗記",text:"📚 3時間目：勉強した",mins:60}],4:[{type:"暗記",text:"📚 1時間目：勉強した",mins:60},{type:"論文",text:"📚 2時間目：勉強した",mins:60},{type:"短答",text:"📚 3時間目：勉強した",mins:60}],5:[{type:"短答",text:"📚 1時間目：勉強した",mins:60},{type:"論文",text:"📚 2時間目：勉強した",mins:60},{type:"暗記",text:"📚 3時間目：勉強した",mins:60}],6:[{type:"暗記",text:"📚 1時間目：論証集を読んだ",mins:60},{type:"論文",text:"📚 2時間目：重問を解いた",mins:60},{type:"短答",text:"📚 3時間目：短答を解いた",mins:60},{type:"暗記",text:"📚 4時間目：まとめた",mins:60}]};
const BOSS_UNLOCK_XP=80;
const TYPE_C={暗記:{bg:"#2e1e14",ac:"#f59e0b",lb:"#fcd34d"},論文:{bg:"#1e1a2e",ac:"#8b5cf6",lb:"#c4b5fd"},短答:{bg:"#1a2e1e",ac:"#22c55e",lb:"#86efac"},講義:{bg:"#1a2744",ac:"#4a7fd4",lb:"#7fb3ff"}};
const AREAS=[{id:0,name:"法学の村",icon:"🏘️",bg:"#1a2e1a",bd:"#22c55e",en:[{name:"ポンコツ六法",icon:"📗",hp:25,atk:6},{name:"迷子の条文",icon:"📄",hp:30,atk:7},{name:"眠れる判例",icon:"😴",hp:35,atk:8}],boss:{name:"村の試験官ゴードン",icon:"👨‍⚖️",hp:80,atk:15}},{id:1,name:"民法の森",icon:"🌲",bg:"#1a2744",bd:"#4a7fd4",en:[{name:"契約の亡霊",icon:"👻",hp:45,atk:10},{name:"不法行為スライム",icon:"🟢",hp:50,atk:11},{name:"時効の砂魔人",icon:"⏳",hp:55,atk:12}],boss:{name:"民法魔王ヴァール",icon:"👹",hp:120,atk:20}},{id:2,name:"刑法の洞窟",icon:"⛏️",bg:"#2e1a1a",bd:"#ef4444",en:[{name:"構成要件オーク",icon:"🔨",hp:65,atk:14},{name:"違法性のコウモリ",icon:"🦇",hp:60,atk:13},{name:"共犯のヒドラ",icon:"🐍",hp:80,atk:16}],boss:{name:"刑法神ダーク",icon:"💀",hp:160,atk:25}},{id:3,name:"憲法の城",icon:"🏰",bg:"#2e1e14",bd:"#f59e0b",en:[{name:"違憲審査ガーゴイル",icon:"🗿",hp:80,atk:16},{name:"人権の番人",icon:"🛡️",hp:75,atk:15},{name:"表現の魔女",icon:"🧙‍♀️",hp:90,atk:18}],boss:{name:"憲法守護者ノーモス",icon:"⚖️",hp:200,atk:28}},{id:4,name:"行政法の砂漠",icon:"🏜️",bg:"#2e2414",bd:"#d97706",en:[{name:"処分性モンスター",icon:"📋",hp:90,atk:18},{name:"裁量逸脱の竜巻",icon:"🌪️",hp:100,atk:20}],boss:{name:"行政魔人バイアス",icon:"🏛️",hp:230,atk:30}},{id:5,name:"商法の港",icon:"⚓",bg:"#0f1e2e",bd:"#38bdf8",en:[{name:"取締役ゾンビ",icon:"💼",hp:100,atk:20},{name:"株主総会の嵐",icon:"⛈️",hp:110,atk:21}],boss:{name:"商法海賊王カブール",icon:"🏴‍☠️",hp:260,atk:32}},{id:6,name:"民訴の迷宮",icon:"🗺️",bg:"#1e1a2e",bd:"#8b5cf6",en:[{name:"訴訟要件の壁",icon:"🧱",hp:110,atk:21},{name:"証拠法の霧",icon:"🌁",hp:105,atk:20}],boss:{name:"訴訟神クロノス",icon:"🔮",hp:290,atk:35}},{id:7,name:"刑訴の監獄",icon:"🔒",bg:"#1a1a2e",bd:"#6366f1",en:[{name:"令状主義の悪魔",icon:"📜",hp:120,atk:22},{name:"自白強要ロボット",icon:"🤖",hp:130,atk:23}],boss:{name:"刑訴大魔王ダンジョン",icon:"⚔️",hp:320,atk:38}},{id:8,name:"口述の舞台",icon:"🎭",bg:"#2e1a2e",bd:"#c026d3",en:[{name:"沈黙の魔物",icon:"😶",hp:145,atk:25},{name:"焦りの炎",icon:"🔥",hp:140,atk:25}],boss:{name:"口述の女王クァリア",icon:"👸",hp:380,atk:42}},{id:9,name:"論文の頂上",icon:"🗻",bg:"#1a2030",bd:"#60a5fa",en:[{name:"論証崩壊の怪人",icon:"💥",hp:160,atk:28},{name:"時間切れの悪夢",icon:"⏰",hp:175,atk:30}],boss:{name:"論文神ロゴス",icon:"✍️",hp:450,atk:45}},{id:10,name:"一般教養の廃墟",icon:"🏚️",bg:"#1e1e1e",bd:"#9ca3af",en:[{name:"数学の呪い",icon:"🔢",hp:180,atk:30},{name:"論理の罠",icon:"🧩",hp:190,atk:32}],boss:{name:"教養神アリスト",icon:"🎓",hp:500,atk:48}},{id:11,name:"予備試験の頂",icon:"🏔️",bg:"#1a1208",bd:"#fbbf24",en:[{name:"択一の嵐",icon:"🌪️",hp:200,atk:34},{name:"不合格の呪霊",icon:"💢",hp:220,atk:36}],boss:{name:"予備試験大魔王",icon:"🐉",hp:999,atk:55}}];
const LT=[0,80,180,320,500,720,980,1280,1620,2000,2430,2910,3440,4020,4650,5330,6060,6840,7670,9999];
const LN=["見習い","書生","条文読み","論証士","答案師","条文番頭","判例通","論客","法廷人","予備生エース","上級論客","判例の達人","実力者","論証の神","法廷の覇者","条文の王","予備生エリート","試験の猛者","合格候補生","予備試験覇者"];
const MONSTERS=[
{n:"タマゴっこ",c:"#e2e8f0",s:'<ellipse cx="50" cy="57" rx="30" ry="36" fill="#e2e8f0"/><ellipse cx="50" cy="43" rx="14" ry="9" fill="rgba(255,255,255,0.35)"/>'},
{n:"ぷにスライムちゃん",c:"#86efac",s:'<ellipse cx="50" cy="64" rx="28" ry="20" fill="#86efac"/><ellipse cx="50" cy="46" rx="22" ry="24" fill="#86efac"/><circle cx="44" cy="44" r="4" fill="white"/><circle cx="45" cy="43" r="2" fill="#166534"/><circle cx="56" cy="44" r="4" fill="white"/><circle cx="57" cy="43" r="2" fill="#166534"/><path d="M44 52 Q50 56 56 52" stroke="#166534" stroke-width="2" fill="none"/>'},
{n:"魔法少女ミミ",c:"#f9a8d4",s:'<ellipse cx="50" cy="66" rx="16" ry="14" fill="#f9a8d4"/><circle cx="50" cy="40" r="19" fill="#f9a8d4"/><path d="M33,34 Q26,22 30,12 Q36,22 40,32" fill="#be185d"/><path d="M67,34 Q74,22 70,12 Q64,22 60,32" fill="#be185d"/><circle cx="44" cy="38" r="4" fill="white"/><circle cx="45" cy="37" r="2" fill="#831843"/><circle cx="56" cy="38" r="4" fill="white"/><circle cx="57" cy="37" r="2" fill="#831843"/><path d="M44 49 Q50 53 56 49" stroke="#be185d" stroke-width="2" fill="none"/>'},
{n:"デビルちゃん",c:"#f472b6",s:'<ellipse cx="50" cy="66" rx="16" ry="14" fill="#f472b6"/><circle cx="50" cy="38" r="19" fill="#f472b6"/><path d="M28,56 Q14,42 12,64 Q22,60 28,56" fill="#be123c"/><path d="M72,56 Q86,42 88,64 Q78,60 72,56" fill="#be123c"/><circle cx="44" cy="35" r="4" fill="white"/><circle cx="45" cy="34" r="2" fill="#831843"/><circle cx="56" cy="35" r="4" fill="white"/><circle cx="57" cy="34" r="2" fill="#831843"/><path d="M44 46 Q50 50 56 46" stroke="#be123c" stroke-width="2" fill="none"/>'},
{n:"スノーフェアリー",c:"#bae6fd",s:'<ellipse cx="50" cy="66" rx="16" ry="14" fill="#bae6fd"/><circle cx="50" cy="39" r="19" fill="#bae6fd"/><path d="M26,32 Q14,24 10,34 Q20,30 26,32" fill="rgba(255,255,255,0.8)"/><path d="M74,32 Q86,24 90,34 Q80,30 74,32" fill="rgba(255,255,255,0.8)"/><circle cx="44" cy="36" r="4" fill="white"/><circle cx="45" cy="35" r="2" fill="#0369a1"/><circle cx="56" cy="36" r="4" fill="white"/><circle cx="57" cy="35" r="2" fill="#0369a1"/><path d="M44 44 Q50 48 56 44" stroke="#0369a1" stroke-width="2" fill="none"/>'},
{n:"マーメイドリリー",c:"#34d399",s:'<path d="M35,84 Q50,72 65,84 Q60,66 50,62 Q40,66 35,84" fill="#059669"/><ellipse cx="50" cy="52" rx="16" ry="18" fill="#34d399"/><circle cx="50" cy="34" r="18" fill="#34d399"/><circle cx="44" cy="31" r="4" fill="white"/><circle cx="45" cy="30" r="2" fill="#065f46"/><circle cx="56" cy="31" r="4" fill="white"/><circle cx="57" cy="30" r="2" fill="#065f46"/><path d="M44 40 Q50 44 56 40" stroke="#065f46" stroke-width="2" fill="none"/>'},
{n:"炎巫女ホムラ",c:"#fb923c",s:'<path d="M34,72 Q30,58 36,50 Q40,62 46,44 Q48,56 50,62 Q52,56 54,44 Q60,62 66,50 Q70,58 66,72" fill="#fbbf24"/><ellipse cx="50" cy="60" rx="15" ry="14" fill="#fb923c"/><circle cx="50" cy="38" r="18" fill="#fb923c"/><circle cx="44" cy="35" r="4" fill="white"/><circle cx="45" cy="34" r="2" fill="#7c2d12"/><circle cx="56" cy="35" r="4" fill="white"/><circle cx="57" cy="34" r="2" fill="#7c2d12"/><path d="M44 44 Q50 48 56 44" stroke="#c2410c" stroke-width="2" fill="none"/>'},
{n:"ムーンエンジェル",c:"#a78bfa",s:'<path d="M50,60 Q22,48 10,26 Q30,28 40,46 Q44,34 50,24 Q56,34 60,46 Q70,28 90,26 Q78,48 50,60" fill="rgba(255,255,255,0.85)"/><ellipse cx="50" cy="58" rx="16" ry="14" fill="#a78bfa"/><circle cx="50" cy="36" r="18" fill="#a78bfa"/><circle cx="50" cy="12" r="9" fill="none" stroke="#fbbf24" stroke-width="3"/><circle cx="44" cy="33" r="4" fill="white"/><circle cx="45" cy="32" r="2" fill="#4c1d95"/><circle cx="56" cy="33" r="4" fill="white"/><circle cx="57" cy="32" r="2" fill="#4c1d95"/><path d="M44 44 Q50 48 56 44" stroke="#4c1d95" stroke-width="2" fill="none"/>'},
{n:"ドラゴンプリンセス",c:"#fbbf24",s:'<ellipse cx="50" cy="66" rx="17" ry="14" fill="#fbbf24"/><circle cx="50" cy="38" r="20" fill="#fbbf24"/><path d="M30,26 Q20,10 24,2 Q32,14 36,26" fill="#fde68a"/><path d="M70,26 Q80,10 76,2 Q68,14 64,26" fill="#fde68a"/><circle cx="44" cy="35" r="4.5" fill="white"/><circle cx="45.5" cy="34" r="2.2" fill="#78350f"/><circle cx="56" cy="35" r="4.5" fill="white"/><circle cx="57.5" cy="34" r="2.2" fill="#78350f"/><path d="M44 46 Q50 51 56 46" stroke="#92400e" stroke-width="2" fill="none"/>'},
{n:"合格の女神",c:"#22c55e",s:'<path d="M50,62 Q20,50 8,26 Q28,28 40,48 Q44,34 50,22 Q56,34 60,48 Q72,28 92,26 Q80,50 50,62" fill="rgba(255,255,255,0.92)"/><ellipse cx="50" cy="60" rx="18" ry="16" fill="#22c55e"/><circle cx="50" cy="36" r="20" fill="#22c55e"/><circle cx="50" cy="8" r="12" fill="none" stroke="#fbbf24" stroke-width="3.5"/><circle cx="44" cy="33" r="4.5" fill="white"/><circle cx="45.5" cy="32" r="2.5" fill="#14532d"/><circle cx="56" cy="33" r="4.5" fill="white"/><circle cx="57.5" cy="32" r="2.5" fill="#14532d"/><path d="M44 45 Q50 50 56 45" stroke="#166534" stroke-width="2.5" fill="none"/><text x="50" y="72" text-anchor="middle" font-size="9" fill="white" font-weight="bold">合格</text>'}
];
const COMPANIONS=[
{id:"c1",name:"ぷにスライムちゃん",icon:"💚",color:"#86efac",skill:"ヒール",sd:"HP+20",mp:10,fn:function(s){return Object.assign({},s,{pHP:Math.min(s.pMaxHP,s.pHP+20),log:"💚 ヒール！ HP+20！"})}},
{id:"c2",name:"魔法少女ミミ",icon:"🩷",color:"#f9a8d4",skill:"魔法攻撃",sd:"敵に30ダメ",mp:15,fn:function(s){return Object.assign({},s,{eHP:Math.max(0,s.eHP-30),log:"🩷 魔法！ 30ダメ！"})}},
{id:"c3",name:"デビルちゃん",icon:"🦇",color:"#f472b6",skill:"MP吸収",sd:"MP+15",mp:0,fn:function(s){return Object.assign({},s,{pMP:Math.min(50,s.pMP+15),log:"🦇 MP吸収！ MP+15！"})}},
{id:"c4",name:"スノーフェアリー",icon:"❄️",color:"#bae6fd",skill:"氷結",sd:"次の攻撃無効",mp:20,fn:function(s){return Object.assign({},s,{frozen:true,log:"❄️ 氷結！ 次の敵攻撃を無効化！"})}},
{id:"c5",name:"炎巫女ホムラ",icon:"🔥",color:"#fb923c",skill:"炎の論証",sd:"敵に45ダメ",mp:25,fn:function(s){return Object.assign({},s,{eHP:Math.max(0,s.eHP-45),log:"🔥 炎の論証！ 45ダメ！"})}},
{id:"c6",name:"マーメイドリリー",icon:"🌊",color:"#34d399",skill:"全体回復",sd:"HP+30 MP+10",mp:30,fn:function(s){return Object.assign({},s,{pHP:Math.min(s.pMaxHP,s.pHP+30),pMP:Math.min(50,s.pMP+10),log:"🌊 全体回復！ HP+30 MP+10！"})}},
{id:"c7",name:"ムーンエンジェル",icon:"🌙",color:"#a78bfa",skill:"月光盾",sd:"3ターン半減",mp:20,fn:function(s){return Object.assign({},s,{shield:3,log:"🌙 月光盾！ 3ターン半減！"})}},
{id:"c8",name:"ドラゴンプリンセス",icon:"🐉",color:"#fbbf24",skill:"竜の咆哮",sd:"敵に60ダメ",mp:35,fn:function(s){return Object.assign({},s,{eHP:Math.max(0,s.eHP-60),log:"🐉 竜の咆哮！ 60ダメ！"})}}
];
const WEAPONS=[{id:"w0",n:"素手",icon:"✊",atk:0},{id:"w1",n:"論証の剣",icon:"⚔️",atk:8},{id:"w2",n:"判例の杖",icon:"🪄",atk:15},{id:"w3",n:"条文の槍",icon:"🔱",atk:22},{id:"w4",n:"予備試験の聖剣",icon:"🗡️",atk:40}];
const ARMORS=[{id:"a0",n:"普段着",icon:"👕",def:0},{id:"a1",n:"学生服",icon:"🎓",def:5},{id:"a2",n:"法廷の鎧",icon:"🛡️",def:12},{id:"a3",n:"判例の盾鎧",icon:"⚜️",def:20},{id:"a4",n:"合格の羽衣",icon:"👘",def:30}];
const ITEMS=[
{id:"i1",n:"回復薬",icon:"🧪",fn:function(s){return Object.assign({},s,{pHP:Math.min(s.pMaxHP,s.pHP+30),log:"🧪 HP+30！"})}},
{id:"i2",n:"大回復薬",icon:"💊",fn:function(s){return Object.assign({},s,{pHP:Math.min(s.pMaxHP,s.pHP+60),log:"💊 HP+60！"})}},
{id:"i3",n:"MPエーテル",icon:"💧",fn:function(s){return Object.assign({},s,{pMP:Math.min(50,s.pMP+25),log:"💧 MP+25！"})}},
{id:"i4",n:"論証の書",icon:"📖",fn:function(s){return Object.assign({},s,{atkBuff:(s.atkBuff||0)+20,log:"📖 次の攻撃+20！"})}},
{id:"i5",n:"不死鳥の羽",icon:"🪶",fn:function(s){return Object.assign({},s,{revive:true,log:"🪶 次の死を回避！"})}}
];
const BCARDS=[
{id:"b1",sub:"民法",topic:"私人間効力",q:"憲法の人権規定は私人間に直接適用されるか",a:"憲法の人権規定は国家対個人の関係を規律し、私人間に直接適用されない（直接適用説否定）。\nしかし私人間にも人権保障の要請は及ぶ。\nそこで私法の一般条項（民法90条等）を憲法の趣旨に照らして解釈・適用することで間接的に及ぼすと解する（間接適用説）。",kw:["直接適用説","間接適用説","私法の一般条項"]},
{id:"b2",sub:"民法",topic:"錯誤取消し",q:"錯誤による意思表示の取消しの要件は何か",a:"①意思表示に対応する意思を欠く錯誤（表示の錯誤）、または②法律行為の基礎とした事情についての認識が真実に反する錯誤（基礎事情の錯誤）がある場合に取り消すことができる（95条1項）。\nただし錯誤が法律行為の目的及び取引上の社会通念に照らして重要なものであることが必要。",kw:["表示の錯誤","基礎事情の錯誤","重要性"]},
{id:"b3",sub:"刑法",topic:"正当防衛",q:"正当防衛の成立要件を論じよ",a:"正当防衛（36条1項）が成立するには、①急迫不正の侵害があること、②防衛の意思があること、③やむを得ずにした行為であること（相当性）が必要。\n「急迫」とは法益侵害の危険が現在していること、「不正」とは違法であることを意味する。",kw:["急迫不正の侵害","防衛の意思","やむを得ず","相当性"]},
{id:"b4",sub:"憲法",topic:"違憲審査基準",q:"表現の自由を制約する立法の合憲性審査基準を述べよ",a:"表現の自由（21条）は民主主義の根幹をなす権利であり強い保護が必要。\n内容規制については厳格審査基準（LRA等）を適用し、内容中立規制については中間審査基準を適用する。",kw:["内容規制","内容中立規制","厳格審査","LRA","中間審査"]},
{id:"b5",sub:"民訴",topic:"処分権主義",q:"処分権主義とは何か",a:"処分権主義とは訴訟の開始・審判対象の特定・訴訟の終了について当事者に主導権を認める原則。\n裁判所は申立てのない事項について判決をしてはならない（246条）。",kw:["処分権主義","246条","申立て"]},
{id:"b6",sub:"刑訴",topic:"令状主義の例外",q:"逮捕に伴う無令状捜索・差押えの根拠と限界",a:"逮捕に伴う無令状の捜索・差押えは220条が認める令状主義の例外。\n①逮捕の現場でなければならず、②逮捕と時間的場所的に接着し、③逮捕が現実に行われていることが必要。",kw:["220条","令状主義の例外","時間的場所的接着"]},
{id:"b7",sub:"商法",topic:"取締役の義務",q:"取締役の善管注意義務・忠実義務の内容を論じよ",a:"取締役は委任関係に基づき善管注意義務を負い（民644条）、また忠実義務（355条）を負う。\n経営判断原則により一定の裁量が認められるが著しく不合理な判断は義務違反となる。",kw:["善管注意義務","忠実義務","355条","経営判断原則"]},
{id:"b8",sub:"行政法",topic:"処分性",q:"取消訴訟の対象となる「処分」の意義を述べよ",a:"「処分」とは公権力の主体たる国または公共団体が行う行為のうち、その行為によって直接国民の権利義務を形成しまたはその範囲を確定することが法律上認められているものをいう（最判昭39.10.29）。",kw:["処分性","公権力性","直接具体的法効果性"]}
];

// ══ ゲームステート ══
var G={points:0,loginStreak:0,lastLogin:"",pHP:100,pMaxHP:100,pMP:50,area:0,clearedAreas:[],defeated:0,companions:[],activeComp:null,inventory:[],eqWeapon:"w0",eqArmor:"a0",totalWins:0,bossKills:0,fullDays:0,maxCombo:0,completed:{},completedDate:"",battle:null};
var currentTab="quest";
var flashState={view:"menu",idx:0,flipped:false,stats:{ok:0,ng:0},myCards:[],editCard:null};

function load(){try{var r=localStorage.getItem("yobiRPGv4");if(r){var s=JSON.parse(r);Object.keys(s).forEach(function(k){if(k!=="battle")G[k]=s[k];})}if(G.completedDate!==new Date().toDateString())G.completed={};}catch(e){}}
function save(){try{var s=Object.assign({},G);delete s.battle;localStorage.setItem("yobiRPGv4",JSON.stringify(s));}catch(e){}}
function curLv(){return LT.findIndex(function(t,i){return G.points>=t&&G.points<LT[i+1];});}
function monster(){return MONSTERS[Math.min(curLv(),MONSTERS.length-1)];}
function todayXP(){try{return parseInt(localStorage.getItem("yobiXP_"+new Date().toDateString())||"0");}catch(e){return 0;}}
function addTodayXP(n){try{localStorage.setItem("yobiXP_"+new Date().toDateString(),String(todayXP()+n));}catch(e){}}

function earnXP(n){
  var oldLv=curLv();
  G.points+=n;
  var newLv=curLv();
  save();
  if(newLv>oldLv){G.pMaxHP+=20;G.pHP=Math.min(G.pHP+20,G.pMaxHP);fireConfetti();showLvUp(newLv);}
}

// ══ DOM構築ヘルパー ══
function h(tag,attrs,kids){
  var e=document.createElement(tag);
  if(attrs){Object.keys(attrs).forEach(function(k){
    if(k==="style"&&typeof attrs[k]==="object"){Object.assign(e.style,attrs[k]);}
    else if(k==="html"){e.innerHTML=attrs[k];}
    else if(k.charAt(0)==="$"){e.addEventListener(k.slice(1),attrs[k]);}
    else{e[k]=attrs[k];}
  });}
  if(kids){[].concat(kids).forEach(function(c){if(c!=null&&c!==false){e.appendChild(typeof c==="string"?document.createTextNode(c):c);}});}
  return e;
}
function d(style,kids){return h("div",{style:style},kids);}
function btn(text,onClick,style){return h("button",{$click:onClick,style:Object.assign({borderRadius:"12px",padding:"12px 16px",fontSize:"14px"},style)},text);}
function toast(msg){
  var t=d({position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",zIndex:"999",background:"linear-gradient(135deg,#1a2744,#2e1e14)",border:"1px solid #f59e0b",borderRadius:"12px",padding:"12px 20px",color:"#fcd34d",fontWeight:"700",fontSize:"14px",whiteSpace:"nowrap"},msg);
  document.body.appendChild(t);
  setTimeout(function(){if(t.parentNode)t.parentNode.removeChild(t);},2500);
}
function fireConfetti(){
  for(var i=0;i<20;i++){(function(i){
    var c=d({position:"fixed",top:"-20px",left:(Math.random()*100)+"%",width:(Math.random()*8+4)+"px",height:(Math.random()*8+4)+"px",background:["#f59e0b","#4a7fd4","#22c55e","#8b5cf6","#ef4444"][i%5],borderRadius:"2px",zIndex:"200",pointerEvents:"none",animation:"fall 2.5s "+(Math.random()*0.5)+"s ease-in forwards"});
    document.body.appendChild(c);
    setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c);},3000);
  })(i);}
}

// ══ メイン描画 ══
function render(){
  var app=document.getElementById("app");
  while(app.firstChild)app.removeChild(app.firstChild);
  app.appendChild(buildMain());
}

function buildMain(){
  var wrap=d({minHeight:"100vh",background:"#080a0f"});
  wrap.appendChild(buildHeader());
  wrap.appendChild(buildTabs());
  var content=d({padding:"16px",maxWidth:"720px",margin:"0 auto"});
  if(currentTab==="quest")content.appendChild(buildQuest());
  else if(currentTab==="status")content.appendChild(buildStatus());
  else if(currentTab==="flash")content.appendChild(buildFlash());
  wrap.appendChild(content);
  return wrap;
}

function buildHeader(){
  var lv=curLv(),m=monster(),area=AREAS[G.area];
  var nextThr=LT[lv+1];
  var hdr=d({borderBottom:"1px solid #1a1d2a",padding:"12px 16px"});
  var row=d({display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"});
  var svg=h("svg",{width:"90",height:"90",viewBox:"0 0 100 100",style:{animation:"glow 3s ease-in-out infinite",flexShrink:"0"},html:m.s});
  row.appendChild(svg);
  var info=d({flex:"1",minWidth:"0"});
  var nr=d({display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2px"});
  nr.appendChild(h("span",{style:{color:m.c,fontWeight:"800",fontSize:"14px"}},m.n));
  nr.appendChild(btn("💾 保存",function(){save();toast("💾 保存しました！");},{background:"#2e1e14",color:"#fcd34d",padding:"3px 10px",fontSize:"11px"}));
  info.appendChild(nr);
  info.appendChild(h("div",{style:{fontSize:"10px",color:"#555",marginBottom:"3px"}},"Lv."+(lv+1)+" "+LN[lv]));
  [["HP",G.pHP,G.pMaxHP,"#ef4444"],["MP",G.pMP,50,"#4a7fd4"],["XP",G.points-LT[lv],nextThr-LT[lv],"#f59e0b"]].forEach(function(x){
    var br=d({display:"flex",alignItems:"center",gap:"3px",marginBottom:"2px"});
    br.appendChild(h("span",{style:{fontSize:"8px",color:x[3],width:"16px"}},x[0]));
    var tr=d({flex:"1",background:"#1a1d2a",borderRadius:"3px",height:"5px",overflow:"hidden"});
    tr.appendChild(d({height:"100%",width:Math.min(100,Math.round(x[1]/x[2]*100))+"%",background:x[3],borderRadius:"3px",transition:"width 0.3s"}));
    br.appendChild(tr);
    br.appendChild(h("span",{style:{fontSize:"8px",color:"#888",whiteSpace:"nowrap"}},x[1]+"/"+x[2]));
    info.appendChild(br);
  });
  row.appendChild(info);
  var stats=d({display:"flex",flexDirection:"column",gap:"4px",flexShrink:"0"});
  [[G.points,"XP","#f59e0b","#2e1e14"],["🔥"+G.loginStreak,"連続","#ef4444","#2e1a1a"]].forEach(function(x){
    var s=d({background:x[3],borderRadius:"7px",padding:"4px 8px",textAlign:"center"});
    s.appendChild(h("div",{style:{color:x[2],fontWeight:"800",fontSize:"12px"}},String(x[0])));
    s.appendChild(h("div",{style:{color:"#555",fontSize:"9px"}},x[1]));
    stats.appendChild(s);
  });
  row.appendChild(stats);
  hdr.appendChild(row);
  var banner=d({background:area.bg,border:"1px solid "+area.bd,borderRadius:"9px",padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"});
  banner.addEventListener("click",showMap);
  var bl=d({display:"flex",alignItems:"center",gap:"8px"});
  bl.appendChild(h("span",{style:{fontSize:"18px"}},area.icon));
  var bi=d({});
  bi.appendChild(h("div",{style:{fontSize:"11px",fontWeight:"700",color:area.bd}},area.name));
  bi.appendChild(h("div",{style:{fontSize:"9px",color:"#555"}},"撃破"+G.defeated+"体 → "+area.boss.icon+area.boss.name));
  bl.appendChild(bi);banner.appendChild(bl);
  banner.appendChild(h("span",{style:{color:"#555",fontSize:"11px"}},"地図 →"));
  hdr.appendChild(banner);
  return hdr;
}

function buildTabs(){
  var wrap=d({display:"flex",borderBottom:"1px solid #1a1d2a",padding:"0 14px"});
  [["quest","⚔️ クエスト"],["status","📊 ステータス"],["flash","🧠 論証"]].forEach(function(t){
    var tb=h("button",{$click:function(){currentTab=t[0];render();},style:{background:"none",border:"none",color:currentTab===t[0]?"#f59e0b":"#555",padding:"11px 12px",fontSize:"12px",fontWeight:currentTab===t[0]?"700":"400",cursor:"pointer",borderBottom:currentTab===t[0]?"2px solid #f59e0b":"2px solid transparent",marginBottom:"-1px",whiteSpace:"nowrap"}},t[1]);
    wrap.appendChild(tb);
  });
  return wrap;
}

// ══ クエスト ══
function buildQuest(){
  var wrap=d({});
  var today=new Date().getDay(),tasks=WEEKLY_PLAN[today];
  var doneCount=tasks.filter(function(_,i){return !!G.completed[i];}).length;
  var txp=todayXP(),bossReady=txp>=BOSS_UNLOCK_XP&&!G.completed["boss"];
  var prog=d({background:"#0f1117",borderRadius:"13px",padding:"14px 16px",marginBottom:"14px",border:"1px solid #1a1d2a"});
  var pt=d({display:"flex",justifyContent:"space-between",marginBottom:"8px"});
  pt.appendChild(h("span",{style:{color:"#888",fontSize:"12px"}},["日","月","火","水","木","金","土"][today]+"曜のクエスト"));
  pt.appendChild(h("span",{style:{color:"#555",fontSize:"12px"}},doneCount+"/"+tasks.length));
  prog.appendChild(pt);
  var tr=d({background:"#1a1d2a",borderRadius:"6px",height:"7px",overflow:"hidden"});
  tr.appendChild(d({height:"100%",width:Math.round(doneCount/tasks.length*100)+"%",background:"linear-gradient(90deg,#f59e0b,#ef4444)",borderRadius:"6px"}));
  prog.appendChild(tr);wrap.appendChild(prog);
  tasks.forEach(function(task,i){
    var done=!!G.completed[i],tc=TYPE_C[task.type]||TYPE_C["暗記"];
    var card=d({background:done?"#0d1017":"#0f1117",border:"1px solid "+(done?"#1a2a1a":"#1a1d2a"),borderRadius:"13px",padding:"13px 14px",marginBottom:"9px",display:"flex",alignItems:"center",gap:"11px",opacity:done?"0.5":"1",cursor:done?"default":"pointer"});
    if(!done)card.addEventListener("click",function(){startBattle(i,task,false);});
    var circle=d({width:"30px",height:"30px",borderRadius:"50%",flexShrink:"0",background:done?"#22c55e22":tc.bg,border:"2px solid "+(done?"#22c55e":tc.ac),display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"},done?"✓":"⚔️");
    card.appendChild(circle);
    var info=d({flex:"1"});
    var badge=d({display:"flex",alignItems:"center",gap:"5px",marginBottom:"2px"});
    badge.appendChild(h("span",{style:{fontSize:"9px",background:tc.bg,color:tc.lb,padding:"1px 6px",borderRadius:"3px",fontWeight:"700"}},task.type));
    info.appendChild(badge);
    info.appendChild(h("div",{style:{fontSize:"13px",color:done?"#555":"#c8ccd8",textDecoration:done?"line-through":"none"}},task.text));
    if(!done)info.appendChild(h("div",{style:{fontSize:"10px",color:"#555",marginTop:"1px"}},"+20XP"));
    card.appendChild(info);
    if(!done)card.appendChild(h("span",{style:{color:tc.ac,fontSize:"16px",flexShrink:"0"}},"›"));
    wrap.appendChild(card);
  });
  // ボスパネル
  var bp=d({background:"#1a1206",border:"1px solid "+(bossReady?"#f59e0b":"#f59e0b22"),borderRadius:"13px",padding:"12px 14px",marginTop:"6px"});
  bp.appendChild(h("div",{style:{fontSize:"10px",color:"#f59e0b",marginBottom:"7px",fontWeight:"700"}},bossReady?"👑 ボス挑戦可能！":"👑 本日のボス（"+BOSS_UNLOCK_XP+"XP達成で出現）"));
  var br=d({display:"flex",alignItems:"center",gap:"10px"});
  br.appendChild(h("span",{style:{fontSize:"28px"}},AREAS[G.area].boss.icon));
  var bi=d({flex:"1"});
  bi.appendChild(h("div",{style:{fontWeight:"700",fontSize:"13px"}},AREAS[G.area].boss.name));
  bi.appendChild(h("div",{style:{fontSize:"10px",color:"#555"}},"HP:"+AREAS[G.area].boss.hp+" · XP:+"+(80+G.area*20)));
  var xr=d({marginTop:"4px"});
  xr.appendChild(h("div",{style:{fontSize:"10px",color:"#888",marginBottom:"2px"}},"今日のXP: "+txp+"/"+BOSS_UNLOCK_XP));
  var xt=d({background:"#1a1d2a",borderRadius:"4px",height:"4px",overflow:"hidden",maxWidth:"120px"});
  xt.appendChild(d({height:"100%",width:Math.min(100,Math.round(txp/BOSS_UNLOCK_XP*100))+"%",background:"#f59e0b"}));
  xr.appendChild(xt);bi.appendChild(xr);br.appendChild(bi);
  if(bossReady){br.appendChild(btn("⚔️ 挑戦！",function(){startBattle(-1,{type:"論文",text:"ボス戦",mins:60},true);},{background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#000",fontSize:"13px",padding:"10px 14px",flexShrink:"0"}));}
  bp.appendChild(br);wrap.appendChild(bp);
  return wrap;
}

// ══ バトル ══
function startBattle(idx,task,isBoss){
  var area=AREAS[G.area];
  var enemy=isBoss?Object.assign({},area.boss,{isBoss:true}):Object.assign({},area.en[G.defeated%area.en.length],{isBoss:false});
  G.battle={idx:idx,task:task,enemy:enemy,pHP:G.pHP,pMP:G.pMP,eHP:enemy.hp,combo:0,frozen:false,shield:0,atkBuff:0,revive:false,log:["⚔️ "+enemy.name+"が現れた！"]};
  renderBattle();
}

function renderBattle(){
  var app=document.getElementById("app");
  while(app.firstChild)app.removeChild(app.firstChild);
  app.appendChild(buildBattle());
}

function buildBattle(){
  var b=G.battle,m=monster(),enemy=b.enemy;
  var comp=G.activeComp?COMPANIONS.find(function(c){return c.id===G.activeComp;}):null;
  var wb=WEAPONS.find(function(w){return w.id===G.eqWeapon;}).atk;
  var ab=ARMORS.find(function(a){return a.id===G.eqArmor;}).def;
  var hpP=Math.round(b.pHP/G.pMaxHP*100);
  var ehpP=Math.round(b.eHP/enemy.hp*100);
  var hpC=hpP>50?"#22c55e":hpP>25?"#f59e0b":"#ef4444";
  var ehpC=ehpP>50?"#ef4444":ehpP>25?"#f59e0b":"#22c55e";
  var wrap=d({minHeight:"100vh",background:"#080a0f",display:"flex",flexDirection:"column"});
  var bg=d({flex:"1",background:"linear-gradient(180deg,#0a0f1a 0%,#111827 60%,#1a1206 100%)",display:"flex",flexDirection:"column",padding:"14px 14px 0"});
  // 敵
  var ew=d({textAlign:"center",marginBottom:"6px"});
  ew.appendChild(h("div",{style:{fontSize:"12px",color:"#ef4444",fontWeight:"700",marginBottom:"3px"}},enemy.name+(enemy.isBoss?" 👑":"")));
  var etr=d({background:"#1a1d2a",borderRadius:"6px",height:"8px",overflow:"hidden",maxWidth:"180px",margin:"0 auto 4px"});
  etr.appendChild(d({height:"100%",width:ehpP+"%",background:"linear-gradient(90deg,"+ehpC+","+ehpC+"88)",borderRadius:"6px",transition:"width 0.4s"}));
  ew.appendChild(etr);
  ew.appendChild(h("div",{style:{fontSize:"10px",color:"#555",marginBottom:"8px"}},b.eHP+"/"+enemy.hp));
  ew.appendChild(h("div",{id:"eIcon",style:{fontSize:"60px",animation:"bounce 2s ease-in-out infinite",display:"inline-block",filter:"drop-shadow(0 0 14px "+(enemy.isBoss?"#f59e0b":"#ef4444")+")"}},enemy.icon));
  bg.appendChild(ew);
  // プレイヤー
  var pr=d({display:"flex",alignItems:"flex-end",marginTop:"auto",paddingBottom:"8px",gap:"8px"});
  var psv=h("svg",{width:"90",height:"90",viewBox:"0 0 100 100",style:{animation:"bounce 2s ease-in-out infinite 0.5s",display:"block",flexShrink:"0"},html:m.s});
  pr.appendChild(psv);
  if(comp)pr.appendChild(h("div",{style:{textAlign:"center"}},h("div",{style:{fontSize:"28px"}},comp.icon)));
  var pi=d({flex:"1"});
  pi.appendChild(h("div",{style:{fontSize:"10px",color:m.c,fontWeight:"700",marginBottom:"2px"}},m.n));
  if(b.combo>=2)pi.appendChild(h("div",{style:{fontSize:"9px",color:"#f59e0b",fontWeight:"700"}},"🔥コンボ×"+b.combo));
  if(b.shield>0)pi.appendChild(h("div",{style:{fontSize:"8px",color:"#a78bfa"}},"🌙盾 "+b.shield+"T"));
  [["HP",b.pHP,G.pMaxHP,"#ef4444"],["MP",b.pMP,50,"#4a7fd4"]].forEach(function(x){
    var r=d({display:"flex",alignItems:"center",gap:"3px",marginBottom:"2px"});
    r.appendChild(h("span",{style:{fontSize:"8px",color:x[3],width:"16px"}},x[0]));
    var t=d({flex:"1",background:"#1a1d2a",borderRadius:"3px",height:"6px",overflow:"hidden"});
    t.appendChild(d({height:"100%",width:Math.min(100,Math.round(x[1]/x[2]*100))+"%",background:x[3]}));
    r.appendChild(t);
    r.appendChild(h("span",{style:{fontSize:"8px",color:"#888",whiteSpace:"nowrap"}},x[1]+"/"+x[2]));
    pi.appendChild(r);
  });
  pr.appendChild(pi);bg.appendChild(pr);wrap.appendChild(bg);
  // ログ
  var log=h("div",{id:"bLog",style:{background:"#0a0c10",border:"1px solid #1a1d2a",margin:"0 10px",borderRadius:"8px",padding:"7px 11px",height:"65px",overflowY:"auto",fontSize:"11px",color:"#c8ccd8",lineHeight:"1.8"}});
  b.log.forEach(function(l){log.appendChild(h("div",{},l));});
  wrap.appendChild(log);
  // アイテム
  var bagItems=G.inventory.filter(function(i){return !i.isEquip;});
  if(bagItems.length){
    var bw=d({padding:"4px 10px",display:"flex",flexWrap:"wrap",gap:"5px"});
    bagItems.forEach(function(item,idx){
      bw.appendChild(btn(item.icon+" "+item.n,function(){useBattleItem(item,idx);},{background:"#1a2744",border:"1px solid #4a7fd4",color:"#7fb3ff",fontSize:"10px",padding:"5px 9px"}));
    });
    wrap.appendChild(bw);
  }
  // コマンド
  var cmds=d({padding:"8px 10px 24px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px"});
  var cmdList=[
    {id:"attack",icon:"⚔️",label:"たたかう",color:"#ef4444",bg:"#2e1a1a",dis:false},
    {id:"skill",icon:"✨",label:"必殺技",sub:"MP20",color:"#8b5cf6",bg:"#1e1a2e",dis:b.pMP<20},
    {id:"companion",icon:comp?comp.icon:"👥",label:comp?comp.skill:"仲間なし",sub:comp?"MP"+comp.mp:"",color:"#22c55e",bg:"#1a2e1a",dis:!comp||b.pMP<(comp?comp.mp:0)},
    {id:"heal",icon:"💊",label:"かいふく",sub:"MP15",color:"#4a7fd4",bg:"#1a2744",dis:b.pMP<15},
    {id:"flee",icon:"🏃",label:"にげる",color:"#888",bg:"#1a1d2a",dis:enemy.isBoss}
  ];
  cmdList.forEach(function(cmd){
    var cb=h("button",{$click:function(){doAction(cmd.id);},disabled:cmd.dis||false,style:{background:cmd.bg,border:"1px solid "+(cmd.dis?"#2a2d3a":cmd.color),borderRadius:"10px",padding:"8px 4px",textAlign:"center",cursor:cmd.dis?"not-allowed":"pointer",opacity:cmd.dis?"0.4":"1"}});
    cb.appendChild(h("div",{style:{fontSize:"18px",marginBottom:"1px"}},cmd.icon));
    cb.appendChild(h("div",{style:{color:cmd.dis?"#555":cmd.color,fontWeight:"700",fontSize:"11px"}},cmd.label));
    if(cmd.sub)cb.appendChild(h("div",{style:{color:"#555",fontSize:"9px"}},cmd.sub));
    cmds.appendChild(cb);
  });
  wrap.appendChild(cmds);
  return wrap;
}

function addLog(msg){
  G.battle.log.push(msg);
  var log=document.getElementById("bLog");
  if(log){log.appendChild(h("div",{},msg));log.scrollTop=log.scrollHeight;}
}

function doAction(action){
  var b=G.battle,comp=G.activeComp?COMPANIONS.find(function(c){return c.id===G.activeComp;}):null;
  var wb=WEAPONS.find(function(w){return w.id===G.eqWeapon;}).atk;
  var ab=ARMORS.find(function(a){return a.id===G.eqArmor;}).def;
  function calc(base){return Math.floor(base*(0.85+Math.random()*0.3));}
  if(action==="flee"){if(!b.enemy.isBoss){G.pMP=Math.max(0,G.pMP-5);G.battle=null;save();render();}return;}
  var dmg=0,mpCost=0,heal=0,msg="",nc=b.combo;
  if(action==="attack"){
    var base=20+wb+(b.atkBuff||0);
    var mult=1+Math.min(nc,10)*0.1;
    dmg=Math.floor(calc(base)*mult);
    b.atkBuff=0;nc++;
    msg="⚔️ "+(nc>=5?"🔥コンボ"+nc+"Hit! ":"")+"攻撃！ "+dmg+"ダメ！";
  } else if(action==="skill"){
    if(b.pMP<20)return;
    dmg=Math.floor(calc(45+Math.floor(wb*1.5)+(b.atkBuff||0))*(1+Math.min(nc,10)*0.15));
    b.atkBuff=0;mpCost=20;nc+=2;
    msg="✨ 論証ブレイク！ "+dmg+"大ダメ！";
  } else if(action==="companion"){
    if(!comp||b.pMP<comp.mp)return;
    var r=comp.fn({pHP:b.pHP,pMaxHP:G.pMaxHP,pMP:b.pMP,eHP:b.eHP});
    b.eHP=r.eHP!==undefined?r.eHP:b.eHP;
    b.pHP=r.pHP!==undefined?r.pHP:b.pHP;
    b.pMP=Math.max(0,(r.pMP!==undefined?r.pMP:b.pMP)-comp.mp);
    if(r.frozen)b.frozen=true;if(r.shield)b.shield=r.shield;
    b.combo=nc+1;addLog(r.log);
    if(b.eHP<=0)return victory();
    setTimeout(enemyTurn,600);renderBattle();return;
  } else if(action==="heal"){
    if(b.pMP<15)return;
    heal=Math.floor(10+Math.random()*15);mpCost=15;msg="💊 回復！ HP+"+heal+"！";
  }
  b.eHP=action!=="heal"?Math.max(0,b.eHP-dmg):b.eHP;
  b.pHP=action==="heal"?Math.min(G.pMaxHP,b.pHP+heal):b.pHP;
  b.pMP=Math.max(0,b.pMP-mpCost);
  b.combo=nc;b.maxCombo=Math.max(b.maxCombo||0,nc);
  addLog(msg);
  if(b.eHP<=0)return victory();
  setTimeout(enemyTurn,600);renderBattle();
}

function useBattleItem(item,bagIdx){
  var b=G.battle;
  var r=item.fn({pHP:b.pHP,pMaxHP:G.pMaxHP,pMP:b.pMP,eHP:b.eHP,atkBuff:b.atkBuff||0});
  b.pHP=r.pHP!==undefined?r.pHP:b.pHP;
  b.pMP=r.pMP!==undefined?r.pMP:b.pMP;
  b.eHP=r.eHP!==undefined?r.eHP:b.eHP;
  if(r.atkBuff!==undefined)b.atkBuff=r.atkBuff;
  if(r.revive)b.revive=true;
  addLog(r.log);
  var all=G.inventory.filter(function(i){return !i.isEquip;});
  var gi=G.inventory.indexOf(all[bagIdx]);
  if(gi>=0)G.inventory.splice(gi,1);
  if(b.eHP<=0)return victory();
  renderBattle();
}

function enemyTurn(){
  var b=G.battle;
  var ab=ARMORS.find(function(a){return a.id===G.eqArmor;}).def;
  if(b.frozen){b.frozen=false;addLog("❄️ 敵は氷結！攻撃できない！");renderBattle();return;}
  var raw=Math.floor((b.enemy.atk||10)*(0.85+Math.random()*0.3));
  var dmg=b.shield>0?Math.floor(raw/2):raw;
  if(b.shield>0)b.shield--;
  var red=Math.max(0,dmg-Math.floor(ab/3));
  b.pHP=Math.max(0,b.pHP-red);b.combo=0;
  addLog("👹 "+b.enemy.name+"の攻撃！ "+red+"ダメ…");
  if(b.pHP<=0){
    if(b.revive){b.revive=false;b.pHP=Math.floor(G.pMaxHP*0.4);addLog("🪶 不死鳥の羽で復活！！");renderBattle();return;}
    addLog("💀 倒れてしまった…");
    G.pHP=Math.floor(G.pMaxHP*0.3);save();
    setTimeout(function(){showResult(false,b.enemy,0,0);},1000);return;
  }
  renderBattle();
}

function victory(){
  var b=G.battle;
  var baseXP=b.enemy.isBoss?80+G.area*20:20;
  var xp=baseXP+Math.floor((b.combo||0)*2);
  G.pHP=b.pHP;G.pMP=Math.min(50,b.pMP+10);
  if(b.idx>=0)G.completed[b.idx]=true;
  G.totalWins++;G.maxCombo=Math.max(G.maxCombo,b.combo||0);
  addTodayXP(xp);earnXP(xp);
  var drop=null;
  if(Math.random()<0.12){drop=Object.assign({},ITEMS[Math.floor(Math.random()*ITEMS.length)]);G.inventory.push(drop);}
  else if(b.enemy.isBoss&&Math.random()<0.3){
    var ew2=WEAPONS.filter(function(w){return w.id!=="w0";});
    if(ew2.length){var dw=ew2[Math.floor(Math.random()*ew2.length)];drop=Object.assign({},dw,{isEquip:"weapon"});G.inventory.push(drop);}
  }
  if(b.enemy.isBoss){
    G.bossKills++;G.completed["boss"]=true;
    if(!G.clearedAreas.includes(G.area)){G.clearedAreas.push(G.area);if(G.area<AREAS.length-1)G.area++;}
    G.defeated=0;fireConfetti();
    var avail=COMPANIONS.filter(function(c){return !G.companions.find(function(cc){return cc.id===c.id;});});
    if(avail.length&&Math.random()<0.6){
      var rc=avail[Math.floor(Math.random()*avail.length)];
      save();showResult(true,b.enemy,xp,Math.floor((b.combo||0)*2),drop,rc);return;
    }
  } else {G.defeated++;}
  var today=new Date().getDay(),tasks=WEEKLY_PLAN[today];
  if(tasks.every(function(_,i){return !!G.completed[i];})){G.fullDays++;earnXP(50);}
  save();showResult(true,b.enemy,xp,Math.floor((b.combo||0)*2),drop,null);
}

function showResult(win,enemy,xp,cb,drop,recruit){
  var ov=d({position:"fixed",inset:"0",background:"rgba(0,0,0,0.85)",zIndex:"100",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"});
  var mo=d({background:win?(enemy.isBoss?"linear-gradient(135deg,#1a2744,#2e1e14)":"linear-gradient(135deg,#0f1117,#1a1d2a)"):"linear-gradient(135deg,#2e1a1a,#1a1d2a)",border:"2px solid "+(win?(enemy.isBoss?"#f59e0b":"#22c55e"):"#ef4444"),borderRadius:"22px",padding:"28px 22px",textAlign:"center",maxWidth:"320px",width:"100%",animation:"popIn 0.5s ease-out"});
  mo.appendChild(h("div",{style:{fontSize:"52px",marginBottom:"10px"}},win?(enemy.isBoss?"🏆":"⚔️"):"💀"));
  mo.appendChild(h("div",{style:{fontWeight:"900",fontSize:"22px",marginBottom:"6px",color:win?(enemy.isBoss?"#f59e0b":"#22c55e"):"#ef4444"}},win?(enemy.isBoss?(AREAS[Math.max(0,G.area-1)].name+" 制覇！"):"勝利！"):"敗北…"));
  if(win){
    mo.appendChild(h("div",{style:{color:"#f59e0b",fontSize:"18px",fontWeight:"700",marginBottom:"4px"}},"+"+xp+" XP"));
    if(cb>0)mo.appendChild(h("div",{style:{color:"#f59e0b",fontSize:"12px",marginBottom:"6px"}},"💥 コンボボーナス +"+cb+"XP"));
    if(drop){
      var dd=d({background:"#1a2744",border:"1px solid #4a7fd4",borderRadius:"10px",padding:"10px",marginBottom:"10px"});
      dd.appendChild(h("div",{style:{fontSize:"10px",color:"#7fb3ff",marginBottom:"2px"}},"🎁 ドロップ！"));
      dd.appendChild(h("div",{style:{color:"#e8eaf6",fontWeight:"700",fontSize:"14px"}},drop.icon+" "+(drop.n||drop.id)));
      mo.appendChild(dd);
    }
  } else {mo.appendChild(h("div",{style:{color:"#888",fontSize:"12px",marginBottom:"10px"}},"HP30%で復活。諦めずに続けよう！"));}
  if(recruit){
    var rb=d({background:recruit.color+"22",border:"1px solid "+recruit.color,borderRadius:"12px",padding:"12px",marginBottom:"12px"});
    rb.appendChild(h("div",{style:{fontSize:"28px"}},recruit.icon));
    rb.appendChild(h("div",{style:{color:recruit.color,fontWeight:"800",fontSize:"16px",margin:"4px 0 2px"}},recruit.name));
    rb.appendChild(h("div",{style:{color:"#888",fontSize:"11px"}},recruit.skill+": "+recruit.sd));
    var rr=d({display:"flex",gap:"8px",marginTop:"8px"});
    rr.appendChild(btn("仲間にする！",function(){G.companions.push({id:recruit.id});G.activeComp=recruit.id;save();document.body.removeChild(ov);G.battle=null;render();toast(recruit.icon+" "+recruit.name+"が仲間になった！");},{flex:"2",background:"linear-gradient(135deg,"+recruit.color+","+recruit.color+"88)",color:"#000",fontSize:"13px",padding:"12px"}));
    rr.appendChild(btn("断る",function(){document.body.removeChild(ov);G.battle=null;render();},{flex:"1",background:"#1a1d2a",border:"1px solid #2a2d3a",color:"#888",fontSize:"12px",padding:"12px"}));
    rb.appendChild(rr);mo.appendChild(rb);
  } else {
    mo.appendChild(btn(win?(enemy.isBoss?"次のエリアへ！":"続ける"):"戻る",function(){document.body.removeChild(ov);G.battle=null;render();},{width:"100%",background:win?(enemy.isBoss?"linear-gradient(135deg,#f59e0b,#d97706)":"linear-gradient(135deg,#4a7fd4,#7c3aed)"):"#2e1a1a",border:win?"none":"1px solid #ef4444",color:win?(enemy.isBoss?"#000":"#fff"):"#ef4444",fontSize:"15px",marginTop:"8px"}));
  }
  ov.appendChild(mo);document.body.appendChild(ov);
}

function showLvUp(lv){
  var m=MONSTERS[Math.min(lv,MONSTERS.length-1)];
  var ov=d({position:"fixed",inset:"0",background:"rgba(0,0,0,0.9)",zIndex:"150",display:"flex",alignItems:"center",justifyContent:"center"});
  var mo=d({background:"linear-gradient(135deg,#0f1117,#1a1d2a)",border:"2px solid "+m.c,borderRadius:"22px",padding:"32px 24px",textAlign:"center",maxWidth:"300px",width:"90%",animation:"popIn 0.5s ease-out"});
  mo.appendChild(h("div",{style:{fontSize:"12px",color:"#888",marginBottom:"6px"}},"⬆️ LEVEL UP!"));
  mo.appendChild(h("div",{style:{color:m.c,fontWeight:"900",fontSize:"24px",marginBottom:"14px"}},"Lv."+(lv+1)+" "+LN[lv]));
  mo.appendChild(h("svg",{width:"120",height:"120",viewBox:"0 0 100 100",style:{margin:"0 auto 12px",display:"block"},html:m.s}));
  mo.appendChild(h("div",{style:{color:"#e8eaf6",fontWeight:"700",fontSize:"16px",marginBottom:"4px"}},m.n));
  mo.appendChild(h("div",{style:{color:"#888",fontSize:"12px",marginBottom:"16px"}},"HP+20！"));
  mo.appendChild(btn("やったで！🎉",function(){document.body.removeChild(ov);},{background:m.c,color:"#000",fontSize:"15px",padding:"12px 28px"}));
  ov.appendChild(mo);document.body.appendChild(ov);
}

function showMap(){
  var ov=d({position:"fixed",inset:"0",background:"rgba(0,0,0,0.9)",zIndex:"100",overflowY:"auto"});
  var wrap=d({padding:"20px",maxWidth:"500px",margin:"0 auto"});
  var hdr=d({display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"});
  hdr.appendChild(btn("← 閉じる",function(){document.body.removeChild(ov);},{background:"none",color:"#888",padding:"0",fontSize:"13px"}));
  hdr.appendChild(h("div",{style:{fontSize:"17px",fontWeight:"800"}},"🗺️ ワールドマップ"));
  wrap.appendChild(hdr);
  AREAS.forEach(function(area,i){
    var cleared=G.clearedAreas.includes(area.id);
    var unlocked=i===0||G.clearedAreas.includes(AREAS[i-1].id);
    var isCur=area.id===G.area;
    var card=d({background:area.bg,border:"2px solid "+(isCur?area.bd:cleared?"#2a3a2a":unlocked?"#2a2d3a":"#1a1d2a"),borderRadius:"14px",padding:"14px 18px",marginBottom:"10px",cursor:unlocked?"pointer":"not-allowed",opacity:unlocked?"1":"0.4"});
    if(unlocked)card.addEventListener("click",function(){G.area=area.id;G.defeated=0;save();document.body.removeChild(ov);render();});
    var row=d({display:"flex",alignItems:"center",gap:"12px"});
    row.appendChild(h("span",{style:{fontSize:"32px"}},area.icon));
    var info=d({flex:"1"});
    var nr=d({display:"flex",alignItems:"center",gap:"6px",marginBottom:"2px"});
    nr.appendChild(h("span",{style:{fontWeight:"800",fontSize:"15px",color:isCur?area.bd:"#e8eaf6"}},area.name));
    if(cleared)nr.appendChild(h("span",{style:{fontSize:"9px",background:"#1a3a1a",color:"#22c55e",padding:"1px 5px",borderRadius:"3px"}},"✓制覇"));
    if(isCur&&!cleared)nr.appendChild(h("span",{style:{fontSize:"9px",background:"#2e1e14",color:"#f59e0b",padding:"1px 5px",borderRadius:"3px"}},"現在地"));
    info.appendChild(nr);
    info.appendChild(h("div",{style:{fontSize:"10px",color:"#555"}},"ボス: "+area.boss.icon+" "+area.boss.name+" HP:"+area.boss.hp));
    row.appendChild(info);card.appendChild(row);wrap.appendChild(card);
  });
  ov.appendChild(wrap);document.body.appendChild(ov);
}

// ══ ステータス ══
function buildStatus(){
  var wrap=d({}),lv=curLv(),m=monster();
  var cc=d({background:"#0f1117",border:"1px solid #1a1d2a",borderRadius:"14px",padding:"18px",marginBottom:"12px",textAlign:"center"});
  cc.appendChild(h("svg",{width:"120",height:"120",viewBox:"0 0 100 100",style:{margin:"0 auto 8px",display:"block",animation:"bounce 2s ease-in-out infinite"},html:m.s}));
  cc.appendChild(h("div",{style:{color:m.c,fontWeight:"800",fontSize:"17px"}},m.n));
  cc.appendChild(h("div",{style:{color:"#888",fontSize:"11px",marginBottom:"8px"}},"Lv."+(lv+1)+" "+LN[lv]));
  wrap.appendChild(cc);
  // 仲間
  var cp=d({background:"#0f1117",border:"1px solid #1a1d2a",borderRadius:"14px",padding:"16px",marginBottom:"12px"});
  cp.appendChild(h("div",{style:{fontSize:"12px",color:"#888",fontWeight:"700",marginBottom:"10px"}},"👥 仲間（"+G.companions.length+"人）"));
  if(!G.companions.length){cp.appendChild(h("div",{style:{color:"#555",fontSize:"12px"}},"ボスを倒すと仲間になることがある！"));}
  else{G.companions.forEach(function(c){
    var comp=COMPANIONS.find(function(x){return x.id===c.id;});if(!comp)return;
    var isA=G.activeComp===comp.id;
    var row=d({background:isA?"#1a2e1a":"#0f1117",border:"1px solid "+(isA?"#22c55e":"#2a2d3a"),borderRadius:"11px",padding:"10px",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"});
    row.addEventListener("click",function(){G.activeComp=isA?null:comp.id;save();render();});
    row.appendChild(h("span",{style:{fontSize:"28px"}},comp.icon));
    var ci=d({flex:"1"});
    ci.appendChild(h("div",{style:{color:comp.color,fontWeight:"700",fontSize:"13px"}},comp.name));
    ci.appendChild(h("div",{style:{color:"#888",fontSize:"11px"}},comp.skill+": "+comp.sd+"（MP"+comp.mp+"）"));
    row.appendChild(ci);
    if(isA)row.appendChild(h("span",{style:{fontSize:"9px",background:"#1a3a1a",color:"#22c55e",padding:"1px 6px",borderRadius:"3px"}},"出撃中"));
    cp.appendChild(row);
  });}
  wrap.appendChild(cp);
  // 装備
  var eq=d({background:"#0f1117",border:"1px solid #1a1d2a",borderRadius:"14px",padding:"16px",marginBottom:"12px"});
  eq.appendChild(h("div",{style:{fontSize:"12px",color:"#888",fontWeight:"700",marginBottom:"10px"}},"⚔️ 装備"));
  [{label:"武器",list:WEAPONS,key:"eqWeapon",bk:"atk",ownedFn:function(){return ["w0"].concat(G.inventory.filter(function(i){return i.isEquip==="weapon";}).map(function(i){return i.id;}));}},{label:"防具",list:ARMORS,key:"eqArmor",bk:"def",ownedFn:function(){return ["a0"].concat(G.inventory.filter(function(i){return i.isEquip==="armor";}).map(function(i){return i.id;}));}}].forEach(function(e2){
    eq.appendChild(h("div",{style:{fontSize:"10px",color:"#555",marginBottom:"5px"}},e2.label));
    var row=d({display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"10px"});
    var owned=e2.ownedFn();
    e2.list.filter(function(i){return owned.includes(i.id);}).forEach(function(item){
      var isE=G[e2.key]===item.id;
      var dd=d({background:isE?"#2e1e14":"#1a1d2a",border:"1px solid "+(isE?"#f59e0b":"#2a2d3a"),borderRadius:"9px",padding:"7px 9px",cursor:"pointer",textAlign:"center",minWidth:"58px"});
      dd.addEventListener("click",function(){G[e2.key]=item.id;save();render();});
      dd.appendChild(h("div",{style:{fontSize:"18px"}},item.icon));
      dd.appendChild(h("div",{style:{fontSize:"9px",color:isE?"#fcd34d":"#888",fontWeight:isE?"700":"400"}},item.n));
      dd.appendChild(h("div",{style:{fontSize:"8px",color:"#555"}},"+"+item[e2.bk]));
      row.appendChild(dd);
    });
    eq.appendChild(row);
  });
  wrap.appendChild(eq);
  // 統計
  var st=d({background:"#0f1117",border:"1px solid #1a1d2a",borderRadius:"14px",padding:"16px",marginBottom:"12px"});
  st.appendChild(h("div",{style:{fontSize:"12px",color:"#888",fontWeight:"700",marginBottom:"10px"}},"📊 戦績"));
  [["総XP",G.points,"#f59e0b"],["総勝利",G.totalWins,"#22c55e"],["ボス撃破",G.bossKills,"#ef4444"],["最大コンボ",G.maxCombo,"#f59e0b"],["連続ログイン",G.loginStreak+"日","#4a7fd4"]].forEach(function(x){
    var r=d({display:"flex",justifyContent:"space-between",marginBottom:"6px"});
    r.appendChild(h("span",{style:{fontSize:"12px",color:"#888"}},x[0]));
    r.appendChild(h("span",{style:{fontSize:"12px",color:x[2],fontWeight:"700"}},String(x[1])));
    st.appendChild(r);
  });
  wrap.appendChild(st);
  wrap.appendChild(btn("🗑️ データをリセット",function(){if(!confirm("リセットしますか？"))return;localStorage.removeItem("yobiRPGv4");location.reload();},{width:"100%",background:"#2e1a1a",border:"1px solid rgba(239,68,68,0.1)",color:"#ef4444",fontSize:"12px",padding:"10px"}));
  return wrap;
}

// ══ 論証暗記 ══
function buildFlash(){
  var wrap=d({}),s=flashState;
  if(s.view==="menu"){
    wrap.appendChild(h("div",{style:{color:"#888",fontSize:"13px",marginBottom:"14px"}},"暗記方法を選んでください"));
    var b1=d({background:"#2e1e14",border:"1px solid rgba(245,158,11,0.2)",borderRadius:"14px",padding:"18px",cursor:"pointer",marginBottom:"10px"});
    b1.addEventListener("click",function(){flashState.view="builtin";flashState.idx=0;flashState.flipped=false;render();});
    b1.appendChild(h("div",{style:{color:"#fcd34d",fontWeight:"800",fontSize:"15px",marginBottom:"4px"}},"📚 内蔵論証集（"+BCARDS.length+"件）"));
    b1.appendChild(h("div",{style:{color:"#888",fontSize:"12px"}},"オフライン対応！カードをめくって覚えよう"));
    wrap.appendChild(b1);
    var b2=d({background:"#1a2744",border:"1px solid rgba(74,127,212,0.2)",borderRadius:"14px",padding:"18px",cursor:"pointer"});
    b2.addEventListener("click",function(){flashState.view="my";render();});
    b2.appendChild(h("div",{style:{color:"#7fb3ff",fontWeight:"800",fontSize:"15px",marginBottom:"4px"}},"✏️ マイ論証集（"+s.myCards.length+"件）"));
    b2.appendChild(h("div",{style:{color:"#888",fontSize:"12px"}},"自分でカードを登録"));
    wrap.appendChild(b2);
  } else if(s.view==="builtin"){
    wrap.appendChild(btn("← 戻る",function(){flashState.view="menu";render();},{background:"none",color:"#888",padding:"0",fontSize:"13px",marginBottom:"14px",display:"block"}));
    var cur=BCARDS[s.idx%BCARDS.length];
    wrap.appendChild(h("div",{style:{fontSize:"11px",color:"#555",textAlign:"right",marginBottom:"6px"}},((s.idx%BCARDS.length)+1)+"/"+BCARDS.length));
    var card=d({background:"#0f1117",border:"1px solid #2e1e14",borderRadius:"14px",padding:"22px",marginBottom:"14px"});
    var top=d({display:"flex",justifyContent:"space-between",marginBottom:"10px"});
    top.appendChild(h("span",{style:{fontSize:"10px",background:"#2e1e14",color:"#fcd34d",padding:"2px 8px",borderRadius:"4px",fontWeight:"700"}},cur.sub));
    if(s.stats.ok||s.stats.ng){var sr=d({display:"flex",gap:"8px"});if(s.stats.ok)sr.appendChild(h("span",{style:{fontSize:"11px",color:"#22c55e"}},"✅"+s.stats.ok));if(s.stats.ng)sr.appendChild(h("span",{style:{fontSize:"11px",color:"#ef4444"}},"❌"+s.stats.ng));top.appendChild(sr);}
    card.appendChild(top);
    card.appendChild(h("div",{style:{color:"#fcd34d",fontWeight:"800",fontSize:"17px",marginBottom:"10px"}},cur.topic));
    card.appendChild(h("div",{style:{color:"#c8ccd8",fontSize:"13px",lineHeight:"1.7"}},cur.q));
    wrap.appendChild(card);
    if(!s.flipped){
      wrap.appendChild(h("div",{style:{background:"#1a1d2a",borderRadius:"10px",padding:"12px",fontSize:"12px",color:"#555",textAlign:"center",marginBottom:"10px"}},"論証を思い出してから確認しよう"));
      wrap.appendChild(btn("答えを見る 👇",function(){flashState.flipped=true;render();},{width:"100%",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#000"}));
    } else {
      var ans=d({background:"#161820",border:"1px solid #2a2d3a",borderRadius:"13px",padding:"18px",marginBottom:"13px"});
      ans.appendChild(h("div",{style:{color:"#c8ccd8",fontSize:"13px",lineHeight:"1.85",whiteSpace:"pre-wrap"}},cur.a));
      if(cur.kw&&cur.kw.length){var kw=d({marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #2a2d3a"});kw.appendChild(h("div",{style:{fontSize:"10px",color:"#f59e0b",marginBottom:"6px"}},"⚡ キーワード"));var kwr=d({display:"flex",flexWrap:"wrap",gap:"5px"});cur.kw.forEach(function(k){kwr.appendChild(h("span",{style:{background:"#2e1e14",color:"#fcd34d",fontSize:"11px",padding:"3px 8px",borderRadius:"5px",fontWeight:"600"}},k));});kw.appendChild(kwr);ans.appendChild(kw);}
      wrap.appendChild(ans);
      var row=d({display:"flex",gap:"8px",marginBottom:"10px"});
      row.appendChild(btn("😓 要復習",function(){flashState.stats.ng++;flashState.idx++;flashState.flipped=false;render();},{flex:"1",background:"#2e1a1a",border:"1px solid #ef4444",color:"#ef4444"}));
      row.appendChild(btn("✅ 覚えた！+10XP",function(){flashState.stats.ok++;earnXP(10);flashState.idx++;flashState.flipped=false;render();},{flex:"1",background:"#1a2e1a",border:"1px solid #22c55e",color:"#22c55e"}));
      wrap.appendChild(row);
      wrap.appendChild(btn("← 前のカード",function(){flashState.idx=Math.max(0,flashState.idx-1);flashState.flipped=false;render();},{background:"#1a1d2a",color:"#888",fontSize:"12px"}));
    }
  } else if(s.view==="my"){
    var tr=d({display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"});
    tr.appendChild(btn("← 戻る",function(){flashState.view="menu";render();},{background:"none",color:"#888",padding:"0",fontSize:"13px"}));
    tr.appendChild(btn("＋ 登録",function(){flashState.editCard={subject:"民法",topic:"",q:"",a:"",kw:""};flashState.view="register";render();},{background:"#f59e0b",color:"#000",padding:"7px 12px",fontSize:"12px"}));
    wrap.appendChild(tr);
    if(!s.myCards.length){wrap.appendChild(h("div",{style:{color:"#555",textAlign:"center",padding:"40px"}},"まだカードがありません"));}
    else{s.myCards.forEach(function(c){
      var card=d({background:"#0f1117",border:"1px solid #1a2744",borderRadius:"12px",padding:"13px 15px",marginBottom:"8px"});
      var row=d({display:"flex",justifyContent:"space-between",alignItems:"flex-start"});
      var info=d({flex:"1",minWidth:"0"});
      info.appendChild(h("span",{style:{fontSize:"9px",background:"#1a2744",color:"#7fb3ff",padding:"1px 7px",borderRadius:"3px",fontWeight:"700"}},c.subject));
      info.appendChild(h("div",{style:{color:"#e8eaf6",fontWeight:"700",fontSize:"14px",margin:"5px 0 3px"}},c.topic));
      info.appendChild(h("div",{style:{color:"#555",fontSize:"11px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},(c.a||"").slice(0,40)+"..."));
      row.appendChild(info);
      var btns=d({display:"flex",gap:"4px",flexShrink:"0",marginLeft:"10px"});
      btns.appendChild(btn("削除",function(){flashState.myCards=flashState.myCards.filter(function(x){return x.id!==c.id;});try{localStorage.setItem("yobiCards",JSON.stringify(flashState.myCards));}catch(e){}render();},{background:"#2e1a1a",color:"#ef4444",padding:"5px 8px",fontSize:"11px"}));
      row.appendChild(btns);card.appendChild(row);wrap.appendChild(card);
    });}
  } else if(s.view==="register"){
    wrap.appendChild(btn("← 戻る",function(){flashState.editCard=null;flashState.view="my";render();},{background:"none",color:"#888",padding:"0",fontSize:"13px",display:"block",marginBottom:"14px"}));
    wrap.appendChild(h("div",{style:{marginBottom:"14px",fontSize:"15px",fontWeight:"700",color:"#7fb3ff"}},"論証を登録"));
    var vals=Object.assign({},s.editCard);
    var fields=[{l:"科目",k:"subject",type:"select"},{l:"論点名 ＊",k:"topic",ph:"例：私人間効力"},{l:"論証 ＊",k:"a",ph:"規範定立を含む論証...",ml:true},{l:"キーワード（カンマ区切り）",k:"kw",ph:"例：直接適用説、間接適用説"}];
    fields.forEach(function(f){
      var fd=d({marginBottom:"12px"});
      fd.appendChild(h("div",{style:{fontSize:"11px",color:"#888",marginBottom:"5px"}},f.l));
      var inp;
      if(f.type==="select"){
        inp=h("select",{});
        ["憲法","民法","刑法","商法","民訴","刑訴","行政法"].forEach(function(s2){var o=h("option",{value:s2},s2);if(vals.subject===s2)o.selected=true;inp.appendChild(o);});
      } else if(f.ml){
        inp=h("textarea",{style:{minHeight:"120px",resize:"vertical"}});
        inp.value=vals[f.k]||"";inp.placeholder=f.ph||"";
      } else {
        inp=h("input",{type:"text"});inp.value=vals[f.k]||"";inp.placeholder=f.ph||"";
      }
      inp.addEventListener("input",function(e){vals[f.k]=e.target.value;});
      fd.appendChild(inp);wrap.appendChild(fd);
    });
    wrap.appendChild(btn("💾 保存する",function(){
      if(!vals.topic||!vals.a){toast("論点名と論証は必須です");return;}
      var kws=typeof vals.kw==="string"?vals.kw.split(/[,、]/).map(function(x){return x.trim();}).filter(Boolean):[];
      var card=Object.assign({},vals,{kw:kws,id:Date.now()});
      flashState.myCards.push(card);
      try{localStorage.setItem("yobiCards",JSON.stringify(flashState.myCards));}catch(e){}
      flashState.editCard=null;flashState.view="my";render();
    },{width:"100%",background:"linear-gradient(135deg,#4a7fd4,#7c3aed)",color:"#fff",fontSize:"14px",padding:"13px"}));
  }
  return wrap;
}

// ══ 起動 ══
load();
try{var mc=localStorage.getItem("yobiCards");if(mc)flashState.myCards=JSON.parse(mc);}catch(e){}
// デイリーボーナス
(function(){
  var today=new Date().toDateString();
  if(G.lastLogin!==today){
    var yesterday=new Date(Date.now()-86400000).toDateString();
    G.loginStreak=G.lastLogin===yesterday?G.loginStreak+1:1;
    G.lastLogin=today;
    var bonus=50+G.loginStreak*10;
    G.points+=bonus;
    save();
    setTimeout(function(){toast("🎁 デイリーボーナス！ +"+ bonus +"XP ("+G.loginStreak+"日連続)");},500);
  }
})();
render();
if("serviceWorker" in navigator){
  window.addEventListener("load",function(){
    navigator.serviceWorker.register("sw.js").catch(function(){});
  });
}
