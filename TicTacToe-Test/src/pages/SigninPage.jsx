import React, { useState } from 'react';
import { signin } from '../api/auth';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function SigninPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signin(form);
      // Be tolerant about fields naming in backend response:
      const items = res.data?.data?.items || res.data?.data;
      const token = items?.token || items?.accessToken || items?.token;
      if (!token) {
        // In some flows when 2FA enabled, backend returns _user and not token
        if (items && items._user) {
          alert('2FA enabled for this user. Please complete 2FA flow.');
          // handle 2FA flow separately (not in this no-2fa integration)
          setLoading(false);
          return;
        }
        throw new Error('Token not found in response');
      }
      localStorage.setItem('accesstoken', token);
      alert('Signed in successfully');
      navigate('/game');
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert(err?.response?.data?.error?.message || err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sign in</h2>
      <form onSubmit={handleSignin} style={{ display: 'grid', gap: 12 }}>
        <FormInput placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <FormInput placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} />
        <Button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</Button>
        <div style={{ fontSize: 13, color: '#555' }}>
          New here? <a href="/signup">Create account</a>
        </div>
      </form>
    </div>
  );
}
