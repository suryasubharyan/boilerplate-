import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyCode } from '../api/codeVerification';
import FormInput from '../components/FormInput';
import Button from '../components/Button';

export default function Verify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || '';
  const [verificationId, setVerificationId] = useState(state?.verificationId || '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!verificationId) return alert('Please request code first (or paste verification id).');
    setLoading(true);
    try {
      await verifyCode({ _codeVerification: verificationId, code });
      alert('Verified! You can sign in now.');
      navigate('/signin');
    } catch (err) {
      console.error(err?.response?.data || err.message);
      alert(err?.response?.data?.error?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Verify account</h2>
      <div style={{ fontSize: 14, color: '#444' }}>Email: {email}</div>
      <form onSubmit={handleVerify} style={{ display: 'grid', gap: 10 }}>
        <FormInput placeholder="Verification ID (paste here)" value={verificationId} onChange={(e) => setVerificationId(e.target.value)} />
        <FormInput placeholder="Enter code from email" value={code} onChange={(e) => setCode(e.target.value)} />
        <Button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</Button>
      </form>
    </div>
  );
}
