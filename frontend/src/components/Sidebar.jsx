function Sidebar({ page, onNavigate }) {
  return <aside className="sidebar"><div className="brand"><div className="brand-mark">F</div>Fokys</div><nav className="nav-group"><div className="nav-label">MAIN MENU</div>{["Dashboard", "Task", "Leads", "Reports"].map((item) => <button key={item} className={`nav-item ${page === item ? "active" : ""}`} onClick={() => onNavigate(item)} aria-current={page === item ? "page" : undefined}>{item}</button>)}</nav></aside>;
}
export default Sidebar;