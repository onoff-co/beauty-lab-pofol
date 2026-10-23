import React, { useState } from "react";
import { courseById, courses, lessons } from "../academyData.js";
import {
  DemoNote,
  LinkButton,
  Page,
  SectionTitle,
  useAcademy,
} from "../components.jsx";
import { safeReturnRoute, routeTo } from "../domain.js";
import { sessionById } from "../scheduleData.js";
import { lessonsForCourse } from "../onlineData.js";
import { OnlinePage } from "./Online.jsx";
import NotFound from "./NotFound.jsx";

export function AccountPage({ login = false, returnTo }) {
  const destination=safeReturnRoute(returnTo);
  const { user, setUser, members, setMembers } = useAcademy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(members[0]?.id || "");
  function register(e) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("이름과 예시 이메일 형식을 확인해주세요.");
      return;
    }
    if (members.some((m) => m.email === email.trim())) {
      setError("이미 등록된 예시 이메일입니다. 데모 로그인을 이용해주세요.");
      return;
    }
    const member = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      status: "수강 준비",
    };
    setMembers((rows) => [...rows, member]);
    setUser(member);
    setError("");
    window.location.hash=destination;
  }
  return (
    <Page title={login ? "수강생 로그인" : "회원가입"}>
      <div className="account-layout">
        <div>
          <h2>수강생 서비스</h2>
          <p>
            온라인 강의 수강 신청, 학습 자료, 수강 이력을 한곳에서 확인합니다.
          </p>
          <DemoNote>
            인증 없는 체험용 계정입니다. 실제 이메일이나 비밀번호를 사용하지
            마세요. 새로고침 시 등록 정보가 초기화됩니다.
          </DemoNote>
        </div>
        <div className="account-panel">
          {user ? (
            <>
              <h2>{user.name}님</h2>
              <p>데모 계정으로 이용 중입니다.</p>
              <LinkButton to={destination}>{destination==='classroom'?'나의 강의실':'이전 강의로 돌아가기'}</LinkButton>
              <button className="text-link" onClick={() => setUser(null)}>
                데모 로그아웃
              </button>
            </>
          ) : (
            <>
              <nav className="tabs">
                <a
                  href={`#${routeTo('account/login',{returnTo:destination})}`}
                  aria-current={login ? "page" : undefined}
                >
                  데모 로그인
                </a>
                <a href={`#${routeTo('account',{returnTo:destination})}`} aria-current={!login ? "page" : undefined}>
                  회원가입 데모
                </a>
              </nav>
              {login ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const member = members.find((m) => m.id === selected);
                    if (member) {setUser(member);window.location.hash=destination;}
                  }}
                >
                  <label>
                    체험 계정
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {members.map((m) => (
                        <option value={m.id} key={m.id}>
                          {m.name} ({m.email})
                        </option>
                      ))}
                    </select>
                  </label>
                  <button className="button" type="submit">
                    선택한 계정으로 체험
                  </button>
                </form>
              ) : (
                <form onSubmit={register} noValidate>
                  <label>
                    예시 이름
                    <input
                      value={name}
                      maxLength={30}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예: 김뷰티"
                    />
                  </label>
                  <label>
                    예시 이메일
                    <input
                      type="email"
                      value={email}
                      maxLength={80}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                    />
                  </label>
                  {error && (
                    <p className="field-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="button" type="submit">
                    데모 회원 등록
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </Page>
  );
}
function downloadMaterial(title, text) {
  const url = URL.createObjectURL(
    new Blob([`# ${title}\n\n뷰티랩 포트폴리오 학습 자료 예시\n\n${text}`], {
      type: "text/markdown;charset=utf-8",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `뷰티랩-${title}.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function ClassroomPage({ section, lessonId }) {
  const { user, enrollments, completed, setCompleted, history, setHistory } =
    useAcademy();
  if(lessonId&&['materials','history'].includes(section))return <NotFound/>;
  if (!user && section !== "materials")
    return (
      <Page
        title={section === "history" ? "출석·수강 이력" : "나의 강의실"}
        group="온라인 강의"
      >
        <div className="empty">
          <h2>데모 계정으로 체험해주세요</h2>
          <p>
            {section === "history"
              ? "로그인 후 완료한 온라인 학습 활동을 확인할 수 있습니다."
              : "수강 신청부터 자료 열람, 학습 진도 기록까지 이용할 수 있습니다."}
          </p>
          <LinkButton to={routeTo('account/login',{returnTo:['classroom',section,lessonId].filter(Boolean).join('/')})}>수강생 로그인</LinkButton>
        </div>
      </Page>
    );
  if (section === "materials")
    return (
      <Page title="강의 자료실" group="온라인 강의">
        <DemoNote>
          직접 작성한 학습 자료 예시이며 Markdown 파일로 내려받습니다.
        </DemoNote>
        <div className="materials-list">
          {lessons.map((l) => (
            <article key={l.id}>
              <div>
                <h2>{l.title}</h2>
                <p>이론 요약과 실습 질문 · MD 문서</p>
              </div>
              <button
                className="button secondary"
                onClick={() =>
                  downloadMaterial(l.title, l.paragraphs.join("\n\n"))
                }
              >
                자료 다운로드
              </button>
            </article>
          ))}
        </div>
      </Page>
    );
  if (section === "history")
    return (
      <Page title="출석·수강 이력" group="온라인 강의">
        <DemoNote>
          완료한 온라인 학습 활동을 기록합니다. 공식 출석이나 수료 인정이 아닌
          체험용 이력입니다.
        </DemoNote>
        <div className="history-summary">
          <p>
            신청 과정 <strong>{enrollments.length}개</strong>
          </p>
          <p>
            완료 단원 <strong>{completed.length}개</strong>
          </p>
          <p>
            학습 활동 <strong>{history.length}건</strong>
          </p>
        </div>
        {history.length ? (
          <div className="history-list">
            {history.map((h) => (
              <article key={h.id}>
                <time>{h.date}</time>
                <div>
                  <h2>{h.title}</h2>
                  <p>{h.action}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              아직 학습 이력이 없습니다. 강의를 선택하고 첫 단원을 완료해보세요.
            </p>
            <LinkButton to="online">강의 선택</LinkButton>
          </div>
        )}
      </Page>
    );
  if (section) {
    const c = courseById(section);
    if (!c || !lessonsForCourse(section).length) return <NotFound/>;
    return <OnlinePage id={section} lessonId={lessonId}/>;
  }
  return (
    <Page title="나의 강의실" group="온라인 강의">
      <div className="student-bar">
        <strong>{user.name}님의 수강 과정</strong>
        <LinkButton to="online" secondary>
          강의 추가
        </LinkButton>
      </div>
      {enrollments.length ? (
        <div className="enrolled-list">
          {enrollments.map((id) => {
            const c = courseById(id);
            const courseLessons=lessonsForCourse(id);
            const count = courseLessons.filter((l) =>
              completed.includes(`${id}/${l.id}`),
            ).length;
            return (
              <article key={id}>
                <div>
                  <h2>{c.category} 기초 이론</h2>
                  <p>
                    {count} / {courseLessons.length}개 강의 완료
                  </p>
                  <progress
                    value={count}
                    max={courseLessons.length}
                    aria-label={`${c.category} 진도`}
                  />
                </div>
                <LinkButton to={`online/${id}/${(courseLessons.find(l=>!completed.includes(`${id}/${l.id}`))||courseLessons[0]).id}`}>이어서 학습</LinkButton>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <h2>신청한 강의가 없습니다</h2>
          <p>관심 있는 분야의 온라인 강의를 선택해주세요.</p>
          <LinkButton to="online">온라인 강의 보기</LinkButton>
        </div>
      )}
      <div className="student-links">
        <LinkButton to="classroom/materials" secondary>
          강의 자료실
        </LinkButton>
        <LinkButton to="classroom/history" secondary>
          출석·수강 이력
        </LinkButton>
      </div>
    </Page>
  );
}
export function AdminPage({ section = "inquiries" }) {
  const {
    inquiries,
    setInquiries,
    members,
    setMembers,
    notices,
    setNotices,
    user,
    setUser,
  } = useAcademy();
  const [status, setStatus] = useState("전체");
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState("");
  const tabs = [
    ["inquiries", "상담 관리"],
    ["members", "회원 관리"],
    ["notices", "공지 관리"],
  ];
  if (!tabs.some(([key]) => key === section)) return <NotFound />;
  function saveNotice(e) {
    e.preventDefault();
    const record = {
      ...editing,
      title: editing.title.trim(),
      body: editing.body.trim(),
    };
    if (!record.title || !record.body) {
      setFeedback("제목과 본문을 입력해주세요.");
      return;
    }
    setNotices((rows) =>
      record.id
        ? rows.map((n) => (n.id === record.id ? record : n))
        : [
            {
              ...record,
              id: crypto.randomUUID(),
              date: new Date().toLocaleDateString("en-CA"),
            },
            ...rows,
          ],
    );
    setEditing(null);
    setFeedback("공지사항에 반영했습니다.");
  }
  return (
    <Page title="관리자 데모">
      <DemoNote>
        인증 없는 관리 기능 미리보기입니다. 데이터는 현재 브라우저 탭에서만
        유지되며 실제 운영용 관리자 페이지가 아닙니다.
      </DemoNote>
      <nav className="tabs">
        {tabs.map(([key, label]) => (
          <a
            key={key}
            href={`#admin/${key}`}
            aria-current={section === key ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      {section === "inquiries" && (
        <>
          <div className="table-toolbar">
            <span>총 {inquiries.length}건</span>
            <label>
              진행 상태
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {["전체", "상담 대기", "상담 완료"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="admin-inquiries">
            {inquiries
              .filter((row) => status === "전체" || row.status === status)
              .map((row) => (
                <article key={row.id}>
                  <div>
                    <strong>{row.name}</strong>
                    <p>{row.phone}</p>
                    <small>{row.id}</small>
                  </div>
                  <div>
                    <h2>
                      {courseById(row.course)?.category} · {row.mode}
                    </h2>
                    <p>{row.message || "추가 문의 없음"}</p>
                    {sessionById(row.session)&&<p className="selected-class"><strong>{sessionById(row.session).title}</strong><span>{sessionById(row.session).start} 개강 · {sessionById(row.session).time}</span></p>}
                    {row.date && <p>방문 희망일 {row.date}</p>}
                  </div>
                  <label>
                    처리 상태
                    <select
                      aria-label={`${row.name} 상담 상태`}
                      value={row.status}
                      onChange={(e) =>
                        setInquiries((rows) =>
                          rows.map((item) =>
                            item.id === row.id
                              ? { ...item, status: e.target.value }
                              : item,
                          ),
                        )
                      }
                    >
                      <option>상담 대기</option>
                      <option>상담 완료</option>
                    </select>
                  </label>
                  <button
                    className="text-link"
                    onClick={() => setConfirm(row.id)}
                  >
                    삭제
                  </button>
                  {confirm === row.id && (
                    <div className="delete-confirm">
                      <span>{row.name}님의 데모 신청을 삭제할까요?</span>
                      <button
                        onClick={() => {
                          setInquiries((rows) =>
                            rows.filter((item) => item.id !== row.id),
                          );
                          setConfirm("");
                        }}
                      >
                        삭제 확인
                      </button>
                      <button onClick={() => setConfirm("")}>취소</button>
                    </div>
                  )}
                </article>
              ))}
          </div>
          {!inquiries.filter(
            (row) => status === "전체" || row.status === status,
          ).length && (
            <div className="empty">
              <p>해당 상담 신청이 없습니다.</p>
              <LinkButton to="contact" secondary>
                상담 폼 체험
              </LinkButton>
            </div>
          )}
        </>
      )}
      {section === "members" && (
        <>
          <div className="table-toolbar">
            <span>데모 회원 {members.length}명</span>
            <LinkButton to="account" secondary>
              회원 등록
            </LinkButton>
          </div>
          <div className="member-list">
            {members.map((member) => (
              <article key={member.id}>
                <div>
                  <h2>{member.name}</h2>
                  <p>{member.email}</p>
                </div>
                <label>
                  수강 상태
                  <select
                    aria-label={`${member.name} 수강 상태`}
                    value={member.status}
                    onChange={(e) => {
                      const value = e.target.value;
                      setMembers((rows) =>
                        rows.map((m) =>
                          m.id === member.id ? { ...m, status: value } : m,
                        ),
                      );
                      if (user?.id === member.id)
                        setUser({ ...user, status: value });
                    }}
                  >
                    {["수강 준비", "수강 중", "수료"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <button
                  className="text-link"
                  onClick={() => setConfirm(member.id)}
                >
                  회원 삭제
                </button>
                {confirm === member.id && (
                  <div className="delete-confirm">
                    <span>{member.name}님의 데모 계정을 삭제할까요?</span>
                    <button
                      onClick={() => {
                        setMembers((rows) =>
                          rows.filter((m) => m.id !== member.id),
                        );
                        if (user?.id === member.id) setUser(null);
                        setConfirm("");
                      }}
                    >
                      삭제 확인
                    </button>
                    <button onClick={() => setConfirm("")}>취소</button>
                  </div>
                )}
              </article>
            ))}
          </div>
          {!members.length && <p className="empty">등록된 회원이 없습니다.</p>}
        </>
      )}
      {section === "notices" && (
        <>
          <div className="table-toolbar">
            <span>공지 {notices.length}건</span>
            <button
              className="button"
              onClick={() => {
                setEditing({ title: "", body: "", category: "안내" });
                setFeedback("");
              }}
            >
              공지 작성
            </button>
          </div>
          {editing && (
            <form className="notice-editor" onSubmit={saveNotice}>
              <label>
                제목
                <input
                  required
                  maxLength={100}
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
              </label>
              <label>
                분류
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  {["안내", "모집", "학습", "실습"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                본문
                <textarea
                  required
                  rows={6}
                  maxLength={5000}
                  value={editing.body}
                  onChange={(e) =>
                    setEditing({ ...editing, body: e.target.value })
                  }
                />
              </label>
              <div className="button-row">
                <button className="button" type="submit">
                  공지 저장
                </button>
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => setEditing(null)}
                >
                  작성 취소
                </button>
              </div>
            </form>
          )}
          <div className="admin-notices">
            {notices.map((n) => (
              <article key={n.id}>
                <a href={`#community/notices/${n.id}`}>
                  <strong>{n.title}</strong>
                  <time>{n.date}</time>
                </a>
                <button
                  className="text-link"
                  onClick={() => {
                    setEditing({ ...n });
                    setFeedback("");
                  }}
                >
                  수정
                </button>
                <button className="text-link" onClick={() => setConfirm(n.id)}>
                  삭제
                </button>
                {confirm === n.id && (
                  <div className="delete-confirm">
                    <span>이 공지를 삭제할까요?</span>
                    <button
                      onClick={() => {
                        setNotices((rows) =>
                          rows.filter((row) => row.id !== n.id),
                        );
                        setConfirm("");
                        if (editing?.id === n.id) setEditing(null);
                      }}
                    >
                      삭제 확인
                    </button>
                    <button onClick={() => setConfirm("")}>취소</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </>
      )}
      {feedback && <p role="status">{feedback}</p>}
    </Page>
  );
}
