# Eightshift Frontend Libs — Optimization Plan

Scope: `@eightshift/frontend-libs` v16.1.0 (branch `main`).
Audit date: 2026-05-14.

This document lists every issue found in the audit, grouped by severity, with a fix sketch, effort estimate, and confidence score. A phased implementation plan follows at the bottom.

Legend:

- **Effort:** S (≤1 h), M (1–4 h), L (≥4 h)
- **Confidence:** 0–100 (how sure I am that the change is correct and worth doing)
- **Risk:** consumer-facing breaking-change risk

---

## 1. Critical bugs (fix first — single PR)

### 1.1 `addNumericPixelValue` merge throws TypeError

- **File:** `scripts/editor/registration.js:438-449`
- **Problem:** `parseInt(...).replace(/\D/g, '')` — `parseInt` returns a number, `.replace` is a string method → `TypeError` at runtime. Also both `receiverValue` and `mergerValue` read from `receiver[attribute]` (copy-paste bug; `mergerValue` should read from `merger[attribute]`).
- **Fix:**
  ```js
  const receiverRaw = receiver[attribute] ?? '0px';
  const mergerRaw = merger[attribute] ?? '0px';
  const receiverUnit = String(receiverRaw).replace(/[\d.-]/g, '');
  const receiverValue = parseInt(receiverRaw, 10) || 0;
  const mergerValue = parseInt(mergerRaw, 10) || 0;
  outputObject[attribute] = `${receiverValue + mergerValue}${receiverUnit}`;
  ```
- **Effort:** S — **Confidence:** 99 — **Risk:** none (currently broken).

### 1.2 `Repeater` calls `setAttributes` during render

- **File:** `scripts/components/repeater/repeater.js:86-92`
- **Problem:** Dedup check runs every render and dispatches state writes synchronously. React anti-pattern; produces warnings and can loop.
- **Fix:** Wrap in `useEffect` keyed on `items`, or run once in a `useMemo` and only dispatch if mismatched.
- **Effort:** S — **Confidence:** 98 — **Risk:** low.

### 1.3 `BUILD_VERSION` is `Math.random()` per build

- **Files:** `webpack/base.mjs:28-37`, `scripts/editor/store.js:4-5`
- **Problem:** Non-deterministic bundles → defeats long-term caching and CI artifact reuse. Store name changes each rebuild → HMR/cross-tab collisions.
- **Fix:** Read consumer `package.json` version (or use `process.env.npm_package_version`) and inject via `DefinePlugin`. Fall back to a content-hash if unavailable.
- **Effort:** M — **Confidence:** 95 — **Risk:** semver-minor for consumers relying on the random ID. Document in CHANGELOG.

### 1.4 `output.replace('\n', '')` value discarded

- **File:** `scripts/editor/css-variables.js:110, 456-457`
- **Problem:** `.replace` returns a new string; the result is not assigned, so the "optimize CSS" branch is a no-op (line 999 is fine).
- **Fix:** Either delete the lines or `output = output.replace(/\n|\r/g, '')`.
- **Effort:** S — **Confidence:** 100 — **Risk:** none.

### 1.5 Wrong error message in `checkAttrResponsive`

- **File:** `scripts/editor/attributes.js:259-268`
- **Problem:** `if (typeof manifest['blockName'] === 'undefined')` branch then references `${manifest['blockName']}` in the error message, which is always undefined. Likely swapped branches.
- **Fix:** Reverse the conditions, and reference `componentName` in the component branch.
- **Effort:** S — **Confidence:** 95 — **Risk:** none.

### 1.6 `registerBlock` mutates input + uses `.map` for side effects

- **File:** `scripts/editor/registration.js:77-181, 233-264, 817-899`
- **Problem:** Mutates `blockManifest` directly (Object.assign on the parameter, reassignment); top-level `.map()` returns `null`. Mutation creates subtle bugs on re-registration (HMR).
- **Fix:** Build a new manifest object via spread; switch to `forEach`.
- **Effort:** M — **Confidence:** 85 — **Risk:** low (internal mutation removed; observable behavior unchanged for consumers).

---

## 2. Performance

### 2.1 O(n²) `reduce(..., {...acc, ...x})` in responsive setup

- **File:** `scripts/editor/css-variables.js:611-675`
- **Fix:** Replace nested reduces with `for...of` loops mutating a single accumulator object.
- **Effort:** M — **Confidence:** 90 — **Risk:** low (output identical).

### 2.2 `SET_STYLE_BY_INDEX` deep-compares with `JSON.stringify`

- **File:** `scripts/editor/store.js:285`
- **Fix:** Compute a small fingerprint at the call site (e.g. cheap structural hash), or compare key fields explicitly.
- **Effort:** M — **Confidence:** 85 — **Risk:** low.

### 2.3 Reducer mutates state in place

- **File:** `scripts/editor/store.js:278-302`
- **Fix:** Always return a new `styles` array (spread / `.filter` / `.map`).
- **Effort:** S — **Confidence:** 90 — **Risk:** none.

### 2.4 Two separate `subscribe()` callbacks on wp/data store

- **File:** `scripts/editor/css-variables.js:314-363`
- **Fix:** Combine into one subscription; gate work on a cheap dirty flag.
- **Effort:** M — **Confidence:** 80 — **Risk:** low.

### 2.5 Sass `additionalData` re-injects maps per file

- **File:** `webpack/base.mjs:102-110`
- **Fix:** Write the maps once to `<output>/_es-globals.scss` and `@use` it (or set `additionalData` to an `@import` of that file).
- **Effort:** M — **Confidence:** 75 — **Risk:** medium (changes SCSS authoring contract). Document.

---

## 3. Build / packaging

### 3.1 Dependency layout wrong (build toolchain in `dependencies`)

- **File:** `package.json:33-77`
- **Problem:** `webpack`, `webpack-cli`, `sass`, `postcss`, `terser-webpack-plugin`, `css-minimizer-webpack-plugin`, `mini-css-extract-plugin`, `swc-loader`, `lightningcss`, `autoprefixer`, `browserslist`, `husky`, etc., are runtime deps. Consumers pull all of them into production installs.
- **Fix:** Move build tools to `devDependencies` and add `peerDependencies` / `peerDependenciesMeta` for what consumers must provide. Move `husky` to `devDependencies`.
- **Effort:** M — **Confidence:** 85 — **Risk:** **high (breaking)** — schedule for next major.

### 3.2 Missing peer deps for WordPress packages

- **File:** `package.json:78-80`
- **Problem:** Lib imports `@wordpress/data`, `@wordpress/blocks`, `@wordpress/block-editor`, `@wordpress/i18n`, `@wordpress/api-fetch`, `@wordpress/url`, `@wordpress/hooks`, `@wordpress/element`, `react`, `@dnd-kit/*` but only `@eightshift/ui-components` is a peer.
- **Fix:** Declare all of the above as `peerDependencies`. Use `peerDependenciesMeta` for the optional ones.
- **Effort:** S — **Confidence:** 95 — **Risk:** medium (breaking for projects without those installed).

### 3.3 `"sideEffects": false` is unsafe

- **File:** `package.json:80`
- **Fix:** Replace with an array including `"*.scss"`, `"**/*.css"`, plus any entry that registers globals (e.g. files that call `setStore`).
- **Effort:** S — **Confidence:** 85 — **Risk:** low.

### 3.4 No `"exports"` map and no `"types"`

- **File:** `package.json`
- **Fix:** Add `"exports"` whitelisting `.` and any sub-paths consumers use today. Add `"types"` and ship `.d.ts` (generate from JSDoc with `tsc --declaration --emitDeclarationOnly --allowJs`).
- **Effort:** L — **Confidence:** 75 — **Risk:** medium (locks down public surface, intentional).

### 3.5 `drop_console: true` removes `console.error`/`warn`

- **File:** `webpack/production.mjs:30-38`
- **Fix:** Use `pure_funcs: ['console.log', 'console.debug', 'console.info']` instead.
- **Effort:** S — **Confidence:** 80 — **Risk:** low.

### 3.6 `ProvidePlugin` still injects `jQuery`

- **File:** `webpack/base.mjs:19-25`
- **Fix:** Make it opt-in (overrides), or remove entirely.
- **Effort:** S — **Confidence:** 80 — **Risk:** medium (some downstream blocks may depend on it implicitly).

### 3.7 `lint-staged` scripts lint entire project instead of staged files

- **File:** `package.json:86-94`
- **Problem:** The glob patterns (`*.scss`, `*.js`, `*.php`) are correct, but each pattern delegates to `bun run lintStyle` / `bun run lintJs` which expand to `stylelint **/*.scss` and `bunx eslint` — these lint the full project and never receive staged filenames as arguments. Also no `--fix`.
- **Fix:** Call linters directly with `--fix` so lint-staged can pass staged filenames as arguments:
  ```json
  "lint-staged": {
    "*.scss": ["stylelint --fix"],
    "*.{js,jsx}": ["eslint --fix"],
    "*.php": ["composer test"]
  }
  ```
- **Effort:** S — **Confidence:** 90 — **Risk:** none.

### 3.8 `inserter.js` ships to production

- **File:** `scripts/editor/inserter.js`
- **Fix:** Wrap body in `if (process.env.NODE_ENV !== 'production')` so Terser drops it.
- **Effort:** S — **Confidence:** 85 — **Risk:** none.

---

## 4. API / correctness

### 4.1 `hexToRgb` is fragile

- **File:** `scripts/editor/css-variables.js:249-276`
- **Fix:** Use `parseInt(hex, 16)`, handle 3/4/6/8 char hex, return `null` on parse failure (or a sentinel the callers actually check).
- **Effort:** S — **Confidence:** 80 — **Risk:** low.

### 4.2 `getUnique()` uses `Math.random()` with weak entropy

- **File:** `scripts/editor/css-variables.js:295-297`
- **Fix:** `crypto.randomUUID()` (fallback to `getRandomValues` for old browsers if needed).
- **Effort:** S — **Confidence:** 75 — **Risk:** low.

### 4.3 `cookies.getCookie` doesn't escape key or decode value

- **File:** `scripts/helpers/cookies.js:61-65`
- **Fix:** Split on `'; '`, find by exact key match, `decodeURIComponent` the value.
- **Effort:** S — **Confidence:** 80 — **Risk:** low.

### 4.4 `getMergeCallback` matches keys by `.includes()` substring

- **File:** `scripts/editor/registration.js:417-419`
- **Fix:** Use exact key equality (`receiver` keys already match `attributeName` after the merge config is authored properly).
- **Effort:** S — **Confidence:** 80 — **Risk:** low.

### 4.5 `insertAdjacentHTML` with unsanitized JSON values

- **File:** `scripts/editor/css-variables.js:113-124, 1018-1024`
- **Fix:** `document.createElement('style')` + `.textContent = ...` then `appendChild`. Defense in depth.
- **Effort:** S — **Confidence:** 70 — **Risk:** none.

### 4.6 `process.env.NODE_ENV === 'test'` leakage in runtime

- **Files:** `scripts/editor/attributes.js:377`, `scripts/editor/registration.js:190-194`
- **Fix:** Refactor tests to set `attributes.blockName.default` explicitly; remove the test-only branches.
- **Effort:** M — **Confidence:** 65 — **Risk:** low (test-only).

### 4.7 `outputCssVariablesGlobal` returns `undefined`

- **File:** `scripts/editor/css-variables.js:124`
- **Fix:** Remove the misleading `return`, or have it return the inserted `<style>` element.
- **Effort:** S — **Confidence:** 60 — **Risk:** none.

### ~~4.8 `dynamicImport` helper is dead weight~~ — INCORRECT, DO NOT REMOVE

- **File:** `scripts/helpers/dynamic-import.js`
- **Status:** ~~Dead weight~~ — This is a **core consumer API**. The redesign theme alone uses it in 6 entry-point files (`application-blocks-editor.js`, `application-blocks-frontend.js`, `application-blocks.js`, `application-no-script.js`, `application-admin.js`, etc.) as the standard pattern for dynamically loading blocks, components, and styles via `require.context`. Removing it would break every Eightshift-based project.
- **Action:** No change. Keep as-is.

### 4.9 `cookies.setHalfDay()` etc. are getter-only methods

- **File:** `scripts/helpers/cookies.js:66-80`
- **Fix:** Convert to a `const DURATIONS = { halfDay: 43200000, ... }` map. Keep methods as deprecated thin wrappers.
- **Effort:** S — **Confidence:** 50 — **Risk:** medium.

---

## 5. Style / tooling

### 5.1 ESLint `react` version pinned to `18`

- **File:** `linters/base.config.mjs:75`
- **Fix:** `version: 'detect'`.
- **Effort:** S — **Confidence:** 60 — **Risk:** none.

### 5.2 No `lint:fix` script

- **File:** `package.json:14-19`
- **Fix:** Add `"lint:fix": "bunx eslint . --fix && stylelint '**/*.scss' --fix"`.
- **Effort:** S — **Confidence:** 70 — **Risk:** none.

---

## Implementation plan

Five PRs, ordered. Each PR is independently reviewable, mergeable, and shippable.

### PR 1 — Critical bug fixes (patch release, e.g. 16.1.1)

- **Items:** 1.1, 1.2, 1.4, 1.5, 2.3 (state immutability), 3.7 (lint-staged)
- **Why first:** single-line / single-file fixes, no consumer impact, ship as a patch.
- **Total effort:** ~2 h.
- **CHANGELOG:** Bug fixes section.

### PR 2 — Editor performance pass (patch or minor)

- **Items:** 2.1 (responsive O(n²)), 2.2 (JSON.stringify compare), 2.4 (subscribe dedup), 2.5 (Sass additionalData), 1.6 (registerBlock mutation cleanup)
- **Why second:** internal-only changes; observable behavior identical. Measurable editor responsiveness wins.
- **Total effort:** ~6 h plus profiling.
- **Verification:** profile editor before/after on a heavy page (Performance flame chart screenshot in PR).

### PR 3 — Build hardening (minor, e.g. 16.2.0)

- **Items:** 1.3 (deterministic BUILD_VERSION), 3.3 (`sideEffects` array), 3.5 (`drop_console` → `pure_funcs`), 3.6 (gate `ProvidePlugin`), 3.8 (gate `inserter`), 5.1, 5.2, 4.5 (style tag via DOM API), 4.7
- **Why:** mostly non-breaking; deterministic builds open cache wins downstream.
- **Total effort:** ~4 h.

### PR 4 — API hygiene (minor)

- **Items:** 4.1 (hexToRgb), 4.2 (getUnique), 4.3 (cookies), 4.4 (merge exact match), 4.6 (remove NODE_ENV=test branches)
- **Total effort:** ~3 h.
- **Testing:** add unit tests for each helper before/after.

### PR 5 — Packaging / breaking changes (major, e.g. 17.0.0)

- **Items:** 3.1 (dep layout), 3.2 (peer deps), 3.4 (exports map + types), 4.9 (cookies durations)
- **Why last:** all breaking; bundle into one major.
- **Total effort:** ~12 h plus migration guide.
- **Migration guide:** add to `docs/` (or `MIGRATION-17.md`), update `get_migration_guide` MCP entry, and announce in #infinum-frontend.

---

## Verification checklist (every PR)

- [ ] `bun run lint` clean
- [ ] Unit tests pass (add new tests for items in PR 4)
- [ ] Smoke test in a real consumer (boilerplate + one production project)
- [ ] CHANGELOG.md entry following Keep a Changelog
- [ ] If breaking: migration notes in PR description and `docs/`
- [ ] Version bump matches scope (patch/minor/major)
