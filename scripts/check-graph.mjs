/**
 * Static sanity check over src/. Runs on the host with plain node — no build,
 * no install — so a broken import is caught in a second rather than after a
 * container round-trip.
 *
 *   node scripts/check-graph.mjs
 *
 * Checks:
 *   1. every relative import resolves to a file that exists (case-sensitively)
 *   2. every named import exists as an export in the target module
 *   3. every .jsx has the sibling .css it imports, and vice versa
 *   4. every var(--token) used in CSS is defined in tokens.css
 *   5. every <Photo src="..."> filename is listed in public/images/README.md
 *   6. no tel:/wa.me/mailto: URL is hand-written outside config/site.js
 *   7. no host-side build artifacts — everything installs inside the container
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, resolve, relative, basename } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const SRC = join(ROOT, 'src')

const problems = []
const note = (file, msg) => problems.push({ file: relative(ROOT, file), msg })

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

const files = walk(SRC)
const jsFiles = files.filter((f) => /\.jsx?$/.test(f))
const cssFiles = files.filter((f) => f.endsWith('.css'))

/* Case-sensitive existence check — Windows will happily open the wrong casing,
   the Linux container will not. This is the classic "works on my machine". */
function existsExact(path) {
  if (!existsSync(path)) return false
  try {
    return readdirSync(dirname(path)).includes(basename(path))
  } catch {
    return false
  }
}

/* ── 1 + 2: imports resolve, and named imports are actually exported ──────── */
const exportsOf = new Map()

for (const file of jsFiles) {
  const src = readFileSync(file, 'utf8')
  const names = new Set()
  if (/export\s+default\b/.test(src)) names.add('default')
  for (const m of src.matchAll(/export\s+(?:const|function|class|let)\s+(\w+)/g)) names.add(m[1])
  for (const m of src.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim()
      if (name) names.add(name)
    }
  }
  exportsOf.set(file, names)
}

for (const file of jsFiles) {
  const src = readFileSync(file, 'utf8')

  for (const m of src.matchAll(/import\s+([^'"]*?)\s*from\s*['"](\.[^'"]+)['"]/g)) {
    const [, clause, spec] = m
    const target = resolve(dirname(file), spec)

    if (!existsExact(target)) {
      note(file, `import target does not exist (or differs in case): ${spec}`)
      continue
    }
    if (target.endsWith('.css')) continue

    const available = exportsOf.get(target)
    if (!available) continue

    // default import
    const defaultMatch = clause.match(/^\s*(\w+)\s*(?:,|$)/)
    if (defaultMatch && !clause.trim().startsWith('{') && !available.has('default')) {
      note(file, `imports a default from ${spec}, which has no default export`)
    }
    // named imports
    const braced = clause.match(/\{([^}]*)\}/)
    if (braced) {
      for (const part of braced[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/)[0].trim()
        if (name && !available.has(name)) {
          note(file, `imports { ${name} } from ${spec}, which does not export it`)
        }
      }
    }
  }

  // bare css import: import './Thing.css'
  for (const m of src.matchAll(/import\s*['"](\.[^'"]+\.css)['"]/g)) {
    const target = resolve(dirname(file), m[1])
    if (!existsExact(target)) note(file, `imports missing stylesheet ${m[1]}`)
  }
}

/* ── 3: orphan stylesheets ────────────────────────────────────────────────── */
const allJs = jsFiles.map((f) => readFileSync(f, 'utf8')).join('\n')

// Doc comments carry usage examples with invented filenames. Scanning those for
// photo slots reports files nobody ever intended to ship, so check 5 reads a
// comment-stripped copy.
const allJsCode = allJs
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')

for (const css of cssFiles) {
  if (css.includes(join('src', 'styles'))) continue
  const name = basename(css)
  if (!allJs.includes(name)) note(css, 'stylesheet is never imported by any component')
}

/* ── 4: undefined design tokens ───────────────────────────────────────────── */
const tokensSrc = readFileSync(join(SRC, 'styles', 'tokens.css'), 'utf8')
const defined = new Set([...tokensSrc.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]))

// Properties a component sets on itself from JSX, e.g. style={{ '--index': i }}.
// These are legitimately absent from tokens.css, so collect them from the JSX.
const local = new Set(['--btn-bg', '--btn-fg', '--btn-badge-bg', '--btn-badge-fg'])
for (const m of allJs.matchAll(/['"](--[\w-]+)['"]\s*:/g)) local.add(m[1])

for (const css of cssFiles) {
  const src = readFileSync(css, 'utf8')
  const selfDefined = new Set([...src.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]))
  for (const m of src.matchAll(/var\(\s*(--[\w-]+)/g)) {
    const token = m[1]
    if (!defined.has(token) && !local.has(token) && !selfDefined.has(token)) {
      note(css, `uses undefined token ${token}`)
    }
  }
}

/* ── 5: photo slots are documented ────────────────────────────────────────── */
const readmePath = join(ROOT, 'public', 'images', 'README.md')
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8')
  const used = new Set()
  for (const m of allJsCode.matchAll(/src=["'`]([\w./-]+\.(?:jpg|jpeg|png|webp|avif))["'`]/g)) used.add(m[1])
  for (const m of allJsCode.matchAll(/["'`]([\w-]+\.(?:jpg|jpeg|png|webp))["'`]/g)) used.add(m[1])
  for (const slot of used) {
    if (!readme.includes(slot)) note(readmePath, `photo slot "${slot}" is used in code but not documented`)
  }
}

/* ── 6: hard-written contact URLs ─────────────────────────────────────────── */
for (const file of jsFiles) {
  if (file.includes(join('config', 'site.js'))) continue
  const src = readFileSync(file, 'utf8')
  for (const pattern of [/["'`]tel:/, /["'`]mailto:/, /wa\.me\//]) {
    if (pattern.test(src)) {
      note(file, `hand-written contact URL — use links.tel / links.mailto / links.whatsapp from config`)
      break
    }
  }
}

/* ── 7: host must stay free of container-owned directories ────────────────── */
for (const dir of ['node_modules', 'dist']) {
  if (existsSync(join(ROOT, dir))) {
    note(
      join(ROOT, dir),
      `exists on the host — npm was run outside the container. Delete it with \`rm -rf ${dir}\``,
    )
  }
}

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`Checked ${jsFiles.length} modules and ${cssFiles.length} stylesheets.\n`)

if (!problems.length) {
  console.log('No problems found.')
  process.exit(0)
}

const byFile = new Map()
for (const p of problems) {
  if (!byFile.has(p.file)) byFile.set(p.file, [])
  byFile.get(p.file).push(p.msg)
}
for (const [file, msgs] of byFile) {
  console.log(file)
  for (const m of msgs) console.log(`  - ${m}`)
}
console.log(`\n${problems.length} problem(s).`)
process.exit(1)
