import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://btrxywfwcvtwztpmqhqj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Cwi0BWdT2OUHNU9F2JG2mw_oO99NCQn";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SKILLS = [
  "Loģistika", "Noliktava", "Būvniecība", "IT atbalsts", "Ēdināšana",
  "Tirdzniecība", "Piegāde", "Apkope", "Drošība", "Administrācija",
  "Mārketings", "Tulkošana", "Fotogrāfija", "Apsaimniekošana", "Transports",
];

const CITIES = ["Rīga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils", "Rēzekne", "Valmiera", "Jēkabpils", "Ogre"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a08;
    --bg2: #111110;
    --bg3: #1a1a18;
    --accent: #e8470a;
    --accent2: #ff6a2f;
    --text: #f0ede6;
    --muted: #7a7870;
    --border: #2a2a28;
    --success: #2ecc71;
    --error: #e84747;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .screen {
    width: 100%;
    max-width: 480px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .logo {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 8px;
  }

  .logo span { color: var(--accent); }

  .tagline {
    font-size: 13px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 48px;
  }

  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 16px;
  }

  .card-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .card-sub {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 28px;
    line-height: 1.5;
  }

  .role-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 8px;
  }

  .role-btn {
    background: var(--bg3);
    border: 2px solid var(--border);
    border-radius: 12px;
    padding: 28px 16px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease;
    color: var(--text);
  }

  .role-btn:hover {
    border-color: var(--accent);
    background: rgba(232, 71, 10, 0.08);
  }

  .role-btn.active {
    border-color: var(--accent);
    background: rgba(232, 71, 10, 0.12);
  }

  .role-icon {
    font-size: 36px;
    margin-bottom: 10px;
  }

  .role-label {
    font-size: 15px;
    font-weight: 600;
  }

  .role-desc {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
  }

  .input-group {
    margin-bottom: 16px;
  }

  .input-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
    display: block;
  }

  .input {
    width: 100%;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
  }

  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--muted); }

  select.input {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a7870' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }

  textarea.input {
    resize: vertical;
    min-height: 100px;
    line-height: 1.5;
  }

  .btn {
    width: 100%;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 16px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;
  }

  .btn:hover { background: var(--accent2); transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
  }

  .btn-ghost:hover { background: var(--bg3); border-color: var(--muted); }

  .btn-sm {
    width: auto;
    padding: 10px 20px;
    font-size: 13px;
    margin-top: 0;
  }

  .link-btn {
    background: none;
    border: none;
    color: var(--accent);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
  }

  .link-btn:hover { color: var(--accent2); }

  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .skill-tag {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 7px 14px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    color: var(--muted);
  }

  .skill-tag:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .skill-tag.selected {
    background: rgba(232, 71, 10, 0.15);
    border-color: var(--accent);
    color: var(--accent);
  }

  .nav {
    width: 100%;
    max-width: 480px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 28px;
  }

  .nav-logo { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
  .nav-logo span { color: var(--accent); }

  .nav-right { display: flex; align-items: center; gap: 12px; }

  .avatar {
    width: 36px;
    height: 36px;
    background: rgba(232, 71, 10, 0.15);
    border: 1px solid var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: var(--accent);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .badge-worker { background: rgba(46,204,113,0.12); color: var(--success); border: 1px solid rgba(46,204,113,0.3); }
  .badge-employer { background: rgba(232,71,10,0.12); color: var(--accent); border: 1px solid rgba(232,71,10,0.3); }

  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
  }

  .stat-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .stat-num {
    font-size: 32px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -1px;
  }

  .stat-label {
    font-size: 12px;
    color: var(--muted);
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .job-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 12px;
    transition: border-color 0.2s;
  }

  .job-card:hover { border-color: var(--accent); }

  .job-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .job-meta {
    font-size: 13px;
    color: var(--muted);
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .job-meta span { display: flex; align-items: center; gap: 4px; }

  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 20px 0;
  }

  .alert {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 13px;
    margin-bottom: 16px;
    font-weight: 500;
  }

  .alert-error { background: rgba(232,71,71,0.1); border: 1px solid rgba(232,71,71,0.3); color: #ff7070; }
  .alert-success { background: rgba(46,204,113,0.1); border: 1px solid rgba(46,204,113,0.3); color: var(--success); }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 14px;
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--muted);
  }

  .empty-state .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-state p { font-size: 14px; line-height: 1.6; }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
    font-size: 14px;
    color: var(--muted);
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: var(--bg3);
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 20px;
  }

  .tab {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab.active {
    background: var(--accent);
    color: white;
  }

  .logout-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover { color: var(--error); border-color: var(--error); }

  .apply-btn {
    background: rgba(232,71,10,0.1);
    border: 1px solid var(--accent);
    color: var(--accent);
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .apply-btn:hover { background: var(--accent); color: white; }

  .profile-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    background: rgba(232,71,10,0.15);
    border: 2px solid var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 800;
    color: var(--accent);
    flex-shrink: 0;
  }

  .step-dots {
    display: flex;
    gap: 6px;
    margin-bottom: 28px;
  }

  .step-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border);
  }

  .step-dot.active {
    background: var(--accent);
    width: 20px;
    border-radius: 3px;
  }

  .salary-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }

  .chip {
    background: rgba(232,71,10,0.1);
    border: 1px solid rgba(232,71,10,0.3);
    border-radius: 16px;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--accent);
    font-weight: 600;
  }
`;

// ─── SCREENS ────────────────────────────────────────────────────────────────

function Onboarding({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="screen">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div className="logo">Sprint<span>a</span></div>
        <div className="tagline">Ātrais darba tirgus Latvijā</div>
      </div>
      <div className="card">
        <div className="card-title">Kas tu esi?</div>
        <div className="card-sub">Izvēlies savu lomu, lai sāktu</div>
        <div className="role-grid">
          <button
            className={"role-btn" + (selected === "worker" ? " active" : "")}
            onClick={() => setSelected("worker")}
          >
            <div className="role-icon">👷</div>
            <div className="role-label">Darbinieks</div>
            <div className="role-desc">Meklēju darbu</div>
          </button>
          <button
            className={"role-btn" + (selected === "employer" ? " active" : "")}
            onClick={() => setSelected("employer")}
          >
            <div className="role-icon">🏢</div>
            <div className="role-label">Darba devējs</div>
            <div className="role-desc">Publicēju vakances</div>
          </button>
        </div>
        <button className="btn" disabled={!selected} onClick={() => onSelect(selected)} style={{ marginTop: "20px" }}>
          Turpināt →
        </button>
      </div>
    </div>
  );
}

function AuthScreen({ role, onAuth, onBack }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccess("");
    if (!email || !password) { setError("Lūdzu aizpildi visus laukus"); return; }
    if (password.length < 6) { setError("Parole jābūt vismaz 6 simboliem"); return; }
    setLoading(true);

    try {
      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        if (data.user) {
          await supabase.from("profiles").upsert({ id: data.user.id, role, email });
          setSuccess("Reģistrācija veiksmīga! Pārbaudi e-pastu.");
          setTimeout(() => onAuth(data.user, role), 1500);
        }
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) throw loginError;
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
        onAuth(data.user, profile?.role || role);
      }
    } catch (err) {
      setError(err.message || "Kļūda. Mēģini vēlreiz.");
    }
    setLoading(false);
  }

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button className="btn-ghost btn btn-sm" onClick={onBack} style={{ width: "auto" }}>← Atpakaļ</button>
        <div className="logo" style={{ fontSize: "20px" }}>Sprint<span>a</span></div>
      </div>
      <div className="card">
        <div className="badge" style={{ marginBottom: "16px" }} className={role === "worker" ? "badge badge-worker" : "badge badge-employer"}>
          {role === "worker" ? "👷 Darbinieks" : "🏢 Darba devējs"}
        </div>
        <div className="tabs" style={{ marginTop: "16px" }}>
          <button className={"tab" + (mode === "login" ? " active" : "")} onClick={() => setMode("login")}>Pieteikties</button>
          <button className={"tab" + (mode === "register" ? " active" : "")} onClick={() => setMode("register")}>Reģistrēties</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="input-group">
          <label className="input-label">E-pasts</label>
          <input className="input" type="email" placeholder="tavs@epasts.lv" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Parole</label>
          <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Ielādē..." : mode === "login" ? "Pieteikties" : "Izveidot kontu"}
        </button>
      </div>
    </div>
  );
}

function WorkerProfile({ user, onSave }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("worker_profiles").select("*").eq("user_id", user.id).single();
      if (data) {
        setName(data.name || "");
        setCity(data.city || "");
        setBio(data.bio || "");
        setPhone(data.phone || "");
        setSelectedSkills(data.skills || []);
      }
    }
    load();
  }, [user.id]);

  function toggleSkill(s) {
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function handleSave() {
    if (!name || !city || selectedSkills.length === 0) { setError("Aizpildi vārdu, pilsētu un izvēlies vismaz vienu prasmi"); return; }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.from("worker_profiles").upsert({
      user_id: user.id, name, city, bio, phone, skills: selectedSkills
    });
    if (err) { setError(err.message); } else { onSave(); }
    setLoading(false);
  }

  const steps = [1, 2, 3];

  return (
    <div className="screen">
      <div className="step-dots">
        {steps.map((_, i) => <div key={i} className={"step-dot" + (i === 0 ? " active" : "")} />)}
      </div>
      <div className="card">
        <div className="card-title">Tavs profils</div>
        <div className="card-sub">Aizpildi informāciju, lai darba devēji varētu tevi atrast</div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="input-group">
          <label className="input-label">Vārds Uzvārds</label>
          <input className="input" placeholder="Jānis Bērziņš" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Tālrunis</label>
          <input className="input" placeholder="+371 2000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Pilsēta</label>
          <select className="input" value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Izvēlies pilsētu</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Par sevi (neobligāti)</label>
          <textarea className="input" placeholder="Īss apraksts par sevi un pieredzi..." value={bio} onChange={e => setBio(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Prasmes</label>
          <div className="skills-grid">
            {SKILLS.map(s => (
              <button key={s} className={"skill-tag" + (selectedSkills.includes(s) ? " selected" : "")} onClick={() => toggleSkill(s)}>{s}</button>
            ))}
          </div>
        </div>
        <button className="btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saglabā..." : "Saglabāt profilu →"}
        </button>
      </div>
    </div>
  );
}

function PostJob({ user, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleSkill(s) {
    setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function handlePost() {
    if (!title || !company || !city || !description) { setError("Aizpildi visus obligātos laukus"); return; }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.from("jobs").insert({
      employer_id: user.id, title, company, city, description,
      salary_from: salaryFrom ? Number(salaryFrom) : null,
      salary_to: salaryTo ? Number(salaryTo) : null,
      duration, required_skills: selectedSkills, status: "active"
    });
    if (err) { setError(err.message); } else { onSave(); }
    setLoading(false);
  }

  return (
    <div className="screen">
      <div className="card">
        <div className="card-title">Publicēt vakanci</div>
        <div className="card-sub">Atrodi īsto kandidātu ātri</div>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="input-group">
          <label className="input-label">Amata nosaukums *</label>
          <input className="input" placeholder="Noliktavas strādnieks" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Uzņēmums *</label>
          <input className="input" placeholder="SIA Piemērs" value={company} onChange={e => setCompany(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Pilsēta *</label>
          <select className="input" value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Izvēlies pilsētu</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Darba apraksts *</label>
          <textarea className="input" placeholder="Apraksti darba pienākumus, prasības un nosacījumus..." value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Alga (€/stundā)</label>
          <div className="salary-row">
            <input className="input" type="number" placeholder="No" value={salaryFrom} onChange={e => setSalaryFrom(e.target.value)} />
            <input className="input" type="number" placeholder="Līdz" value={salaryTo} onChange={e => setSalaryTo(e.target.value)} />
          </div>
        </div>
        <div className="input-group">
          <label className="input-label">Ilgums</label>
          <input className="input" placeholder="Piem.: 1 nedēļa, 3 dienas..." value={duration} onChange={e => setDuration(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Nepieciešamās prasmes</label>
          <div className="skills-grid">
            {SKILLS.map(s => (
              <button key={s} className={"skill-tag" + (selectedSkills.includes(s) ? " selected" : "")} onClick={() => toggleSkill(s)}>{s}</button>
            ))}
          </div>
        </div>
        <button className="btn" onClick={handlePost} disabled={loading}>{loading ? "Publicē..." : "Publicēt vakanci →"}</button>
        <button className="btn btn-ghost" onClick={onCancel} style={{ marginTop: "8px" }}>Atcelt</button>
      </div>
    </div>
  );
}

function WorkerDashboard({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [tab, setTab] = useState("jobs");
  const [loading, setLoading] = useState(true);
  const [applySuccess, setApplySuccess] = useState("");

  useEffect(() => {
    async function load() {
      const [{ data: p }, { data: j }, { data: a }] = await Promise.all([
        supabase.from("worker_profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("jobs").select("*").eq("status", "active").order("created_at", { ascending: false }),
        supabase.from("applications").select("*, jobs(title,company,city)").eq("worker_id", user.id),
      ]);
      setProfile(p);
      setJobs(j || []);
      setApplications(a || []);
      setLoading(false);
    }
    load();
  }, [user.id]);

  async function applyToJob(jobId) {
    const already = applications.find(a => a.job_id === jobId);
    if (already) { setApplySuccess("Jau pieteicies!"); setTimeout(() => setApplySuccess(""), 2000); return; }
    await supabase.from("applications").insert({ worker_id: user.id, job_id: jobId, status: "pending" });
    const { data } = await supabase.from("applications").select("*, jobs(title,company,city)").eq("worker_id", user.id);
    setApplications(data || []);
    setApplySuccess("Pieteikums nosūtīts! ✓");
    setTimeout(() => setApplySuccess(""), 2500);
  }

  const initial = profile?.name ? profile.name[0].toUpperCase() : user.email[0].toUpperCase();

  return (
    <div className="screen">
      <div className="nav">
        <div className="nav-logo">Sprint<span>a</span></div>
        <div className="nav-right">
          <div className="badge badge-worker">Darbinieks</div>
          <div className="avatar">{initial}</div>
          <button className="logout-btn" onClick={onLogout}>Iziet</button>
        </div>
      </div>

      {profile && (
        <div className="card" style={{ marginBottom: "16px" }}>
          <div className="profile-header">
            <div className="profile-avatar">{initial}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "18px" }}>{profile.name}</div>
              <div style={{ color: "var(--muted)", fontSize: "13px" }}>📍 {profile.city}</div>
            </div>
          </div>
          <div className="chip-row">
            {(profile.skills || []).map(s => <span key={s} className="chip">{s}</span>)}
          </div>
        </div>
      )}

      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">{jobs.length}</div><div className="stat-label">Vakances</div></div>
        <div className="stat-card"><div className="stat-num">{applications.length}</div><div className="stat-label">Pieteikumi</div></div>
      </div>

      {applySuccess && <div className="alert alert-success">{applySuccess}</div>}

      <div className="tabs">
        <button className={"tab" + (tab === "jobs" ? " active" : "")} onClick={() => setTab("jobs")}>Vakances</button>
        <button className={"tab" + (tab === "applications" ? " active" : "")} onClick={() => setTab("applications")}>Mani pieteikumi</button>
      </div>

      {loading ? (
        <div className="empty-state"><p>Ielādē...</p></div>
      ) : tab === "jobs" ? (
        jobs.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">🔍</div><p>Pagaidām nav aktīvu vacanču.<br />Pārbaudi vēlreiz drīz!</p></div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                <span>🏢 {job.company}</span>
                <span>📍 {job.city}</span>
                {(job.salary_from || job.salary_to) && (
                  <span>💶 {job.salary_from && job.salary_to ? `${job.salary_from}–${job.salary_to}€/h` : `${job.salary_from || job.salary_to}€/h`}</span>
                )}
                {job.duration && <span>⏱ {job.duration}</span>}
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5, marginBottom: "12px" }}>
                {job.description.length > 100 ? job.description.slice(0, 100) + "..." : job.description}
              </p>
              {(job.required_skills || []).length > 0 && (
                <div className="chip-row" style={{ marginBottom: "12px" }}>
                  {job.required_skills.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              )}
              <button className="apply-btn" onClick={() => applyToJob(job.id)}>
                {applications.find(a => a.job_id === job.id) ? "✓ Pieteicies" : "Pieteikties →"}
              </button>
            </div>
          ))
        )
      ) : (
        applications.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📋</div><p>Vēl neesi piesakies nevienai vakancei.<br />Apskata pieejamās vakances!</p></div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="job-card">
              <div className="job-title">{app.jobs?.title}</div>
              <div className="job-meta">
                <span>🏢 {app.jobs?.company}</span>
                <span>📍 {app.jobs?.city}</span>
              </div>
              <div>
                <span className="badge" style={
                  app.status === "accepted" ? { background: "rgba(46,204,113,0.1)", color: "var(--success)", border: "1px solid rgba(46,204,113,0.3)" } :
                  app.status === "rejected" ? { background: "rgba(232,71,71,0.1)", color: "#ff7070", border: "1px solid rgba(232,71,71,0.3)" } :
                  { background: "rgba(255,180,0,0.1)", color: "#ffb400", border: "1px solid rgba(255,180,0,0.3)" }
                }>
                  {app.status === "accepted" ? "✓ Pieņemts" : app.status === "rejected" ? "✕ Noraidīts" : "⏳ Gaida"}
                </span>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

function EmployerDashboard({ user, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [tab, setTab] = useState("jobs");
  const [showPost, setShowPost] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const { data: j } = await supabase.from("jobs").select("*").eq("employer_id", user.id).order("created_at", { ascending: false });
    const jobIds = (j || []).map(x => x.id);
    let a = [];
    if (jobIds.length > 0) {
      const { data } = await supabase.from("applications")
        .select("*, jobs(title,company), worker_profiles(name,city,skills,phone)")
        .in("job_id", jobIds);
      a = data || [];
    }
    setJobs(j || []);
    setApplications(a);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, [user.id]);

  async function updateStatus(appId, status) {
    await supabase.from("applications").update({ status }).eq("id", appId);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  }

  async function deactivateJob(jobId) {
    await supabase.from("jobs").update({ status: "closed" }).eq("id", jobId);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: "closed" } : j));
  }

  const initial = user.email[0].toUpperCase();

  if (showPost) {
    return <PostJob user={user} onSave={() => { setShowPost(false); loadData(); }} onCancel={() => setShowPost(false)} />;
  }

  return (
    <div className="screen">
      <div className="nav">
        <div className="nav-logo">Sprint<span>a</span></div>
        <div className="nav-right">
          <div className="badge badge-employer">Darba devējs</div>
          <div className="avatar">{initial}</div>
          <button className="logout-btn" onClick={onLogout}>Iziet</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-num">{jobs.filter(j => j.status === "active").length}</div>
          <div className="stat-label">Aktīvas vakances</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{applications.length}</div>
          <div className="stat-label">Pieteikumi</div>
        </div>
      </div>

      <button className="btn" style={{ marginBottom: "16px" }} onClick={() => setShowPost(true)}>
        + Publicēt jaunu vakanci
      </button>

      <div className="tabs">
        <button className={"tab" + (tab === "jobs" ? " active" : "")} onClick={() => setTab("jobs")}>Manas vakances</button>
        <button className={"tab" + (tab === "applications" ? " active" : "")} onClick={() => setTab("applications")}>Kandidāti</button>
      </div>

      {loading ? (
        <div className="empty-state"><p>Ielādē...</p></div>
      ) : tab === "jobs" ? (
        jobs.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📝</div><p>Nav publicētu vacanču.<br />Publicē pirmo vakanci!</p></div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="job-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-meta">
                    <span>📍 {job.city}</span>
                    {job.salary_from && <span>💶 {job.salary_from}–{job.salary_to}€/h</span>}
                    <span>{applications.filter(a => a.job_id === job.id).length} pieteikumi</span>
                  </div>
                </div>
                <span className="badge" style={job.status === "active" ? { background: "rgba(46,204,113,0.1)", color: "var(--success)", border: "1px solid rgba(46,204,113,0.3)" } : { background: "var(--bg3)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                  {job.status === "active" ? "Aktīva" : "Slēgta"}
                </span>
              </div>
              {job.status === "active" && (
                <button className="btn-ghost btn btn-sm" style={{ marginTop: "12px" }} onClick={() => deactivateJob(job.id)}>Slēgt vakanci</button>
              )}
            </div>
          ))
        )
      ) : (
        applications.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">👥</div><p>Vēl nav pieteikumu.<br />Kandidāti parādīsies šeit.</p></div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="job-card">
              <div className="job-title">{app.worker_profiles?.name || "Kandidāts"}</div>
              <div className="job-meta">
                <span>📍 {app.worker_profiles?.city}</span>
                <span>💼 {app.jobs?.title}</span>
                {app.worker_profiles?.phone && <span>📞 {app.worker_profiles.phone}</span>}
              </div>
              {(app.worker_profiles?.skills || []).length > 0 && (
                <div className="chip-row" style={{ marginBottom: "12px" }}>
                  {app.worker_profiles.skills.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              )}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {app.status === "pending" ? (
                  <>
                    <button className="apply-btn" onClick={() => updateStatus(app.id, "accepted")} style={{ background: "rgba(46,204,113,0.1)", borderColor: "var(--success)", color: "var(--success)" }}>✓ Pieņemt</button>
                    <button className="apply-btn" onClick={() => updateStatus(app.id, "rejected")} style={{ background: "rgba(232,71,71,0.1)", borderColor: "#ff7070", color: "#ff7070" }}>✕ Noraidīt</button>
                  </>
                ) : (
                  <span className="badge" style={
                    app.status === "accepted" ? { background: "rgba(46,204,113,0.1)", color: "var(--success)", border: "1px solid rgba(46,204,113,0.3)" } :
                    { background: "rgba(232,71,71,0.1)", color: "#ff7070", border: "1px solid rgba(232,71,71,0.3)" }
                  }>
                    {app.status === "accepted" ? "✓ Pieņemts" : "✕ Noraidīts"}
                  </span>
                )}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from("profiles").select("role").eq("id", session.user.id).single().then(({ data }) => {
          if (data?.role) {
            setUser(session.user);
            setRole(data.role);
            setScreen("dashboard");
          }
        });
      }
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    setScreen("onboarding");
    setProfileSaved(false);
  }

  function handleAuth(u, r) {
    setUser(u);
    setRole(r);
    if (r === "worker") {
      setScreen("worker-profile");
    } else {
      setScreen("dashboard");
    }
  }

  function handleProfileSave() {
    setProfileSaved(true);
    setScreen("dashboard");
  }

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {screen === "onboarding" && (
          <Onboarding onSelect={r => { setRole(r); setScreen("auth"); }} />
        )}
        {screen === "auth" && (
          <AuthScreen role={role} onAuth={handleAuth} onBack={() => setScreen("onboarding")} />
        )}
        {screen === "worker-profile" && user && (
          <WorkerProfile user={user} onSave={handleProfileSave} />
        )}
        {screen === "dashboard" && user && role === "worker" && (
          <WorkerDashboard user={user} onLogout={handleLogout} />
        )}
        {screen === "dashboard" && user && role === "employer" && (
          <EmployerDashboard user={user} onLogout={handleLogout} />
        )}
      </div>
    </>
  );
}