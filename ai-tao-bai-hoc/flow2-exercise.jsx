// ===== Bài tập luyện tập (questions) =====
const QUESTIONS = [
  { id:1, kind:'chon', text:'Bạn nhỏ trong bài đọc cảm thấy thế nào khi đến trường?',
    options:[{t:'Sợ hãi, lo lắng'},{t:'Mình đã lớn bổng lên',correct:true},{t:'Buồn bã, nhớ nhà'},{t:'Mệt mỏi, chán nản'}], inc:true },
  { id:2, kind:'chon', text:'Ai đã gọi bạn nhỏ dậy vào buổi sáng tựu trường?',
    options:[{t:'Bố'},{t:'Mẹ',correct:true},{t:'Bà'},{t:'Anh trai'}], inc:true },
  { id:3, kind:'sapxep', text:'Sắp xếp các sự việc theo đúng trình tự trong bài đọc "Tôi là học sinh lớp 2".',
    seq:['Sáng sớm, mẹ gọi, bạn nhỏ vùng dậy và chuẩn bị xong mọi thứ rất nhanh.',
         'Bạn nhỏ chào mẹ rồi chạy ào vào cùng các bạn đang ríu rít trong sân trường.',
         'Bạn nhỏ thấy các em lớp 1 rụt rè níu tay bố mẹ và cảm thấy mình lớn bổng lên.'], inc:true },
  { id:4, kind:'sapxep', text:'Sắp xếp các từ sau thành câu hoàn chỉnh.',
    seq:['Ánh nắng','tràn ngập','sân trường.'], inc:true },
  { id:5, kind:'noi', text:'Nối từ ngữ ở cột A với nghĩa phù hợp ở cột B.',
    pairs:[['ríu rít','nói chuyện vui vẻ, liền nhau'],['rụt rè','e dè, chưa mạnh dạn'],['vùng dậy','bật dậy thật nhanh']], inc:false },
];
const KIND_LABEL = { chon:'Chọn', sapxep:'Sắp xếp', noi:'Nối' };

function ExerciseBody(){
  const [tab, setTab] = React.useState('all');
  const [inc, setInc] = React.useState(new Set(QUESTIONS.filter(q=>q.inc).map(q=>q.id)));
  const counts = { all:QUESTIONS.length, chon:0, sapxep:0, noi:0 };
  QUESTIONS.forEach(q=>counts[q.kind]++);
  const list = QUESTIONS.filter(q=>tab==='all'||q.kind===tab);
  const toggleInc = id => setInc(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});

  return (
    <div>
      <p className="sec-sub">AI đã tạo <b>{QUESTIONS.length} câu hỏi</b> từ bài đọc. Bỏ tích những câu không dùng, hoặc bấm <b>Sửa</b> để chỉnh từng câu.</p>
      <div className="q-tabs">
        {[['all','Tất cả'],['chon','Chọn'],['sapxep','Sắp xếp'],['noi','Nối']].map(([k,l])=>(
          <button key={k} className={'q-tab'+(tab===k?' on':'')} onClick={()=>setTab(k)}>
            {l}<span className="cnt">{counts[k]}</span>
          </button>
        ))}
      </div>
      <div className="q-list">
        {list.map(q=>(
          <div className={'q-card'+(inc.has(q.id)?' inc':'')} key={q.id}>
            <div className="q-head">
              <span className="q-num">{KIND_LABEL[q.kind]}</span>
              <div className="q-text">{q.text}</div>
              <div className="q-acts">
                <button className="q-mini edit"><Icon name="edit" size={13}/>Sửa</button>
                <button className="q-mini del"><Icon name="trash" size={13}/>Xóa</button>
              </div>
            </div>
            {q.kind==='chon' && (
              <div className="q-opts">
                {q.options.map((o,i)=>(
                  <div className={'q-opt'+(o.correct?' correct':'')} key={i}>
                    <span className="oi">{String.fromCharCode(65+i)}</span>{o.t}
                    {o.correct && <span className="ans-mark"><Icon name="check" size={13} stroke={3}/>Đáp án</span>}
                  </div>
                ))}
              </div>
            )}
            {q.kind==='sapxep' && (
              <div className="q-seq">
                {q.seq.map((s,i)=>(
                  <div className="si" key={i}><span className="dr"><Icon name="list" size={15}/></span><span className="ord">{i+1}</span>{s}</div>
                ))}
              </div>
            )}
            {q.kind==='noi' && (
              <div className="q-match">
                {q.pairs.map((p,i)=>(
                  <React.Fragment key={i}>
                    <div className="mcell">{p[0]}</div>
                    <div className="mline"><Icon name="link2" size={16}/></div>
                    <div className="mcell">{p[1]}</div>
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="inc-row" onClick={()=>toggleInc(q.id)}>
              <Check on={inc.has(q.id)}/>{inc.has(q.id)?'Đưa vào bài giảng':'Không dùng câu này'}
            </div>
          </div>
        ))}
      </div>
      <div className="acc-actions">
        <button className="btn"><Icon name="refresh" size={15}/>Tạo thêm câu hỏi</button>
        <button className="btn btn-primary"><Icon name="save" size={15}/>Lưu {inc.size} câu hỏi</button>
      </div>
    </div>
  );
}

Object.assign(window, { QUESTIONS, ExerciseBody });
