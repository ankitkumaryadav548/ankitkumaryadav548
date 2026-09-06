const fs = require('fs');
const path = require('path');

console.log('🔍 Validating GitHub profile configuration...');

const configPath = path.join(__dirname, '..', 'github.json');

if (!fs.existsSync(configPath)) {
  console.error('❌ Error: github.json does not exist!');
  process.exit(1);
}

try {
  const rawData = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(rawData);

  const requiredFields = ['username', 'name', 'education', 'email', 'linkedin', 'github', 'skills'];
  for (const field of requiredFields) {
    if (!config[field]) {
      console.error(`❌ Error: Missing required field "${field}" in github.json`);
      process.exit(1);
    }
  }

  if (config.username !== 'ankitkumaryadav548') {
    console.error(`❌ Error: Invalid username "${config.username}". Expected "ankitkumaryadav548".`);
    process.exit(1);
  }

  console.log('✅ Configuration validated successfully!');
  console.log(`  Name: ${config.name}`);
  console.log(`  Username: ${config.username}`);
  console.log(`  Education: ${config.education}`);
  console.log(`  Email: ${config.email}`);
} catch (err) {
  console.error('❌ JSON parsing error:', err.message);
  process.exit(1);
}
