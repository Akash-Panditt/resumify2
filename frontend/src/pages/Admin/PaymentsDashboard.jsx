import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Icon = ({ path, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

const ICONS = {
  money: <><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></>,
  alert: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
  check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  razorpay: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  stripe: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>
};

const PaymentsDashboard = () => {
  const [paymentsData, setPaymentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem('resumify_admin') || '{}');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/payments', {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setPaymentsData(res.data);
    } catch (err) {
      console.error('Failed to fetch payments data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Financial Records...</div>;
  
  if (!paymentsData) return <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--error)' }}>Failed to load payment records.</div>;

  const records = paymentsData.records || [];
  
  // Calculate top-level stats
  const totalRevenue = records.filter(r => r.status === 'success').reduce((acc, curr) => acc + curr.amount, 0);
  const successfulTx = records.filter(r => r.status === 'success').length;
  const failedTx = records.filter(r => r.status === 'failed').length;

  // Prepare chart data aggregating revenue by date
  const revenueByDate = {};
  records.filter(r => r.status === 'success').forEach(r => {
    const dStr = new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!revenueByDate[dStr]) revenueByDate[dStr] = 0;
    revenueByDate[dStr] += r.amount;
  });
  
  // Sort and format for Recharts
  const chartData = Object.entries(revenueByDate)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Revenue & Transactions</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Monitor incoming subscription revenues and gateway status.
            {paymentsData.source === 'mocked' && (
              <span className="badge badge-warning" style={{ marginLeft: '1rem', fontSize: '0.65rem' }}>SIMULATED DATA</span>
            )}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px' }}>
            <Icon path={ICONS.money} size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{totalRevenue.toLocaleString()}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gross Revenue (Period)</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '12px' }}>
            <Icon path={ICONS.check} size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{successfulTx}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Successful Payments</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px' }}>
            <Icon path={ICONS.alert} size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{failedTx}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Failed / Declined</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card" style={{ height: '400px', paddingBottom: '3.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Revenue Intake Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-muted)" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                minTickGap={80}
                interval="preserveStartEnd"
                tick={{ dy: 15 }}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                width={65}
              />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="total" stroke="#10b981" fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Recent Transactions</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Gateway</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id}>
                  <td>
                    <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{r.id.split('_').pop().toUpperCase()}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{r.user?.name || 'Unknown'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.user?.email || 'N/A'}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>₹{r.amount}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{r.currency}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ padding: '0.3rem', background: 'var(--surface-hover)', borderRadius: '6px', color: 'var(--text-muted)' }}>
                        <Icon path={r.gateway === 'razorpay' ? ICONS.razorpay : ICONS.stripe} size={14} />
                      </span>
                      <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{r.gateway}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${r.status === 'success' ? 'badge-success' : 'badge-danger'}`}>
                      {r.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {new Date(r.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsDashboard;
