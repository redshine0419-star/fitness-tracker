import { useState } from "react";

// ── 날짜 상수 ─────────────────────────────────────────────
const START_DATE  = new Date(2026, 6, 1);
const GOAL_END    = new Date(2026, 11, 31);
const GOAL_MONTHS = 6;

const DEFAULT_INITIAL = { muscle:31.0, fat:15.4, weight:70.3 };
const MUSCLE_GOAL = 33.0;
const FAT_GOAL    = 13.0;

const EX = {
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

const GROUPS = {
  "가슴·삼두": ["푸시업","덤벨벤치프레스","덤벨플라이","트라이셉스딥","바벨벤치프레스","인클라인덤벨프레스","케이블플라이","클로즈그립벤치","인클라인푸시업","케이블트라이셉스","딥스"],
  "등·이두":   ["랫풀다운","시티드케이블로우","덤벨컬","페이스풀","바벨로우","풀업","해머컬","리버스플라이","시티드로우","케이블컬"],
  "하체":      ["고블릿스쿼트","레그프레스","런지","바벨스쿼트","루마니안데드리프트","레그컬"],
  "어깨":      ["덤벨숄더프레스","사이드레터럴","바벨숄더프레스","업라이트로우","숄더프레스","사이드레터럴고반복"],
  "코어":      ["플랭크","케이블우드찹","레그레이즈","버드독"],
  "유산소":    ["유산소기초","HIIT인터벌","저강도유산소","타바타","파워워킹","전신서킷","전신스트레칭"],
};
const EX_GROUP = {};
Object.entries(GROUPS).forEach(([g,keys])=>keys.forEach(k=>{EX_GROUP[k]=g;}));

const PHASE_INFO = [
  {
    phase:1, months:[1,2], label:"기초 적응기", color:"#4a90d9", bg:"#eef5fd",
    focus:"자세 교정 + 근신경 활성화", pKey:"p1",
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
    focus:"근비대 자극 + 강도 점진적 증가", pKey:"p2",
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
    focus:"체지방 감량 + 근육 선명도 향상", pKey:"p3",
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
const typeColor = { 근력:"#2d7a4f", 유산소:"#4a90d9", HIIT:"#e74c3c", 회복:"#8e44ad", 복합:"#e67e22", 휴식:"#bbb", 준비:"#bbb" };

// ── 헬퍼 ────────────────────────────────────────────────
function getPhaseByMonth(m) { return PHASE_INFO.find(p=>p.months.includes(m))||PHASE_INFO[0]; }
function getMonthLabel(m) {
  const d = new Date(START_DATE); d.setMonth(d.getMonth()+m-1);
  return `${d.getMonth()+1}월`;
}
function dateKey(d) { return d.toISOString().slice(0,10); }
function getDaysPassed() {
  const now = new Date(); now.setHours(0,0,0,0);
  return Math.floor((now - new Date(START_DATE)) / 86400000);
}
function getTotalDays() { return Math.floor((GOAL_END - START_DATE)/86400000); }
function getElapsedMonths() {
  const now = new Date();
  const diff = (now.getFullYear()-START_DATE.getFullYear())*12+(now.getMonth()-START_DATE.getMonth());
  return Math.max(0, Math.min(diff, GOAL_MONTHS-1));
}
function getWeekDates(offset) {
  const today = new Date(); today.setHours(0,0,0,0);
  const sun = new Date(today); sun.setDate(today.getDate() - today.getDay() + offset*7);
  return Array.from({length:7},(_,i)=>{ const d=new Date(sun); d.setDate(sun.getDate()+i); return d; });
}
function getInitialWeekOffset() {
  const today = new Date(); today.setHours(0,0,0,0);
  const todaySun = new Date(today); todaySun.setDate(today.getDate()-today.getDay());
  const startSun = new Date(START_DATE); startSun.setDate(START_DATE.getDate()-START_DATE.getDay());
  return Math.round((startSun - todaySun) / (7*86400000));
}
function exName(key) {
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
function load(k,d){ try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;} }
function save(k,v){ try{localStorage.setItem(k,JSON.stringify(v));}catch{} }

// ── 점진적 과부하 ────────────────────────────────────────
const CARDIO_KEYS    = new Set(["유산소기초","HIIT인터벌","저강도유산소","타바타","파워워킹","전신서킷","전신스트레칭","플랭크"]);
const BODYWEIGHT_KEYS= new Set(["푸시업","인클라인푸시업","트라이셉스딥","딥스","풀업","레그레이즈","버드독"]);
function isCardio(key) { return CARDIO_KEYS.has(key); }
function isBodyweight(key) { return BODYWEIGHT_KEYS.has(key); }

function getOverloadStatus(records) {
  if (!records || records.length===0) return null;
  const sorted = [...records].sort((a,b)=>a.date.localeCompare(b.date));
  const last = sorted[sorted.length-1];
  const allWeights = sorted.map(r=>r.weight||0);
  const maxWeight = Math.max(...allWeights);
  const isPR = (last.weight||0) >= maxWeight && sorted.length > 1;
  let streak = 1;
  for (let i=sorted.length-2;i>=0;i--) {
    const a=sorted[i],b=sorted[i+1];
    if (a.weight===b.weight && a.reps===b.reps) streak++; else break;
  }
  let trend = null;
  if (sorted.length >= 2) {
    const prev = sorted[sorted.length-2];
    const wDiff = (last.weight||0)-(prev.weight||0);
    const rDiff = (last.reps||0)-(prev.reps||0);
    if (wDiff>0||(wDiff===0&&rDiff>0)) trend="up";
    else if (wDiff<0||rDiff<0) trend="down";
    else trend="same";
  }
  return { last, isPR: isPR&&trend==="up", shouldIncrease: streak>=3, trend, streak };
}

// ── 공통 UI ─────────────────────────────────────────────
function ProgressBar({ pct, color, height=6 }) {
  return (
    <div style={{ height, background:"#f0f0f0", borderRadius:99 }}>
      <div style={{ height:"100%", borderRadius:99, background:color, width:`${Math.max(0,Math.min(100,pct))}%`, transition:"width .5s" }}/>
    </div>
  );
}

function Badge({ children, color="#555", bg="#f0f0f0" }) {
  return (
    <span style={{ fontSize:10, color, background:bg, borderRadius:99, padding:"2px 7px", fontWeight:600, lineHeight:"18px", whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
}

// ── 운동 행 ─────────────────────────────────────────────
function ExRow({ exKey, pKey, checked, onToggle, onSwapClick, isSwapped, overload, onLogClick }) {
  const ex     = EX[exKey];
  const sets   = ex?.sets?.[pKey] || "";
  const tw     = ex?.tw?.[pKey] || null;
  const name   = exName(exKey);
  const link   = ytLink(exKey);
  const group  = EX_GROUP[exKey];
  const cardio = isCardio(exKey);

  const trendIcon  = overload?.trend==="up" ? "↑" : overload?.trend==="down" ? "↓" : overload?.trend==="same" ? "→" : null;
  const trendColor = overload?.trend==="up" ? "#2d7a4f" : overload?.trend==="down" ? "#e74c3c" : "#999";
  const lastLabel  = overload?.last
    ? cardio ? `${overload.last.duration}분`
      : isBodyweight(exKey) ? `${overload.last.sets}×${overload.last.reps}회`
      : `${overload.last.weight}kg×${overload.last.reps}회`
    : null;

  return (
    <div style={{
      background: checked ? "#f0faf5" : "#fff",
      border: `1.5px solid ${checked ? "#b6e5cc" : isSwapped ? "#c5dcf5" : "#f0f0f0"}`,
      borderRadius: 16,
      padding: "14px 14px 14px 12px",
      transition: "all .15s",
    }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        {/* 체크 버튼 - 터치 영역 확보 */}
        <button
          onClick={onToggle}
          style={{
            width:28, height:28, borderRadius:"50%", flexShrink:0, border:"none",
            background: checked ? "#2d7a4f" : "#e8e8e8",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", marginTop:1, WebkitTapHighlightColor:"transparent",
          }}
        >
          {checked && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* 내용 */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:4 }}>
            <span
              onClick={onToggle}
              style={{ fontSize:15, fontWeight:600, color: checked?"#aaa":"#111", textDecoration: checked?"line-through":"none", cursor:"pointer", lineHeight:1.3 }}
            >
              {name}
            </span>
            {overload?.isPR && <Badge color="#9a6b1a" bg="#fdf0d8">🏆 PR</Badge>}
            {overload?.shouldIncrease && !overload?.isPR && <Badge color="#c0392b" bg="#fde8e8">무게 올릴 때!</Badge>}
            {isSwapped && <Badge color="#2563b0" bg="#dbeafe">교체됨</Badge>}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            {sets && <span style={{ fontSize:12, color:"#888" }}>{sets}</span>}
            {tw   && <span style={{ fontSize:12, color:"#4a90d9", fontWeight:500 }}>· {tw}</span>}
            {lastLabel && (
              <span style={{ fontSize:12, color:trendColor, fontWeight:600 }}>
                {trendIcon} 지난번 {lastLabel}
              </span>
            )}
          </div>
        </div>

        {/* 액션 버튼 묶음 */}
        <div style={{ display:"flex", flexDirection:"column", gap:5, flexShrink:0 }}>
          {onLogClick && (
            <button onClick={onLogClick} style={{
              height:30, border:`1.5px solid ${overload?.last?"#2d7a4f":"#d0d0d0"}`,
              background: overload?.last?"#eaf7f0":"#fafafa",
              borderRadius:10, padding:"0 10px", fontSize:11, cursor:"pointer",
              color: overload?.last?"#2d7a4f":"#888", fontWeight:600,
              WebkitTapHighlightColor:"transparent",
            }}>📝 기록</button>
          )}
          <div style={{ display:"flex", gap:5 }}>
            {link && (
              <a href={link} target="_blank" rel="noreferrer" style={{
                height:30, display:"flex", alignItems:"center",
                border:"1.5px solid #f0d0d0", background:"#fff8f8",
                borderRadius:10, padding:"0 8px", fontSize:11,
                color:"#c0392b", textDecoration:"none", fontWeight:600,
                WebkitTapHighlightColor:"transparent",
              }}>▶</a>
            )}
            {group && onSwapClick && (
              <button onClick={onSwapClick} style={{
                height:30, border:"1.5px solid #e0e0e0", background:"#fafafa",
                borderRadius:10, padding:"0 10px", fontSize:11, cursor:"pointer",
                color:"#666", WebkitTapHighlightColor:"transparent",
              }}>교체</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 운동 기록 시트 ───────────────────────────────────────
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
        : { weight: bodyweight?0:(parseFloat(weight)||0), reps: parseInt(reps)||0, sets: parseInt(sets)||0 }),
    };
    onSave(entry);
  };

  const inputStyle = {
    width:"100%", border:"1.5px solid #e8e8e8", borderRadius:12,
    padding:"14px 10px", fontSize:16, boxSizing:"border-box",
    outline:"none", textAlign:"center", background:"#fafafa",
    WebkitAppearance:"none",
  };
  const labelStyle = { fontSize:11, color:"#999", marginBottom:6, fontWeight:500 };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1001 }}
      onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"0 20px", paddingBottom:"max(24px, env(safe-area-inset-bottom))", width:"100%", maxWidth:480 }}
        onClick={e=>e.stopPropagation()}>
        {/* 드래그 핸들 */}
        <div style={{ display:"flex", justifyContent:"center", paddingTop:12, paddingBottom:8 }}>
          <div style={{ width:36, height:4, background:"#e0e0e0", borderRadius:99 }}/>
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontSize:17, fontWeight:700 }}>{exName(exKey)} 기록</div>
          <button onClick={onClose} style={{ width:32, height:32, border:"none", background:"#f0f0f0", borderRadius:"50%", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>

        {sorted.length > 0 && (
          <div style={{ background:"#f8f8f8", borderRadius:14, padding:"12px 14px", marginBottom:16 }}>
            <div style={{ fontSize:11, color:"#aaa", fontWeight:600, marginBottom:8, letterSpacing:0.5 }}>이전 기록</div>
            {sorted.slice(-3).reverse().map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom: i<2?6:0 }}>
                <span style={{ fontSize:13, color: i===0?"#555":"#bbb" }}>{r.date.slice(5)}</span>
                <span style={{ fontSize:13, fontWeight: i===0?700:400, color: i===0?"#111":"#bbb" }}>
                  {cardio ? `${r.duration}분`
                    : bodyweight ? `${r.sets}세트 × ${r.reps}회`
                    : `${r.weight}kg × ${r.reps}회 × ${r.sets}세트`}
                </span>
              </div>
            ))}
          </div>
        )}

        {cardio ? (
          <div style={{ marginBottom:16 }}>
            <div style={labelStyle}>운동 시간 (분)</div>
            <input type="number" inputMode="decimal" value={duration} onChange={e=>setDuration(e.target.value)} placeholder="35" style={inputStyle}/>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns: bodyweight?"1fr 1fr":"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
            {!bodyweight && (
              <div>
                <div style={labelStyle}>무게 (kg)</div>
                <input type="number" inputMode="decimal" step="0.5" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="0" style={inputStyle}/>
              </div>
            )}
            <div>
              <div style={labelStyle}>횟수 (회)</div>
              <input type="number" inputMode="numeric" value={reps} onChange={e=>setReps(e.target.value)} placeholder="0" style={inputStyle}/>
            </div>
            <div>
              <div style={labelStyle}>세트</div>
              <input type="number" inputMode="numeric" value={sets} onChange={e=>setSets(e.target.value)} placeholder="3" style={inputStyle}/>
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{
          width:"100%", background:"#111", color:"#fff", border:"none",
          borderRadius:14, padding:"16px", fontSize:16, fontWeight:700, cursor:"pointer",
        }}>
          저장
        </button>
      </div>
    </div>
  );
}

// ── 운동 교체 시트 ───────────────────────────────────────
function SwapSheet({ slot, pKey, currentKeys, onSelect, onClose }) {
  const group = EX_GROUP[slot.exKey];
  const candidates = group ? GROUPS[group] : [];
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000 }}
      onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"0 16px", paddingBottom:"max(24px, env(safe-area-inset-bottom))", width:"100%", maxWidth:480 }}
        onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"center", paddingTop:12, paddingBottom:8 }}>
          <div style={{ width:36, height:4, background:"#e0e0e0", borderRadius:99 }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <div style={{ fontSize:17, fontWeight:700 }}>{group} 교체</div>
          <button onClick={onClose} style={{ width:32, height:32, border:"none", background:"#f0f0f0", borderRadius:"50%", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ fontSize:12, color:"#aaa", marginBottom:14 }}>같은 부위 운동으로 바꿀 수 있어요</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:"55vh", overflowY:"auto", paddingBottom:4 }}>
          {candidates.map(k=>{
            const isCurrent = k===slot.exKey;
            const isInPlan  = currentKeys.includes(k) && !isCurrent;
            const ex=EX[k];
            const sets=ex?.sets?.[pKey]||ex?.sets?.p1||ex?.sets?.p2||ex?.sets?.p3||"";
            const tw=ex?.tw?.[pKey]||ex?.tw?.p1||ex?.tw?.p2||ex?.tw?.p3||null;
            const link=ytLink(k);
            return (
              <div key={k} onClick={()=>!isInPlan&&onSelect(k)} style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"13px 14px", borderRadius:14,
                background: isCurrent?"#f0faf5":"#fafafa",
                border:`1.5px solid ${isCurrent?"#2d7a4f":isInPlan?"#f0f0f0":"#ebebeb"}`,
                cursor: isInPlan?"default":"pointer",
                opacity: isInPlan?0.4:1,
                WebkitTapHighlightColor:"transparent",
              }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
                    <span style={{ fontSize:14, fontWeight:600, color:"#111" }}>{exName(k)}</span>
                    {isCurrent && <Badge color="#2d7a4f" bg="#eaf7f0">현재</Badge>}
                    {isInPlan  && <Badge color="#aaa" bg="#f5f5f5">이미 포함</Badge>}
                  </div>
                  <div style={{ fontSize:12, color:"#aaa" }}>
                    {sets && <span>{sets}</span>}
                    {tw && <span style={{ color:"#4a90d9", marginLeft:6 }}>· {tw}</span>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  {link && (
                    <a href={link} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{
                      fontSize:11, color:"#c0392b", background:"#fde8e8", borderRadius:8,
                      padding:"3px 8px", textDecoration:"none", fontWeight:600,
                    }}>▶</a>
                  )}
                  {!isCurrent && !isInPlan && <span style={{ fontSize:20, color:"#ccc" }}>›</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 하단 네비 아이콘 ─────────────────────────────────────
function NavIcon({ id, active }) {
  const color = active ? "#111" : "#bbb";
  if (id==="home") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <polyline points="9 21 9 12 15 12 15 21"/>
    </svg>
  );
  if (id==="week") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2.5"/><line x1="12" y1="14" x2="12" y2="14" strokeWidth="2.5"/><line x1="16" y1="14" x2="16" y2="14" strokeWidth="2.5"/>
    </svg>
  );
  if (id==="plan") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  );
  if (id==="progress") return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
  return null;
}

// ── 메인 ────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("home");
  const [checks, setChecks]     = useState(()=>load("fit6c",{}));
  const [inbody, setInbody]     = useState(()=>load("fit6ib",[]));
  const [selMonth, setSelMonth] = useState(getElapsedMonths()+1);
  const [weekOff, setWeekOff]   = useState(getInitialWeekOffset);
  const [showIbForm, setShowIbForm]   = useState(false);
  const [editIdx, setEditIdx]         = useState(null);
  const [ibForm, setIbForm]           = useState({date:"",muscle:"",fat:"",weight:""});
  const [showGoalEdit, setShowGoalEdit]     = useState(false);
  const [goalWeightInput, setGoalWeightInput] = useState("");
  const [savedGoalWeight, setSavedGoalWeight] = useState(()=>load("fit6gw",null));
  const [swaps, setSwaps]       = useState(()=>load("fit6sw",{}));
  const [swapSlot, setSwapSlot] = useState(null);
  const [prLog, setPrLog]       = useState(()=>load("fit6log",{}));
  const [logTarget, setLogTarget] = useState(null);

  const today        = new Date();
  const todayKey     = dateKey(today);
  const todayDay     = DAY_NAMES[today.getDay()];
  const daysPassed   = getDaysPassed();
  const totalDays    = getTotalDays();
  const overallPct   = Math.min(100, Math.max(0, Math.round(daysPassed/totalDays*100)));
  const currentMonth = Math.max(1, getElapsedMonths()+1);
  const currentPhase = getPhaseByMonth(currentMonth);
  const todayPlan    = currentPhase.weeklyPlan[todayDay]||{type:"휴식",part:"완전 휴식",exKeys:[]};

  const firstIb  = inbody[0] || DEFAULT_INITIAL;
  const latestIb = inbody.length>0 ? inbody[inbody.length-1] : DEFAULT_INITIAL;
  const goalW    = savedGoalWeight!==null ? savedGoalWeight : parseFloat((firstIb.weight-2.3).toFixed(1));
  const wGap     = parseFloat((latestIb.weight-goalW).toFixed(1));
  const musclePct= Math.round(Math.max(0,(latestIb.muscle-firstIb.muscle)/(MUSCLE_GOAL-firstIb.muscle)*100));
  const fatPct   = Math.round(Math.max(0,(firstIb.fat-latestIb.fat)/(firstIb.fat-FAT_GOAL)*100));
  const wPct     = latestIb.weight<=goalW?100:Math.round(Math.max(0,(firstIb.weight-latestIb.weight)/(firstIb.weight-goalW)*100));

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
  const deleteIb  = (i) => { const next=inbody.filter((_,idx)=>idx!==i); setInbody(next); save("fit6ib",next); };
  const saveGoalW = () => { const v=parseFloat(goalWeightInput); if(!isNaN(v)){setSavedGoalWeight(v);save("fit6gw",v);} setShowGoalEdit(false); };
  const swapKey    = (dayKey, index) => `${dayKey}_${index}`;
  const resolveKey = (dayKey, index, origKey) => swaps[swapKey(dayKey,index)] || origKey;
  const saveLog    = (exKey, entry) => {
    const next = { ...prLog, [exKey]: [...(prLog[exKey]||[]).filter(r=>r.date!==entry.date), entry].sort((a,b)=>a.date.localeCompare(b.date)) };
    setPrLog(next); save("fit6log",next); setLogTarget(null);
  };
  const doSwap = (newKey) => {
    if (!swapSlot) return;
    const k = swapKey(swapSlot.dayKey, swapSlot.index);
    const next = {...swaps};
    if (newKey===swapSlot.originalKey) delete next[k]; else next[k]=newKey;
    setSwaps(next); save("fit6sw",next); setSwapSlot(null);
  };

  const weekDates = getWeekDates(weekOff);

  const BASE = { fontFamily:"'Apple SD Gothic Neo','Noto Sans KR',sans-serif", color:"#111", WebkitFontSmoothing:"antialiased" };
  const CARD = { background:"#fff", borderRadius:20, padding:"18px 16px", marginBottom:12 };

  // ExRow 헬퍼
  const renderExRow = (origKey, i, dKey, phaseObj) => {
    const resolvedKey  = resolveKey(dKey, i, origKey);
    const resolvedKeys = (phaseObj.weeklyPlan[DAY_NAMES[new Date(dKey+"T00:00:00").getDay()]]?.exKeys||[]).map((ok,ii)=>resolveKey(dKey,ii,ok));
    return (
      <ExRow key={`${dKey}_${i}`}
        exKey={resolvedKey} pKey={phaseObj.pKey}
        checked={(checks[dKey]||[]).includes(i)}
        onToggle={()=>toggleCheck(dKey,i)}
        isSwapped={resolvedKey!==origKey}
        onSwapClick={()=>setSwapSlot({dayKey:dKey,index:i,exKey:resolvedKey,originalKey:origKey,currentKeys:resolvedKeys,pKey:phaseObj.pKey})}
        overload={getOverloadStatus(prLog[resolvedKey])}
        onLogClick={()=>setLogTarget(resolvedKey)}
      />
    );
  };

  return (
    <div style={{ ...BASE, minHeight:"100vh", background:"#f4f4f2", maxWidth:480, margin:"0 auto", display:"flex", flexDirection:"column" }}>

      {/* ── 고정 상단 헤더 ── */}
      <div style={{
        position:"sticky", top:0, zIndex:100,
        background:"#fff",
        borderBottom:"1px solid #efefef",
        padding:"env(safe-area-inset-top) 0 0",
      }}>
        <div style={{ padding:"14px 18px 12px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div>
              <div style={{ fontSize:11, color:"#aaa", letterSpacing:1.5, fontWeight:600, marginBottom:3 }}>MY 6-MONTH PLAN</div>
              <div style={{ fontSize:17, fontWeight:800, lineHeight:1.2 }}>
                골격근 {MUSCLE_GOAL} · 체지방 {FAT_GOAL} · {goalW}kg
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{
                background: currentPhase.bg, color: currentPhase.color,
                borderRadius:99, padding:"4px 10px", fontSize:11, fontWeight:700, marginBottom:3,
              }}>
                P{currentPhase.phase} · {currentPhase.label}
              </div>
              <div style={{ fontSize:11, color:"#aaa" }}>
                {daysPassed<0 ? `D${daysPassed}` : `D+${daysPassed}`}
              </div>
            </div>
          </div>
          <ProgressBar pct={overallPct} color="#111" height={4}/>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            <span style={{ fontSize:10, color:"#ccc" }}>2026.07.01</span>
            <span style={{ fontSize:10, color:"#999", fontWeight:600 }}>{overallPct}% 경과</span>
            <span style={{ fontSize:10, color:"#ccc" }}>2026.12.31</span>
          </div>
        </div>
      </div>

      {/* ── 스크롤 콘텐츠 ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px 14px 100px" }}>

        {/* ══ 오늘 ══ */}
        {tab==="home" && (
          <div>
            {daysPassed<0 && (
              <div style={{ background:"#eef5fd", borderRadius:16, padding:"14px 16px", marginBottom:14, textAlign:"center" }}>
                <div style={{ fontSize:14, color:"#4a90d9", fontWeight:700 }}>7월 1일부터 시작합니다!</div>
                <div style={{ fontSize:12, color:"#888", marginTop:4 }}>지금은 식단 준비 기간이에요</div>
              </div>
            )}

            {/* 오늘 운동 카드 */}
            <div style={CARD}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div>
                  <div style={{ fontSize:12, color:"#aaa", marginBottom:2 }}>{todayDay}요일 · {currentMonth}개월차</div>
                  <div style={{ fontSize:20, fontWeight:800 }}>{todayPlan.part}</div>
                </div>
                <div style={{
                  background: typeColor[todayPlan.type]||"#ccc",
                  color:"#fff", borderRadius:99, padding:"5px 13px",
                  fontSize:12, fontWeight:700,
                }}>{todayPlan.type}</div>
              </div>

              {todayPlan.exKeys.length===0 ? (
                <div style={{ textAlign:"center", padding:"28px 0", color:"#bbb", fontSize:15 }}>😴 오늘은 완전 휴식일이에요</div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {todayPlan.exKeys.map((origKey,i)=>renderExRow(origKey,i,todayKey,currentPhase))}
                  <div style={{ marginTop:4 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:12, color:"#aaa" }}>오늘 진행률</span>
                      <span style={{ fontSize:12, fontWeight:700, color:"#2d7a4f" }}>
                        {(checks[todayKey]||[]).length}/{todayPlan.exKeys.length}
                      </span>
                    </div>
                    <ProgressBar
                      pct={Math.round(((checks[todayKey]||[]).length/todayPlan.exKeys.length)*100)}
                      color="#2d7a4f" height={6}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 팁 */}
            <div style={{ background:currentPhase.bg, borderRadius:16, padding:"14px 16px", marginBottom:12 }}>
              <div style={{ fontSize:12, color:currentPhase.color, fontWeight:700, marginBottom:4 }}>오늘의 팁</div>
              <div style={{ fontSize:13, color:"#444", lineHeight:1.7 }}>💡 {currentPhase.tip}</div>
            </div>

            {/* 영양 목표 */}
            <div style={CARD}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>오늘 영양 목표</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
                {[{l:"칼로리",v:currentPhase.meal.kcal,u:"kcal",c:"#f39c12"},
                  {l:"단백질",v:currentPhase.meal.protein,u:"g",c:"#2d7a4f"},
                  {l:"탄수화물",v:currentPhase.meal.carb,u:"g",c:"#4a90d9"},
                  {l:"지방",v:currentPhase.meal.fat,u:"g",c:"#e74c3c"}].map(item=>(
                  <div key={item.l} style={{ textAlign:"center", background:"#f8f8f8", borderRadius:14, padding:"12px 4px" }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:item.c, margin:"0 auto 6px" }}/>
                    <div style={{ fontSize:10, color:"#aaa", marginBottom:2 }}>{item.l}</div>
                    <div style={{ fontSize:16, fontWeight:800, color:"#111" }}>{item.v}</div>
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
              <button onClick={()=>setWeekOff(w=>w-1)} style={{ width:40, height:40, border:"none", background:"#fff", borderRadius:12, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>‹</button>
              <div style={{ fontSize:14, fontWeight:700 }}>
                {weekDates[0].getMonth()+1}/{weekDates[0].getDate()} — {weekDates[6].getMonth()+1}/{weekDates[6].getDate()}
              </div>
              <button onClick={()=>setWeekOff(w=>w+1)} style={{ width:40, height:40, border:"none", background:"#fff", borderRadius:12, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.08)" }}>›</button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {weekDates.map((d)=>{
                const dName = DAY_NAMES[d.getDay()];
                const dKey  = dateKey(d);
                const msSinceStart = d - START_DATE;
                const beforeStart  = msSinceStart < 0;
                const mN = beforeStart ? 1 : Math.max(1,Math.min(GOAL_MONTHS, Math.floor(msSinceStart/(86400000*30.5))+1));
                const ph   = getPhaseByMonth(mN);
                const plan = beforeStart ? {type:"준비",part:"준비 기간",exKeys:[]} : ph.weeklyPlan[dName]||{type:"휴식",part:"완전 휴식",exKeys:[]};
                const done  = (checks[dKey]||[]).length;
                const total = plan.exKeys.length;
                const isToday = dKey===todayKey;

                return (
                  <div key={dKey} style={{
                    background:"#fff", borderRadius:18,
                    border: `2px solid ${isToday?"#111":"transparent"}`,
                    overflow:"hidden",
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 14px" }}>
                      <div style={{
                        width:42, height:42, borderRadius:14, flexShrink:0,
                        background: isToday?"#111":"#f5f5f3",
                        color: isToday?"#fff":"#555",
                        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      }}>
                        <div style={{ fontSize:9, fontWeight:600, lineHeight:1 }}>{dName}</div>
                        <div style={{ fontSize:16, fontWeight:800, lineHeight:1.3 }}>{d.getDate()}</div>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                          <span style={{ fontSize:14, fontWeight:700 }}>{plan.part}</span>
                          <div style={{ background:typeColor[plan.type]||"#ccc", color:"#fff", borderRadius:99, padding:"2px 9px", fontSize:10, fontWeight:700 }}>{plan.type}</div>
                        </div>
                        {total>0 && (
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <ProgressBar pct={Math.round(done/total*100)} color="#2d7a4f" height={4}/>
                            <span style={{ fontSize:11, color: done===total?"#2d7a4f":"#bbb", fontWeight:700, flexShrink:0 }}>{done}/{total}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {isToday && plan.exKeys.length>0 && (
                      <div style={{ padding:"0 14px 14px", display:"flex", flexDirection:"column", gap:8 }}>
                        <div style={{ height:1, background:"#f5f5f5", marginBottom:4 }}/>
                        {plan.exKeys.map((origKey,i)=>renderExRow(origKey,i,dKey,ph))}
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
            <div style={{ display:"flex", gap:8, marginBottom:16, overflowX:"auto", paddingBottom:4, scrollbarWidth:"none" }}>
              {Array.from({length:6},(_,i)=>i+1).map(m=>{
                const ph=getPhaseByMonth(m);
                const active=selMonth===m;
                return (
                  <button key={m} onClick={()=>setSelMonth(m)} style={{
                    flexShrink:0, border:"none", borderRadius:99, padding:"8px 16px",
                    fontSize:13, cursor:"pointer", fontWeight:active?700:500,
                    background:active?ph.color:"#fff",
                    color:active?"#fff":"#666",
                    boxShadow: active?"none":"0 1px 4px rgba(0,0,0,0.08)",
                    transition:"all .2s",
                  }}>{m}개월 {getMonthLabel(m)}</button>
                );
              })}
            </div>

            {(()=>{
              const ph=getPhaseByMonth(selMonth);
              return (
                <div>
                  <div style={{ background:ph.bg, borderRadius:18, padding:"16px", marginBottom:14 }}>
                    <div style={{ fontSize:11, color:ph.color, fontWeight:700, marginBottom:3 }}>Phase {ph.phase} · {selMonth}개월차</div>
                    <div style={{ fontSize:18, fontWeight:800, color:"#111", marginBottom:5 }}>{ph.label}</div>
                    <div style={{ fontSize:13, color:"#555" }}>🎯 {ph.focus}</div>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
                    {DAY_NAMES.map(day=>{
                      const plan=ph.weeklyPlan[day]||{type:"휴식",part:"완전 휴식",exKeys:[]};
                      return (
                        <div key={day} style={{ background:"#fff", borderRadius:18, padding:"14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: plan.exKeys.length?12:0 }}>
                            <div style={{ width:36, height:36, borderRadius:12, background:"#f5f5f3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, color:"#555", flexShrink:0 }}>{day}</div>
                            <div style={{ flex:1, fontSize:14, fontWeight:700 }}>{plan.part}</div>
                            <div style={{ background:typeColor[plan.type]||"#ccc", color:"#fff", borderRadius:99, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{plan.type}</div>
                          </div>
                          {plan.exKeys.length>0 && (
                            <div style={{ display:"flex", flexDirection:"column", gap:0, paddingLeft:46 }}>
                              {plan.exKeys.map((k)=>{
                                const ex=EX[k]; const sets=ex?.sets?.[ph.pKey]; const tw=ex?.tw?.[ph.pKey]; const link=ytLink(k);
                                return (
                                  <div key={k} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:"1px solid #f5f5f5" }}>
                                    <div style={{ flex:1 }}>
                                      <span style={{ fontSize:13, color:"#333", fontWeight:500 }}>{exName(k)}</span>
                                      {sets && <span style={{ fontSize:12, color:"#aaa", marginLeft:6 }}>{sets}</span>}
                                      {tw && <span style={{ fontSize:12, color:"#4a90d9", marginLeft:6 }}>· {tw}</span>}
                                    </div>
                                    {link && (
                                      <a href={link} target="_blank" rel="noreferrer" style={{
                                        fontSize:11, color:"#c0392b", background:"#fde8e8",
                                        borderRadius:8, padding:"3px 8px", textDecoration:"none", fontWeight:600, flexShrink:0,
                                      }}>▶</a>
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

                  <div style={{ ...CARD, marginBottom:10 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>영양 목표</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
                      {[{l:"칼로리",v:ph.meal.kcal,u:"kcal"},{l:"단백질",v:ph.meal.protein,u:"g"},{l:"탄수화물",v:ph.meal.carb,u:"g"},{l:"지방",v:ph.meal.fat,u:"g"}].map(item=>(
                        <div key={item.l} style={{ textAlign:"center", background:"#f8f8f8", borderRadius:12, padding:"10px 4px" }}>
                          <div style={{ fontSize:10, color:"#aaa", marginBottom:2 }}>{item.l}</div>
                          <div style={{ fontSize:15, fontWeight:800 }}>{item.v}</div>
                          <div style={{ fontSize:10, color:"#bbb" }}>{item.u}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background:ph.bg, borderRadius:14, padding:"12px 14px", fontSize:13, color:ph.color, lineHeight:1.7 }}>💡 {ph.tip}</div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══ 진행 현황 ══ */}
        {tab==="progress" && (
          <div>
            {/* 목표 달성률 */}
            <div style={CARD}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>목표 달성률</div>

              {[
                { label:"체중", value:latestIb.weight, goal:goalW, pct:wPct, color:"#4a90d9",
                  status: wGap>0 ? `목표까지 -${wGap}kg` : "🎉 달성!", statusColor: wGap>0?"#e74c3c":"#2d7a4f",
                  extra: <button onClick={()=>{setGoalWeightInput(String(goalW));setShowGoalEdit(true);}} style={{ border:"1px solid #e0e0e0", background:"#fafafa", borderRadius:8, padding:"3px 10px", fontSize:11, cursor:"pointer", color:"#777" }}>수정</button>
                },
                { label:"골격근", value:latestIb.muscle, goal:MUSCLE_GOAL, pct:musclePct, color:"#2d7a4f",
                  status: latestIb.muscle<MUSCLE_GOAL ? `+${(MUSCLE_GOAL-latestIb.muscle).toFixed(1)}kg 필요` : "🎉 달성!",
                  statusColor: latestIb.muscle<MUSCLE_GOAL?"#888":"#2d7a4f"
                },
                { label:"체지방", value:latestIb.fat, goal:FAT_GOAL, pct:fatPct, color:"#e74c3c",
                  status: latestIb.fat>FAT_GOAL ? `-${(latestIb.fat-FAT_GOAL).toFixed(1)}kg 필요` : "🎉 달성!",
                  statusColor: latestIb.fat>FAT_GOAL?"#888":"#2d7a4f"
                },
              ].map((item,idx)=>(
                <div key={item.label} style={{ marginBottom: idx<2?20:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:13, fontWeight:700 }}>{item.label}</span>
                      {item.extra}
                    </div>
                    <span style={{ fontSize:13, fontWeight:700, color:item.statusColor }}>{item.status}</span>
                  </div>
                  <ProgressBar pct={item.pct} color={item.color} height={8}/>
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                    <span style={{ fontSize:11, color:"#aaa" }}>현재 <b style={{color:"#111"}}>{item.value}kg</b></span>
                    <span style={{ fontSize:11, color:"#aaa" }}>목표 <b style={{color:item.color}}>{item.goal}kg</b></span>
                  </div>
                </div>
              ))}

              <div style={{ borderTop:"1px solid #f5f5f5", paddingTop:16, marginTop:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:13, fontWeight:700 }}>기간 진행</span>
                  <span style={{ fontSize:12, color:"#aaa" }}>{daysPassed<0?`D${daysPassed}`:`D+${daysPassed}`} / {totalDays}일</span>
                </div>
                <ProgressBar pct={overallPct} color="#111" height={8}/>
              </div>
            </div>

            {/* 인바디 기록 */}
            <div style={CARD}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:700 }}>인바디 기록</div>
                <button onClick={openNew} style={{
                  border:"none", background:"#111", color:"#fff",
                  borderRadius:99, padding:"7px 16px", fontSize:12, cursor:"pointer", fontWeight:700,
                }}>+ 추가</button>
              </div>

              {showIbForm && (
                <div style={{ background:"#f8f8f8", borderRadius:16, padding:"16px", marginBottom:14 }}>
                  {editIdx===null && inbody.length===0 && (
                    <div style={{ fontSize:12, color:"#4a90d9", marginBottom:10, fontWeight:500 }}>※ 첫 기록이 기준 수치가 됩니다</div>
                  )}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ fontSize:11, color:"#aaa", marginBottom:6, fontWeight:500 }}>측정일</div>
                    <input type="date" value={ibForm.date} onChange={e=>setIbForm(f=>({...f,date:e.target.value}))}
                      style={{ width:"100%", border:"1.5px solid #e8e8e8", borderRadius:12, padding:"12px", fontSize:16, boxSizing:"border-box", background:"#fff", outline:"none" }}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                    {[["체중(kg)","weight","70.3"],["골격근(kg)","muscle","31.0"],["체지방(kg)","fat","15.4"]].map(([l,k,ph])=>(
                      <div key={k}>
                        <div style={{ fontSize:11, color:"#aaa", marginBottom:6, fontWeight:500 }}>{l}</div>
                        <input type="number" step="0.1" inputMode="decimal" value={ibForm[k]} placeholder={ph}
                          onChange={e=>setIbForm(f=>({...f,[k]:e.target.value}))}
                          style={{ width:"100%", border:"1.5px solid #e8e8e8", borderRadius:12, padding:"12px 8px", fontSize:16, boxSizing:"border-box", background:"#fff", outline:"none", textAlign:"center" }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={saveIb} style={{ flex:1, background:"#2d7a4f", color:"#fff", border:"none", borderRadius:12, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer" }}>저장</button>
                    <button onClick={()=>setShowIbForm(false)} style={{ flex:1, background:"#ececec", color:"#555", border:"none", borderRadius:12, padding:"13px", fontSize:14, cursor:"pointer" }}>취소</button>
                  </div>
                </div>
              )}

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {inbody.length===0 ? (
                  <div style={{ textAlign:"center", color:"#ccc", padding:"20px 0", fontSize:14 }}>첫 인바디 측정 후 기록해주세요</div>
                ) : (
                  [{date:"기준", muscle:firstIb.muscle, fat:firstIb.fat, weight:firstIb.weight, isBase:true}, ...inbody].map((rec,i)=>{
                    const isBase=rec.isBase;
                    const prev=i>0?(i===1?firstIb:inbody[i-2]):null;
                    const wD=prev?parseFloat((rec.weight-prev.weight).toFixed(1)):null;
                    const mD=prev?parseFloat((rec.muscle-prev.muscle).toFixed(1)):null;
                    const fD=prev?parseFloat((rec.fat-prev.fat).toFixed(1)):null;
                    return (
                      <div key={i} style={{ padding:"13px 12px", background:isBase?"#f5f5f3":"#fafafa", borderRadius:14, border:isBase?"1.5px solid #ececec":"none" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ fontSize:12, color:"#aaa", width:50, flexShrink:0, fontWeight:isBase?700:400 }}>{isBase?"기준":rec.date.slice(5)}</div>
                          <div style={{ flex:1, display:"flex", gap:6 }}>
                            {[{l:"체중",v:rec.weight,c:"#555",d:wD,good:v=>v<0},
                              {l:"골격근",v:rec.muscle,c:"#2d7a4f",d:mD,good:v=>v>0},
                              {l:"체지방",v:rec.fat,c:"#e74c3c",d:fD,good:v=>v<0}].map(item=>(
                              <div key={item.l} style={{ flex:1, textAlign:"center" }}>
                                <div style={{ fontSize:10, color:"#aaa", marginBottom:1 }}>{item.l}</div>
                                <div style={{ fontSize:14, fontWeight:700, color:item.c }}>{item.v}</div>
                                {item.d!==null && item.d!==0 && (
                                  <div style={{ fontSize:10, color:item.good(item.d)?"#2d7a4f":"#e74c3c" }}>{item.d>0?"+":""}{item.d}</div>
                                )}
                              </div>
                            ))}
                          </div>
                          {!isBase && (
                            <div style={{ display:"flex", gap:6 }}>
                              <button onClick={()=>openEdit(i-1)} style={{ height:32, border:"1.5px solid #e8e8e8", background:"#fff", borderRadius:10, padding:"0 10px", fontSize:11, cursor:"pointer", color:"#555" }}>수정</button>
                              <button onClick={()=>deleteIb(i-1)} style={{ height:32, border:"none", background:"#fde8e8", borderRadius:10, padding:"0 10px", fontSize:11, cursor:"pointer", color:"#c0392b" }}>삭제</button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* 6개월 로드맵 */}
            <div style={CARD}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>6개월 로드맵</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {PHASE_INFO.map(ph=>(
                  <div key={ph.phase} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:28,height:28,borderRadius:10,background:ph.color,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:800,marginTop:2 }}>{ph.phase}</div>
                    <div style={{ flex:1, background:ph.bg, borderRadius:14, padding:"11px 14px" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:ph.color, marginBottom:2 }}>{ph.months[0]}~{ph.months[1]}개월 · {ph.label}</div>
                      <div style={{ fontSize:12, color:"#555" }}>{ph.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 하단 네비게이션 ── */}
      <div style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:480,
        background:"#fff",
        borderTop:"1px solid #efefef",
        paddingBottom:"env(safe-area-inset-bottom)",
        zIndex:100,
      }}>
        <div style={{ display:"flex" }}>
          {[["home","홈"],["week","주간"],["plan","루틴"],["progress","현황"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              flex:1, border:"none", background:"none", cursor:"pointer",
              padding:"10px 4px 8px", display:"flex", flexDirection:"column",
              alignItems:"center", gap:3, WebkitTapHighlightColor:"transparent",
            }}>
              <NavIcon id={k} active={tab===k}/>
              <span style={{ fontSize:10, fontWeight: tab===k?700:400, color: tab===k?"#111":"#bbb" }}>{l}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 모달/시트 ── */}
      {logTarget && (
        <LogSheet exKey={logTarget} records={prLog[logTarget]||[]} onSave={(e)=>saveLog(logTarget,e)} onClose={()=>setLogTarget(null)}/>
      )}
      {swapSlot && (
        <SwapSheet slot={swapSlot} pKey={swapSlot.pKey} currentKeys={swapSlot.currentKeys} onSelect={doSwap} onClose={()=>setSwapSlot(null)}/>
      )}
      {showGoalEdit && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:24 }}>
          <div style={{ background:"#fff", borderRadius:24, padding:"24px", width:"100%", maxWidth:320 }}>
            <div style={{ fontSize:17, fontWeight:700, marginBottom:6 }}>목표 체중 수정</div>
            <div style={{ fontSize:13, color:"#aaa", marginBottom:18, lineHeight:1.6 }}>현재 기준: {firstIb.weight}kg<br/>목표가 어려우면 조정해도 괜찮아요 💪</div>
            <input type="number" inputMode="decimal" step="0.1" value={goalWeightInput} onChange={e=>setGoalWeightInput(e.target.value)}
              style={{ width:"100%", border:"2px solid #e8e8e8", borderRadius:14, padding:"14px", fontSize:20, boxSizing:"border-box", outline:"none", textAlign:"center", marginBottom:14, fontWeight:700 }}/>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={saveGoalW} style={{ flex:1, background:"#111", color:"#fff", border:"none", borderRadius:14, padding:"14px", fontSize:15, fontWeight:700, cursor:"pointer" }}>저장</button>
              <button onClick={()=>setShowGoalEdit(false)} style={{ flex:1, background:"#f0f0f0", color:"#555", border:"none", borderRadius:14, padding:"14px", fontSize:15, cursor:"pointer" }}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
