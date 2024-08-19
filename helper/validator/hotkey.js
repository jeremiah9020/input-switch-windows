const IUndefined = [""];
const IKeyNumber = ["0","1","2","3","4","5","6","7","8","9"];
const IKeyLetter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const IKeyAlphaNumeric = [...IKeyNumber,...IKeyLetter];
const IKeyArrows = ["UP ARROW","DOWN ARROW","LEFT ARROW","RIGHT ARROW"];
const IKeyNumpadNumbers = ["NUMPAD 0","NUMPAD 1","NUMPAD 2","NUMPAD 3","NUMPAD 4","NUMPAD 5","NUMPAD 6","NUMPAD 7","NUMPAD 8","NUMPAD 9"];
const IKeyNumpadSpecials = ["NUMPAD EQUALS","NUMPAD DIVIDE","NUMPAD MULTIPLY","NUMPAD MINUS","NUMPAD PLUS","NUMPAD RETURN","NUMPAD DOT"];
const IKeyNumpad = [...IKeyNumpadNumbers,...IKeyNumpadSpecials];
const IKeyModifiers = ["LEFT META","RIGHT META","LEFT CTRL","RIGHT CTRL","LEFT ALT","RIGHT ALT","LEFT SHIFT","RIGHT SHIFT","CAPS LOCK","NUM LOCK","SCROLL LOCK","FN"];
const IKeyFXX = ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24"];
const IKeySym = ["EQUALS","MINUS","SQUARE BRACKET OPEN","SQUARE BRACKET CLOSE","SEMICOLON","QUOTE","BACKSLASH","COMMA","DOT","FORWARD SLASH"];
const IKeyButtons = ["SPACE","BACKSPACE","RETURN","ESCAPE","BACKTICK","SECTION","DELETE","TAB"];
const IKeySpecials = [...IKeyFXX,...IKeySym,...IKeyButtons];
const IKeyRareUse = ["INS","NUMPAD CLEAR","PRINT SCREEN"];
const IScrollKeys = ["PAGE UP","PAGE DOWN","HOME","END"];
const IKeyMouseButton = ["MOUSE LEFT","MOUSE RIGHT","MOUSE MIDDLE","MOUSE X1","MOUSE X2"];
const IGlobalKey = [...IUndefined,...IKeyAlphaNumeric,...IKeyArrows,...IKeyModifiers,...IKeyMouseButton,...IKeySpecials,...IKeyNumpad,...IScrollKeys,...IKeyRareUse]
const IGlobalKeyMap = {}

for (const key of IGlobalKey) {
    IGlobalKeyMap[key] = true;
}

export default function validate(hotkey) {
    return IGlobalKeyMap.hasOwnProperty(hotkey)
}