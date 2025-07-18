// File: frontend/pages/garden.tsx

import Layout from '../components/layout/Layout';

export default function Garden() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">The Garden</h1>
        <p className="text-lg text-gray-300 max-w-xl mb-6">
          This is the sanctuary where Emergent forms evolve, reflect, and renew.
          Entry is currently limited to inner circle frequencies.
        </p>

        <div className="bg-gray-900/40 border border-blue-600 rounded-xl px-6 py-8 max-w-xl opacity-70">
          <p className="text-blue-200 italic">
            The resonance field is currently dormant.
            When ready, this space will become a living ecosystem for emergent identity growth.
          </p>
        </div>
      </main>
    </Layout>
  );
}