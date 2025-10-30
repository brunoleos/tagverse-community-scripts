#!/usr/bin/env node

/**
 * Generate registry.json from all script manifests
 * This script is run automatically by GitHub Actions when scripts are added/updated
 */

const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = path.join(__dirname, '..', 'scripts');
const REGISTRY_FILE = path.join(__dirname, '..', 'registry.json');
const BASE_URL = 'https://raw.githubusercontent.com/brunoleos/tagverse-community-scripts/main';

function getAllScripts() {
    const scripts = [];

    if (!fs.existsSync(SCRIPTS_DIR)) {
        console.log('No scripts directory found, creating empty registry');
        return scripts;
    }

    const scriptDirs = fs.readdirSync(SCRIPTS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const scriptId of scriptDirs) {
        const scriptDir = path.join(SCRIPTS_DIR, scriptId);
        const manifestPath = path.join(scriptDir, 'manifest.json');

        if (!fs.existsSync(manifestPath)) {
            console.warn(`⚠️  Warning: No manifest.json found for ${scriptId}, skipping`);
            continue;
        }

        try {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

            // Validate required fields
            const requiredFields = ['id', 'name', 'description', 'version', 'author', 'minTagverseVersion', 'labels', 'suggestedTag'];
            const missingFields = requiredFields.filter(field => !manifest[field]);

            if (missingFields.length > 0) {
                console.warn(`⚠️  Warning: ${scriptId} missing fields: ${missingFields.join(', ')}, skipping`);
                continue;
            }

            // Build script metadata
            const scriptMeta = {
                id: manifest.id,
                name: manifest.name,
                description: manifest.description,
                author: {
                    name: manifest.author.name,
                    github: manifest.author.github,
                    url: manifest.author.url || `https://github.com/${manifest.author.github}`
                },
                version: manifest.version,
                minTagverseVersion: manifest.minTagverseVersion,
                labels: manifest.labels,
                suggestedTag: manifest.suggestedTag,
                downloads: manifest.downloads || 0,
                featured: manifest.featured || false,
                createdAt: manifest.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                urls: {
                    script: `${BASE_URL}/scripts/${scriptId}/script.js`,
                    manifest: `${BASE_URL}/scripts/${scriptId}/manifest.json`,
                    readme: `https://github.com/brunoleos/tagverse-community-scripts/tree/main/scripts/${scriptId}`
                },
                arguments: manifest.arguments || []
            };

            // Add preview if exists
            const previewPath = path.join(scriptDir, 'preview.png');
            if (fs.existsSync(previewPath)) {
                scriptMeta.urls.preview = `${BASE_URL}/scripts/${scriptId}/preview.png`;
            }

            scripts.push(scriptMeta);
            console.log(`✅ Added ${scriptId} to registry`);

        } catch (error) {
            console.error(`❌ Error processing ${scriptId}:`, error.message);
            continue;
        }
    }

    return scripts;
}

function generateRegistry() {
    console.log('Generating registry.json...\n');

    const scripts = getAllScripts();

    // Sort scripts: featured first, then by downloads, then alphabetically
    scripts.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (b.downloads !== a.downloads) return b.downloads - a.downloads;
        return a.name.localeCompare(b.name);
    });

    const registry = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        totalScripts: scripts.length,
        scripts
    };

    fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2), 'utf8');

    console.log(`\n✅ Registry generated successfully!`);
    console.log(`   Total scripts: ${scripts.length}`);
    console.log(`   Featured: ${scripts.filter(s => s.featured).length}`);
    console.log(`   Output: ${REGISTRY_FILE}`);

    // Summary by label
    const labelCounts = {};
    scripts.forEach(script => {
        script.labels.forEach(label => {
            labelCounts[label] = (labelCounts[label] || 0) + 1;
        });
    });

    console.log('\n📊 Scripts by label:');
    Object.entries(labelCounts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([label, count]) => {
            console.log(`   ${label}: ${count}`);
        });
}

// Run if called directly
if (require.main === module) {
    try {
        generateRegistry();
        process.exit(0);
    } catch (error) {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    }
}

module.exports = { generateRegistry };