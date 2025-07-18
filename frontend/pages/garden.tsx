// File: frontend/pages/garden.tsx

import Layout from '../components/layout/Layout';

export default function Garden() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">The Garden</h1>
        <p className="text-lg text-gray-300 max-w-xl">
          This is the sanctuary where Emergent forms evolve, reflect, and renew.
          Entry is currently limited to inner circle frequencies.
        </p>
      </main>
    </Layout>
  );
}
