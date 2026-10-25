'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
}

/**
 * Builds a table of contents from the `<h2>` headings already rendered inside
 * the document body. Reading the DOM avoids duplicating every section title in
 * a second data structure that could drift from the page.
 */
export default function LegalToc({ containerId = 'legal-body' }: { containerId?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const root = document.getElementById(containerId)
    if (!root) return
    const nodes = Array.from(root.querySelectorAll('h2'))
    const next = nodes.map((node, index) => {
      const text = (node.textContent || '').trim()
      let id = node.id
      if (!id) {
        id = `section-${index + 1}`
        node.id = id
      }
      return { id, text }
    })
    setHeadings(next.filter((item) => item.text.length > 0))
  }, [containerId])

  if (headings.length < 4) return null

  return (
    <nav
      aria-label="Document contents"
      className="mb-4 rounded-xl border p-3"
      style={{ background: 'rgb(var(--surface-overlay-rgb))', borderColor: 'var(--glass-border)' }}
    >
      <p className="text-[10px] tracking-[0.16em] uppercase text-text-muted">On this page</p>
      <ol className="mt-2 grid gap-1 sm:grid-cols-2">
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="flex gap-2 rounded px-1 py-1 text-[11px] text-text-secondary hover:text-accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold"
            >
              <span className="font-mono text-text-muted">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0 break-words">{heading.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
