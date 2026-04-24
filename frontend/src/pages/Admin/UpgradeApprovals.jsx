import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Icon = ({ path, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  check: <polyline points="20 6 9 17 4 12" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  revoke: <><path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>
};

const UpgradeApprovals = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminValue = JSON.parse(localStorage.getItem('resumify_admin') || '{}');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${adminValue.token}` }
      });
      // Filter for non-admin users who have a pending request OR are already paid users
      setUsers(res.data.filter(u => u.role !== 'admin' && (u.requested_plan || u.plan !== 'free')));
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      let endpoint = '';
      if (action === 'approve') endpoint = `approve-upgrade/${userId}`;
      else if (action === 'reject') endpoint = `reject-upgrade/${userId}`;
      else if (action === 'revoke') endpoint = `revoke-subscription/${userId}`;

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}`, {}, {
        headers: { Authorization: `Bearer ${adminValue.token}` }
      });
      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      alert(`Action failed: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Approval Queue...</div>;

  const pendingRequests = users.filter(u => u.requested_plan);
  const activeSubscriptions = users.filter(u => !u.requested_plan && u.plan !== 'free');

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Subscription & Approvals</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage incoming upgrade requests and existing premium members.</p>
      </div>

      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#ef4444', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Icon path={ICONS.x} color="#ef4444" />
          {error}
        </div>
      )}

      {/* Pending Upgrades Section */}
      <div className="card" style={{ marginBottom: '2.5rem', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <Icon path={ICONS.clock} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Pending Upgrade Requests</h3>
          </div>
          <span className="badge badge-warning" style={{ fontSize: '0.85rem' }}>{pendingRequests.length} New Requests</span>
        </div>

        {pendingRequests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <Icon path={ICONS.check} size={48} color="var(--success)" />
            </div>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Queue Cleared</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All upgrade requests have been processed.</p>
          </div>
        ) : (
          <div className="data-table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Requested Tier</th>
                  <th>Current Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map(u => (
                  <tr key={u.id}>
                    <td data-label="User">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '10px', 
                          background: 'rgba(99, 102, 241, 0.1)', 
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          flexShrink: 0
                        }}>
                          {u.name.charAt(0)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: '600', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Requested Tier">
                      <span className={`badge ${['premium', 'pro', 'basic'].includes(u.requested_plan) ? 'badge-purple' : 'badge-primary'}`} style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {u.requested_plan}
                      </span>
                    </td>
                    <td data-label="Current Status">
                      <span className="badge badge-secondary" style={{ textTransform: 'capitalize' }}>
                        {u.plan} User
                      </span>
                    </td>
                    <td data-label="Actions" style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button 
                          className="btn btn-primary action-btn-text" 
                          onClick={() => handleAction(u.id, 'approve')}
                        >
                          <Icon path={ICONS.check} size={14} color="white" /> Approve
                        </button>
                        <button 
                          className="btn btn-secondary action-btn-text" 
                          onClick={() => handleAction(u.id, 'reject')}
                        >
                          <Icon path={ICONS.x} size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Subscriptions Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px' }}>
              <Icon path={ICONS.user} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Active Premium Members</h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activeSubscriptions.length} Members</span>
        </div>

        {activeSubscriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No active premium subscriptions.</div>
        ) : (
          <div className="data-table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Active Plan</th>
                  <th>Expiration Date</th>
                  <th style={{ textAlign: 'right' }}>Management</th>
                </tr>
              </thead>
              <tbody>
                {activeSubscriptions.map(u => (
                  <tr key={u.id}>
                    <td data-label="User">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '8px', 
                          background: 'var(--surface-hover)', 
                          color: 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          flexShrink: 0
                        }}>
                          {u.name.charAt(0)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Active Plan">
                      <span className={`badge ${['premium', 'pro', 'basic'].includes(u.plan) ? 'badge-purple' : 'badge-primary'}`} style={{ textTransform: 'capitalize' }}>
                        {u.plan}
                      </span>
                    </td>
                    <td data-label="Expiration Date" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {u.expires_at ? new Date(u.expires_at).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'Lifetime Access'}
                    </td>
                    <td data-label="Management" style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-danger action-btn-text" 
                        style={{ background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                        onClick={() => handleAction(u.id, 'revoke')}
                      >
                        <Icon path={ICONS.revoke} size={14} color="#ef4444" /> Revoke access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .action-btn-text {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          min-height: 38px;
          border-radius: 10px;
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
          .data-table-responsive td:last-child {
            margin-top: 0.5rem;
            padding-top: 1rem !important;
            border-top: 1px solid var(--surface-border) !important;
            justify-content: flex-end;
          }
          .data-table-responsive td:last-child::before {
            display: none;
          }
          .action-btn-text {
            padding: 0.6rem 0.8rem;
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default UpgradeApprovals;
