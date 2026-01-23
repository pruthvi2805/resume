# Open Graph Image Requirements

## 🖼️ Action Required: Create Social Sharing Image

The meta tags in `index.html` reference an Open Graph image that needs to be created.

### File Details

**Location:** `/public/og-image.png`

**Specifications:**
- **Dimensions:** 1200 x 630 pixels (Facebook/LinkedIn standard)
- **Format:** PNG or JPG (PNG recommended for quality)
- **File Size:** Under 1MB for faster loading
- **Aspect Ratio:** 1.91:1

### Design Recommendations

#### Content to Include:
1. **Main Heading:** "Resume Builder" or "ATS-Optimized Resume Builder"
2. **Tagline:** "Resumes that get past the robots" or "Beat the ATS, land the interview"
3. **Key Features** (icons + text):
   - ✓ ATS-Optimized
   - ✓ 100% Private
   - ✓ Real-Time Scoring
   - ✓ Job Matching
4. **Branding:** kpruthvi.com logo/text
5. **Visual Element:** Mock resume or checkmark icon

#### Design Guidelines:
- **Background:** Light or branded color
- **Text:** Large, readable font (minimum 40px for body text)
- **Contrast:** High contrast for social feed visibility
- **Safe Zone:** Keep important content 40px from edges
- **Mobile Preview:** Will be cropped to square on some platforms

### Design Tools

**Recommended (Easy):**
- [Canva](https://www.canva.com/) - Free templates for social media images
- [Figma](https://www.figma.com/) - Professional design tool (free tier)
- [Adobe Express](https://www.adobe.com/express/) - Quick social graphics

**Template Resources:**
- Search for "Open Graph template 1200x630"
- Use Canva's "Facebook Post" template (correct dimensions)

### Example Color Scheme

Based on your site's theme:
- **Primary:** Amber/Orange accent color from site
- **Background:** White or light gray (#FAFAF8)
- **Text:** Dark gray or black (#1A1A1A)
- **Accent:** Use the accent color for highlights

### After Creating the Image

1. **Save as:** `og-image.png`
2. **Place in:** `/public/og-image.png`
3. **Verify:** Image is exactly 1200x630px
4. **Test:**
   - Build and deploy the site
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Paste: https://resume.kpruthvi.com/
   - Verify image appears correctly

### Testing Checklist

After adding the image:

- [ ] Image exists at `/public/og-image.png`
- [ ] Dimensions are exactly 1200 x 630 pixels
- [ ] File size is under 1MB
- [ ] Image is clear and readable when viewed at thumbnail size
- [ ] Text is legible on mobile devices
- [ ] Branding is visible and on-brand
- [ ] Facebook Sharing Debugger shows the image
- [ ] Twitter Card Validator shows the image
- [ ] LinkedIn Post Inspector shows the image

### Social Platform Preview Sizes

Different platforms will display your image differently:

| Platform | Display Size | Notes |
|----------|-------------|-------|
| Facebook Feed | 470 x 246 px | Cropped from center |
| Facebook Messenger | 360 x 189 px | Smaller thumbnail |
| Twitter Card | 506 x 253 px | Summary large image |
| LinkedIn Feed | 552 x 289 px | Desktop view |
| LinkedIn Mobile | 360 x 189 px | Mobile view |

**Recommendation:** Keep critical text and branding in the center 800x400px area to ensure it's visible across all platforms.

---

## Quick Start with Canva (5 minutes)

1. Go to [Canva.com](https://www.canva.com/)
2. Click "Create a design" → "Custom dimensions"
3. Enter: 1200 x 630 pixels
4. Choose a template or start from scratch
5. Add your content:
   - Background color (#FAFAF8 light or #1A1A1A dark)
   - Heading: "Resume Builder"
   - Subheading: "ATS-Optimized Resumes"
   - Features list with checkmarks
   - URL: "resume.kpruthvi.com"
6. Download as PNG
7. Save to `/public/og-image.png`

---

## Alternative: Text-Only Design

If design tools are unavailable, create a simple text-based image:

```
┌─────────────────────────────────────────┐
│                                         │
│       Resume Builder                    │
│       ATS-Optimized Resumes            │
│                                         │
│       ✓ Beat the ATS                   │
│       ✓ 100% Private                   │
│       ✓ Real-Time Scoring              │
│       ✓ 6 Templates                    │
│                                         │
│       resume.kpruthvi.com              │
│                                         │
└─────────────────────────────────────────┘
```

---

**Priority:** Medium-High
**Time to Complete:** 15-30 minutes
**Impact:** Improves social sharing appearance and click-through rates

---

*This requirement is part of the SEO optimization completed on 2026-01-23*
