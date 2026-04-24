import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Icon = ({ path, size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
  paid: <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
  pending: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></>,
  admin: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
      const res = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      setStats(res.data);
    } catch (err) {
      console.error('Stats fetch failed', err);
    }
  };

  const fetchGrowthAnalytics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/analytics/growth', {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      setGrowthData(res.data);
    } catch (err) {
      console.error('Analytics fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Statistics...</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Dashboard Overview</h2>
        <p style={{ color: 'var(--text-muted)' }}>Key platform metrics and user distribution.</p>
      </div>

      {stats && (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 100%, 240px), 1fr))', 
            gap: '1.5rem', 
            marginBottom: '3rem' 
          }}>
            <div 
              className="stat-card" 
              style={{ cursor: 'pointer', padding: 'clamp(1rem, 2vw, 1.5rem)' }} 
              onClick={() => navigate('/admin/users')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="stat-value" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>{stats.totalUsers}</div>
                <Icon path={ICONS.users} color="var(--primary)" />
              </div>
              <div className="stat-label" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>Total Registered Users</div>
            </div>
            <div className="stat-card" style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="stat-value" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>{stats.totalResumes}</div>
                <Icon path={ICONS.resume} color="var(--primary)" />
              </div>
              <div className="stat-label" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>Resumes Created</div>
            </div>
            <div className="stat-card" style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="stat-value" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
                  {Object.entries(stats.planDistribution || {}).reduce((acc, [p, v]) => p !== 'free' ? acc + v : acc, 0)}
                </div>
                <Icon path={ICONS.paid} color="#10b981" />
              </div>
              <div className="stat-label" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>Total Paid Subscriptions</div>
            </div>
            <div 
              className="stat-card" 
              style={{ cursor: 'pointer', position: 'relative', padding: 'clamp(1rem, 2vw, 1.5rem)' }} 
              onClick={() => navigate('/admin/approvals')}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="stat-value" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>{stats.pendingUpgradesCount || 0}</div>
                <Icon path={ICONS.pending} color="#f59e0b" />
              </div>
              <div className="stat-label" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>Pending Upgrades</div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 100%, 1fr), 1fr))', 
            gap: '2rem', 
            marginBottom: '3rem' 
          }}>
            <div className="card" style={{ minHeight: '400px', padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)' }}>30-Day Growth Analytics</h3>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={10} tick={{ fill: 'var(--text-muted)' }} />
                    <YAxis stroke="var(--text-muted)" fontSize={10} tick={{ fill: 'var(--text-muted)' }} />
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }} />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="users" name="New Users" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="resumes" name="Resumes Created" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.1rem, 3vw, 1.25rem)' }}>Plan Distribution</h3>
              <div style={{ flex: 1, position: 'relative', minHeight: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Free', value: stats.planDistribution?.free || 0 },
                        { name: 'Premium', value: stats.planDistribution?.premium || 0 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#14b8a6" />
                      <Cell fill="#818cf8" />
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const { name, value } = payload[0].payload;
                          const pct = ((value / stats.totalUsers) * 100).toFixed(0);
                          return (
                            <div style={{ background: 'rgba(15,23,42,0.95)', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{value} users · {pct}%</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, background: 'linear-gradient(135deg, #14b8a6, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stats.totalUsers}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Total</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#14b8a6' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free</span>
                  </div>
                  <strong style={{ fontSize: '1.1rem' }}>{stats.planDistribution?.free || 0}</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Premium</span>
                  </div>
                  <strong style={{ fontSize: '1.1rem' }}>{stats.planDistribution?.premium || 0}</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 100%, 1fr), 1fr))', 
            gap: '2rem', 
            marginBottom: '3rem' 
          }}>
            <UpgradeRequestsPanel admin={admin} onAction={fetchStats} />
            <PremiumRequestsPanel admin={admin} />
          </div>
        </>
      )}
    </div>
  );
};

const PremiumRequestsPanel = ({ admin }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/premium-requests', {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch premium requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const notes = prompt("Admin notes for this update:");
      await axios.put(`http://localhost:5000/api/admin/premium-requests/${id}`, { status, admin_notes: notes }, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      fetchRequests();
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div className="card">Loading Pro Service Requests...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Premium Tier Service Requests</h3>
        <span className="badge badge-purple">{requests.filter(r => r.status === 'pending').length} Action Required</span>
      </div>
      
      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No active Premium service requests.</div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{r.user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.user?.email}</div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{r.type.replace('_', ' ')}</td>
                  <td style={{ fontSize: '0.85rem' }}>{r.request_data?.domain || 'Full Review'}</td>
                  <td>
                    <span className={`badge ${r.status === 'completed' ? 'badge-success' : r.status === 'pending' ? 'badge-primary' : 'badge-purple'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => handleUpdateStatus(r.id, 'in_progress')}>Start</button>
                      <button className="btn btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => handleUpdateStatus(r.id, 'completed')}>Complete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

const UpgradeRequestsPanel = ({ admin, onAction }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      // Filter only users with a pending request
      setRequests(res.data.filter(u => u.requested_plan));
    } catch (err) {
      console.error('Failed to fetch upgrade requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      const endpoint = action === 'approve' ? 'approve-upgrade' : 'reject-upgrade';
      const res = await axios.post(`http://localhost:5000/api/admin/${endpoint}/${userId}`, {}, {
        headers: { 'Authorization': `Bearer ${admin.token}` }
      });
      alert(res.data.message);
      fetchRequests();
      if (onAction) onAction();
    } catch (err) {
      alert(`Action failed: ${err.response?.data?.message || 'Error'}`);
    }
  };

  if (loading) return <div className="card">Loading Upgrade Requests...</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Pending Upgrade Requests</h3>
        <span className="badge badge-warning">{requests.length} New</span>
      </div>
      
      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No pending plan upgrades.</div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Requested Plan</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(u => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{u.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className="badge badge-primary">{u.requested_plan.toUpperCase()}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-success" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => handleAction(u.id, 'approve')}>Approve</button>
                      <button className="btn btn-danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }} onClick={() => handleAction(u.id, 'reject')}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
