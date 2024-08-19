import {GlobalKeyboardListener} from 'node-global-key-listener';

const IKeyMouseButton = ["MOUSE LEFT","MOUSE RIGHT","MOUSE MIDDLE","MOUSE X1","MOUSE X2"];

export default function get() {
    return new Promise(res => {
        process.stdin.setRawMode(true);
        process.stdin.resume();

        const v = new GlobalKeyboardListener();
        const map = {}
                
        //Log every key that's pressed.
        setTimeout(() => {
            v.addListener((e, down) => {
                if (e.state == 'UP') {     
                    v.kill()      
                    process.stdin.setRawMode(false);
                    process.stdin.pause();
                    res(Object.keys(map).join(',').replace(/ /gi,'_').replace(/,/gi,' '));
                } else {
                    if (!IKeyMouseButton.includes(e.name)) {
                        map[e.name] = true
                    }
                }
            });
        }, 100)
    })
}