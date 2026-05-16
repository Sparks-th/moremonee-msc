import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { registerAmbassador } from '../api/auth';
import { ApiError } from '../api/http';
import { fetchAllUniversities } from '../api/universities';
import { useAuth } from '../auth/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import { EXTERNAL_URLS } from '../config/env';
import type { University } from '../types/auth';

const MAX_ASPIRATION_WORDS = 120;

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuthFromLogin, isAuthenticated } = useAuth();

  const [universities, setUniversities] = useState<University[]>([]);
  const [uniLoading, setUniLoading] = useState(true);
  const [schoolQuery, setSchoolQuery] = useState('');
  const [selectedUniversityId, setSelectedUniversityId] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [aspirations, setAspirations] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const wordCount = countWords(aspirations);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let cancelled = false;
    fetchAllUniversities()
      .then((list) => {
        if (!cancelled) setUniversities(list);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load universities. Refresh to try again.');
      })
      .finally(() => {
        if (!cancelled) setUniLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUniversities = useMemo(() => {
    const q = schoolQuery.trim().toLowerCase();
    if (!q) return universities.slice(0, 12);
    return universities
      .filter((u) => u.name.toLowerCase().includes(q))
      .slice(0, 12);
  }, [schoolQuery, universities]);

  const selectedUniversity = universities.find((u) => u.id === selectedUniversityId);

  function handleSchoolPick(uni: University) {
    setSelectedUniversityId(uni.id);
    setSchoolQuery(uni.name);
  }

  function handleAspirationsChange(value: string) {
    const words = countWords(value);
    if (words <= MAX_ASPIRATION_WORDS) setAspirations(value);
    else {
      const trimmed = value.trim().split(/\s+/).slice(0, MAX_ASPIRATION_WORDS).join(' ');
      setAspirations(trimmed);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selectedUniversityId) {
      setError('Please select your school from the list.');
      return;
    }
    if (wordCount > MAX_ASPIRATION_WORDS) {
      setError(`Future aspirations must be ${MAX_ASPIRATION_WORDS} words or fewer.`);
      return;
    }

    setLoading(true);
    try {
      const response = await registerAmbassador({
        username,
        password,
        university: selectedUniversityId,
        department,
        level,
        matric_number: matricNumber,
        future_aspirations: aspirations,
        signup_referral_code: referralCode || undefined,
      });
      setAuthFromLogin(response);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

  return (
    <AuthLayout
      title="Join Our Student Community"
      subtitle="Join 10,000+ students already earning with Moremonee."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </p>
        )}

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Account No / Phone No / Email Address *
          </span>
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
        </label>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          No Moremonee account yet?{' '}
          <a
            href={EXTERNAL_URLS.moremoneeApp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Click here to get the Moremonee app now!
          </a>
        </p>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Password *
          </span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            School *
          </span>
          <input
            type="text"
            required
            value={schoolQuery}
            onChange={(e) => {
              setSchoolQuery(e.target.value);
              setSelectedUniversityId('');
            }}
            className={inputClass}
            placeholder={uniLoading ? 'Loading universities…' : 'Search across all universities…'}
            autoComplete="off"
          />
          {filteredUniversities.length > 0 && schoolQuery && !selectedUniversity && (
            <ul className="mt-1 max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              {filteredUniversities.map((uni) => (
                <li key={uni.id}>
                  <button
                    type="button"
                    onClick={() => handleSchoolPick(uni)}
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {uni.name}
                    <span className="ml-1 text-xs text-slate-400">· {uni.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {selectedUniversity && (
            <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              Selected: {selectedUniversity.name}
            </p>
          )}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Department *
          </span>
          <input
            type="text"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={inputClass}
            placeholder="e.g. Computer Science"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Level *
          </span>
          <input
            type="text"
            required
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={inputClass}
            placeholder="e.g. 100 Level"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Matric Number *
          </span>
          <input
            type="text"
            required
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            className={inputClass}
            placeholder="Enter matric number"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            <span>Future Aspirations *</span>
            <span className="font-mono normal-case text-slate-400">
              {wordCount}/{MAX_ASPIRATION_WORDS} words
            </span>
          </span>
          <textarea
            required
            rows={4}
            value={aspirations}
            onChange={(e) => handleAspirationsChange(e.target.value)}
            className={inputClass}
            placeholder="Tell us"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            Referral Code (Optional)
          </span>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className={inputClass}
            placeholder="Enter referral code if you have one"
          />
        </label>

        <button
          type="submit"
          disabled={loading || uniLoading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A1931] py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Join Community
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already joined?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
