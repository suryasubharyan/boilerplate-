import React, { useState } from 'react';
import { signup } from '../api/auth';
import { requestVerification } from '../api/codeVerification';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signup(form);
      // optional: res.data.data.item contains created user info
      // request verification for email
      const req = await requestVerification({ email: form.email, via: 'code', purpose: 'PRE_SIGNUP' });
      const verificationId = req.data?.data?.item?._id;
      alert('Signup OK — verification code sent to email.');
      // send email and verificationId to next page via state
      navigate('/verify', { state: { email: form.email, verificationId } });
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert(err?.response?.data?.error?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sign up</h2>
      <form onSubmit={handleSignup} style={{ display: 'grid', gap: 12 }}>
        <FormInput placeholder="First name" name="firstName" value={form.firstName} onChange={handleChange} />
        <FormInput placeholder="Last name" name="lastName" value={form.lastName} onChange={handleChange} />
        <FormInput placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <FormInput placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
        <div style={{ fontSize: 13, color: '#555' }}>
          Already have an account? <a href="/signin">Sign in</a>
        </div>
      </form>
    </div>
  );
}
