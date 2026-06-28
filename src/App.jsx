import { useState } from "react";

// ── 날짜 상수 ─────────────────────────────────────────────
const START_DATE  = new Date(2026, 6, 1);   // 2026-07-01
const GOAL_END    = new Date(2026, 11, 31);  // 2026-12-31
const GOAL_MONTHS = 6;

const DEFAULT_INITIAL = { muscle:31.0, fat:15.4, weight:70.3 };
const MUSCLE_GOAL = 33.0;
const FAT_GOAL    = 13.0;
const DEFAULT_GOAL_WEIGHT = 68.0;

// ── 운동 데이터 (이름 / 세트 / 목표무게 / 유튜브 검색어) ──
// targetWeight: { p1:"초급", p2:"중급", p3:"고급" }  null = 무게 없는 운동
const EX = {
  // 가슴·삼두
  푸시업:           { sets:{p1:"3×15",p2:"3×15",p3:"3×20"}, tw:null,                        yt:"푸시업 올바른 자세" },
  덤벨벤치프레스:   { sets:{p1:"3×10",p2:null,  p3:null  }, tw:{p1:"8~10kg",p2:null,p3:null},yt:"덤벨 벤치프레스 자세" },
  덤벨플라이:       { sets:{p1:"3×12",p2:null,  p3:null  }, tw:{p1:"6~8kg", p2:null,p3:null},yt:"덤벨 플라이 자세" },
  트라이셉스딥:     { sets:{p1:"3×12",p2:null,  p3:"3×12"}, tw:null,                        yt:"트라이셉스 딥 자세" },
  바벨벤치프레스:   { sets:{p1:null,  p2:"4×8", p3:"4×12"}, tw:{p1:null,p2:"50~60kg",p3:"60~70kg"}, yt:"바벨 벤치프레스 자세" },
  인클라인덤벨프레스:{ sets:{p1:null, p2:"3×10",p3:null  }, tw:{p1:null,p2:"10~12kg",p3:null},yt:"인클라인 덤벨 프레스 자세" },
  케이블플라이:     { sets:{p1:null,  p2:"3×12",p3:null  }, tw:{p1:null,p2:"각10~15kg",p3:null},yt:"케이블 플라이 자세" },
  클로즈그립벤치:   { sets:{p1:null,  p2:"3×10",p3:null  }, tw:{p1:null,p2:"40~50kg",p3:null},yt:"클로즈그립 벤치프레스 자세" },
  인클라인푸시업:   { sets:{p1:null,  p2:null,  p3:"3×15"}, tw:null,                        yt:"인클라인 푸시업 자세" },
  케이블트라이셉스: { sets:{p1:null,  p2:null,  p3:"4×15"}, tw:{p1:null,p2:null,p3:"각15~20kg"},yt:"케이블 트라이셉스 푸시다운 자세" },
  딥스:             { sets:{p1:null,  p2:null,  p3:"3×12"}, tw:null,                        yt:"딥스 자세 방법" },
  // 등·이두
  랫풀다운:         { sets:{p1:"3×10",p2:null,  p3:"4×12"}, tw:{p1:"40~50kg",p2:null,p3:"50~60kg"}, yt:"랫풀다운 자세" },
  시티드케이블로우: { sets:{p1:"3×10",p2:null,  p3:null  }, tw:{p1:"40~50kg",p2:null,p3:null},yt:"시티드 케이블 로우 자세" },
  덤벨컬:           { sets:{p1:"3×12",p2:null,  p3:null  }, tw:{p1:"8~10kg",p2:null,p3:null},yt:"덤벨 컬 자세" },
  페이스풀:         { sets:{p1:"3×15",p2:null,  p3:"3×15"}, tw:{p1:"각10~15kg",p2:null,p3:"각15~20kg"},yt:"페이스풀 자세" },
  바벨로우:         { sets:{p1:null,  p2:"4×8", p3:null  }, tw:{p1:null,p2:"50~60kg",p3:null},yt:"바벨 로우 자세" },
  풀업:             { sets:{p1:null,  p2:"3×8", p3:null  }, tw:null,                        yt:"풀업 자세 방법" },
  해머컬:           { sets:{p1:null,  p2:"3×12",p3:null  }, tw:{p1:null,p2:"10~12kg",p3:null},yt:"해머컬 자세" },
  리버스플라이:     { sets:{p1:null,  p2:"3×15",p3:null  }, tw:{p1:null,p2:"6~8kg",  p3:null},yt:"리버스 플라이 자세" },
  시티드로우:       { sets:{p1:null,  p2:null,  p3:"4×12"}, tw:{p1:null,p2:null,p3:"50~60kg"},yt:"시티드 로우 자세" },
  케이블컬:         { sets:{p1:null,  p2:null,  p3:"3×15"}, tw:{p1:null,p2:null,p3:"각10~15kg"},yt:"케이블 컬 자세" },
  // 하체·어깨
  고블릿스쿼트:     { sets:{p1:"3×12",p2:null,  p3:null  }, tw:{p1:"16~20kg",p2:null,p3:null},yt:"고블릿 스쿼트 자세" },
  레그프레스:       { sets:{p1:"3×12",p2:null,  p3:"4×15"}, tw:{p1:"60~80kg",p2:null,p3:"80~100kg"},yt:"레그프레스 자세" },
  런지:             { sets:{p1:"3×10",p2:null,  p3:"4×12"}, tw:{p1:"덤벨 각8kg",p2:null,p3:"덤벨 각10kg"},yt:"런지 자세 방법" },
  덤벨숄더프레스:   { sets:{p1:"3×10",p2:null,  p3:null  }, tw:{p1:"10~12kg",p2:null,p3:null},yt:"덤벨 숄더프레스 자세" },
  사이드레터럴:     { sets:{p1:"3×12",p2:null,  p3:"4×15"}, tw:{p1:"6~8kg",p2:null,p3:"8~10kg"},yt:"사이드 레터럴 레이즈 자세" },
  바벨스쿼트:       { sets:{p1:null,  p2:"4×8", p3:null  }, tw:{p1:null,p2:"60~70kg",p3:null},yt:"바벨 스쿼트 자세" },
  루마니안데드리프트:{ sets:{p1:null, p2:"3×10",p3:null  }, tw:{p1:null,p2:"50~60kg",p3:null},yt:"루마니안 데드리프트 자세" },
  레그컬:           { sets:{p1:null,  p2:"3×12",p3:"4×15"}, tw:{p1:null,p2:"30~40kg",p3:"40~50kg"},yt:"레그컬 자세" },
  바벨숄더프레스:   { sets:{p1:null,  p2:"4×8", p3:null  }, tw:{p1:null,p2:"30~40kg",p3:null},yt:"바벨 숄더프레스 자세" },
  업라이트로우:     { sets:{p1:null,  p2:"3×12",p3:null  }, tw:{p1:null,p2:"20~30kg",p3:null},yt:"업라이트 로우 자세" },
  숄더프레스:       { sets:{p1:null,  p2:null,  p3:"4×12"}, tw:{p1:null,p2:null,p3:"30~40kg"},yt:"숄더프레스 자세" },
  사이드레터럴고반복:{ sets:{p1:null, p2:null,  p3:"4×15"}, tw:{p1:null,p2:null,p3:"8~10kg"},yt:"사이드 레터럴 레이즈 자세" },
  // 코어·유산소
  플랭크:           { sets:{p1:null,  p2:"3×60초",p3:null }, tw:null,                       yt:"플랭크 올바른 자세" },
  케이블우드찹:     { sets:{p1:null,  p2:"3×12",p3:null  }, tw:{p1:null,p2:"각10~15kg",p3:null},yt:"케이블 우드찹 자세" },
  레그레이즈:       { sets:{p1:null,  p2:"3×15",p3:null  }, tw:null,                        yt:"레그레이즈 자세" },
  버드독:           { sets:{p1:null,  p2:"3×12",p3:null  }, tw:null,                        yt:"버드독 운동 자세" },
  전신스트레칭:     { sets:{p1:"30분",p2:null,  p3:null  }, tw:null,                        yt:"전신 스트레칭 루틴" },
  유산소기초:       { sets:{p1:"35분",p2:null,  p3:null  }, tw:null,                        yt:"유산소 운동 방법" },
  HIIT인터벌:       { sets:{p1:null,  p2:"25분",p3:null  }, tw:null,                        yt:"인터벌 트레이닝 방법" },
  저강도유산소:     { sets:{p1:null,  p2:"40분",p3:null  }, tw:null,                        yt:"저강도 유산소 운동" },
  타바타:           { sets:{p1:null,  p2:null,  p3:"20분"}, tw:null,                        yt:"타바타 운동 방법" },
  파워워킹:         { sets:{p1:null,  p2:null,  p3:"45분"}, tw:null,                        yt:"인클라인 트레드밀 파워워킹" },
  전신서킷:         { sets:{p1:null,  p2:null,  p3:"45분"}, tw:null,                        yt:"전신 서킷 트레이닝" },
};

// ── 부위별 운동 그룹 (교체 후보) ─────────────────────────
const GROUPS = {
  "가슴·삼두": ["푸시업","덤벨벤치프레스","덤벨플라이","트라이셉스딥","바벨벤치프레스","인클라인덤벨프레스","케이블플라이","클로즈그립벤치","인클라인푸시업","케이블트라이셉스","딥스"],
  "등·이두":   ["랫풀다운","시티드케이블로우","덤벨컬","페이스풀","바벨로우","풀업","해머컬","리버스플라이","시티드로우","케이블컬"],
  "하체":      ["고블릿스쿼트","레그프레스","런지","바벨스쿼트","루마니안데드리프트","레그컬"],
  "어깨":      ["덤벨숄더프레스","사이드레터럴","바벨숄더프레스","업라이트로우","숄더프레스","사이드레터럴고반복"],
  "코어":      ["플랭크","케이블우드찹","레그레이즈","버드독"],
  "유산소":    ["유산소기초","HIIT인터벌","저강도유산소","타바타","파워워킹","전신서킷","전신스트레칭"],
};
// 운동 → 그룹 역방향 맵
const EX_GROUP = {};
Object.entries(GROUPS).forEach(([g,keys])=>keys.forEach(k=>{EX_GROUP[k]=g;}));

// ── Phase별 주간 루틴 (운동명 = EX 키) ───────────────────
const PHASE_INFO = [
  {
    phase:1, months:[1,2], label:"기초 적응기", color:"#4a90d9", bg:"#eef5fd",
    focus:"자세 교정 + 근신경 활성화",
    pKey:"p1",
    weeklyPlan:{
      월:{ type:"근력",   part:"가슴·삼두",  exKeys:["푸시업","덤벨벤치프레스","덤벨플라이","트라이셉스딥"] },
      화:{ type:"유산소", part:"심폐강화",   exKeys:["유산소기초"] },
      수:{ type:"근력",   part:"등·이두",   exKeys:["랫풀다운","시티드케이블로우","덤벨컬","페이스풀"] },
      목:{ type:"유산소", part:"심폐강화",   exKeys:["유산소기초"] },
      금:{ type:"근력",   part:"하체·어깨", exKeys:["고블릿스쿼트","레그프레스","런지","덤벨숄더프레스","사이드레터럴"] },
      토:{ type:"회복",   part:"스트레칭",  exKeys:["전신스트레칭"] },
      일:{ type:"휴식",   part:"완전 휴식", exKeys:[] },
    },
    meal:{ kcal:2100, protein:110, carb:240, fat:65 },
    tip:"무게보다 자세 우선. 워밍업 10분은 필수입니다.",
  },
  {
    phase:2, months:[3,4], label:"근력 증가기", color:"#2d7a4f", bg:"#eaf7f0",
    focus:"근비대 자극 + 강도 점진적 증가",
    pKey:"p2",
    weeklyPlan:{
      월:{ type:"근력",   part:"가슴·삼두",  exKeys:["바벨벤치프레스","인클라인덤벨프레스","케이블플라이","클로즈그립벤치"] },
      화:{ type:"유산소", part:"HIIT",       exKeys:["HIIT인터벌"] },
      수:{ type:"근력",   part:"등·이두",   exKeys:["바벨로우","풀업","해머컬","리버스플라이"] },
      목:{ type:"유산소", part:"저강도 유산소",exKeys:["저강도유산소"] },
      금:{ type:"근력",   part:"하체·어깨", exKeys:["바벨스쿼트","루마니안데드리프트","레그컬","바벨숄더프레스","업라이트로우"] },
      토:{ type:"근력",   part:"코어·전신", exKeys:["플랭크","케이블우드찹","레그레이즈","버드독"] },
      일:{ type:"휴식",   part:"완전 휴식", exKeys:[] },
    },
    meal:{ kcal:2200, protein:120, carb:250, fat:65 },
    tip:"격주로 무게 5~10% 증량. 수면 7시간 이상이 근성장의 핵심입니다.",
  },
  {
    phase:3, months:[5,6], label:"완성 다듬기", color:"#b07d30", bg:"#fdf5e6",
    focus:"체지방 감량 + 근육 선명도 향상",
    pKey:"p3",
    weeklyPlan:{
      월:{ type:"근력",   part:"가슴·삼두",  exKeys:["바벨벤치프레스","인클라인푸시업","케이블트라이셉스","딥스"] },
      화:{ type:"유산소", part:"HIIT",       exKeys:["타바타"] },
      수:{ type:"근력",   part:"등·이두",   exKeys:["시티드로우","랫풀다운","케이블컬","페이스풀"] },
      목:{ type:"유산소", part:"파워워킹",   exKeys:["파워워킹"] },
      금:{ type:"근력",   part:"하체·어깨", exKeys:["레그프레스","런지","레그컬","숄더프레스","사이드레터럴고반복"] },
      토:{ type:"복합",   part:"서킷+코어", exKeys:["전신서킷"] },
      일:{ type:"휴식",   part:"완전 휴식", exKeys:[] },
    },
    meal:{ kcal:2000, protein:125, carb:210, fat:60 },
    tip:"탄수화물을 운동 전후로 집중. 저녁 8시 이후 금식.",
  },
];

const DAY_NAMES = ["일","월","화","수","목","금","토"];
const typeColor = { 근력:"#2d7a4f", 유산소:"#4a90d9", HIIT:"#c0392b", 회복:"#8e44ad", 복합:"#e67e22", 휴식:"#ccc", 준비:"#bbb" };

// ── 헬퍼 ────────────────────────────────────────────────
function getPhaseByMonth(m) { return PHASE_INFO.find(p=>p.months.includes(m))||PHASE_INFO[0]; }
function getMonthLabel(m) {
  const d = new Date(START_DATE); d.setMonth(d.getMonth()+m-1);
  return `${d.getMonth()+1}월`;
}
function dateKey(d) { return d.toISOString().slice(0,10); }

function getDaysPassed() {
  const now = new Date(); now.setHours(0,0,0,0);
  const s   = new Date(START_DATE);
  return Math.floor((now - s) / 86400000);
}
function getTotalDays() { return Math.floor((GOAL_END - START_DATE)/86400000); }

function getElapsedMonths() {
  const now = new Date();
  const diff = (now.getFullYear()-START_DATE.getFullYear())*12+(now.getMonth()-START_DATE.getMonth());
  return Math.max(0, Math.min(diff, GOAL_MONTHS-1));
}
function getWeekDates(offset) {
  // 오늘 기준 해당 주 일요일 구하고, offset 주 이동
  const today = new Date(); today.setHours(0,0,0,0);
  const sun = new Date(today); sun.setDate(today.getDate() - today.getDay() + offset*7);
  return Array.from({length:7},(_,i)=>{ const d=new Date(sun); d.setDate(sun.getDate()+i); return d; });
}
// 오늘이 속한 주와 7월 1일이 속한 주의 차이 (주간탭 초기 offset용)
function getInitialWeekOffset() {
  const today = new Date(); today.setHours(0,0,0,0);
  const todaySun = new Date(today); todaySun.setDate(today.getDate()-today.getDay());
  const startSun = new Date(START_DATE); startSun.setDate(START_DATE.getDate()-START_DATE.getDay());
  return Math.round((startSun - todaySun) / (7*86400000));
}

// 운동 display 문자열
function exLabel(key, pKey) {
  const ex = EX[key]; if (!ex) return key;
  const sets = ex.sets[pKey];
  const tw   = ex.tw?.[pKey];
  let label = key.replace(/([가-힣])([가-힣])/g,"$1 $2"); // 붙은 한글 띄우기 (간단 처리)
  if (sets) label += ` ${sets}`;
  if (tw)   label += ` · 목표 ${tw}`;
  return label;
}
function exName(key) {
  // 표시용 이름
  const map = {
    유산소기초:"빠르게 걷기 or 사이클",HIIT인터벌:"인터벌 트레이닝",
    저강도유산소:"사이클 or 수영",타바타:"타바타",파워워킹:"인클라인 트레드밀",
    전신서킷:"전신 서킷+코어",전신스트레칭:"전신 스트레칭",
    덤벨벤치프레스:"덤벨 벤치프레스",덤벨플라이:"덤벨 플라이",트라이셉스딥:"트라이셉스 딥",
    바벨벤치프레스:"바벨 벤치프레스",인클라인덤벨프레스:"인클라인 덤벨 프레스",
    케이블플라이:"케이블 플라이",클로즈그립벤치:"클로즈그립 벤치",
    인클라인푸시업:"인클라인 푸시업",케이블트라이셉스:"케이블 트라이셉스 푸시다운",
    랫풀다운:"랫풀다운",시티드케이블로우:"시티드 케이블 로우",덤벨컬:"덤벨 컬",
    바벨로우:"바벨 로우",풀업:"풀업",해머컬:"해머컬",리버스플라이:"리버스 플라이",
    시티드로우:"시티드 로우",케이블컬:"케이블 컬",
    고블릿스쿼트:"고블릿 스쿼트",레그프레스:"레그 프레스",런지:"런지",
    덤벨숄더프레스:"덤벨 숄더프레스",사이드레터럴:"사이드 레터럴 레이즈",
    바벨스쿼트:"바벨 스쿼트",루마니안데드리프트:"루마니안 데드리프트",
    레그컬:"레그 컬",바벨숄더프레스:"바벨 숄더프레스",업라이트로우:"업라이트 로우",
    숄더프레스:"숄더프레스",사이드레터럴고반복:"사이드 레터럴 레이즈",
    플랭크:"플랭크",케이블우드찹:"케이블 우드찹",레그레이즈:"레그레이즈",버드독:"버드독",
    푸시업:"푸시업",페이스풀:"페이스풀",
  };
  return map[key]||key;
}
function ytLink(key) {
  const ex = EX[key]; if (!ex) return null;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.yt)}`;
}

// 스토리지
function load(k,d){ try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;} }
function save(k,v){ try{localStorage.setItem(k,JSON.stringify(v));}catch{} }

// ── 점진적 과부하 헬퍼 ──────────────────────────────────
const CARDIO_KEYS = new Set(["유산소기초","HIIT인터벌","저강도유산소","타바타","파워워킹","전신서킷","전신스트레칭","플랭크"]);
const BODYWEIGHT_KEYS = new Set(["푸시업","인클라인푸시업","트라이셉스딥","딥스","풀업","레그레이즈","버드독"]);

function isCardio(key) { return CARDIO_KEYS.has(key); }
function isBodyweight(key) { return BODYWEIGHT_KEYS.has(key); }

// 같은 운동의 전체 기록에서 과부하 상태 계산
function getOverloadStatus(records) {
  if (!records || records.length === 0) return null;
  const sorted = [...records].sort((a,b)=>a.date.localeCompare(b.date));
  const last = sorted[sorted.length-1];

  // PR 판정: 무게 기준, 유산소는 duration 기준
  const allWeights = sorted.map(r=>r.weight||0);
  const maxWeight  = Math.max(...allWeights);
  const isPR = (last.weight||0) >= maxWeight && sorted.length > 1;

  // 연속 동일 기록 횟수 (최근부터 역순)
  let streak = 1;
  for (let i=sorted.length-2; i>=0; i--) {
    const a=sorted[i], b=sorted[i+1];
    if (a.weight===b.weight && a.reps===b.reps) streak++;
    else break;
  }
  const shouldIncrease = streak >= 3;

  // 직전 대비 변화
  let trend = null;
  if (sorted.length >= 2) {
    const prev = sorted[sorted.length-2];
    const wDiff = (last.weight||0) - (prev.weight||0);
    const rDiff = (last.reps||0) - (prev.reps||0);
    if (wDiff > 0 || (wDiff === 0 && rDiff > 0)) trend = "up";
    else if (wDiff < 0 || rDiff < 0) trend = "down";
    else trend = "same";
  }

  return { last, isPR: isPR && trend==="up", shouldIncrease, trend, streak };
}

// 운동 로그 시트 컴포넌트
function LogSheet({ exKey, records, onSave, onClose }) {
  const cardio     = isCardio(exKey);
  const bodyweight = isBodyweight(exKey);
  const sorted     = records ? [...records].sort((a,b)=>a.date.localeCompare(b.date)) : [];
  const lastRec    = sorted[sorted.length-1];

  const [weight,   setWeight]   = useState(lastRec?.weight  ?? "");
  const [reps,     setReps]     = useState(lastRec?.reps    ?? "");
  const [sets,     setSets]     = useState(lastRec?.sets    ?? "");
  const [duration, setDuration] = useState(lastRec?.duration ?? "");

  const handleSave = () => {
    const entry = {
      date: new Date().toISOString().slice(0,10),
      ...(cardio
        ? { duration: parseFloat(duration)||0 }
        : {
            weight:   bodyweight ? 0 : (parseFloat(weight)||0),
            reps:     parseInt(reps)||0,
            sets:     parseInt(sets)||0,
          }),
    };
    onSave(entry);
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1001 }}
      onClick={onClose}>
      <div style={{ background:"#fff",borderRadius:"20px 20px 0 0",padding:"20px 20px 36px",width:"100%",maxWidth:480 }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
          <div style={{ fontSize:15,fontWeight:700 }}>{exName(exKey)} 기록</div>
          <button onClick={onClose} style={{ border:"none",background:"none",fontSize:20,cursor:"pointer",color:"#aaa",lineHeight:1 }}>×</button>
        </div>

        {/* 이전 기록 */}
        {sorted.length > 0 && (
          <div style={{ background:"#f8f8f8",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12 }}>
            <div style={{ color:"#aaa",marginBottom:4 }}>이전 기록 (최근 3회)</div>
            {sorted.slice(-3).reverse().map((r,i)=>(
              <div key={i} style={{ display:"flex",justifyContent:"space-between",color:i===0?"#1a1a1a":"#bbb",fontWeight:i===0?600:400,marginBottom:2 }}>
                <span>{r.date.slice(5)}</span>
                <span>
                  {cardio ? `${r.duration}분`
                    : bodyweight ? `${r.sets}세트 × ${r.reps}회`
                    : `${r.weight}kg × ${r.reps}회 × ${r.sets}세트`}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 입력 */}
        {cardio ? (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11,color:"#aaa",marginBottom:6 }}>운동 시간 (분)</div>
            <input type="number" value={duration} onChange={e=>setDuration(e.target.value)} placeholder="예: 35"
              style={{ width:"100%",border:"1.5px solid #e0e0e0",borderRadius:10,padding:"12px",fontSize:16,boxSizing:"border-box",outline:"none",textAlign:"center" }}/>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns: bodyweight?"1fr 1fr":"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
            {!bodyweight && (
              <div>
                <div style={{ fontSize:11,color:"#aaa",marginBottom:6 }}>무게 (kg)</div>
                <input type="number" step="0.5" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="0"
                  style={{ width:"100%",border:"1.5px solid #e0e0e0",borderRadius:10,padding:"12px",fontSize:16,boxSizing:"border-box",outline:"none",textAlign:"center" }}/>
              </div>
            )}
            <div>
              <div style={{ fontSize:11,color:"#aaa",marginBottom:6 }}>횟수 (회)</div>
              <input type="number" value={reps} onChange={e=>setReps(e.target.value)} placeholder="0"
                style={{ width:"100%",border:"1.5px solid #e0e0e0",borderRadius:10,padding:"12px",fontSize:16,boxSizing:"border-box",outline:"none",textAlign:"center" }}/>
            </div>
            <div>
              <div style={{ fontSize:11,color:"#aaa",marginBottom:6 }}>세트</div>
              <input type="number" value={sets} onChange={e=>setSets(e.target.value)} placeholder="3"
                style={{ width:"100%",border:"1.5px solid #e0e0e0",borderRadius:10,padding:"12px",fontSize:16,boxSizing:"border-box",outline:"none",textAlign:"center" }}/>
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{ width:"100%",background:"#1a1a1a",color:"#fff",border:"none",borderRadius:12,padding:"14px",fontSize:14,fontWeight:700,cursor:"pointer" }}>
          기록 저장
        </button>
      </div>
    </div>
  );
}

// ── 운동 행 컴포넌트 ────────────────────────────────────
function ExRow({ exKey, pKey, checked, onToggle, onSwapClick, isSwapped, overload, onLogClick }) {
  const ex    = EX[exKey];
  const sets  = ex?.sets?.[pKey] || "";
  const tw    = ex?.tw?.[pKey] || null;
  const name  = exName(exKey);
  const link  = ytLink(exKey);
  const group = EX_GROUP[exKey];
  const cardio= isCardio(exKey);

  const trendIcon  = overload?.trend==="up" ? "↑" : overload?.trend==="down" ? "↓" : overload?.trend==="same" ? "→" : null;
  const trendColor = overload?.trend==="up" ? "#2d7a4f" : overload?.trend==="down" ? "#c0392b" : "#aaa";

  const lastLabel = overload?.last
    ? cardio
      ? `${overload.last.duration}분`
      : isBodyweight(exKey)
        ? `${overload.last.sets}×${overload.last.reps}회`
        : `${overload.last.weight}kg×${overload.last.reps}회`
    : null;

  return (
    <div style={{
      display:"flex", alignItems:"flex-start", gap:10,
      padding:"10px 12px", borderRadius:10,
      background: checked?"#f0f9f4":"#fafafa",
      border: checked?"1px solid #c3e8d4": isSwapped?"1px solid #d4e8ff":"1px solid #f0f0f0",
      transition:"all .15s",
    }}>
      <div onClick={onToggle} style={{
        width:20, height:20, borderRadius:"50%", flexShrink:0, marginTop:2, cursor:"pointer",
        background:checked?"#2d7a4f":"#e0e0e0",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 3.5L4 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
          <span onClick={onToggle} style={{
            fontSize:13, fontWeight:600,
            color:checked?"#aaa":"#1a1a1a",
            textDecoration:checked?"line-through":"none",
            cursor:"pointer",
          }}>{name}</span>
          {overload?.isPR && <span style={{ fontSize:9,color:"#b07d30",background:"#fdf5e6",borderRadius:8,padding:"1px 6px",fontWeight:700 }}>🏆 PR</span>}
          {overload?.shouldIncrease && !overload?.isPR && <span style={{ fontSize:9,color:"#c0392b",background:"#fee",borderRadius:8,padding:"1px 6px",fontWeight:700 }}>무게 올릴 때!</span>}
          {isSwapped && <span style={{ fontSize:9, color:"#4a90d9", background:"#eef5fd", borderRadius:8, padding:"1px 6px" }}>교체됨</span>}
          {link && (
            <a href={link} target="_blank" rel="noreferrer" style={{
              display:"inline-flex", alignItems:"center", gap:3,
              fontSize:10, color:"#c0392b", textDecoration:"none",
              background:"#fee", borderRadius:10, padding:"1px 7px",
              flexShrink:0,
            }}>▶ 유튜브</a>
          )}
        </div>
        <div style={{ fontSize:11, color:"#aaa", marginTop:2, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {sets && <span>{sets}</span>}
          {tw && <span style={{ color:"#4a90d9" }}>· 목표 {tw}</span>}
          {lastLabel && (
            <span style={{ color:trendColor, fontWeight:600 }}>
              {trendIcon} 지난번 {lastLabel}
            </span>
          )}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:4, flexShrink:0, marginTop:1 }}>
        {onLogClick && (
          <button onClick={onLogClick} style={{
            border:"1px solid #2d7a4f", background: overload?.last?"#eaf7f0":"#fff",
            borderRadius:8, padding:"3px 8px", fontSize:10, cursor:"pointer",
            color:"#2d7a4f", whiteSpace:"nowrap", fontWeight:600,
          }}>📝 기록</button>
        )}
        {group && onSwapClick && (
          <button onClick={onSwapClick} style={{
            border:"1px solid #e0e0e0", background:"#fff",
            borderRadius:8, padding:"3px 8px", fontSize:10, cursor:"pointer",
            color:"#666", whiteSpace:"nowrap",
          }}>교체</button>
        )}
      </div>
    </div>
  );
}

function SwapSheet({ slot, pKey, currentKeys, onSelect, onClose }) {
  const group = EX_GROUP[slot.exKey];
  const candidates = group ? GROUPS[group] : [];
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000 }}
      onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"20px 20px 32px", width:"100%", maxWidth:480 }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <div style={{ fontSize:15, fontWeight:700 }}>{group} 운동 교체</div>
          <button onClick={onClose} style={{ border:"none", background:"none", fontSize:20, cursor:"pointer", color:"#aaa", lineHeight:1 }}>×</button>
        </div>
        <div style={{ fontSize:11, color:"#aaa", marginBottom:14 }}>같은 부위 운동 중 하나를 선택하세요</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:380, overflowY:"auto" }}>
          {candidates.map(k=>{
            const isCurrent = k === slot.exKey;
            const isInPlan  = currentKeys.includes(k) && !isCurrent;
            const ex = EX[k];
            const sets = ex?.sets?.[pKey] || ex?.sets?.p1 || ex?.sets?.p2 || ex?.sets?.p3 || "";
            const tw   = ex?.tw?.[pKey] || ex?.tw?.p1 || ex?.tw?.p2 || ex?.tw?.p3 || null;
            const link = ytLink(k);
            return (
              <div key={k} onClick={()=>!isInPlan && onSelect(k)} style={{
                display:"flex", alignItems:"flex-start", gap:10,
                padding:"10px 12px", borderRadius:10,
                background: isCurrent?"#f0f9f4": isInPlan?"#fafafa":"#fafafa",
                border: isCurrent?"1.5px solid #2d7a4f": isInPlan?"1px solid #f0f0f0":"1px solid #e8e8e8",
                cursor: isInPlan?"default":"pointer",
                opacity: isInPlan?0.45:1,
              }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:13, fontWeight:600, color:"#1a1a1a" }}>{exName(k)}</span>
                    {isCurrent && <span style={{ fontSize:9, color:"#2d7a4f", background:"#eaf7f0", borderRadius:8, padding:"1px 6px" }}>현재</span>}
                    {isInPlan && <span style={{ fontSize:9, color:"#aaa", background:"#f5f5f5", borderRadius:8, padding:"1px 6px" }}>이미 포함</span>}
                    {link && (
                      <a href={link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{
                        fontSize:10, color:"#c0392b", background:"#fee", borderRadius:8, padding:"1px 6px", textDecoration:"none",
                      }}>▶ 영상</a>
                    )}
                  </div>
                  <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>
                    {sets && <span>{sets}</span>}
                    {tw && <span style={{ color:"#4a90d9", marginLeft:6 }}>· {tw}</span>}
                  </div>
                </div>
                {!isCurrent && !isInPlan && (
                  <div style={{ fontSize:18, color:"#ccc", marginTop:2 }}>›</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ height:7, background:"#f0f0f0", borderRadius:4 }}>
      <div style={{ height:"100%", borderRadius:4, background:color, width:`${Math.max(0,Math.min(100,pct))}%`, transition:"width .5s" }} />
    </div>
  );
}

// ── 메인 ────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]             = useState("home");
  const [checks, setChecks]       = useState(()=>load("fit6c",{}));
  const [inbody, setInbody]       = useState(()=>load("fit6ib",[]));
  const [selMonth, setSelMonth]   = useState(getElapsedMonths()+1);
  const [weekOff, setWeekOff]     = useState(getInitialWeekOffset);
  const [showIbForm, setShowIbForm] = useState(false);
  const [editIdx, setEditIdx]     = useState(null);
  const [ibForm, setIbForm]       = useState({date:"",muscle:"",fat:"",weight:""});
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [goalWeightInput, setGoalWeightInput] = useState("");
  const [savedGoalWeight, setSavedGoalWeight] = useState(()=>load("fit6gw",null));
  const [swaps, setSwaps]       = useState(()=>load("fit6sw",{}));
  const [swapSlot, setSwapSlot] = useState(null);
  const [prLog, setPrLog]       = useState(()=>load("fit6log",{}));
  const [logTarget, setLogTarget] = useState(null); // exKey

  const today       = new Date();
  const todayKey    = dateKey(today);
  const todayDay    = DAY_NAMES[today.getDay()];
  const daysPassed  = getDaysPassed();   // 음수 = 아직 시작 전
  const totalDays   = getTotalDays();
  const overallPct  = Math.min(100, Math.max(0, Math.round(daysPassed/totalDays*100)));
  const currentMonth= Math.max(1, getElapsedMonths()+1);
  const currentPhase= getPhaseByMonth(currentMonth);
  const todayPlan   = currentPhase.weeklyPlan[todayDay]||{type:"휴식",part:"완전 휴식",exKeys:[]};

  const firstIb  = inbody[0] || DEFAULT_INITIAL;
  const latestIb = inbody.length>0 ? inbody[inbody.length-1] : DEFAULT_INITIAL;
  const goalW    = savedGoalWeight!==null ? savedGoalWeight : parseFloat((firstIb.weight-2.3).toFixed(1));
  const wGap     = parseFloat((latestIb.weight - goalW).toFixed(1));
  const musclePct= Math.round(Math.max(0,(latestIb.muscle-firstIb.muscle)/(MUSCLE_GOAL-firstIb.muscle)*100));
  const fatPct   = Math.round(Math.max(0,(firstIb.fat-latestIb.fat)/(firstIb.fat-FAT_GOAL)*100));
  const wPct     = latestIb.weight<=goalW ? 100 : Math.round(Math.max(0,(firstIb.weight-latestIb.weight)/(firstIb.weight-goalW)*100));

  const toggleCheck = (k,i) => {
    const next={...checks}; const arr=next[k]?[...next[k]]:[];
    if(arr.includes(i)) arr.splice(arr.indexOf(i),1); else arr.push(i);
    next[k]=arr; setChecks(next); save("fit6c",next);
  };
  const openNew  = () => { setEditIdx(null); setIbForm({date:todayKey,muscle:"",fat:"",weight:""}); setShowIbForm(true); };
  const openEdit = (i) => { const r=inbody[i]; setEditIdx(i); setIbForm({date:r.date,muscle:String(r.muscle),fat:String(r.fat),weight:String(r.weight)}); setShowIbForm(true); };
  const saveIb   = () => {
    const entry={ date:ibForm.date||todayKey, muscle:parseFloat(ibForm.muscle)||latestIb.muscle, fat:parseFloat(ibForm.fat)||latestIb.fat, weight:parseFloat(ibForm.weight)||latestIb.weight };
    const next = editIdx!==null ? inbody.map((r,i)=>i===editIdx?entry:r) : [...inbody,entry].sort((a,b)=>a.date.localeCompare(b.date));
    setInbody(next); save("fit6ib",next); setShowIbForm(false);
  };
  const deleteIb = (i) => { const next=inbody.filter((_,idx)=>idx!==i); setInbody(next); save("fit6ib",next); };
  const saveGoalW= () => { const v=parseFloat(goalWeightInput); if(!isNaN(v)){setSavedGoalWeight(v);save("fit6gw",v);} setShowGoalEdit(false); };

  const swapKey = (dayKey, index) => `${dayKey}_${index}`;
  const resolveKey = (dayKey, index, originalKey) => swaps[swapKey(dayKey, index)] || originalKey;
  const saveLog = (exKey, entry) => {
    const next = { ...prLog, [exKey]: [...(prLog[exKey]||[]).filter(r=>r.date!==entry.date), entry].sort((a,b)=>a.date.localeCompare(b.date)) };
    setPrLog(next); save("fit6log", next); setLogTarget(null);
  };

  const doSwap = (newKey) => {
    if (!swapSlot) return;
    const k = swapKey(swapSlot.dayKey, swapSlot.index);
    const next = { ...swaps };
    if (newKey === swapSlot.originalKey) { delete next[k]; } else { next[k] = newKey; }
    setSwaps(next); save("fit6sw", next); setSwapSlot(null);
  };

  const weekDates = getWeekDates(weekOff);

  // ── 탭 공통 헤더 ──
  return (
    <div style={{ minHeight:"100vh", background:"#f5f5f3", fontFamily:"'Apple SD Gothic Neo','Noto Sans KR',sans-serif", color:"#1a1a1a", maxWidth:480, margin:"0 auto" }}>

      <div style={{ background:"#fff", borderBottom:"1px solid #eee", padding:"20px 22px 0" }}>
        <div style={{ fontSize:11, color:"#999", letterSpacing:1.5, marginBottom:2 }}>MY 6-MONTH PLAN</div>
        <div style={{ fontSize:18, fontWeight:700, marginBottom:1 }}>골격근 33 · 체지방 13 · 목표 {goalW}kg</div>
        <div style={{ fontSize:12, color:"#999", marginBottom:12 }}>
          2026.07.01 → 2026.12.31 &nbsp;·&nbsp;
          {daysPassed<0 ? `D${daysPassed} (7월 1일 시작)` : `D+${daysPassed} / ${totalDays}일`}
        </div>
        <div style={{ height:3, background:"#f0f0f0", borderRadius:2, marginBottom:14 }}>
          <div style={{ height:"100%", background:"#1a1a1a", borderRadius:2, width:`${overallPct}%`, transition:"width .5s" }}/>
        </div>
        <div style={{ display:"flex" }}>
          {[["home","오늘"],["week","주간"],["plan","월별 루틴"],["progress","진행 현황"]].map(([k,l])=>(
            <div key={k} onClick={()=>setTab(k)} style={{
              flex:1, textAlign:"center", padding:"9px 0",
              borderBottom:tab===k?"2px solid #1a1a1a":"2px solid transparent",
              fontSize:12, fontWeight:tab===k?700:400, color:tab===k?"#1a1a1a":"#aaa", cursor:"pointer",
            }}>{l}</div>
          ))}
        </div>
      </div>

      <div style={{ padding:"20px 22px 60px" }}>

        {/* ══ 오늘 ══ */}
        {tab==="home" && (
          <div>
            {daysPassed<0 && (
              <div style={{ background:"#eef5fd", borderRadius:14, padding:"14px 18px", marginBottom:14, textAlign:"center" }}>
                <div style={{ fontSize:13, color:"#4a90d9", fontWeight:700 }}>🗓 7월 1일부터 운동을 시작합니다!</div>
                <div style={{ fontSize:12, color:"#888", marginTop:4 }}>D{daysPassed} · 지금은 식단 준비 기간입니다</div>
              </div>
            )}
            <div style={{ display:"flex", gap:8, marginBottom:14, alignItems:"center" }}>
              <div style={{ background:currentPhase.bg, color:currentPhase.color, borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>
                Phase {currentPhase.phase} · {currentPhase.label}
              </div>
              <div style={{ fontSize:11, color:"#aaa" }}>{currentMonth}개월차</div>
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:"18px", marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:11, color:"#aaa", marginBottom:2 }}>오늘 · {todayDay}요일</div>
                  <div style={{ fontSize:16, fontWeight:700 }}>{todayPlan.part}</div>
                </div>
                <div style={{ background:typeColor[todayPlan.type]||"#ccc", color:"#fff", borderRadius:20, padding:"3px 11px", fontSize:11, fontWeight:700 }}>{todayPlan.type}</div>
              </div>
              {todayPlan.exKeys.length===0 ? (
                <div style={{ textAlign:"center", color:"#bbb", padding:"20px 0", fontSize:14 }}>😴 오늘은 완전 휴식일</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                  {todayPlan.exKeys.map((origKey,i)=>{
                    const resolvedKey = resolveKey(todayKey, i, origKey);
                    const resolvedKeys = todayPlan.exKeys.map((ok,ii)=>resolveKey(todayKey,ii,ok));
                    return (
                      <ExRow key={`${todayKey}_${i}`} exKey={resolvedKey} pKey={currentPhase.pKey}
                        checked={(checks[todayKey]||[]).includes(i)}
                        onToggle={()=>toggleCheck(todayKey,i)}
                        isSwapped={resolvedKey !== origKey}
                        onSwapClick={()=>setSwapSlot({dayKey:todayKey, index:i, exKey:resolvedKey, originalKey:origKey, currentKeys:resolvedKeys, pKey:currentPhase.pKey})}
                        overload={getOverloadStatus(prLog[resolvedKey])}
                        onLogClick={()=>setLogTarget(resolvedKey)}
                      />
                    );
                  })}
                  <div style={{ height:4, background:"#f0f0f0", borderRadius:2, marginTop:4 }}>
                    <div style={{ height:"100%", borderRadius:2, background:"#2d7a4f",
                      width:`${Math.round(((checks[todayKey]||[]).length/todayPlan.exKeys.length)*100)}%`, transition:"width .3s" }}/>
                  </div>
                </div>
              )}
            </div>
            <div style={{ background:currentPhase.bg, borderRadius:12, padding:"12px 16px", fontSize:12, color:currentPhase.color, lineHeight:1.7, marginBottom:12 }}>
              💡 {currentPhase.tip}
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:"16px 18px" }}>
              <div style={{ fontSize:12, fontWeight:700, marginBottom:10 }}>오늘 영양 목표</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
                {[{l:"칼로리",v:currentPhase.meal.kcal,u:"kcal"},{l:"단백질",v:currentPhase.meal.protein,u:"g"},{l:"탄수화물",v:currentPhase.meal.carb,u:"g"},{l:"지방",v:currentPhase.meal.fat,u:"g"}].map(item=>(
                  <div key={item.l} style={{ textAlign:"center", background:"#fafafa", borderRadius:10, padding:"10px 4px" }}>
                    <div style={{ fontSize:10, color:"#aaa", marginBottom:2 }}>{item.l}</div>
                    <div style={{ fontSize:15, fontWeight:700 }}>{item.v}</div>
                    <div style={{ fontSize:10, color:"#bbb" }}>{item.u}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ 주간 ══ */}
        {tab==="week" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <button onClick={()=>setWeekOff(w=>w-1)} style={{ border:"none", background:"#f0f0f0", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>◀</button>
              <div style={{ fontSize:13, fontWeight:700 }}>
                {weekDates[0].getMonth()+1}/{weekDates[0].getDate()} — {weekDates[6].getMonth()+1}/{weekDates[6].getDate()}
              </div>
              <button onClick={()=>setWeekOff(w=>w+1)} style={{ border:"none", background:"#f0f0f0", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>▶</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {weekDates.map((d)=>{
                const dName= DAY_NAMES[d.getDay()];
                const dKey = dateKey(d);
                const msSinceStart = d - START_DATE;
                const beforeStart  = msSinceStart < 0;
                const mN = beforeStart ? 1 : Math.max(1,Math.min(GOAL_MONTHS, Math.floor(msSinceStart/(86400000*30.5))+1));
                const ph = getPhaseByMonth(mN);
                const plan= beforeStart
                  ? {type:"준비", part:"운동 준비 기간", exKeys:[]}
                  : ph.weeklyPlan[dName]||{type:"휴식",part:"완전 휴식",exKeys:[]};
                const done=(checks[dKey]||[]).length;
                const total=plan.exKeys.length;
                const isToday=dKey===todayKey;
                return (
                  <div key={dKey} style={{ background:"#fff", borderRadius:14, padding:"14px 16px", border:isToday?"1.5px solid #1a1a1a":"1.5px solid transparent" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36,height:36,borderRadius:"50%",flexShrink:0, background:isToday?"#1a1a1a":"#f5f5f3", color:isToday?"#fff":"#555", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                        <div style={{ fontSize:9,lineHeight:1 }}>{dName}</div>
                        <div style={{ fontSize:13,fontWeight:700,lineHeight:1.3 }}>{d.getDate()}</div>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ fontSize:13,fontWeight:600 }}>{plan.part}</div>
                          <div style={{ fontSize:10, background:typeColor[plan.type]||"#ccc", color:"#fff", borderRadius:10, padding:"1px 7px" }}>{plan.type}</div>
                        </div>
                        {total>0 && <div style={{ fontSize:11,color:"#bbb",marginTop:1 }}>{done}/{total} 완료</div>}
                      </div>
                      {total>0 && <div style={{ fontSize:12,fontWeight:700,color:done===total?"#2d7a4f":"#ccc" }}>{done===total?"✓":`${Math.round(done/total*100)}%`}</div>}
                    </div>
                    {isToday && plan.exKeys.length>0 && (
                      <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:7 }}>
                        {plan.exKeys.map((origKey,i)=>{
                          const resolvedKey = resolveKey(dKey,i,origKey);
                          const resolvedKeys = plan.exKeys.map((ok,ii)=>resolveKey(dKey,ii,ok));
                          return (
                            <ExRow key={`${dKey}_${i}`} exKey={resolvedKey} pKey={ph.pKey}
                              checked={(checks[dKey]||[]).includes(i)}
                              onToggle={()=>toggleCheck(dKey,i)}
                              isSwapped={resolvedKey !== origKey}
                              onSwapClick={()=>setSwapSlot({dayKey:dKey, index:i, exKey:resolvedKey, originalKey:origKey, currentKeys:resolvedKeys, pKey:ph.pKey})}
                              overload={getOverloadStatus(prLog[resolvedKey])}
                              onLogClick={()=>setLogTarget(resolvedKey)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ 월별 루틴 ══ */}
        {tab==="plan" && (
          <div>
            <div style={{ display:"flex", gap:6, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
              {Array.from({length:6},(_,i)=>i+1).map(m=>{
                const ph=getPhaseByMonth(m);
                return (
                  <button key={m} onClick={()=>setSelMonth(m)} style={{
                    flexShrink:0, border:"none", borderRadius:20, padding:"6px 14px",
                    fontSize:12, cursor:"pointer", fontWeight:selMonth===m?700:400,
                    background:selMonth===m?ph.color:"#f0f0f0", color:selMonth===m?"#fff":"#555", transition:"all .2s",
                  }}>{m}개월 · {getMonthLabel(m)}</button>
                );
              })}
            </div>
            {(()=>{
              const ph=getPhaseByMonth(selMonth);
              return (
                <div>
                  <div style={{ background:ph.bg, borderRadius:14, padding:"14px 16px", marginBottom:14 }}>
                    <div style={{ fontSize:11, color:ph.color, fontWeight:700, marginBottom:2 }}>Phase {ph.phase} · {selMonth}개월차</div>
                    <div style={{ fontSize:16, fontWeight:700, color:"#1a1a1a", marginBottom:4 }}>{ph.label}</div>
                    <div style={{ fontSize:12, color:"#555" }}>🎯 {ph.focus}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                    {DAY_NAMES.map(day=>{
                      const plan=ph.weeklyPlan[day]||{type:"휴식",part:"완전 휴식",exKeys:[]};
                      return (
                        <div key={day} style={{ background:"#fff", borderRadius:12, padding:"12px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:plan.exKeys.length?10:0 }}>
                            <div style={{ width:28,height:28,borderRadius:"50%",background:"#f5f5f3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#555",flexShrink:0 }}>{day}</div>
                            <div style={{ flex:1,fontSize:13,fontWeight:600 }}>{plan.part}</div>
                            <div style={{ fontSize:11, background:typeColor[plan.type]||"#ccc", color:"#fff", borderRadius:10, padding:"2px 8px" }}>{plan.type}</div>
                          </div>
                          {plan.exKeys.length>0 && (
                            <div style={{ display:"flex", flexDirection:"column", gap:6, paddingLeft:36 }}>
                              {plan.exKeys.map((k)=>{
                                const ex=EX[k]; const sets=ex?.sets?.[ph.pKey]; const tw=ex?.tw?.[ph.pKey]; const link=ytLink(k);
                                return (
                                  <div key={k} style={{ display:"flex", alignItems:"center", gap:6, padding:"4px 0", borderBottom:"1px solid #f5f5f5" }}>
                                    <div style={{ flex:1 }}>
                                      <span style={{ fontSize:12, color:"#333" }}>{exName(k)}</span>
                                      {sets && <span style={{ fontSize:11, color:"#aaa", marginLeft:6 }}>{sets}</span>}
                                      {tw && <span style={{ fontSize:11, color:"#4a90d9", marginLeft:6 }}>· {tw}</span>}
                                    </div>
                                    {link && (
                                      <a href={link} target="_blank" rel="noreferrer" style={{ fontSize:10, color:"#c0392b", background:"#fee", borderRadius:8, padding:"1px 6px", textDecoration:"none", flexShrink:0 }}>▶ 영상</a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ background:"#fff", borderRadius:12, padding:"14px 16px", marginBottom:10 }}>
                    <div style={{ fontSize:12, fontWeight:700, marginBottom:10 }}>영양 목표</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
                      {[{l:"칼로리",v:ph.meal.kcal,u:"kcal"},{l:"단백질",v:ph.meal.protein,u:"g"},{l:"탄수화물",v:ph.meal.carb,u:"g"},{l:"지방",v:ph.meal.fat,u:"g"}].map(item=>(
                        <div key={item.l} style={{ textAlign:"center", background:"#fafafa", borderRadius:8, padding:"8px 4px" }}>
                          <div style={{ fontSize:10, color:"#aaa" }}>{item.l}</div>
                          <div style={{ fontSize:14, fontWeight:700 }}>{item.v}</div>
                          <div style={{ fontSize:10, color:"#bbb" }}>{item.u}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background:ph.bg, borderRadius:10, padding:"10px 14px", fontSize:12, color:ph.color }}>💡 {ph.tip}</div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══ 진행 현황 ══ */}
        {tab==="progress" && (
          <div>
            <div style={{ background:"#fff", borderRadius:16, padding:"18px", marginBottom:12 }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:14 }}>목표 달성률</div>
              {/* 체중 */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                  <div style={{ fontSize:12, fontWeight:600 }}>체중</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ fontSize:12, color:"#aaa" }}>
                      현재 <b style={{ color:"#1a1a1a" }}>{latestIb.weight}kg</b> → 목표 <b style={{ color:"#4a90d9" }}>{goalW}kg</b>
                    </div>
                    <button onClick={()=>{setGoalWeightInput(String(goalW));setShowGoalEdit(true);}} style={{ border:"1px solid #ddd", background:"#fafafa", borderRadius:6, padding:"2px 8px", fontSize:10, cursor:"pointer", color:"#666" }}>수정</button>
                  </div>
                </div>
                <ProgressBar pct={wPct} color="#4a90d9"/>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                  <div style={{ fontSize:11, color:"#aaa" }}>{wPct}% 달성</div>
                  {wGap>0 ? <div style={{ fontSize:12, fontWeight:700, color:"#c0392b" }}>목표까지 -{wGap}kg 남음</div>
                           : <div style={{ fontSize:12, fontWeight:700, color:"#2d7a4f" }}>🎉 목표 달성!</div>}
                </div>
              </div>
              {/* 골격근 */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ fontSize:12, fontWeight:600 }}>골격근</div>
                  <div style={{ fontSize:12, color:"#aaa" }}>현재 <b style={{ color:"#2d7a4f" }}>{latestIb.muscle}kg</b> → 목표 <b>{MUSCLE_GOAL}kg</b></div>
                </div>
                <ProgressBar pct={musclePct} color="#2d7a4f"/>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                  <div style={{ fontSize:11, color:"#aaa" }}>{Math.min(100,musclePct)}% 달성</div>
                  {latestIb.muscle<MUSCLE_GOAL ? <div style={{ fontSize:12, fontWeight:700, color:"#888" }}>+{(MUSCLE_GOAL-latestIb.muscle).toFixed(1)}kg 필요</div>
                                               : <div style={{ fontSize:12, fontWeight:700, color:"#2d7a4f" }}>🎉 목표 달성!</div>}
                </div>
              </div>
              {/* 체지방 */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ fontSize:12, fontWeight:600 }}>체지방</div>
                  <div style={{ fontSize:12, color:"#aaa" }}>현재 <b style={{ color:"#c0392b" }}>{latestIb.fat}kg</b> → 목표 <b>{FAT_GOAL}kg</b></div>
                </div>
                <ProgressBar pct={fatPct} color="#c0392b"/>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                  <div style={{ fontSize:11, color:"#aaa" }}>{Math.min(100,fatPct)}% 달성</div>
                  {latestIb.fat>FAT_GOAL ? <div style={{ fontSize:12, fontWeight:700, color:"#888" }}>-{(latestIb.fat-FAT_GOAL).toFixed(1)}kg 필요</div>
                                         : <div style={{ fontSize:12, fontWeight:700, color:"#2d7a4f" }}>🎉 목표 달성!</div>}
                </div>
              </div>
              {/* 기간 */}
              <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <div style={{ fontSize:12, fontWeight:600 }}>기간 진행</div>
                  <div style={{ fontSize:12, color:"#aaa" }}>{daysPassed<0?`D${daysPassed}`:`D+${daysPassed}`} / {totalDays}일</div>
                </div>
                <ProgressBar pct={overallPct} color="#1a1a1a"/>
                <div style={{ fontSize:11, color:"#bbb", marginTop:3, textAlign:"right" }}>{overallPct}% 경과</div>
              </div>
            </div>

            {/* 인바디 기록 */}
            <div style={{ background:"#fff", borderRadius:16, padding:"18px", marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:700 }}>인바디 기록</div>
                <button onClick={openNew} style={{ border:"none", background:"#1a1a1a", color:"#fff", borderRadius:20, padding:"5px 14px", fontSize:11, cursor:"pointer", fontWeight:600 }}>+ 기록 추가</button>
              </div>
              {showIbForm && (
                <div style={{ background:"#fafafa", borderRadius:12, padding:"14px", marginBottom:12 }}>
                  {editIdx===null && inbody.length===0 && (
                    <div style={{ fontSize:11, color:"#4a90d9", marginBottom:8 }}>※ 첫 기록이 기준 수치가 됩니다</div>
                  )}
                  <div style={{ marginBottom:10 }}>
                    <div style={{ fontSize:10, color:"#aaa", marginBottom:4 }}>측정일</div>
                    <input type="date" value={ibForm.date} onChange={e=>setIbForm(f=>({...f,date:e.target.value}))}
                      style={{ width:"100%", border:"1px solid #e0e0e0", borderRadius:8, padding:"8px", fontSize:13, boxSizing:"border-box", background:"#fff", outline:"none" }}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
                    {[["체중(kg)","weight","70.3"],["골격근(kg)","muscle","31.0"],["체지방(kg)","fat","15.4"]].map(([l,k,ph])=>(
                      <div key={k}>
                        <div style={{ fontSize:10, color:"#aaa", marginBottom:4 }}>{l}</div>
                        <input type="number" step="0.1" value={ibForm[k]} placeholder={ph}
                          onChange={e=>setIbForm(f=>({...f,[k]:e.target.value}))}
                          style={{ width:"100%", border:"1px solid #e0e0e0", borderRadius:8, padding:"8px", fontSize:13, boxSizing:"border-box", background:"#fff", outline:"none" }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={saveIb} style={{ flex:1, background:"#2d7a4f", color:"#fff", border:"none", borderRadius:10, padding:"10px", fontSize:13, fontWeight:700, cursor:"pointer" }}>저장</button>
                    <button onClick={()=>setShowIbForm(false)} style={{ flex:1, background:"#f0f0f0", color:"#555", border:"none", borderRadius:10, padding:"10px", fontSize:13, cursor:"pointer" }}>취소</button>
                  </div>
                </div>
              )}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {inbody.length===0 ? (
                  <div style={{ textAlign:"center", color:"#ccc", padding:"16px 0", fontSize:13 }}>첫 인바디 측정 후 기록해주세요</div>
                ) : (
                  [{date:"기준", muscle:firstIb.muscle, fat:firstIb.fat, weight:firstIb.weight, isBase:true}, ...inbody].map((rec,i)=>{
                    const isBase=rec.isBase;
                    const prev=i>0?(i===1?firstIb:inbody[i-2]):null;
                    const wD=prev?parseFloat((rec.weight-prev.weight).toFixed(1)):null;
                    const mD=prev?parseFloat((rec.muscle-prev.muscle).toFixed(1)):null;
                    const fD=prev?parseFloat((rec.fat-prev.fat).toFixed(1)):null;
                    return (
                      <div key={i} style={{ padding:"11px 12px", background:isBase?"#f5f5f3":"#fafafa", borderRadius:10, border:isBase?"1px solid #e0e0e0":"none" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ fontSize:11, color:"#aaa", width:52, flexShrink:0, fontWeight:isBase?700:400 }}>{isBase?"기준":rec.date.slice(5)}</div>
                          <div style={{ flex:1, display:"flex", gap:8 }}>
                            {[{l:"체중",v:rec.weight,c:"#555",d:wD,good:v=>v<0},{l:"골격근",v:rec.muscle,c:"#2d7a4f",d:mD,good:v=>v>0},{l:"체지방",v:rec.fat,c:"#c0392b",d:fD,good:v=>v<0}].map(item=>(
                              <div key={item.l} style={{ flex:1, textAlign:"center" }}>
                                <div style={{ fontSize:10, color:"#aaa" }}>{item.l}</div>
                                <div style={{ fontSize:13, fontWeight:700, color:item.c }}>{item.v}</div>
                                {item.d!==null && item.d!==0 && <div style={{ fontSize:10, color:item.good(item.d)?"#2d7a4f":"#c0392b" }}>{item.d>0?"+":""}{item.d}</div>}
                              </div>
                            ))}
                          </div>
                          {!isBase && (
                            <div style={{ display:"flex", gap:6 }}>
                              <button onClick={()=>openEdit(i-1)} style={{ border:"1px solid #e0e0e0", background:"#fff", borderRadius:6, padding:"3px 8px", fontSize:10, cursor:"pointer", color:"#555" }}>수정</button>
                              <button onClick={()=>deleteIb(i-1)} style={{ border:"none", background:"#fee", borderRadius:6, padding:"3px 8px", fontSize:10, cursor:"pointer", color:"#c0392b" }}>삭제</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 로드맵 */}
            <div style={{ background:"#fff", borderRadius:16, padding:"18px" }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>6개월 로드맵</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {PHASE_INFO.map(ph=>(
                  <div key={ph.phase} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <div style={{ width:24,height:24,borderRadius:"50%",background:ph.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:700,marginTop:2 }}>{ph.phase}</div>
                    <div style={{ flex:1, background:ph.bg, borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ fontSize:12, fontWeight:700, color:ph.color }}>{ph.months[0]}~{ph.months[1]}개월 · {ph.label}</div>
                      <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{ph.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 기록 입력 시트 */}
      {logTarget && (
        <LogSheet
          exKey={logTarget}
          records={prLog[logTarget]||[]}
          onSave={(entry)=>saveLog(logTarget,entry)}
          onClose={()=>setLogTarget(null)}
        />
      )}

      {/* 운동 교체 시트 */}
      {swapSlot && (
        <SwapSheet
          slot={swapSlot}
          pKey={swapSlot.pKey}
          currentKeys={swapSlot.currentKeys}
          onSelect={doSwap}
          onClose={()=>setSwapSlot(null)}
        />
      )}

      {/* 목표 체중 수정 모달 */}
      {showGoalEdit && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:24 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:"24px", width:"100%", maxWidth:320 }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:6 }}>목표 체중 수정</div>
            <div style={{ fontSize:12, color:"#aaa", marginBottom:16 }}>현재 기준: {firstIb.weight}kg<br/>목표가 어려우면 현실적으로 조정하세요 💪</div>
            <input type="number" step="0.1" value={goalWeightInput} onChange={e=>setGoalWeightInput(e.target.value)}
              style={{ width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"12px", fontSize:16, boxSizing:"border-box", outline:"none", textAlign:"center", marginBottom:14 }}/>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={saveGoalW} style={{ flex:1, background:"#1a1a1a", color:"#fff", border:"none", borderRadius:10, padding:"12px", fontSize:14, fontWeight:700, cursor:"pointer" }}>저장</button>
              <button onClick={()=>setShowGoalEdit(false)} style={{ flex:1, background:"#f0f0f0", color:"#555", border:"none", borderRadius:10, padding:"12px", fontSize:14, cursor:"pointer" }}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
