# Quickstart Guide

## Purpose

Enable developers to set up, run, and contribute to the Physical AI & Humanoid Robotics Textbook.

## Prerequisites

- **Node.js**: Version 18 or higher
- **Git**: For version control
- **Text Editor**: VS Code, Sublime Text, or similar

## Installation

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd Physical-AI-Humanoid-Robotics-Textbook
npm install
```

## Development Server

Start the local development server:

```bash
npm start
# Opens http://localhost:3000
```

The development server provides:
- Hot reload on file changes
- Instant preview of content updates
- Live search functionality testing

## Build & Deploy

### Build Static Site

Generate the production-ready static site:

```bash
npm run build          # Creates static site in build/
```

### Preview Production Build

Test the production build locally:

```bash
npm run serve          # Preview production build at http://localhost:3000
```

### Deploy to GitHub Pages

Deploy to GitHub Pages (main branch only):

```bash
npm run deploy         # Deploy to GitHub Pages
```

**Note**: Deployment is restricted to the main branch. Feature branches will fail the deployment check.

## Creating New Chapter

Follow these steps to add a new chapter:

1. **Copy Template**: Use the chapter template as starting point
   ```bash
   cp .specify/templates/chapter-template.md docs/module-X-name/new-chapter.md
   ```

2. **Fill Frontmatter**: Update the YAML frontmatter metadata
   - Use `contracts/chapter-metadata-schema.json` for field definitions
   - Required fields: title, description, keywords, sidebar_position, estimated_time, week, module, prerequisites, learning_objectives
   - Optional fields: sidebar_label, assessment_type, difficulty_level, capstone_component

3. **Place in Module Directory**: Save to appropriate module
   ```
   docs/module-1-ros2/           # Module 1: ROS 2 (Weeks 3-5)
   docs/module-2-digital-twin/   # Module 2: Digital Twin (Weeks 6-7)
   docs/module-3-isaac/          # Module 3: NVIDIA Isaac (Weeks 8-10)
   docs/module-4-vla-humanoids/  # Module 4: VLA & Humanoids (Weeks 11-13)
   ```

4. **Add to Sidebar**: Update `sidebars.js` with new entry
   ```javascript
   {
     type: 'category',
     label: 'Module 1: ROS 2 (Weeks 3-5)',
     collapsible: true,
     collapsed: false,
     items: [
       'module-1-ros2/index',
       'module-1-ros2/week-3-architecture',
       'module-1-ros2/new-chapter'  // Add here
     ]
   }
   ```

5. **Validate Metadata**: Run validation to ensure compliance
   ```bash
   npm run validate-metadata
   ```

## Running Quality Checks

Before committing, run all quality checks:

```bash
# Build check (no errors/warnings allowed)
npm run build

# Link validation (internal and external links)
npm run check-links

# Performance, accessibility, and SEO checks
npm run lighthouse

# Metadata validation (chapter frontmatter against JSON Schema)
npm run validate-metadata
```

**Quality Gates** (must pass before merge):
- Build completes with 0 errors, 0 warnings
- Broken link count: 0
- Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- All chapter metadata validates against schema

## Updating Glossary

The glossary powers the instant glossary search component:

1. **Edit Glossary File**: Add/update terms in `docs/references/glossary.md`
   ```markdown
   ## ROS 2 (Robot Operating System 2)
   Open-source middleware framework for robot software development...
   ```

2. **Rebuild Search Index**: Regenerate the Flexsearch index
   ```bash
   npm run generate-glossary-index
   ```

3. **Verify Search**: Start dev server and test glossary search component

## Project Structure

```
Physical-AI-Humanoid-Robotics-Textbook/
├── docs/                           # Main content
│   ├── intro.md
│   ├── setup/                      # 3 hardware paths
│   ├── module-1-ros2/              # Weeks 3-5
│   ├── module-2-digital-twin/      # Weeks 6-7
│   ├── module-3-isaac/             # Weeks 8-10
│   ├── module-4-vla-humanoids/     # Weeks 11-13
│   ├── capstone/
│   ├── assessments/
│   ├── references/                 # Glossary, notation, troubleshooting
│   └── instructors/
├── src/                            # Custom React components
│   ├── components/
│   │   ├── ModuleCard.tsx
│   │   ├── QuickLinks.tsx
│   │   ├── RecentUpdates.tsx
│   │   └── GlossarySearch.tsx
│   └── pages/
│       └── index.tsx               # Dashboard homepage
├── static/                         # Static assets
│   └── img/
├── docusaurus.config.js            # Docusaurus configuration
├── sidebars.js                     # Sidebar structure
├── package.json
└── .github/workflows/              # CI/CD pipelines
```

## Common Tasks

### Add a Module

1. Create module directory: `docs/module-X-name/`
2. Add `index.md` with module overview
3. Update `sidebars.js` with new category
4. Add module metadata to `src/data/modules.json`

### Update Homepage

Edit `src/pages/index.tsx` to modify:
- Module cards
- Quick links sidebar
- Recent updates section

### Configure Search

Algolia DocSearch configuration in `docusaurus.config.js`:
```javascript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'physical-ai-textbook',
  searchParameters: {
    attributesToRetrieve: ['hierarchy', 'content', 'url', 'week', 'module', 'capstone_component']
  }
}
```

### Customize Theme

Theme configuration in `docusaurus.config.js`:
```javascript
themeConfig: {
  colorMode: {
    defaultMode: 'light',
    disableSwitch: false,
    respectPrefersColorScheme: true
  },
  navbar: { ... },
  footer: { ... }
}
```

## Troubleshooting

### Build Fails

- **Check Node.js version**: `node --version` (must be 18+)
- **Clear cache**: `npm run clear && npm install`
- **Check for syntax errors**: Review error output for file paths

### Broken Links

- **Run link checker**: `npm run check-links`
- **Fix internal links**: Use relative paths (`./other-chapter.md`)
- **Check external links**: Verify URLs are accessible

### Metadata Validation Errors

- **Review schema**: `contracts/chapter-metadata-schema.json`
- **Check required fields**: All 9 required fields must be present
- **Validate data types**: week/module must be integers, estimated_time must be number

### Search Not Working

- **Algolia**: Verify API key and index name in config
- **Glossary**: Rebuild index with `npm run generate-glossary-index`
- **Clear browser cache**: Hard refresh (Ctrl+Shift+R)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Code of conduct
- Pull request process
- Commit message conventions
- Review guidelines

## Support

- **Documentation Issues**: Open issue with `docs` label
- **Technical Issues**: Open issue with `bug` label
- **Feature Requests**: Open issue with `enhancement` label

## Next Steps

1. Explore the codebase structure
2. Read existing chapters to understand content patterns
3. Review `contracts/chapter-metadata-schema.json` for metadata requirements
4. Start contributing!
