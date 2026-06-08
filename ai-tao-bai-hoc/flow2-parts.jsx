const { useState } = React;

// ===== Sample generated content for one lesson =====
const LESSON = {
  title: 'Tôi là học sinh lớp 2',
  subject: 'Tiếng Việt', grade: 'Lớp 2', level: 'Dễ', voice: 'Nova (Nữ trẻ)',
  reading: [
    'Hôm nay là ngày tựu trường. Mới sáng sớm, mẹ đã gọi nhưng tôi đã vùng dậy và chuẩn bị xong mọi thứ thật nhanh. Tôi muốn đến trường sớm nhất lớp.',
    'Trên đường tới trường, ánh nắng tràn ngập sân trường. Tôi chào mẹ rồi chạy ào vào cùng các bạn đang ríu rít trò chuyện.',
    'Tôi thấy các em lớp 1 còn rụt rè níu tay bố mẹ. Nhìn các em, tôi bỗng cảm thấy mình đã lớn bổng lên. Tôi tự hào vì mình là học sinh lớp 2 rồi!',
  ],
  words: 86, duration: '2:14',
};

// ===== Bài đọc (reading passage) =====
function ReadingBody(){
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(LESSON.reading.join('\n\n'));
  return (
    <div>
      <p className="sec-sub">Bài đọc do AI tạo từ nội dung bài học. Bạn có thể đọc trực tiếp và chỉnh sửa tại đây.</p>
      {!editing ? (
        <div className="doc">
          <div className="doc-title">{LESSON.title}</div>
          <div className="doc-meta"><span>{LESSON.subject} · {LESSON.grade}</span><span>~{LESSON.words} từ</span><span>Thời lượng đọc ~1 phút</span></div>
          <div className="doc-body">{text.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</div>
        </div>
      ) : (
        <textarea className="doc-edit" value={text} onChange={e=>setText(e.target.value)}/>
      )}
      <div className="acc-actions">
        <div style={{display:'flex',gap:10}}>
          {!editing
            ? <button className="btn" onClick={()=>setEditing(true)}><Icon name="edit" size={15}/>Sửa nội dung</button>
            : <button className="btn btn-primary" onClick={()=>setEditing(false)}><Icon name="check" size={15} stroke={3}/>Xong</button>}
          <button className="btn"><Icon name="refresh" size={15}/>Tạo lại</button>
        </div>
        <button className="btn btn-primary"><Icon name="save" size={15}/>Lưu bài đọc</button>
      </div>
    </div>
  );
}

// ===== Sách nói (audiobook) =====
function AudioBody(){
  const [playing, setPlaying] = useState(false);
  const bars = React.useMemo(()=>Array.from({length:60},()=>6+Math.round(Math.random()*26)),[]);
  const prog = 0.32;
  return (
    <div>
      <p className="sec-sub">Bản thu âm thanh đọc bài, giọng <b>{LESSON.voice}</b>. Nghe thử và lưu lại để dùng trong bài giảng.</p>
      <div className="player">
        <button className="player-btn" onClick={()=>setPlaying(p=>!p)}>
          <Icon name={playing?'pause':'play'} size={20} fill/>
        </button>
        <div className="player-mid">
          <div className="wave">
            {bars.map((h,i)=><i key={i} className={i/bars.length<prog?'on':''} style={{height:h}}/>)}
          </div>
          <div className="player-time"><span>0:42</span><span>{LESSON.duration}</span></div>
        </div>
        <span className="voice-chip"><Icon name="volume" size={14}/>{LESSON.voice}</span>
      </div>
      <div className="transcript">
        <div className="tl">Lời thoại</div>
        {LESSON.reading.map((p,i)=><p key={i} style={{margin:'0 0 8px'}}>{p}</p>)}
      </div>
      <div className="acc-actions">
        <div style={{display:'flex',gap:10}}>
          <button className="btn"><Icon name="refresh" size={15}/>Đổi giọng / Tạo lại</button>
          <button className="btn"><Icon name="download" size={15}/>Tải MP3</button>
        </div>
        <button className="btn btn-primary"><Icon name="save" size={15}/>Lưu sách nói</button>
      </div>
    </div>
  );
}

Object.assign(window, { LESSON, ReadingBody, AudioBody });
