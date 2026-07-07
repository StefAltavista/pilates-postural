# Design System

## Concept

The UI is built on Material UI with a small set of local wrapper components. The
wrappers provide project defaults without hiding MUI's standard props, while the
theme centralizes colors, typography, spacing, shape, and component overrides.

## Global Provider

Short description: One client provider installs MUI caching, theme, and baseline
styles for the whole app.

Specific implementation:

- File: `app/providers.tsx`.
- `AppProviders`
  - Uses `AppRouterCacheProvider` from `@mui/material-nextjs/v16-appRouter`.
  - Passes `options={{ enableCssLayer: true }}`.
  - Wraps children in MUI `ThemeProvider`.
  - Applies `CssBaseline`.
- Installed by `RootLayout` in `app/layout.tsx`.

## Theme

Short description: The theme config defines project tokens and MUI defaults.

Specific implementation:

- `theme/index.ts`
  - Calls `createTheme`.
  - Enables CSS variables.
  - Installs `palette`, `typography`, and `components`.
  - Sets spacing to `8`.
  - Sets shape radius to `8`.
  - Defines standard MUI breakpoints.
- `theme/palette.ts`
  - Defines light mode colors.
  - Adds custom semantic palettes: `brand`, `accent`, `surface`, `surfaceAlt`, `border`, `muted`, and `overlay`.
- `theme/typography.ts`
  - Defines Inter/system font stack.
  - Configures MUI text variants plus custom variants such as `primaryTitle`, `secondarySubtitle`, `quote`, and `link`.
- `theme/components.ts`
  - Adds global baseline overrides.
  - Sets button sizing and radius defaults.
  - Sets container padding by breakpoint.
  - Sets card borders and paper defaults.
  - Sets text field/input defaults.
  - Sets MUI link styling.
- `theme/theme.d.ts`
  - Extends MUI theme typings for custom palette and typography variants.

## Layout Primitives

Short description: Common layout wrappers keep pages consistent while preserving
MUI prop flexibility.

Specific implementation:

- `AppContainer` in `components/common/AppContainer.tsx`
  - Wraps MUI `Container`.
  - Defaults `maxWidth` to `lg`.
- `AppSection` in `components/common/AppSection.tsx`
  - Wraps MUI `Box`.
  - Defaults to `component="section"`.
  - Prepends responsive vertical padding.
- `AppCard` in `components/common/AppCard.tsx`
  - Wraps MUI `Card`.
  - Defaults `variant` to `outlined`.
- Usage:
  - Public pages use `AppSection` and `AppContainer` for page bands.
  - Admin forms and static content blocks use `AppCard`.

## Form Controls

Short description: Form wrappers provide consistent defaults and integrate with
React Hook Form refs.

Specific implementation:

- `AppTextField` in `components/common/AppTextField.tsx`
  - Client component.
  - Wraps MUI `TextField`.
  - Defaults `fullWidth` to true.
  - Forwards `inputRef`.
- `AppTextArea` in `components/common/AppTextArea.tsx`
  - Client component.
  - Wraps `AppTextField` with `multiline`.
  - Defaults `minRows` to 4.
- `AppSelect` in `components/common/AppSelect.tsx`
  - Client component.
  - Wraps `AppTextField` with `select`.
  - Maps `options` to MUI `MenuItem`.
- `AppCheckbox` in `components/common/AppCheckbox.tsx`
  - Client component.
  - Wraps MUI `Checkbox` in `FormControlLabel`.
  - Supports optional helper text.
  - Passes React Hook Form refs through checkbox slot props.
- `SubmitButton` in `components/admin/common/SubmitButton.tsx`
  - Admin-specific submit helper.
  - Uses pending state to disable/label submit interactions.

## Buttons And Images

Short description: Buttons and images have thin wrappers for global defaults.

Specific implementation:

- `AppButton` in `components/common/AppButton.tsx`
  - Wraps MUI `Button`.
  - Defaults `variant` to `contained`.
  - Still accepts normal `ButtonProps`, including Next-compatible `href`.
- `OptimizedImage` in `components/common/OptimizedImage.tsx`
  - Wraps Next `Image`.
  - Requires `alt`.
  - Defaults `quality` to `75`.
  - Defaults `sizes` to `(max-width: 600px) 100vw, 50vw`.

## State Helpers

Short description: Common components standardize empty, loading, and error
messages.

Specific implementation:

- `EmptyState` in `components/common/EmptyState.tsx`
  - Shows title, optional description, and optional action.
  - Used by `PostList` and `NewsFeed`.
- `LoadingState` in `components/common/LoadingState.tsx`
  - Shows MUI `CircularProgress`.
  - Adds `aria-live` and `aria-busy`.
  - Used by `app/(public)/loading.tsx`.
- `ErrorState` in `components/common/ErrorState.tsx`
  - Shows MUI `Alert` with optional action.
  - Available for reusable error UI.

## Public Layout Components

Short description: Public navigation and footer are static components informed by
site config.

Specific implementation:

- `PublicHeader` in `components/layout/public/PublicHeader.tsx`
  - Uses `siteConfig.siteName`.
  - Links to home, featured, and contact.
- `PublicFooter` in `components/layout/public/PublicFooter.tsx`
  - Uses `siteConfig.siteName`.
  - Links to privacy policy, cookie policy, and impressum.

## Admin Layout Components

Short description: Admin layout components provide navigation and a protected
page frame.

Specific implementation:

- `AdminHeader` in `components/admin/AdminHeader.tsx`
  - Links to posts, categories, and the public site.
  - Contains logout form using `logoutAction`.
- `AdminPage` in `components/admin/AdminPage.tsx`
  - Wraps admin page content with `AdminHeader` and `AppContainer`.

