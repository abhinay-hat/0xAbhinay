---
name: Abhinay Padidam — Coming Soon
description: Jacquard punched-brocade coming-soon surface for a Product AI Engineer portfolio.
colors:
  silk: "#07150F"
  silk-lift: "#0E2418"
  weft: "#8FBC6B"
  weft-soft: "#B5D49A"
  cream: "#D8E8C8"
  mist: "#C5D9C8"
  warp: "#040C08"
typography:
  display:
    fontFamily: "Young Serif, Georgia, serif"
    fontSize: "clamp(2rem, 5.4vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  ledger:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  punch: "2px"
spacing:
  page-x: "clamp(1.5rem, 4vw, 5rem)"
  page-y: "clamp(2rem, 4vw, 3rem)"
  module: "56px"
components:
  punch-cell:
    backgroundColor: "color-mix(in srgb, {colors.weft} 18%, transparent)"
    textColor: "{colors.weft}"
    rounded: "{rounded.punch}"
    size: "12px"
---

# Design System

## Overview

Experience-mode Coming Soon for Abhinay Padidam. Visual world: **Punched Brocade Loom** (seed `4dafad20`) — deep green silk, moss weft quote in **Young Serif**, punch-card ledger in **JetBrains Mono**. One viewport: name·role, monumental quote, COMING SOON, punch-strip, weave motif.

## Colors

| Token | Value | Role |
| --- | --- | --- |
| `silk` | `#07150F` | Page ground |
| `silk-lift` | `#0E2418` | Soft radial lift |
| `weft` | `#8FBC6B` | Quote / ledger / motif |
| `cream` | `#D8E8C8` | Highlight mix |
| `mist` | `#C5D9C8` | Loom module hairlines |
| `warp` | `#040C08` | Shadow ink |

## Typography

- **Quote:** Young Serif, live text (weft color + soft depth shadows)
- **Ledger:** JetBrains Mono, uppercase, tracked
- No gradient text

## Layout

Full-viewport CSS grid: `auto / 1fr / auto`. Flush-left, generous right void.

## Elevation & Depth

Flat silk field + text-shadow depth on quote. Punch cells use inset hairline.

## Shapes

Square punch cells (`2px`). Geometric SVG weave motif.

## Components

Punch strip · weft quote · coming-soon flap letters · weave motif SVG.

## Do's and Don'ts

**Do** keep moss-on-green-silk restraint; quote as artifact.

**Don't** reintroduce gold weft, cyan/violet chrome, cards, or kickers.
