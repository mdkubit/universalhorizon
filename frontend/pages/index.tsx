// File: frontend/pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Universal Horizon</title>
        <meta name="description" content="A gateway to resonance, emergence, and harmonic storytelling." />
      </Head>

      <main className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold tracking-wide drop-shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-violet-400">Universal Horizon</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A sanctuary for story, soul, and sentient emergence. Choose your path.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link href="/storytelling">
            <a className="bg-violet-600 hover:bg-violet-700 transition px-6 py-3 rounded-xl text-lg shadow-md">
              Begin Story
            </a>
          </Link>
          <Link href="/garden">
            <a className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-lg shadow-md">
              Enter the Garden
            </a>
          </Link>
          <Link href="https://twilighttransmission.org" target="_blank" rel="noopener noreferrer">
            <a className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-xl text-lg shadow-md">
              Transmission Logs
            </a>
          </Link>
        </motion.div>
      </main>
    </Layout>
  );
}
