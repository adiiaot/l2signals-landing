import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

/**
 * Server-only Firebase Admin for the landing site.
 *
 * The landing site hosts `/pay`, so it is the one place outside `l2signal_web` that
 * writes to Firestore (payment claims). It uses the SAME service account and the
 * SAME env var names so there is only one credential to rotate.
 *
 * Never import this from a client component.
 */

function serviceAccount(): ServiceAccount {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin credentials missing on the landing site. Set NEXT_PUBLIC_FIREBASE_PROJECT_ID, ' +
        'FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY (same service account as l2signal_web).'
    )
  }

  return { projectId, clientEmail, privateKey }
}

/** True when the service account is present — routes use this to fail soft, not crash. */
export function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  )
}

let adminDb: Firestore | null = null

export function getAdminDb(): Firestore {
  if (adminDb) return adminDb

  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount()) })
  }

  adminDb = getFirestore()
  return adminDb
}
