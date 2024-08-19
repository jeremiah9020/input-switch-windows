import { Service } from 'node-windows';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Create a new service object
var svc = new Service({
  name:'ddccli-server',
  description: 'Checks for hotkeys and other things related to DDC',
  script: join(dirname(fileURLToPath(import.meta.url)), './index.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();


