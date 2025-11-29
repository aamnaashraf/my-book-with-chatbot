module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run serve',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/docs/intro',
        'http://localhost:3000/docs/setup/workstation',
        'http://localhost:3000/docs/module-1-ros2/',
        'http://localhost:3000/docs/references/glossary',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Disable PWA check for textbook (not required)
        'categories:pwa': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
