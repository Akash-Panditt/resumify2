import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Icon = ({ path, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  free: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>,
  premium: <><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/><polyline points="12 8 12 12 15 15"/></>,
  admin: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/></>,
  search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
  trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></>,
  revoke: <><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
  lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>,
  unlock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></>
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('User fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const handleUpdatePlan = async (userId, newPlan) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, { plan: newPlan }, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to update plan');
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, { is_blocked: !currentStatus }, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchUsers();
    } catch (err) {
      alert('Failed to update block status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action is irreversible.')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.details || err.response?.data?.message || err.message;
      alert(`Failed to delete user: ${msg}`);
    }
  };

  const handleApproveUpgrade = async (userId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/approve-upgrade/${userId}`, {}, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      alert(res.data.message || 'Upgrade approved successfully');
      fetchUsers();
    } catch (err) {
      console.error('Upgrade approval failed', err);
      const msg = err.response?.data?.message || 'Failed to approve upgrade. Check backend logs.';
      alert(`Error: ${msg}`);
    }
  };

  const handleRejectUpgrade = async (userId) => {
    if (!window.confirm('Are you sure you want to reject this upgrade request?')) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/reject-upgrade/${userId}`, {}, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert('Failed to reject upgrade');
    }
  };

  const handleRevokeSubscription = async (userId) => {
    if (!window.confirm('Are you sure you want to revoke this user\'s subscription? They will be downgraded to the Free tier immediately.')) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/revoke-subscription/${userId}`, {}, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert('Failed to revoke subscription');
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || u.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Users...</div>;

  const stats = {
    total: users.length,
    free: users.filter(u => u.plan === 'free').length,
    paid: users.filter(u => ['basic', 'pro', 'premium'].includes(u.plan)).length,
    admins: users.filter(u => u.role === 'admin').length
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>User Management</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage all {stats.total} registered accounts, roles, and plan tiers.</p>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 100%, 1fr), 1fr))', 
        gap: '1rem', 
        marginBottom: '2.5rem' 
      }}>
        <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(107, 114, 128, 0.1)', color: 'var(--text-muted)', borderRadius: '10px', display: 'flex' }}>
            <Icon path={ICONS.free} size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.free}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Free Users</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '10px', display: 'flex' }}>
            <Icon path={ICONS.premium} size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.paid}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Paid Users</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '10px', display: 'flex' }}>
            <Icon path={ICONS.admin} size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{stats.admins}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admins</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface)' }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }}>
            <Icon path={ICONS.search} size={16} />
          </div>
          <input 
            type="text" 
            className="form-input" 
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Search accounts by name or email..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>
            <Icon path={ICONS.filter} size={16} />
          </div>
          <select 
            className="form-input" 
            style={{ minWidth: '160px' }}
            value={filterPlan} 
            onChange={(e) => setFilterPlan(e.target.value)}
          >
            <option value="all">All Plan Tiers</option>
            <option value="free">Free</option>
            <option value="basic">Basic (1mo)</option>
            <option value="pro">Pro (1yr)</option>
            <option value="premium">Premium (Legacy)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="data-table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Plan</th>
                <th>Role</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td data-label="User">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        background: u.role === 'admin' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                        color: u.role === 'admin' ? '#ef4444' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        flexShrink: 0
                      }}>
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td data-label="Status">
                    {u.role === 'admin' ? (
                      <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>ADMIN</span>
                    ) : u.is_blocked ? (
                      <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>BLOCKED</span>
                    ) : u.requested_plan ? (
                      <span className="badge badge-warning" style={{ fontSize: '0.65rem', animation: 'pulse 2s infinite' }}>PENDING</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.8rem', fontWeight: '500' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                        Active
                      </div>
                    )}
                  </td>
                  <td data-label="Plan">
                    {u.role === 'admin' ? (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>—</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`badge ${['basic', 'pro', 'premium'].includes(u.plan) ? 'badge-purple' : ''}`} style={{ fontSize: '0.65rem', textTransform: 'uppercase', minWidth: '60px', textAlign: 'center', background: u.plan === 'free' ? 'rgba(107, 114, 128, 0.1)' : undefined, color: u.plan === 'free' ? 'var(--text-muted)' : undefined }}>
                          {u.plan}
                        </span>
                        <select 
                          value={u.plan} 
                          className="form-input" 
                          style={{ padding: '0.15rem 0.3rem', fontSize: '0.75rem', width: '24px', opacity: 0.5, border: 'none', background: 'transparent' }}
                          onChange={(e) => handleUpdatePlan(u.id, e.target.value)}
                        >
                          <option value="free">Free</option>
                          <option value="basic">Basic</option>
                          <option value="pro">Pro</option>
                          <option value="premium">Premium</option>
                        </select>
                      </div>
                    )}
                  </td>
                  <td data-label="Role">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-secondary'}`} style={{ fontSize: '0.65rem' }}>
                        {u.role.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td data-label="Joined" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(u.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td data-label="Actions" style={{ textAlign: 'right' }}>
                    {u.role !== 'super_admin' && u.id !== admin.id && (
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        {u.requested_plan && (
                          <button 
                            className="btn btn-primary action-btn" 
                            onClick={() => handleApproveUpgrade(u.id)}
                            title="Approve Upgrade"
                          >
                            <Icon path={ICONS.check} size={16} color="white" />
                          </button>
                        )}
                        
                        {u.plan !== 'free' && (
                          <button 
                            className="btn btn-warning action-btn" 
                            style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)' }} 
                            onClick={() => handleRevokeSubscription(u.id)}
                            title="Revoke subscription"
                          >
                            <Icon path={ICONS.revoke} size={16} color="#f59e0b" />
                          </button>
                        )}

                        <button 
                          className="btn btn-secondary action-btn" 
                          onClick={() => handleToggleBlock(u.id, u.is_blocked)}
                          title={u.is_blocked ? "Unblock User" : "Block User"}
                        >
                          <Icon path={u.is_blocked ? ICONS.unlock : ICONS.lock} size={16} color={u.is_blocked ? '#10b981' : '#f59e0b'} />
                        </button>

                        <button 
                          className="btn btn-danger action-btn" 
                          style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }} 
                          onClick={() => handleDeleteUser(u.id)}
                          title="Delete User"
                        >
                          <Icon path={ICONS.trash} size={16} color="#ef4444" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No users found matching your criteria.
          </div>
        )}
      </div>

      <style>{`
        .action-btn {
          padding: 0.5rem;
          border-radius: 10px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          min-width: 36px;
          min-height: 36px;
        }

        @media (max-width: 768px) {
          .data-table-responsive thead {
            display: none;
          }
          .data-table-responsive tr {
            display: block;
            margin-bottom: 1rem;
            border: 1px solid var(--surface-border);
            border-radius: 12px;
            padding: 1rem;
            background: rgba(255,255,255,0.02);
          }
          .data-table-responsive td {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 0 !important;
            border: none !important;
            text-align: left !important;
          }
          .data-table-responsive td::before {
            content: attr(data-label);
            font-weight: 600;
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
          }
          .data-table-responsive td[data-label="Actions"] {
            margin-top: 0.5rem;
            padding-top: 1rem !important;
            border-top: 1px solid var(--surface-border) !important;
            justify-content: flex-end;
          }
          .data-table-responsive td[data-label="Actions"]::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
