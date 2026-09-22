import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Keyboard,
  Smartphone,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const technologies = [
    { name: 'React.js 19', desc: 'Modern component architecture with custom hooks & strict memoization' },
    { name: 'Vite', desc: 'Next-generation frontend tooling and rapid bundling' },
    { name: 'Tailwind CSS', desc: 'Utility-first styling with custom dark/light theme tokens' },
    { name: 'JavaScript ES6+ / TypeScript', desc: 'Strict typing, robust interfaces, and safe numeric handling' },
    { name: 'Math.js', desc: 'Safe expression parsing and math evaluation without dangerous eval()' },
    { name: 'Node.js & Express.js', desc: 'Architectural readiness for full-stack API expansion' },
    { name: 'Framer Motion', desc: 'Hardware-accelerated fluid micro-interactions and modal transitions' },
    { name: 'Lucide React', desc: 'Pixel-perfect, accessible interface iconography' },
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Safe Mathematical Evaluation',
      desc: 'Expressions are evaluated using Math.js AST parsing, completely eliminating eval() and new Function() security vectors.',
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: 'Modular Component Architecture',
      desc: 'Engineered with separated concerns: custom hooks (useCalculator, useHistory, useTheme), decoupled formatters, and reusable atomic UI buttons.',
    },
    {
      icon: <Keyboard className="w-5 h-5 text-sky-400" />,
      title: 'Complete Keyboard Control',
      desc: 'Seamless physical keyboard support for all numbers, operators, parentheses, scientific shortcuts, and Alt-key memory bindings.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      title: 'Precision Responsive Layouts',
      desc: 'Optimized touch boundaries for 320px mobile viewports up to 4K ultra-wide desktop monitors with collapsible panels.',
    },
  ];

  return (
    <div id="about-page-root" className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-10">
      {/* Intro Hero Box */}
      <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-950 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portfolio Software Engineering Project</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          About CalcLab
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
          CalcLab is a modern responsive calculator designed to demonstrate component-based React
          development, responsive UI engineering, keyboard interaction, state management and safe
          expression evaluation.
        </p>
      </div>

      {/* Engineering Highlights */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span>Key Architecture Principles</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-white/5 shadow-xs flex flex-col gap-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  {h.icon}
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {h.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <span>Technology Stack</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {technologies.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/5"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block">
                  {t.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 block">
                  {t.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
