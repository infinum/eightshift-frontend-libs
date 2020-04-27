# Color Palette Custom

This is a slightly modified version of ColorPallete (from @wordpress/components) which saves color's slug (or name if slug not provided) rather than color's hex (which is the default behavior).

The reasoning is that this way we can add color names as class modifiers to blocks and then style those blocks in CSS / SCSS (rather than having to inline colors as with the default ColorPallete component).

By default it uses the default editor pallete (see https://developer.wordpress.org/block-editor/developers/themes/theme-support/#block-color-palettes) but you can override the colors for particular blocks by passing your own `colors` prop.

## Example #1 - Default

```jsx
<ColorPaletteCustom
  label={'Block Color'}
  help={'Change block color'}
  value={styleColor}
  onChange={onChangeStyleColor}
/>
```

### Example #2 - Override colors using some of the editor-color-pallete colors
```jsx
import { getPalleteColors } from '@eightshift/frontend-libs/scripts/editor';

const {
  color1,
  color2
} = getPalleteColors();

<ColorPaletteCustom
  label={'Block Color'}
  help={'Change block color'}
  value={styleColor}
  onChange={onChangeStyleColor}
  colors={[color1, color2]}
/>
```

### Example #3 - Override colors using custom colors not in editor pallete
```jsx

const specificColor = {
  name: 'Specific',
  slug: 'specific',
  color: '#FF11BB'
};

<ColorPaletteCustom
  label={'Block Color'}
  help={'Change block color'}
  value={styleColor}
  onChange={onChangeStyleColor}
  colors={[specificColor]}
/>
```
