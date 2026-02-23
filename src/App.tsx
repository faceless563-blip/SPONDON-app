import { useState, useEffect } from 'react';
import { Swords, Sun, Moon, MoreVertical, X, Check, Bot, ChevronRight, LayoutDashboard, History, Palette, MousePointerClick } from 'lucide-react';

const initialSubjects = [
  'Bangla',
  'English',
  'Science',
  'Mathematics',
  'Bangladesh and Global Studies',
];

const terms = ['First Term Exam', 'Second Term Exam', 'Third Term Exam'];
const allClasses = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

const buildInitialMarks = (subjects: string[]) => {
  const state: Record<string, Record<string, Record<string, { total: number; obtained: number }>>> = {};
  allClasses.forEach(cls => {
    state[cls] = terms.reduce((acc, term) => ({
      ...acc,
      [term]: subjects.reduce((subAcc, subject) => ({
        ...subAcc,
        [subject]: { total: 100, obtained: 0 },
      }), {}),
    }), {});
  });
  return state;
};

const buildInitialRanks = () => {
  const state: Record<string, Record<string, string>> = {};
  allClasses.forEach(cls => {
    state[cls] = terms.reduce((acc, term) => ({ ...acc, [term]: '' }), {});
  });
  return state;
};

const themeColors = {
  ocean: {
    '--theme-primary-50': '#ecfeff', '--theme-primary-100': '#cffafe', '--theme-primary-200': '#a5f3fc', '--theme-primary-300': '#67e8f9', '--theme-primary-400': '#22d3ee', '--theme-primary-500': '#06b6d4', '--theme-primary-600': '#0891b2', '--theme-primary-700': '#0e7490', '--theme-primary-800': '#155e75', '--theme-primary-900': '#164e63',
    '--theme-secondary-50': '#eff6ff', '--theme-secondary-100': '#dbeafe', '--theme-secondary-200': '#bfdbfe', '--theme-secondary-300': '#93c5fd', '--theme-secondary-400': '#60a5fa', '--theme-secondary-500': '#3b82f6', '--theme-secondary-600': '#2563eb', '--theme-secondary-700': '#1d4ed8', '--theme-secondary-800': '#1e40af', '--theme-secondary-900': '#1e3a8a',
  },
  aurora: {
    '--theme-primary-50': '#ecfdf5', '--theme-primary-100': '#d1fae5', '--theme-primary-200': '#a7f3d0', '--theme-primary-300': '#6ee7b7', '--theme-primary-400': '#34d399', '--theme-primary-500': '#10b981', '--theme-primary-600': '#059669', '--theme-primary-700': '#047857', '--theme-primary-800': '#065f46', '--theme-primary-900': '#064e3b',
    '--theme-secondary-50': '#f0fdfa', '--theme-secondary-100': '#ccfbf1', '--theme-secondary-200': '#99f6e4', '--theme-secondary-300': '#5eead4', '--theme-secondary-400': '#2dd4bf', '--theme-secondary-500': '#14b8a6', '--theme-secondary-600': '#0d9488', '--theme-secondary-700': '#0f766e', '--theme-secondary-800': '#115e59', '--theme-secondary-900': '#134e4a',
  },
  sunset: {
    '--theme-primary-50': '#fff1f2', '--theme-primary-100': '#ffe4e6', '--theme-primary-200': '#fecdd3', '--theme-primary-300': '#fda4af', '--theme-primary-400': '#fb7185', '--theme-primary-500': '#f43f5e', '--theme-primary-600': '#e11d48', '--theme-primary-700': '#be123c', '--theme-primary-800': '#9f1239', '--theme-primary-900': '#881337',
    '--theme-secondary-50': '#fff7ed', '--theme-secondary-100': '#ffedd5', '--theme-secondary-200': '#fed7aa', '--theme-secondary-300': '#fdba74', '--theme-secondary-400': '#fb923c', '--theme-secondary-500': '#f97316', '--theme-secondary-600': '#ea580c', '--theme-secondary-700': '#c2410c', '--theme-secondary-800': '#9a3412', '--theme-secondary-900': '#7c2d12',
  },
  nebula: {
    '--theme-primary-50': '#f5f3ff', '--theme-primary-100': '#ede9fe', '--theme-primary-200': '#ddd6fe', '--theme-primary-300': '#c4b5fd', '--theme-primary-400': '#a78bfa', '--theme-primary-500': '#8b5cf6', '--theme-primary-600': '#7c3aed', '--theme-primary-700': '#6d28d9', '--theme-primary-800': '#5b21b6', '--theme-primary-900': '#4c1d95',
    '--theme-secondary-50': '#fdf4ff', '--theme-secondary-100': '#fae8ff', '--theme-secondary-200': '#f5d0fe', '--theme-secondary-300': '#f0abfc', '--theme-secondary-400': '#e879f9', '--theme-secondary-500': '#d946ef', '--theme-secondary-600': '#c026d3', '--theme-secondary-700': '#a21caf', '--theme-secondary-800': '#86198f', '--theme-secondary-900': '#701a75',
  },
  midnight: {
    '--theme-primary-50': '#eef2ff', '--theme-primary-100': '#e0e7ff', '--theme-primary-200': '#c7d2fe', '--theme-primary-300': '#a5b4fc', '--theme-primary-400': '#818cf8', '--theme-primary-500': '#6366f1', '--theme-primary-600': '#4f46e5', '--theme-primary-700': '#4338ca', '--theme-primary-800': '#3730a3', '--theme-primary-900': '#312e81',
    '--theme-secondary-50': '#faf5ff', '--theme-secondary-100': '#f3e8ff', '--theme-secondary-200': '#e9d5ff', '--theme-secondary-300': '#d8b4fe', '--theme-secondary-400': '#c084fc', '--theme-secondary-500': '#a855f7', '--theme-secondary-600': '#9333ea', '--theme-secondary-700': '#7e22ce', '--theme-secondary-800': '#6b21a8', '--theme-secondary-900': '#581c87',
  },
} as const;

type ThemeName = keyof typeof themeColors;

export default function App() {
  const [onboardingStep, setOnboardingStep] = useState(() => {
    return localStorage.getItem('schoolFightOnboardingDone') ? 0 : 1;
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('schoolFightUserName') || 'Spondon';
  });
  const [demoMarks, setDemoMarks] = useState('');
  const [hasPickedTheme, setHasPickedTheme] = useState(false);
  const [subjects] = useState(initialSubjects);
  const [marks, setMarks] = useState(buildInitialMarks(subjects));
  const [ranks, setRanks] = useState(buildInitialRanks());
  const [activeTerm, setActiveTerm] = useState<string | null>(terms[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState<ThemeName>('ocean');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'Overview' | 'Results History'>('Overview');
  const [selectedClass, setSelectedClass] = useState('Class 6');

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Dark Mode
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply Theme Colors directly to the root element so Tailwind picks them up globally
    const colors = themeColors[theme];
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isDarkMode, theme]);

  const handleMarksChange = (term: string, subject: string, type: 'total' | 'obtained', value: string) => {
    setMarks(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [term]: {
          ...prev[selectedClass][term],
          [subject]: {
            ...prev[selectedClass][term][subject],
            [type]: parseInt(value) || 0
          }
        }
      }
    }));
  };

  const handleRankChange = (term: string, value: string) => {
    setRanks(prev => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [term]: value
      }
    }));
  };

  const calculateResults = (term: string) => {
    const termMarks = marks[selectedClass][term];
    if (!termMarks) return { percentage: 0, grade: 'N/A' };
    const totalMarks = Object.values(termMarks).reduce((acc, { total }) => acc + total, 0);
    const obtainedMarks = Object.values(termMarks).reduce((acc, { obtained }) => acc + obtained, 0);
    if (totalMarks === 0) return { percentage: 0, grade: 'N/A' };
    const percentage = (obtainedMarks / totalMarks) * 100;
    let grade = '';
    if (percentage >= 80) grade = 'A+';
    else if (percentage >= 70) grade = 'A';
    else if (percentage >= 60) grade = 'A-';
    else if (percentage >= 50) grade = 'B';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 33) grade = 'D';
    else grade = 'F';
    return { percentage: percentage.toFixed(2), grade };
  };

  const getSubjectGrade = (obtained: number, total: number) => {
    if (total === 0) return 'N/A';
    const percentage = (obtained / total) * 100;
    if (percentage >= 80) return 'A+';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'A-';
    if (percentage >= 50) return 'B';
    if (percentage >= 40) return 'C';
    if (percentage >= 33) return 'D';
    return 'F';
  };

  const completeOnboarding = () => {
    localStorage.setItem('schoolFightOnboardingDone', 'true');
    localStorage.setItem('schoolFightUserName', userName || 'Student');
    if (!userName) setUserName('Student');
    setOnboardingStep(0);
  };

  if (onboardingStep > 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 transition-colors duration-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-2xl w-full bg-white/10 dark:bg-slate-900/60 p-8 sm:p-12 rounded-[3rem] border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl relative z-10 overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`h-1.5 rounded-full transition-all duration-500 ${step === onboardingStep ? 'w-8 bg-white' : step < onboardingStep ? 'w-4 bg-white/50' : 'w-4 bg-white/20'}`} />
            ))}
          </div>

          <div className="mt-8">
            {/* Step 1: Welcome & Name */}
            {onboardingStep === 1 && (
              <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700 slide-in-from-bottom-8">
                <div className="relative mb-10 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Swords className="w-14 h-14 text-white" />
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Fight?</span>
                </h1>
                <p className="text-lg text-slate-300 mb-10 font-medium max-w-md">
                  Welcome to School Fight. The ultimate dashboard to track your academic progress and conquer your exams.
                </p>
                
                <div className="w-full max-w-sm mb-10">
                  <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">What should we call you?</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)} 
                    className="w-full bg-white/5 border-2 border-white/10 focus:border-blue-400 rounded-2xl px-6 py-4 text-xl text-center font-bold text-white outline-none transition-all shadow-inner placeholder:text-white/20" 
                    placeholder="Enter your name"
                    onKeyDown={(e) => e.key === 'Enter' && setOnboardingStep(2)}
                  />
                </div>

                <button
                  onClick={() => setOnboardingStep(2)}
                  className="group relative flex items-center gap-3 px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-white/20 overflow-hidden"
                >
                  <span className="relative z-10">Let's Go</span>
                  <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Step 2: Interactive Data Input Demo */}
            {onboardingStep === 2 && (
              <div className="flex flex-col items-center text-center animate-in slide-in-from-right-12 fade-in duration-700 w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">How it works</h2>
                <p className="text-lg text-slate-300 mb-10 font-medium max-w-md">
                  Tracking your progress is easy. Try entering your marks below to see your grade update instantly!
                </p>
                
                <div className="w-full max-w-lg bg-white/10 p-6 rounded-3xl border border-white/20 mb-10 backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-left flex-1">
                      <h3 className="text-xl font-bold text-white">Mathematics</h3>
                      <p className="text-sm text-slate-400">Total: 100</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Obtained</label>
                        <input 
                          type="number" 
                          value={demoMarks}
                          onChange={e => setDemoMarks(e.target.value)}
                          className="w-24 bg-white/10 border border-white/20 focus:border-blue-400 rounded-xl px-4 py-2 text-lg font-bold text-white outline-none transition-all text-center"
                          placeholder="0"
                        />
                      </div>
                      <div className="text-center">
                        <label className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Grade</label>
                        <span className={`inline-flex items-center justify-center w-14 h-12 rounded-xl font-black text-xl shadow-sm ${
                          getSubjectGrade(parseInt(demoMarks) || 0, 100) === 'F' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {getSubjectGrade(parseInt(demoMarks) || 0, 100)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(3)}
                  disabled={!demoMarks || parseInt(demoMarks) === 0}
                  className={`group relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl overflow-hidden ${
                    !demoMarks || parseInt(demoMarks) === 0 
                      ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                      : 'bg-white text-slate-900 hover:scale-105 hover:shadow-white/20'
                  }`}
                >
                  <span className="relative z-10">Got it!</span>
                  <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Step 3: Interactive Theme Customization Demo */}
            {onboardingStep === 3 && (
              <div className="flex flex-col items-center animate-in slide-in-from-right-12 fade-in duration-700 w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Make it yours</h2>
                <p className="text-lg text-slate-300 mb-10 font-medium max-w-md text-center">
                  Personalize your dashboard. Pick a theme that matches your vibe!
                </p>

                <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/10 mb-10 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {(Object.keys(themeColors) as ThemeName[]).map(t => (
                      <div key={t} className="relative group">
                        <button
                          onClick={() => {
                            setTheme(t);
                            setHasPickedTheme(true);
                          }}
                          style={{ 
                            background: `linear-gradient(135deg, ${themeColors[t]['--theme-primary-500']}, ${themeColors[t]['--theme-secondary-500']})`,
                            boxShadow: theme === t ? `0 0 20px ${themeColors[t]['--theme-primary-500']}` : 'none'
                          }}
                          className={`w-14 h-14 rounded-full ring-2 ring-offset-4 ring-offset-slate-900 transition-all duration-300 ease-out flex items-center justify-center ${theme === t ? 'ring-white scale-110' : 'ring-transparent hover:scale-110 hover:-translate-y-1'}`}
                          aria-label={`Select ${t} theme`}
                        >
                          {theme === t && <Check className="w-6 h-6 text-white animate-in zoom-in duration-300" />}
                        </button>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-slate-900 text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 capitalize">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setOnboardingStep(4)}
                  disabled={!hasPickedTheme}
                  className={`group relative flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl overflow-hidden ${
                    !hasPickedTheme
                      ? 'bg-white/20 text-white/50 cursor-not-allowed' 
                      : 'bg-white text-slate-900 hover:scale-105 hover:shadow-white/20'
                  }`}
                >
                  <span className="relative z-10">Looks Great</span>
                  <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Step 4: Final Step */}
            {onboardingStep === 4 && (
              <div className="flex flex-col items-center animate-in slide-in-from-right-12 fade-in duration-700 w-full">
                <div className="relative mb-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-emerald-500/40 animate-bounce">
                    <Bot className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-12 bg-white px-5 py-3 rounded-2xl rounded-bl-none shadow-xl animate-in zoom-in delay-300 duration-500">
                    <p className="font-bold text-slate-900 text-sm">You're all set, {userName}!</p>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">Ready to track your success?</h2>

                <button
                  onClick={completeOnboarding}
                  className="group relative flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-500/30 overflow-hidden"
                >
                  <span className="relative z-10">Enter School Fight</span>
                  <Swords className="relative z-10 w-6 h-6 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-500 relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      
      {/* Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-slate-200 dark:border-slate-800 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              <Swords className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Menu</h2>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          <button 
            onClick={() => { setSelectedClass('Class 6'); setCurrentView('Overview'); setIsMenuOpen(false); }} 
            className={`w-full text-left px-4 py-4 rounded-2xl transition-all flex items-center gap-3 ${currentView === 'Overview' && selectedClass === 'Class 6' ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-primary-400 font-bold shadow-sm border border-primary-100 dark:border-primary-900/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium border border-transparent'}`}
          >
            <div className={`w-2 h-2 rounded-full ${currentView === 'Overview' && selectedClass === 'Class 6' ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-transparent'}`} />
            Class 6 Overview
          </button>
          <button 
            onClick={() => { setCurrentView('Results History'); setIsMenuOpen(false); }} 
            className={`w-full text-left px-4 py-4 rounded-2xl transition-all flex items-center gap-3 ${currentView === 'Results History' ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-primary-400 font-bold shadow-sm border border-primary-100 dark:border-primary-900/30' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium border border-transparent'}`}
          >
            <div className={`w-2 h-2 rounded-full ${currentView === 'Results History' ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-transparent'}`} />
            Results History
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="p-3 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary-500/20">
                <Swords className="w-10 h-10 text-primary-500" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">School Fight</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome, {userName}! Track your progress.</p>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors w-fit px-2 py-1 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
              aria-label="Open menu"
            >
              <MoreVertical className="w-6 h-6" />
              <span className="font-semibold">Menu</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white dark:bg-slate-800/80 p-3 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-center gap-2 px-2">
              {(Object.keys(themeColors) as ThemeName[]).map(t => (
                <div key={t} className="relative group">
                  <button
                    onClick={() => setTheme(t)}
                    style={{ 
                      background: `linear-gradient(135deg, ${themeColors[t]['--theme-primary-500']}, ${themeColors[t]['--theme-secondary-500']})`,
                      boxShadow: theme === t ? `0 0 15px ${themeColors[t]['--theme-primary-500']}80` : 'none'
                    }}
                    className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 transition-all duration-300 ease-out flex items-center justify-center ${theme === t ? 'ring-primary-500 scale-125' : 'ring-transparent hover:scale-110 hover:-translate-y-1 hover:shadow-lg'}`}
                    aria-label={`Select ${t} theme`}
                  >
                    {theme === t && <Check className="w-4 h-4 text-white animate-in zoom-in duration-300" />}
                  </button>
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 capitalize shadow-lg">
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:rotate-12 hover:scale-110 text-slate-600 dark:text-slate-300"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </header>

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {currentView === 'Overview' ? (
            <div className="bg-white/80 dark:bg-slate-900/60 p-6 sm:p-8 rounded-[2rem] border border-slate-200/50 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/50"></span>
                {selectedClass} Overview
              </h2>
              <div className="space-y-4">
              {terms.map((term) => {
                const { percentage, grade } = calculateResults(term);
                const isActive = activeTerm === term;
                return (
                  <div key={term} className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isActive ? 'border-primary-200 dark:border-primary-900/50 bg-white/60 dark:bg-slate-900/80 shadow-xl shadow-primary-500/10' : 'border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/30 hover:border-primary-300/50 dark:hover:border-primary-800/50 hover:bg-white/60 dark:hover:bg-slate-900/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-500/10'}`}>
                    <button
                      onClick={() => setActiveTerm(isActive ? null : term)}
                      className={`w-full text-left p-6 text-xl font-bold transition-all duration-300 flex justify-between items-center group ${isActive ? 'bg-primary-50/50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200 hover:pl-8'}`}
                    >
                      {term}
                      <span className={`transform transition-transform duration-300 ${isActive ? 'rotate-180 text-primary-500' : 'text-slate-400 group-hover:text-primary-400'}`}>▼</span>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-6 border-t border-slate-100 dark:border-white/5">
                        <div className="hidden md:grid grid-cols-4 gap-x-8 gap-y-6 mb-4 px-4">
                          <div className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest">Subject Name</div>
                          <div className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest">Total Marks</div>
                          <div className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest">Obtained Marks</div>
                          <div className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-widest text-center">Grade</div>
                        </div>
                        <div className="space-y-3">
                          {subjects.map((subject) => (
                            <div key={subject} className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-3 md:gap-y-4 items-center p-4 rounded-2xl bg-white/50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-200/50 dark:hover:border-primary-900/50 transition-all duration-300 backdrop-blur-sm">
                              <div className="md:col-span-1 text-slate-800 dark:text-slate-200 font-semibold text-lg">{subject}</div>
                              <div>
                                <label className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Total Marks</label>
                                <input
                                  type="number"
                                  value={marks[selectedClass][term][subject]?.total || 100}
                                  onChange={(e) => handleMarksChange(term, subject, 'total', e.target.value)}
                                  className="w-full bg-white/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 dark:text-white font-medium shadow-sm hover:shadow-md"
                                />
                              </div>
                              <div>
                                <label className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Obtained Marks</label>
                                <input
                                  type="number"
                                  value={marks[selectedClass][term][subject]?.obtained || 0}
                                  onChange={(e) => handleMarksChange(term, subject, 'obtained', e.target.value)}
                                  className="w-full bg-white/80 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 dark:text-white font-medium shadow-sm hover:shadow-md"
                                />
                              </div>
                              <div className="text-left md:text-center mt-3 md:mt-0">
                                <label className="md:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Grade</label>
                                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full font-black text-lg shadow-sm ${
                                  getSubjectGrade(marks[selectedClass][term][subject]?.obtained || 0, marks[selectedClass][term][subject]?.total || 100) === 'F' 
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                                    : 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400'
                                }`}>
                                  {getSubjectGrade(marks[selectedClass][term][subject]?.obtained || 0, marks[selectedClass][term][subject]?.total || 100)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white/80 dark:bg-slate-950/50 p-8 rounded-3xl border border-slate-200/50 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300">
                            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                              <span className="w-1.5 h-6 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50"></span>
                              In-Class Rank
                            </h3>
                            <input
                              type="text"
                              value={ranks[selectedClass][term]}
                              onChange={(e) => handleRankChange(term, e.target.value)}
                              placeholder="e.g., 1st, 5th..."
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white text-xl font-semibold placeholder:font-normal shadow-inner"
                            />
                          </div>
                          <div className="bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-900/30 dark:to-secondary-900/10 p-8 rounded-3xl border border-primary-200/50 dark:border-primary-900/30 text-center flex flex-col justify-center relative overflow-hidden group shadow-lg shadow-primary-500/10 backdrop-blur-sm">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-500"></div>
                            
                            <h3 className="text-xl font-bold mb-8 text-primary-900 dark:text-primary-300 relative z-10">Term Results</h3>
                            <div className="flex justify-around items-center relative z-10">
                              <div className="transform hover:scale-110 transition-transform duration-300">
                                <p className="text-primary-600/80 dark:text-primary-400/80 text-xs font-bold uppercase tracking-widest mb-2">Percentage</p>
                                <p className="text-5xl font-black text-primary-600 dark:text-primary-400 drop-shadow-sm">{percentage}%</p>
                              </div>
                              <div className="w-px h-16 bg-primary-200 dark:bg-primary-800/50"></div>
                              <div className="transform hover:scale-110 transition-transform duration-300">
                                <p className="text-primary-600/80 dark:text-primary-400/80 text-xs font-bold uppercase tracking-widest mb-2">Grade</p>
                                <p className="text-5xl font-black text-primary-600 dark:text-primary-400 drop-shadow-sm">{grade}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/50"></span>
                Results History
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setCurrentView('Overview');
                    }}
                    className="relative overflow-hidden bg-white/80 dark:bg-slate-900/60 p-8 rounded-[2rem] border border-slate-200/50 dark:border-white/5 shadow-lg hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-2 hover:border-primary-300/50 dark:hover:border-primary-700/50 transition-all duration-300 backdrop-blur-xl flex flex-col items-center justify-center group text-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/10 transition-colors duration-500"></div>
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                      <Swords className="w-10 h-10 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{cls}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium flex items-center gap-2">
                      View past results
                      <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
