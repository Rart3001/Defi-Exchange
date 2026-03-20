const fs = require('fs');
const file = 'my-app/pages/index.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'const [walletConnected, setWalletConnected] = useState(true);',
  'const [walletConnected, setWalletConnected] = useState(false);'
);

content = content.replace(
  '// getAmounts();',
  'getAmounts();'
);

fs.writeFileSync(file, content);
