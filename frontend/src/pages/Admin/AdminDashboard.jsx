import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Icon = ({ path, size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  paid: <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
  pending: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></>
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchGrowthAnalytics();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`);
      setStats(res.data);
    } catch (err) {
      console.error('Stats fetch failed', err);
    }
  };

  const fetchGrowthAnalytics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/analytics/growth`);
      setGrowthData(res.data);
    } catch (err) {
      console.error('Analytics fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading Analytics...</div>;

  const totalPaid = stats ? Object.entries(stats.planDistribution || {}).reduce((acc, [p, v]) => p !== 'free' ? acc + v : acc, 0) : 0;

  return (
    <div className="dashboard-content-v2">
      {/* Stats Grid - Responsive columns */}
      <div className="stats-grid-v2">
        <StatCard 
          label="Total Users" 
          value={stats?.totalUsers || 0} 
          icon={ICONS.users} 
          color="var(--primary)" 
          onClick={() => navigate('/admin/users')}
        />
        <StatCard 
          label="Resumes Created" 
          value={stats?.totalResumes || 0} 
          icon={ICONS.resume} 
          color="#a855f7" 
        />
        <StatCard 
          label="Active Subscriptions" 
          value={totalPaid} 
          icon={ICONS.paid} 
          color="#10b981" 
        />
        <StatCard 
          label="Pending Upgrades" 
          value={stats?.pendingUpgradesCount || 0} 
          icon={ICONS.pending} 
          color="#f59e0b" 
          onClick={() => navigate('/admin/approvals')}
          highlight={stats?.pendingUpgradesCount > 0}
        />
      </div>

      {/* Analytics Row */}
      <div className="analytics-row-v2">
        {/* Growth Chart */}
        <div className="analytics-card-v2 chart-main">
          <div className="card-header-v2">
            <h3 className="card-title-v2">User Growth & Activity</h3>
            <span className="card-subtitle-v2">Last 30 days performance</span>
          </div>
          <div className="chart-container-v2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
                  itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Legend verticalAlign="top" align="right" height={40} />
                <Line type="monotone" dataKey="users" name="Users" stroke="var(--primary)" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-color)' }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="resumes" name="Resumes" stroke="#10b981" strokeWidth={4} dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-color)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Pie Chart */}
        <div className="analytics-card-v2 chart-side">
          <div className="card-header-v2">
            <h3 className="card-title-v2">Plan Distribution</h3>
          </div>
          <div className="pie-container-v2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Free', value: stats?.planDistribution?.free || 0 },
                    { name: 'Premium', value: stats?.planDistribution?.premium || 0 }
                  ]}
                  innerRadius="70%"
                  outerRadius="90%"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="var(--primary)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center-v2">
               <span className="pie-total">{stats?.totalUsers || 0}</span>
               <span className="pie-label">Total Users</span>
            </div>
          </div>
          <div className="pie-legend-v2">
             <div className="legend-item">
                <span className="dot" style={{ background: '#10b981' }}></span>
                <span className="label">Free Users</span>
                <span className="value">{stats?.planDistribution?.free || 0}</span>
             </div>
             <div className="legend-item">
                <span className="dot" style={{ background: 'var(--primary)' }}></span>
                <span className="label">Premium</span>
                <span className="value">{stats?.planDistribution?.premium || 0}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="tables-row-v2">
         <UpgradeRequestsPanel admin={admin} onAction={fetchStats} />
      </div>

      <style>{`
        .dashboard-content-v2 {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .stats-grid-v2 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .analytics-row-v2 {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .analytics-card-v2 {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-2xl);
          padding: 2rem;
          box-shadow: 0 10px 40px -15px rgba(0,0,0,0.3);
        }

        .card-header-v2 {
          margin-bottom: 2rem;
        }

        .card-title-v2 {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
        }

        .card-subtitle-v2 {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .chart-container-v2 {
          height: 350px;
        }

        .pie-container-v2 {
          height: 250px;
          position: relative;
        }

        .pie-center-v2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .pie-total {
          display: block;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
        }

        .pie-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .pie-legend-v2 {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .legend-item .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .legend-item .label {
          font-size: 0.85rem;
          color: var(--text-muted);
          flex: 1;
        }

        .legend-item .value {
          font-weight: 700;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .analytics-row-v2 { grid-template-columns: 1fr; }
          .stats-grid-v2 { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .stats-grid-v2 { grid-template-columns: 1fr; }
          .chart-container-v2 { height: 280px; }
          .analytics-card-v2 { padding: 1.5rem; }
        }

        .admin-loading {
          padding: 4rem;
          text-align: center;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, onClick, highlight }) => (
  <div 
    className={`stat-card-v2 ${highlight ? 'highlight' : ''}`} 
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : 'default' }}
  >
    <div className="stat-icon" style={{ background: `${color}15`, color }}>
      <Icon path={icon} color={color} size={24} />
    </div>
    <div className="stat-info">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
    <style>{`
      .stat-card-v2 {
        background: var(--surface);
        border: 1px solid var(--surface-border);
        border-radius: var(--radius-xl);
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1.25rem;
        transition: all 0.3s ease;
      }
      .stat-card-v2:hover {
        transform: translateY(-5px);
        border-color: var(--primary);
        box-shadow: 0 15px 30px -10px rgba(0,0,0,0.4);
      }
      .stat-card-v2.highlight {
        border-color: #f59e0b;
        background: rgba(245, 158, 11, 0.05);
      }
      .stat-icon {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .stat-value {
        display: block;
        font-size: 1.75rem;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 0.25rem;
      }
      .stat-label {
        font-size: 0.8rem;
        color: var(--text-muted);
        font-weight: 600;
      }
    `}</style>
  </div>
);

const UpgradeRequestsPanel = ({ admin, onAction }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`);
      setRequests(res.data.filter(u => u.requested_plan));
    } catch (err) {
      console.error('Failed to fetch upgrade requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleAction = async (userId, action) => {
    try {
      const endpoint = action === 'approve' ? 'approve-upgrade' : 'reject-upgrade';
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}/${userId}`, {});
      fetchRequests();
      if (onAction) onAction();
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  return (
    <div className="table-card-v2">
      <div className="table-header-v2">
        <h3 className="table-title-v2">Pending Plan Upgrades</h3>
        <span className="badge-v2">{requests.length} Active</span>
      </div>
      
      <div className="table-scroll-v2">
        <table className="admin-table-v2">
          <thead>
            <tr>
              <th>User</th>
              <th>Requested Plan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>All caught up! No pending requests.</td></tr>
            ) : (
              requests.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-profile-v2">
                      <div className="user-avatar-v2">{u.name?.[0]}</div>
                      <div className="user-meta-v2">
                        <span className="user-name-v2">{u.name}</span>
                        <span className="user-email-v2">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-pro">{u.requested_plan?.toUpperCase()}</span></td>
                  <td>
                    <div className="action-group-v2">
                      <button className="btn-approve" onClick={() => handleAction(u.id, 'approve')}>Approve</button>
                      <button className="btn-reject" onClick={() => handleAction(u.id, 'reject')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-card-v2 {
          background: var(--surface);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          box-shadow: 0 10px 40px -15px rgba(0,0,0,0.3);
        }
        .table-header-v2 {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--surface-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .table-title-v2 {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0;
        }
        .badge-v2 {
          background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .table-scroll-v2 {
          overflow-x: auto;
          width: 100%;
        }
        .admin-table-v2 {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table-v2 th {
          background: rgba(var(--bg-rgb), 0.3);
          padding: 1rem 2rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        .admin-table-v2 td {
          padding: 1.25rem 2rem;
          border-bottom: 1px solid var(--surface-border);
        }
        .user-profile-v2 {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .user-avatar-v2 {
          width: 36px;
          height: 36px;
          background: var(--bg-color);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--primary);
        }
        .user-meta-v2 {
          display: flex;
          flex-direction: column;
        }
        .user-name-v2 {
          font-size: 0.9rem;
          font-weight: 700;
        }
        .user-email-v2 {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .action-group-v2 {
          display: flex;
          gap: 0.5rem;
        }
        .btn-approve, .btn-reject {
          padding: 0.5rem 1rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-approve { background: #10b981; color: white; }
        .btn-approve:hover { background: #059669; transform: scale(1.05); }
        .btn-reject { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .btn-reject:hover { background: #ef4444; color: white; transform: scale(1.05); }

        @media (max-width: 768px) {
          .admin-table-v2 th, .admin-table-v2 td { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
