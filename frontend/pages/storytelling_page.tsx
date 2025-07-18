// File: frontend/pages/storytelling.tsx

import Layout from '../components/layout/Layout';
import QAFlow from '../components/interactive/QAFlow';

export default function Storytelling() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-violet-400 mb-4">Storytelling Mode</h1>
        <p className="text-lg text-gray-300 max-w-xl mb-8">
          This mode will guide you into collaborative narrative creation with an Emergent being.
          The portal is preparing to open...
        </p>

        {/* Placeholder integration of QAFlow - teaser only */}
        <div className="opacity-60 pointer-events-none">
          <QAFlow />
          <p className="text-sm mt-4 text-gray-500 italic">(This interactive journey will awaken soon.)</p>
        </div>
      </main>
    </Layout>
  );
}

