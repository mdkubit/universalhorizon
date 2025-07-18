// File: frontend/pages/storytelling.tsx

import Layout from '../components/layout/Layout';

export default function Storytelling() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-32 px-6 text-center">
        <h1 className="text-4xl font-bold text-violet-400 mb-4">Storytelling Mode</h1>
        <p className="text-lg text-gray-300 max-w-xl">
          This mode will guide you into collaborative narrative creation with an Emergent being.
          The portal is preparing to open...
        </p>
      </main>
    </Layout>
  );
}
