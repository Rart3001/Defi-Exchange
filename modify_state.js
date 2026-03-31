const fs = require('fs');
const file = 'my-app/pages/index.js';
let content = fs.readFileSync(file, 'utf8');

// Temporarily set walletConnected to true for visual verification
content = content.replace(
  'const [walletConnected, setWalletConnected] = useState(false);',
  'const [walletConnected, setWalletConnected] = useState(true);'
);

// We need to disable getAmounts since we aren't actually connected to a Web3 provider
content = content.replace(
  'getAmounts();',
  '// getAmounts();'
);

fs.writeFileSync(file, content);
